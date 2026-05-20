import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { applicationApi } from '@/api/applicationApi'
import PageHeader from '@/components/common/PageHeader'
import StatCard from '@/components/common/StatCard'
import { ROUTES } from '@/config/routes'
import '@/styles/dashboard.css'

export default function Home() {
  const [stats, setStats] = useState({ applied: 0, reviewing: 0, shortlisted: 0, offers: 0 })

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data } = await applicationApi.getMyApplications({ size: 100 })
        const applications = data.content ?? data ?? []
        setStats({
          applied: data.totalElements ?? applications.length,
          reviewing: applications.filter((item) => item.status === 'REVIEWING').length,
          shortlisted: applications.filter((item) => item.status === 'SHORTLISTED').length,
          offers: applications.filter((item) => item.status === 'HIRED').length,
        })
      } catch {
        setStats({ applied: 0, reviewing: 0, shortlisted: 0, offers: 0 })
      }
    }

    fetchStats()
  }, [])

  return (
    <>
      <PageHeader
        title="Welcome back"
        subtitle="Track applications and discover new opportunities"
        actions={
          <Link
            to={ROUTES.CANDIDATE.JOBS}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Browse jobs
          </Link>
        }
      />

      <div className="dashboard-grid">
        <StatCard label="Applied" value={stats.applied} />
        <StatCard label="Reviewing" value={stats.reviewing} />
        <StatCard label="Shortlisted" value={stats.shortlisted} />
        <StatCard label="Offers" value={stats.offers} />
      </div>
    </>
  )
}
