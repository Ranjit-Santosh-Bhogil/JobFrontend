import { Link } from 'react-router-dom'
import { ROUTES } from '@/config/routes'

export default function Unauthorized() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-slate-900">403 — Unauthorized</h1>
      <p className="mt-2 text-slate-600">You do not have permission to access this page.</p>
      <Link to={ROUTES.HOME} className="mt-6 text-indigo-600 hover:underline">
        Go home
      </Link>
    </section>
  )
}
