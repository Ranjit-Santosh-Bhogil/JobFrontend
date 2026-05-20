import { Link } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { formatRelative } from '@/utils/formatDate'

export default function JobCard({ job }) {
  if (!job) return null

  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md">
      <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
      <p className="mt-1 text-sm text-slate-500">{job.companyName ?? job.company}</p>
      <p className="mt-3 flex-1 text-sm text-slate-600 line-clamp-2">
        {job.description ?? 'No description provided.'}
      </p>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>{job.location ?? 'Remote'}</span>
        <span>{formatRelative(job.postedAt ?? job.createdAt)}</span>
      </div>
      <Link
        to={ROUTES.CANDIDATE.JOB_DETAILS(job.id)}
        className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:underline"
      >
        View details
      </Link>
    </article>
  )
}
