import { useEffect, useState } from 'react'
import { adminApi } from '@/api/adminApi'
import Loader from '@/components/common/Loader'
import PageHeader from '@/components/common/PageHeader'

export default function Reports() {
  const [reports, setReports] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchReports() {
      try {
        const { data } = await adminApi.getReports()
        setReports(data)
      } catch (err) {
        setError(err.message || 'Failed to load reports.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchReports()
  }, [])

  const entries = Object.entries(reports ?? {})

  return (
    <>
      <PageHeader title="Reports" subtitle="Backend-generated platform summaries" />
      {isLoading && <Loader />}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!isLoading && !error && (
        <div className="grid gap-4 md:grid-cols-2">
          {entries.map(([key, value]) => (
            <article key={key} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold capitalize text-slate-500">{key.replaceAll(/([A-Z])/g, ' $1')}</h2>
              {typeof value === 'object' && value !== null ? (
                <pre className="mt-3 overflow-auto rounded-lg bg-slate-50 p-3 text-xs text-slate-700">{JSON.stringify(value, null, 2)}</pre>
              ) : (
                <p className="mt-2 text-2xl font-bold text-slate-900">{String(value)}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </>
  )
}
