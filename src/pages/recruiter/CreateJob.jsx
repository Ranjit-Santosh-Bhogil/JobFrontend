import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jobApi } from '@/api/jobApi'
import PageHeader from '@/components/common/PageHeader'
import JobForm from '@/components/jobs/JobForm'
import { ROUTES } from '@/config/routes'

export default function CreateJob() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (payload) => {
    setIsSubmitting(true)
    setError('')
    try {
      await jobApi.createJob(payload)
      navigate(ROUTES.RECRUITER.MANAGE_JOBS)
    } catch (err) {
      setError(err.message || 'Failed to create job.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <PageHeader title="Post a Job" subtitle="Publish a role for candidates to discover" />
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      <JobForm onSubmit={handleSubmit} submitLabel="Publish job" isSubmitting={isSubmitting} />
    </>
  )
}
