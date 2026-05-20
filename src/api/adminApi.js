import api from './axios'

export const adminApi = {
  getPlatformStats: () => api.get('/admin/stats'),
  getUsers: (params) => api.get('/admin/users', { params }),
  updateUserStatus: (userId, payload) =>
    api.patch(`/admin/users/${userId}/status`, payload),
  getReports: (params) => api.get('/admin/reports', { params }),
}
