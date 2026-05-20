import { ROUTES } from '@/config/routes'
import { ROLES } from '@/config/roles'

export function normalizeRoles(user) {
  if (!user) return []
  if (Array.isArray(user.roles)) return user.roles
  if (user.role) return [user.role]
  return []
}

export function hasRole(user, role) {
  return normalizeRoles(user).includes(role)
}

export function hasAnyRole(user, roles = []) {
  const userRoles = normalizeRoles(user)
  return roles.some((role) => userRoles.includes(role))
}

export function getPrimaryRole(user) {
  const roles = normalizeRoles(user)
  if (roles.includes(ROLES.ADMIN)) return ROLES.ADMIN
  if (roles.includes(ROLES.RECRUITER)) return ROLES.RECRUITER
  if (roles.includes(ROLES.CANDIDATE)) return ROLES.CANDIDATE
  return roles[0] || null
}

export function getDashboardPath(user) {
  const role = getPrimaryRole(user)
  switch (role) {
    case ROLES.ADMIN:
      return ROUTES.ADMIN.DASHBOARD
    case ROLES.RECRUITER:
      return ROUTES.RECRUITER.DASHBOARD
    case ROLES.CANDIDATE:
      return ROUTES.CANDIDATE.HOME
    default:
      return ROUTES.LOGIN
  }
}
