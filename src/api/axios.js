import axios from 'axios'
import { API_BASE_URL } from '@/config/env'
import { tokenService } from '@/services/tokenService'
import { ROUTES } from '@/config/routes'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
})

api.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(normalizeError(error))
    }

    const refreshToken = tokenService.getRefreshToken()
    if (!refreshToken) {
      tokenService.clearTokens()
      window.location.href = ROUTES.LOGIN
      return Promise.reject(normalizeError(error))
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`
        return api(originalRequest)
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refreshToken,
      })
      const accessToken = data.accessToken ?? data.token
      tokenService.setTokens({
        accessToken,
        refreshToken: data.refreshToken ?? refreshToken,
      })
      processQueue(null, accessToken)
      originalRequest.headers.Authorization = `Bearer ${accessToken}`
      return api(originalRequest)
    } catch (refreshError) {
      processQueue(refreshError, null)
      tokenService.clearTokens()
      window.location.href = ROUTES.LOGIN
      return Promise.reject(normalizeError(refreshError))
    } finally {
      isRefreshing = false
    }
  },
)

function normalizeError(error) {
  const response = error.response
  return {
    message:
      response?.data?.message ||
      response?.data?.error ||
      error.message ||
      'Something went wrong',
    status: response?.status,
    errors: response?.data?.errors,
    original: error,
  }
}

export default api
