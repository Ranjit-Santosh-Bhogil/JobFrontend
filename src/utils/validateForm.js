export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim())
}

export function isRequired(value) {
  return String(value ?? '').trim().length > 0
}

export function minLength(value, min) {
  return String(value || '').length >= min
}

export function validateLogin({ email, password }) {
  const errors = {}
  if (!isRequired(email)) errors.email = 'Email is required'
  else if (!isEmail(email)) errors.email = 'Enter a valid email'
  if (!isRequired(password)) errors.password = 'Password is required'
  else if (!minLength(password, 6)) errors.password = 'Minimum 6 characters'
  return errors
}

export function validateRegister({ name, email, password, role }) {
  const errors = validateLogin({ email, password })
  if (!isRequired(name)) errors.name = 'Name is required'
  if (!isRequired(role)) errors.role = 'Select a role'
  return errors
}
