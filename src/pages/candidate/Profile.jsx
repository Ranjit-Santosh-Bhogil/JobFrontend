import { useEffect, useState } from 'react'
import { userApi } from '@/api/userApi'
import Loader from '@/components/common/Loader'
import PageHeader from '@/components/common/PageHeader'

export default function CandidateProfile() {
  return <ProfileScreen title="Candidate Profile" subtitle="Keep your account details current" />
}

function ProfileScreen({ title, subtitle }) {
  const [profile, setProfile] = useState(null)
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchProfile() {
      setIsLoading(true)
      try {
        const { data } = await userApi.getProfile()
        setProfile(data)
        setName(data.name ?? '')
      } catch (err) {
        setError(err.message || 'Failed to load profile.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    setMessage('')
    setError('')
    try {
      const { data } = await userApi.updateProfile({ name })
      setProfile(data)
      setMessage('Profile updated.')
    } catch (err) {
      setError(err.message || 'Failed to update profile.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      {isLoading && <Loader />}
      {!isLoading && (
        <form onSubmit={handleSubmit} className="max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4">
            <label className="text-sm font-medium text-slate-700">
              Name
              <input value={name} onChange={(event) => setName(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Email
              <input value={profile?.email ?? ''} disabled className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500" />
            </label>
            <div>
              <span className="text-sm font-medium text-slate-700">Roles</span>
              <p className="mt-1 text-sm text-slate-600">{profile?.roles?.join(', ') || 'User'}</p>
            </div>
          </div>
          {message && <p className="mt-4 text-sm text-emerald-600">{message}</p>}
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          <button disabled={isSaving} className="mt-6 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
            {isSaving ? 'Saving...' : 'Save profile'}
          </button>
        </form>
      )}
    </>
  )
}
