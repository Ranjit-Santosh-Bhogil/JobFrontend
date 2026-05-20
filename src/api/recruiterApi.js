import api from './axios'

export const recruiterApi = {
  getDashboardStats: () => api.get('/recruiter/stats'),
  getRecentApplicants: (params) => api.get('/recruiter/applicants/recent', { params }),
}
