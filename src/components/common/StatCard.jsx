export default function StatCard({ label, value, trend }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      {trend && <p className="mt-1 text-xs text-emerald-600">{trend}</p>}
    </article>
  )
}
