import { Link } from 'react-router-dom'
import StatusBadge from '@/components/applications/StatusBadge'
import { ROUTES } from '@/config/routes'
import { formatDate } from '@/utils/formatDate'

export default function ApplicationTable({ applications = [], onStatusChange, updatingId }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Job</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Candidate</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Applied</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
              {onStatusChange && <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Update</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {applications.map((application) => (
              <tr key={application.id} className="hover:bg-slate-50">
                <td className="px-4 py-4">
                  <Link to={ROUTES.CANDIDATE.JOB_DETAILS(application.jobId)} className="font-medium text-slate-900 hover:text-indigo-600">
                    {application.jobTitle}
                  </Link>
                  {application.coverLetter && <p className="mt-1 max-w-md text-xs text-slate-500">{application.coverLetter}</p>}
                </td>
                <td className="px-4 py-4 text-sm text-slate-600">
                  <div className="font-medium text-slate-800">{application.candidateName ?? 'Candidate'}</div>
                  <div className="text-xs text-slate-500">{application.candidateEmail}</div>
                </td>
                <td className="px-4 py-4 text-sm text-slate-600">{formatDate(application.appliedAt)}</td>
                <td className="px-4 py-4"><StatusBadge status={application.status} /></td>
                {onStatusChange && (
                  <td className="px-4 py-4">
                    <select
                      value={application.status}
                      disabled={updatingId === application.id}
                      onChange={(event) => onStatusChange(application.id, event.target.value)}
                      className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    >
                      {['PENDING', 'REVIEWING', 'SHORTLISTED', 'REJECTED', 'HIRED'].map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
