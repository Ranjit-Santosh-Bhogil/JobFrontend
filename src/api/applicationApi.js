import api from './axios'

export const applicationApi = {
  apply: (jobId, payload = {}) => api.post(`/jobs/${jobId}/apply`, payload),
  getMyApplications: (params) => api.get('/applications/me', { params }),
  getApplicantsByJob: (jobId, params) =>
    api.get(`/jobs/${jobId}/applications`, { params }),
  updateStatus: (applicationId, status) =>
    api.patch(`/applications/${applicationId}/status`, { status }),
}
