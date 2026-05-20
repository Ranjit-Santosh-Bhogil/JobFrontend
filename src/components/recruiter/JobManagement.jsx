import { formatDate } from '@/utils/formatDate'

export default function JobManagement({ jobs = [], onEdit, onDelete, deletingId }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Role</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Location</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Salary</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Posted</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">State</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-slate-50">
                <td className="px-4 py-4">
                  <div className="font-medium text-slate-900">{job.title}</div>
                  <div className="text-xs text-slate-500">{job.companyName ?? job.company}</div>
                </td>
                <td className="px-4 py-4 text-sm text-slate-600">{job.location || 'Remote'}</td>
                <td className="px-4 py-4 text-sm text-slate-600">{formatSalary(job)}</td>
                <td className="px-4 py-4 text-sm text-slate-600">{formatDate(job.createdAt ?? job.postedAt)}</td>
                <td className="px-4 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${job.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                    {job.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <button type="button" onClick={() => onEdit?.(job)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
                    Edit
                  </button>
                  {onDelete && (
                    <button
                      type="button"
                      onClick={() => onDelete(job.id)}
                      disabled={deletingId === job.id}
                      className="ml-2 rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
                    >
                      {deletingId === job.id ? 'Deleting...' : 'Delete'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function formatSalary(job) {
  if (!job.minSalary && !job.maxSalary) return 'Not listed'
  if (job.minSalary && job.maxSalary) return `${job.minSalary} - ${job.maxSalary}`
  return job.minSalary ? `From ${job.minSalary}` : `Up to ${job.maxSalary}`
}
