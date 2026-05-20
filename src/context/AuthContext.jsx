import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { authApi } from '@/api/authApi'
import { tokenService } from '@/services/tokenService'
import { isTokenExpired, mapUserFromToken } from '@/services/authService'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const bootstrap = useCallback(async () => {
    const token = tokenService.getAccessToken()
    if (!token || isTokenExpired(token)) {
      tokenService.clearTokens()
      setUser(null)
      setIsLoading(false)
      return
    }

    try {
      const { data } = await authApi.me()
      setUser(mapUserFromToken(token, data))
    } catch {
      setUser(mapUserFromToken(token))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    bootstrap()
  }, [bootstrap])

  const login = useCallback(async (credentials) => {
    const { data } = await authApi.login(credentials)
    const accessToken = data.accessToken ?? data.token
    tokenService.setTokens({
      accessToken,
      refreshToken: data.refreshToken,
    })
    const profile = data.user ?? data
    const nextUser = mapUserFromToken(accessToken, profile)
    setUser(nextUser)
    return nextUser
  }, [])

  const register = useCallback(async (payload) => {
    const { data } = await authApi.register(payload)
    const accessToken = data.accessToken ?? data.token
    if (accessToken) {
      tokenService.setTokens({
        accessToken,
        refreshToken: data.refreshToken,
      })
      const nextUser = mapUserFromToken(accessToken, data.user ?? data)
      setUser(nextUser)
      return nextUser
    }
    return data
  }, [])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } catch {
      /* ignore logout API errors */
    } finally {
      tokenService.clearTokens()
      setUser(null)
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user, isLoading, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
