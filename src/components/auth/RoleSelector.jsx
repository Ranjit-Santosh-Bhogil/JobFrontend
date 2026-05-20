import { ROLES } from '@/config/roles'

const OPTIONS = [
  { value: ROLES.CANDIDATE, label: 'Candidate' },
  { value: ROLES.RECRUITER, label: 'Recruiter' },
]

export default function RoleSelector({ value, onChange, error }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-slate-700">I am a</legend>
      <div className="flex gap-4">
        {OPTIONS.map((option) => (
          <label key={option.value} className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="radio"
              name="role"
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="text-indigo-600 focus:ring-indigo-500"
            />
            {option.label}
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </fieldset>
  )
}
