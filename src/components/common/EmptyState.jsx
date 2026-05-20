export default function EmptyState({ title = "No data", message }) {
  return (
    <section className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
      {message && <p className="mt-2 text-sm text-slate-500">{message}</p>}
    </section>
  )
}
