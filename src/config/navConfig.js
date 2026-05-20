import { ROUTES } from './routes'
import { ROLES } from './roles'

export const NAV_ITEMS = [
  { label: 'Home', path: ROUTES.CANDIDATE.HOME, roles: [ROLES.CANDIDATE] },
  { label: 'Browse Jobs', path: ROUTES.CANDIDATE.JOBS, roles: [ROLES.CANDIDATE] },
  { label: 'Applied Jobs', path: ROUTES.CANDIDATE.APPLIED, roles: [ROLES.CANDIDATE] },
  { label: 'Profile', path: ROUTES.CANDIDATE.PROFILE, roles: [ROLES.CANDIDATE] },
  {
    label: 'Notifications',
    path: ROUTES.CANDIDATE.NOTIFICATIONS,
    roles: [ROLES.CANDIDATE],
  },
  {
    label: 'Dashboard',
    path: ROUTES.RECRUITER.DASHBOARD,
    roles: [ROLES.RECRUITER],
  },
  { label: 'Post Job', path: ROUTES.RECRUITER.CREATE_JOB, roles: [ROLES.RECRUITER] },
  { label: 'My Jobs', path: ROUTES.RECRUITER.MANAGE_JOBS, roles: [ROLES.RECRUITER] },
  {
    label: 'Applicants',
    path: ROUTES.RECRUITER.APPLICANTS,
    roles: [ROLES.RECRUITER],
  },
  { label: 'Profile', path: ROUTES.RECRUITER.PROFILE, roles: [ROLES.RECRUITER] },
  { label: 'Dashboard', path: ROUTES.ADMIN.DASHBOARD, roles: [ROLES.ADMIN] },
  { label: 'Users', path: ROUTES.ADMIN.USERS, roles: [ROLES.ADMIN] },
  { label: 'All Jobs', path: ROUTES.ADMIN.JOBS, roles: [ROLES.ADMIN] },
  { label: 'Reports', path: ROUTES.ADMIN.REPORTS, roles: [ROLES.ADMIN] },
]
