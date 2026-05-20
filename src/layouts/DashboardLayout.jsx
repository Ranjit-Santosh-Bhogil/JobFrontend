import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '@/components/common/Navbar'
import Sidebar from '@/components/common/Sidebar'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export default function DashboardLayout() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleToggle = () => setSidebarOpen((prev) => !prev)
  const handleClose = () => setSidebarOpen(false)

  return (
    <>
      <Navbar onMenuToggle={handleToggle} />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar isOpen={isDesktop || sidebarOpen} onClose={handleClose} />
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </>
  )
}
