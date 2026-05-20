import JobCard from './JobCard'

export default function JobList({ jobs = [] }) {
  return (
    <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {jobs.map((job) => (
        <li key={job.id}>
          <JobCard job={job} />
        </li>
      ))}
    </ul>
  )
}
