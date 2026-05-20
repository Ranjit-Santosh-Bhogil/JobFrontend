import StatusBadge from '@/components/applications/StatusBadge'
import { formatDate } from '@/utils/formatDate'

export default function ApplicationCard({ application }) {
  if (!application) return null

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">{application.jobTitle}</h2>
          <p className="mt-1 text-sm text-slate-500">Applied {formatDate(application.appliedAt)}</p>
        </div>
        <StatusBadge status={application.status} />
      </div>
      {application.coverLetter && <p className="mt-4 text-sm text-slate-600">{application.coverLetter}</p>}
    </section>
  )
}
