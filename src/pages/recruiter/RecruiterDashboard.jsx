import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { recruiterApi } from '@/api/recruiterApi'
import ApplicationTable from '@/components/applications/ApplicationTable'
import EmptyState from '@/components/common/EmptyState'
import Loader from '@/components/common/Loader'
import PageHeader from '@/components/common/PageHeader'
import StatCard from '@/components/common/StatCard'
import { ROUTES } from '@/config/routes'
import '@/styles/dashboard.css'

export default function RecruiterDashboard() {
  const [stats, setStats] = useState(null)
  const [recentApplicants, setRecentApplicants] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchDashboard() {
      setIsLoading(true)
      setError('')
      try {
        const [statsResponse, applicantsResponse] = await Promise.all([
          recruiterApi.getDashboardStats(),
          recruiterApi.getRecentApplicants({ size: 5 }),
        ])
        setStats(statsResponse.data)
        setRecentApplicants(applicantsResponse.data.content ?? applicantsResponse.data ?? [])
      } catch (err) {
        setError(err.message || 'Failed to load recruiter dashboard.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  return (
    <>
      <PageHeader
        title="Recruiter Dashboard"
        subtitle="Track your jobs and applicants"
        actions={<Link to={ROUTES.RECRUITER.CREATE_JOB} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Post job</Link>}
      />
      {isLoading && <Loader />}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!isLoading && !error && (
        <>
          <div className="dashboard-grid">
            <StatCard label="Jobs" value={stats?.totalJobs ?? 0} />
            <StatCard label="Applications" value={stats?.totalApplications ?? 0} />
            <StatCard label="Pending" value={stats?.pendingApplications ?? 0} />
            <StatCard label="Users" value={stats?.totalUsers ?? 0} />
          </div>
          <div className="mt-6">
            <PageHeader title="Recent Applicants" />
            {recentApplicants.length > 0 ? (
              <ApplicationTable applications={recentApplicants} />
            ) : (
              <EmptyState title="No applicants yet" message="Applicants will appear as candidates apply." />
            )}
          </div>
        </>
      )}
    </>
  )
}
