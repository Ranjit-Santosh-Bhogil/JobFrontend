import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/config/routes'
import { getDashboardPath } from '@/utils/roleUtils'
import { validateRegister } from '@/utils/validateForm'
import RoleSelector from './RoleSelector'
import Loader from '@/components/common/Loader'

export default function RegisterForm() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'CANDIDATE',
  })
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
    const validationErrors = validateRegister(form)
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    try {
      const user = await register(form)
      if (user?.email) {
        navigate(getDashboardPath(user), { replace: true })
      } else {
        navigate(ROUTES.LOGIN, { replace: true })
      }
    } catch (err) {
      setApiError(err.message || 'Registration failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitting) return <Loader label="Creating account..." />

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <h1 className="text-2xl font-bold text-slate-900">Create account</h1>
      <p className="mt-1 text-sm text-slate-500">Join Smart Job Portal</p>

      {apiError && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">
          {apiError}
        </p>
      )}

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
            Full name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>

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

        <RoleSelector value={form.role} onChange={handleChange} error={errors.role} />
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Register
      </button>

      <p className="mt-4 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="font-medium text-indigo-600 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
