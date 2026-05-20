import { formatDate } from '@/utils/formatDate'

export default function JobDetails({ job }) {
  if (!job) return null

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">{job.title}</h2>
      <p className="mt-1 text-sm text-slate-500">{job.companyName ?? job.company} - {job.location || 'Remote'}</p>
      <p className="mt-1 text-xs text-slate-400">Posted {formatDate(job.postedAt ?? job.createdAt)}</p>
      <p className="mt-5 whitespace-pre-line text-sm leading-6 text-slate-700">{job.description}</p>
    </section>
  )
}
