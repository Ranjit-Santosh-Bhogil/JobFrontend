const STATUS_STYLES = {
  PENDING: 'bg-amber-50 text-amber-700 ring-amber-200',
  REVIEWING: 'bg-sky-50 text-sky-700 ring-sky-200',
  SHORTLISTED: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  REJECTED: 'bg-rose-50 text-rose-700 ring-rose-200',
  HIRED: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
}

export default function StatusBadge({ status = 'PENDING' }) {
  const label = String(status).replaceAll('_', ' ').toLowerCase()

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ${
        STATUS_STYLES[status] ?? 'bg-slate-50 text-slate-700 ring-slate-200'
      }`}
    >
      {label}
    </span>
  )
}
