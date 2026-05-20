export function buildQueryParams(filters = {}) {
  const params = {}

  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    if (Array.isArray(value) && value.length === 0) return
    params[key] = value
  })

  return params
}
