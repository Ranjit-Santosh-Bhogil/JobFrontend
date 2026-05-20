import { useEffect, useState } from 'react'
import { adminApi } from '@/api/adminApi'
import Loader from '@/components/common/Loader'
import PageHeader from '@/components/common/PageHeader'
import PlatformStats from '@/components/admin/PlatformStats'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data } = await adminApi.getPlatformStats()
        setStats(data)
      } catch (err) {
        setError(err.message || 'Failed to load admin dashboard.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <>
      <PageHeader title="Admin Dashboard" subtitle="Platform activity and health" />
      {isLoading && <Loader />}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!isLoading && !error && <PlatformStats stats={stats} />}
    </>
  )
}
