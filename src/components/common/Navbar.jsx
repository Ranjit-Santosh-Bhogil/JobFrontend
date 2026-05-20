import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/config/routes'
import { getDashboardPath } from '@/utils/roleUtils'

export default function Navbar({ onMenuToggle }) {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate(ROUTES.LOGIN)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuToggle}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to={isAuthenticated ? getDashboardPath(user) : ROUTES.HOME} className="text-lg font-bold text-indigo-600">
            Smart Job Portal
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link to={ROUTES.LOGIN} className="text-sm font-medium text-slate-600 hover:text-indigo-600">
                Login
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="hidden text-sm text-slate-600 sm:inline">{user?.email}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
