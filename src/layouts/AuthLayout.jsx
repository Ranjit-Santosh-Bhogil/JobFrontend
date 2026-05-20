import { Outlet, Link } from 'react-router-dom'
import { ROUTES } from '@/config/routes'

export default function AuthLayout() {
  return (
    <>
      <header className="bg-slate-50 p-6">
        <Link to={ROUTES.HOME} className="text-xl font-bold text-indigo-600">
          Smart Job Portal
        </Link>
      </header>
      <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-slate-50 px-4 pb-12">
        <Outlet />
      </main>
    </>
  )
}
