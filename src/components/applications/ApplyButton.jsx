import { useState } from 'react'
import { applicationApi } from '@/api/applicationApi'

export default function ApplyButton({ jobId, onApplied }) {
  const [coverLetter, setCoverLetter] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleApply = async (event) => {
    event.preventDefault()
    if (!jobId) return

    setIsSubmitting(true)
    setError('')
    setMessage('')
    try {
      const payload = coverLetter.trim() ? { coverLetter: coverLetter.trim() } : {}
      const { data } = await applicationApi.apply(jobId, payload)
      setMessage('Application submitted successfully.')
      setCoverLetter('')
      onApplied?.(data)
    } catch (err) {
      setError(err.message || 'Unable to apply for this job.')
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
        disabled={isSubmitting}
        className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Applying...' : 'Apply now'}
      </button>
    </form>
  )
}
