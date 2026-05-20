import { Outlet } from 'react-router-dom'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-8rem)]">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
