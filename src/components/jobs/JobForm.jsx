import { useEffect, useState } from 'react'

const EMPTY_JOB = {
  title: '',
  companyName: '',
  location: '',
  jobType: 'FULL_TIME',
  minSalary: '',
  maxSalary: '',
  description: '',
  active: true,
}

export default function JobForm({ initialValues, onSubmit, submitLabel = 'Save job', isSubmitting = false }) {
  const [values, setValues] = useState({ ...EMPTY_JOB, ...initialValues })

  useEffect(() => {
    setValues({ ...EMPTY_JOB, ...initialValues })
  }, [initialValues])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setValues((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit?.({
      ...values,
      minSalary: values.minSalary === '' ? null : Number(values.minSalary),
      maxSalary: values.maxSalary === '' ? null : Number(values.maxSalary),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Job title" name="title" value={values.title} onChange={handleChange} required />
        <Field label="Company" name="companyName" value={values.companyName} onChange={handleChange} />
        <Field label="Location" name="location" value={values.location} onChange={handleChange} placeholder="Remote, Bengaluru, Delhi" />
        <label className="text-sm font-medium text-slate-700">
          Type
          <select name="jobType" value={values.jobType} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2">
            {['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'REMOTE'].map((type) => (
              <option key={type} value={type}>{type.replace('_', ' ')}</option>
            ))}
          </select>
        </label>
        <Field label="Minimum salary" name="minSalary" type="number" value={values.minSalary ?? ''} onChange={handleChange} />
        <Field label="Maximum salary" name="maxSalary" type="number" value={values.maxSalary ?? ''} onChange={handleChange} />
      </div>

      <label className="mt-4 block text-sm font-medium text-slate-700">
        Description
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          required
          rows={8}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </label>

      <label className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-700">
        <input type="checkbox" name="active" checked={Boolean(values.active)} onChange={handleChange} className="h-4 w-4 rounded border-slate-300" />
        Active and visible to candidates
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}

function Field({ label, ...props }) {
  return (
    <label className="text-sm font-medium text-slate-700">
      {label}
      <input
        {...props}
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
    </label>
  )
}
