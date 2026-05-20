import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { jobApi } from '@/api/jobApi'
import EmptyState from '@/components/common/EmptyState'
import Loader from '@/components/common/Loader'
import Modal from '@/components/common/Modal'
import PageHeader from '@/components/common/PageHeader'
import Pagination from '@/components/common/Pagination'
import JobForm from '@/components/jobs/JobForm'
import JobManagement from '@/components/recruiter/JobManagement'
import { ROUTES } from '@/config/routes'
import { usePagination } from '@/hooks/usePagination'

export default function ManageJobs() {
  const [jobs, setJobs] = useState([])
  const [editingJob, setEditingJob] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [error, setError] = useState('')
  const { page, totalPages, paginationParams, setPage, updateFromResponse } = usePagination()

  const fetchJobs = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const { data } = await jobApi.getMyJobs(paginationParams)
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

  const handleUpdate = async (payload) => {
    if (!editingJob) return
    setIsSaving(true)
    try {
      await jobApi.updateJob(editingJob.id, payload)
      setEditingJob(null)
      fetchJobs()
    } catch (err) {
      setError(err.message || 'Failed to update job.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (jobId) => {
    setDeletingId(jobId)
    setError('')
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
      <PageHeader
        title="My Jobs"
        subtitle="Manage roles you have posted"
        actions={<Link to={ROUTES.RECRUITER.CREATE_JOB} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Post job</Link>}
      />
      {isLoading && <Loader />}
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {!isLoading && !error && jobs.length === 0 && <EmptyState title="No jobs posted" message="Create your first job to start receiving applicants." />}
      {!isLoading && jobs.length > 0 && (
        <JobManagement jobs={jobs} onEdit={setEditingJob} onDelete={handleDelete} deletingId={deletingId} />
      )}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} disabled={isLoading} />

      <Modal isOpen={Boolean(editingJob)} title="Edit job" onClose={() => setEditingJob(null)}>
        <JobForm initialValues={editingJob} onSubmit={handleUpdate} submitLabel="Update job" isSubmitting={isSaving} />
      </Modal>
    </>
  )
}
