export default function AnalyticsCard({ title, value }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-500">{title}</h2>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
    </section>
  )
}
