import { useCallback, useEffect, useState } from 'react'
import { applicationApi } from '@/api/applicationApi'
import ApplicationTable from '@/components/applications/ApplicationTable'
import EmptyState from '@/components/common/EmptyState'
import Loader from '@/components/common/Loader'
import PageHeader from '@/components/common/PageHeader'
import Pagination from '@/components/common/Pagination'
import { usePagination } from '@/hooks/usePagination'

export default function AppliedJobs() {
  const [applications, setApplications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const { page, totalPages, paginationParams, setPage, updateFromResponse } = usePagination()

  const fetchApplications = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const { data } = await applicationApi.getMyApplications(paginationParams)
      setApplications(data.content ?? data ?? [])
      updateFromResponse(data)
    } catch (err) {
      setError(err.message || 'Failed to load applications.')
      setApplications([])
    } finally {
      setIsLoading(false)
    }
  }, [paginationParams, updateFromResponse])

  useEffect(() => {
    fetchApplications()
  }, [fetchApplications])

  return (
    <>
      <PageHeader title="Applied Jobs" subtitle="Follow the progress of each application" />
      {isLoading && <Loader />}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!isLoading && !error && applications.length === 0 && (
        <EmptyState title="No applications yet" message="Apply to jobs and they will appear here." />
      )}
      {!isLoading && !error && applications.length > 0 && <ApplicationTable applications={applications} />}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} disabled={isLoading} />
    </>
  )
}
