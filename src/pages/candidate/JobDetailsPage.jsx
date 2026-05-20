import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { jobApi } from '@/api/jobApi'
import ApplyButton from '@/components/applications/ApplyButton'
import EmptyState from '@/components/common/EmptyState'
import Loader from '@/components/common/Loader'
import PageHeader from '@/components/common/PageHeader'
import { ROUTES } from '@/config/routes'
import { formatDate } from '@/utils/formatDate'

export default function JobDetailsPage() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function fetchJob() {
      setIsLoading(true)
      setError('')
      try {
        const { data } = await jobApi.getJobById(id)
        if (!ignore) setJob(data)
      } catch (err) {
        if (!ignore) setError(err.message || 'Failed to load job.')
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    fetchJob()
    return () => {
      ignore = true
    }
  }, [id])

  if (isLoading) return <Loader />
  if (error) return <EmptyState title="Job not available" message={error} />
  if (!job) return <EmptyState title="Job not found" message="This opening could not be loaded." />

  return (
    <>
      <PageHeader
        title={job.title}
        subtitle={`${job.companyName ?? job.company ?? 'Company'} - ${job.location || 'Remote'}`}
        actions={
          <Link
            to={ROUTES.CANDIDATE.JOBS}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white"
          >
            Back to jobs
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-3 border-b border-slate-100 pb-5 text-sm text-slate-600 sm:grid-cols-3">
            <Info label="Type" value={job.jobType?.replace('_', ' ') || 'Not listed'} />
            <Info label="Salary" value={formatSalary(job)} />
            <Info label="Posted" value={formatDate(job.postedAt ?? job.createdAt)} />
          </div>
          <h2 className="mt-6 text-lg font-semibold text-slate-900">Job description</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">{job.description}</p>
        </article>

        <ApplyButton jobId={job.id} />
      </div>
    </>
  )
}

function Info({ label, value }) {
  return (
    <div>
      <span className="block text-xs font-semibold uppercase text-slate-400">{label}</span>
      {value}
    </div>
  )
}

function formatSalary(job) {
  if (!job.minSalary && !job.maxSalary) return 'Not listed'
  if (job.minSalary && job.maxSalary) return `${job.minSalary} - ${job.maxSalary}`
  return job.minSalary ? `From ${job.minSalary}` : `Up to ${job.maxSalary}`
}
