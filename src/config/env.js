// Dev: use /api (Vite proxy). Production: set VITE_API_BASE_URL to full backend URL.
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || '/api'
