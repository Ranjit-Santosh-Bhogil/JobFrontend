import { useCallback, useEffect, useState } from 'react'
import { jobApi } from '@/api/jobApi'
import EmptyState from '@/components/common/EmptyState'
import Loader from '@/components/common/Loader'
import PageHeader from '@/components/common/PageHeader'
import Pagination from '@/components/common/Pagination'
import JobManagement from '@/components/recruiter/JobManagement'
import { usePagination } from '@/hooks/usePagination'

export default function AdminManageJobs() {
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [error, setError] = useState('')
  const { page, totalPages, paginationParams, setPage, updateFromResponse } = usePagination()

  const fetchJobs = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const { data } = await jobApi.getJobs(paginationParams)
      setJobs(data.content ?? data ?? [])
      updateFromResponse(data)
    } catch (err) {
      setError(err.message || 'Failed to load jobs.')
      setJobs([])
    } finally {
      setIsLoading(false)
    }
  }, [paginationParams, updateFromResponse])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  const handleDelete = async (jobId) => {
    setDeletingId(jobId)
    try {
      await jobApi.deleteJob(jobId)
      fetchJobs()
    } catch (err) {
      setError(err.message || 'Failed to delete job.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <>
      <PageHeader title="All Jobs" subtitle="Review and remove listings across the platform" />
      {isLoading && <Loader />}
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {!isLoading && jobs.length === 0 && <EmptyState title="No jobs found" message="Jobs posted by recruiters will appear here." />}
      {!isLoading && jobs.length > 0 && <JobManagement jobs={jobs} onDelete={handleDelete} deletingId={deletingId} />}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} disabled={isLoading} />
    </>
  )
}
