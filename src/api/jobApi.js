import api from './axios'

export const jobApi = {
  getJobs: (params) => api.get('/jobs', { params }),
  getJobById: (id) => api.get(`/jobs/${id}`),
  createJob: (payload) => api.post('/jobs', payload),
  updateJob: (id, payload) => api.put(`/jobs/${id}`, payload),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  getMyJobs: (params) => api.get('/jobs/my', { params }),
}
