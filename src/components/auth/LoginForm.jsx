import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/config/routes'
import { getDashboardPath } from '@/utils/roleUtils'
import { validateLogin } from '@/utils/validateForm'
import Loader from '@/components/common/Loader'

export default function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setApiError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateLogin(form)
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    try {
      const user = await login(form)
      navigate(from || getDashboardPath(user), { replace: true })
    } catch (err) {
      setApiError(err.message || 'Login failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitting) return <Loader label="Signing in..." />

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <h1 className="text-2xl font-bold text-slate-900">Sign in</h1>
      <p className="mt-1 text-sm text-slate-500">Access your Smart Job Portal account</p>

      {apiError && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">
          {apiError}
        </p>
      )}

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Sign in
      </button>

      <p className="mt-4 text-center text-sm text-slate-500">
        No account?{' '}
        <Link to={ROUTES.REGISTER} className="font-medium text-indigo-600 hover:underline">
          Register
        </Link>
      </p>
    </form>
  )
}
