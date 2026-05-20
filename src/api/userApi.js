import api from './axios'

export const userApi = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (payload) => api.put('/users/profile', payload),
}
