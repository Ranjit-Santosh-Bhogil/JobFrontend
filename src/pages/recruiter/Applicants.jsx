import { useCallback, useEffect, useState } from 'react'
import { applicationApi } from '@/api/applicationApi'
import { jobApi } from '@/api/jobApi'
import EmptyState from '@/components/common/EmptyState'
import Loader from '@/components/common/Loader'
import PageHeader from '@/components/common/PageHeader'
import Pagination from '@/components/common/Pagination'
import CandidateTable from '@/components/recruiter/CandidateTable'
import { usePagination } from '@/hooks/usePagination'

export default function Applicants() {
  const [jobs, setJobs] = useState([])
  const [selectedJobId, setSelectedJobId] = useState('')
  const [applicants, setApplicants] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const [error, setError] = useState('')
  const { page, totalPages, paginationParams, setPage, resetPage, updateFromResponse } = usePagination()

  useEffect(() => {
    async function fetchJobs() {
      try {
        const { data } = await jobApi.getMyJobs({ size: 100 })
        const nextJobs = data.content ?? data ?? []
        setJobs(nextJobs)
        if (nextJobs[0]?.id) setSelectedJobId(String(nextJobs[0].id))
      } catch (err) {
        setError(err.message || 'Failed to load your jobs.')
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const fetchApplicants = useCallback(async () => {
    if (!selectedJobId) {
      setApplicants([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError('')
    try {
      const { data } = await applicationApi.getApplicantsByJob(selectedJobId, paginationParams)
      setApplicants(data.content ?? data ?? [])
      updateFromResponse(data)
    } catch (err) {
      setError(err.message || 'Failed to load applicants.')
      setApplicants([])
    } finally {
      setIsLoading(false)
    }
  }, [selectedJobId, paginationParams, updateFromResponse])

  useEffect(() => {
    fetchApplicants()
  }, [fetchApplicants])

  const handleJobChange = (event) => {
    setSelectedJobId(event.target.value)
    resetPage()
  }

  const handleStatusChange = async (applicationId, status) => {
    setUpdatingId(applicationId)
    setError('')
    try {
      const { data } = await applicationApi.updateStatus(applicationId, status)
      setApplicants((current) => current.map((item) => (item.id === applicationId ? data : item)))
    } catch (err) {
      setError(err.message || 'Failed to update status.')
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <>
      <PageHeader
        title="Applicants"
        subtitle="Review candidates by job"
        actions={
          <select
            value={selectedJobId}
            onChange={handleJobChange}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>{job.title}</option>
            ))}
          </select>
        }
      />
      {isLoading && <Loader />}
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {!isLoading && jobs.length === 0 && <EmptyState title="No jobs yet" message="Post a job before reviewing applicants." />}
      {!isLoading && jobs.length > 0 && applicants.length === 0 && <EmptyState title="No applicants" message="No candidates have applied to this job yet." />}
      {!isLoading && applicants.length > 0 && (
        <CandidateTable candidates={applicants} onStatusChange={handleStatusChange} updatingId={updatingId} />
      )}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} disabled={isLoading} />
    </>
  )
}
