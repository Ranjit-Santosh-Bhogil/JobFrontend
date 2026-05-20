import StatCard from '@/components/common/StatCard'
import '@/styles/dashboard.css'

export default function RecruiterStats({ stats }) {
  return (
    <div className="dashboard-grid">
      <StatCard label="Jobs" value={stats?.totalJobs ?? 0} />
      <StatCard label="Applications" value={stats?.totalApplications ?? 0} />
      <StatCard label="Pending" value={stats?.pendingApplications ?? 0} />
      <StatCard label="Users" value={stats?.totalUsers ?? 0} />
    </div>
  )
}
