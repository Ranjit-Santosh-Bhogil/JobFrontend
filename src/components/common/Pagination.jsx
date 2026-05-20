export default function Pagination({ page = 0, totalPages = 0, onPageChange, disabled = false }) {
  if (totalPages <= 1) return null
  const pages = Array.from({ length: totalPages }, (_, i) => i)
  return (
    <nav className="flex items-center justify-center gap-2 py-4" aria-label="Pagination">
      <button type="button" disabled={disabled || page === 0} onClick={() => onPageChange(page - 1)} className="rounded border px-3 py-1 text-sm disabled:opacity-50">Prev</button>
      {pages.map((p) => (
        <button key={p} type="button" disabled={disabled} onClick={() => onPageChange(p)} className={`rounded px-3 py-1 text-sm ${p === page ? 'bg-indigo-600 text-white' : 'border text-slate-600'}`}>{p + 1}</button>
      ))}
      <button type="button" disabled={disabled || page >= totalPages - 1} onClick={() => onPageChange(page + 1)} className="rounded border px-3 py-1 text-sm disabled:opacity-50">Next</button>
    </nav>
  )
}