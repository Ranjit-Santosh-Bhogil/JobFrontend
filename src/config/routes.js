export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  UNAUTHORIZED: '/unauthorized',
  JOBS_PUBLIC: '/jobs',
  JOB_DETAILS: (id = ':id') => `/jobs/${id}`,

  CANDIDATE: {
    BASE: '/candidate',
    HOME: '/candidate/home',
    JOBS: '/candidate/jobs',
    JOB_DETAILS: (id = ':id') => `/candidate/jobs/${id}`,
    APPLIED: '/candidate/applied',
    PROFILE: '/candidate/profile',
    NOTIFICATIONS: '/candidate/notifications',
  },

  RECRUITER: {
    BASE: '/recruiter',
    DASHBOARD: '/recruiter/dashboard',
    CREATE_JOB: '/recruiter/jobs/new',
    MANAGE_JOBS: '/recruiter/jobs',
    APPLICANTS: '/recruiter/applicants',
    PROFILE: '/recruiter/profile',
  },

  ADMIN: {
    BASE: '/admin',
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    JOBS: '/admin/jobs',
    REPORTS: '/admin/reports',
  },
}
