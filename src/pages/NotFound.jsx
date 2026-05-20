import { Link } from 'react-router-dom'
import { ROUTES } from '@/config/routes'

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-slate-900">404 — Page not found</h1>
      <p className="mt-2 text-slate-600">The page you are looking for does not exist.</p>
      <Link to={ROUTES.HOME} className="mt-6 text-indigo-600 hover:underline">
        Go home
      </Link>
    </section>
  )
}
