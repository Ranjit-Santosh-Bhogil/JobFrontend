export function decodeJwtPayload(token) {
  if (!token) return null
  try {
    const base64 = token.split('.')[1]
    const json = atob(base64.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function isTokenExpired(token) {
  const payload = decodeJwtPayload(token)
  if (!payload?.exp) return true
  return Date.now() >= payload.exp * 1000
}

export function mapUserFromToken(token, profile = {}) {
  const payload = decodeJwtPayload(token) || {}
  return {
    id: profile.id ?? payload.sub ?? payload.userId,
    email: profile.email ?? payload.email ?? payload.sub,
    name: profile.name ?? payload.name,
    roles: profile.roles ?? payload.roles ?? (payload.role ? [payload.role] : []),
  }
}
