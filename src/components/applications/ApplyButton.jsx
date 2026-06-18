import { useEffect, useState } from 'react'
import { applicationApi } from '@/api/applicationApi'
import { ROLES } from '@/config/roles'
import { useAuth } from '@/hooks/useAuth'
import { hasRole } from '@/utils/roleUtils'

export default function ApplyButton({ jobId, onApplied }) {
  const { isAuthenticated, user } = useAuth()
  const [coverLetter, setCoverLetter] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const canApply = isAuthenticated && hasRole(user, ROLES.CANDIDATE)

  useEffect(() => {
    if (!canApply || !jobId) return

    let ignore = false
    applicationApi
      .getMyApplications({ size: 100 })
      .then(({ data }) => {
        if (ignore) return
        const applications = data.content ?? data ?? []
        const alreadyApplied = applications.some((item) => String(item.jobId) === String(jobId))
        if (alreadyApplied) setHasApplied(true)
      })
      .catch(() => {})

    return () => {
      ignore = true
    }
  }, [canApply, jobId])

  const handleApply = async (event) => {
    event.preventDefault()
    if (!jobId) return
    if (!canApply) {
      setMessage('')
      setError('Please sign in with a candidate account to apply for jobs.')
      return
    }

    setIsSubmitting(true)
    setError('')
    setMessage('')
    try {
      const payload = coverLetter.trim() ? { coverLetter: coverLetter.trim() } : {}
      const { data } = await applicationApi.apply(jobId, payload)
      setMessage('Application submitted successfully.')
      setCoverLetter('')
      setHasApplied(true)
      onApplied?.(data)
    } catch (err) {
      setError(getApplyErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleApply} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <label htmlFor="coverLetter" className="text-sm font-semibold text-slate-800">
        Cover letter
      </label>
      <textarea
        id="coverLetter"
        value={coverLetter}
        onChange={(event) => setCoverLetter(event.target.value)}
        rows={5}
        className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        placeholder="Add a short note for the recruiter"
      />
      {message && <p className="mt-3 text-sm text-emerald-600">{message}</p>}
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting || hasApplied || !canApply}
        className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {getButtonLabel({ isSubmitting, hasApplied, canApply })}
      </button>
    </form>
  )
}

function getButtonLabel({ isSubmitting, hasApplied, canApply }) {
  if (isSubmitting) return 'Applying...'
  if (hasApplied) return 'Applied'
  if (!canApply) return 'Candidate account required'
  return 'Apply now'
}

function getApplyErrorMessage(error) {
  if (error?.status === 403) {
    return 'Your current account cannot apply for jobs. Please log in as a candidate and try again.'
  }
  if (error?.status === 409) {
    return 'You have already applied for this job.'
  }
  return error?.message || 'Unable to apply for this job.'
}
