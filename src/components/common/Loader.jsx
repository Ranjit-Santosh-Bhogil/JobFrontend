export default function Loader({ fullScreen = false, label = 'Loading...' }) {
  const wrapperClass = fullScreen
    ? 'flex min-h-screen items-center justify-center'
    : 'flex items-center justify-center py-12'

  return (
    <div className={wrapperClass} role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
        <span className="text-sm text-slate-600">{label}</span>
      </div>
    </div>
  )
}
