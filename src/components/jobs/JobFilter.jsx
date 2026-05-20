import { JOB_TYPES } from '@/utils/constants'

export default function JobFilter({ filters, onChange }) {
  return (
    <section className="mt-4 grid gap-4 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-600">Location</label>
        <input
          value={filters.location}
          onChange={(e) => onChange('location', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          placeholder="City or remote"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-600">Job type</label>
        <select
          value={filters.jobType}
          onChange={(e) => onChange('jobType', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">All types</option>
          {Object.values(JOB_TYPES).map((type) => (
            <option key={type} value={type}>
              {type.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-600">Min salary</label>
        <input
          type="number"
          value={filters.minSalary}
          onChange={(e) => onChange('minSalary', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          placeholder="50000"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-600">Sort</label>
        <select
          value={filters.sort}
          onChange={(e) => onChange('sort', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="createdAt,desc">Newest</option>
          <option value="createdAt,asc">Oldest</option>
          <option value="title,asc">Title A-Z</option>
        </select>
      </div>
    </section>
  )
}
