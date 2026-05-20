import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '@/config/navConfig'
import { useAuth } from '@/hooks/useAuth'
import { hasAnyRole } from '@/utils/roleUtils'

export default function Sidebar({ isOpen, onClose }) {
  const { user } = useAuth()

  const items = NAV_ITEMS.filter((item) => hasAnyRole(user, item.roles))

  const linkClass = ({ isActive }) =>
    `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
    }`

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-slate-200 bg-white pt-16 transition-transform lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex flex-col gap-1 p-4">
          {items.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClass} onClick={onClose}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
