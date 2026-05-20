import fs from 'fs'
import path from 'path'

const root = 'src'

const stub = (name, extra = '') => `export default function ${name}(${extra}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">${name}</h2>
      <p className="mt-2 text-sm text-slate-500">Implement UI here.</p>
    </section>
  )
}
`

const files = {
  'components/common/Pagination.jsx': `export default function Pagination({ page = 0, totalPages = 0, onPageChange, disabled = false }) {
  if (totalPages <= 1) return null
  const pages = Array.from({ length: totalPages }, (_, i) => i)
  return (
    <nav className="flex items-center justify-center gap-2 py-4" aria-label="Pagination">
      <button type="button" disabled={disabled || page === 0} onClick={() => onPageChange(page - 1)} className="rounded border px-3 py-1 text-sm disabled:opacity-50">Prev</button>
      {pages.map((p) => (
        <button key={p} type="button" disabled={disabled} onClick={() => onPageChange(p)} className={\`rounded px-3 py-1 text-sm \${p === page ? 'bg-indigo-600 text-white' : 'border text-slate-600'}\`}>{p + 1}</button>
      ))}
      <button type="button" disabled={disabled || page >= totalPages - 1} onClick={() => onPageChange(page + 1)} className="rounded border px-3 py-1 text-sm disabled:opacity-50">Next</button>
    </nav>
  )
}`,
  'components/common/Modal.jsx': stub('Modal', '{ isOpen, onClose, title, children }'),
  'components/common/SearchBar.jsx': `export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <input type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
  )
}`,
  'components/common/EmptyState.jsx': stub('EmptyState', '{ title = "No data", message }'),
  'components/common/PageHeader.jsx': `export default function PageHeader({ title, subtitle, actions }) {
  return (
    <motion className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div><h1 className="text-2xl font-bold text-slate-900">{title}</h1>{subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}</div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </motion>
  )
}`,
  'components/common/StatCard.jsx': stub('StatCard', '{ label, value, trend }'),
  'components/auth/LoginForm.jsx': stub('LoginForm'),
  'components/auth/RegisterForm.jsx': stub('RegisterForm'),
  'components/auth/RoleSelector.jsx': stub('RoleSelector'),
  'components/jobs/JobCard.jsx': stub('JobCard', '{ job }'),
  'components/jobs/JobList.jsx': stub('JobList', '{ jobs = [] }'),
  'components/jobs/JobDetails.jsx': stub('JobDetails', '{ job }'),
  'components/jobs/JobFilter.jsx': stub('JobFilter', '{ filters, onChange }'),
  'components/jobs/JobForm.jsx': stub('JobForm', '{ initialValues, onSubmit }'),
  'components/applications/ApplicationCard.jsx': stub('ApplicationCard', '{ application }'),
  'components/applications/ApplicationTable.jsx': stub('ApplicationTable', '{ applications = [] }'),
  'components/applications/StatusBadge.jsx': stub('StatusBadge', '{ status }'),
  'components/applications/ApplyButton.jsx': stub('ApplyButton', '{ jobId, onApplied }'),
  'components/recruiter/RecruiterSidebar.jsx': stub('RecruiterSidebar'),
  'components/recruiter/RecruiterStats.jsx': stub('RecruiterStats', '{ stats }'),
  'components/recruiter/CandidateTable.jsx': stub('CandidateTable', '{ candidates = [] }'),
  'components/recruiter/JobManagement.jsx': stub('JobManagement', '{ jobs = [] }'),
  'components/admin/AdminSidebar.jsx': stub('AdminSidebar'),
  'components/admin/UserTable.jsx': stub('UserTable', '{ users = [] }'),
  'components/admin/AnalyticsCard.jsx': stub('AnalyticsCard', '{ title, value }'),
  'components/admin/PlatformStats.jsx': stub('PlatformStats', '{ stats }'),
  'pages/auth/Login.jsx': stub('LoginPage'),
  'pages/auth/Register.jsx': stub('RegisterPage'),
  'pages/candidate/Home.jsx': stub('CandidateHome'),
  'pages/candidate/Jobs.jsx': stub('JobsPage'),
  'pages/candidate/JobDetailsPage.jsx': stub('JobDetailsPage'),
  'pages/candidate/AppliedJobs.jsx': stub('AppliedJobs'),
  'pages/candidate/Profile.jsx': stub('CandidateProfile'),
  'pages/candidate/Notifications.jsx': stub('Notifications'),
  'pages/recruiter/RecruiterDashboard.jsx': stub('RecruiterDashboard'),
  'pages/recruiter/CreateJob.jsx': stub('CreateJob'),
  'pages/recruiter/ManageJobs.jsx': stub('ManageJobs'),
  'pages/recruiter/Applicants.jsx': stub('Applicants'),
  'pages/recruiter/RecruiterProfile.jsx': stub('RecruiterProfile'),
  'pages/admin/AdminDashboard.jsx': stub('AdminDashboard'),
  'pages/admin/ManageUsers.jsx': stub('ManageUsers'),
  'pages/admin/ManageJobs.jsx': stub('AdminManageJobs'),
  'pages/admin/Reports.jsx': stub('Reports'),
  'pages/Landing.jsx': stub('Landing'),
  'pages/Unauthorized.jsx': stub('Unauthorized'),
  'pages/NotFound.jsx': stub('NotFound'),
}

for (const [file, content] of Object.entries(files)) {
  const full = path.join(root, file)
  fs.mkdirSync(path.dirname(full), { recursive: true })
  if (!fs.existsSync(full)) {
    fs.writeFileSync(full, content.replace(/<\/?motion/g, (m) => m.replace('motion', 'div')))
  }
}

console.log('Scaffold complete')
