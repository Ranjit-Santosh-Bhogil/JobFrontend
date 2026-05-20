import ApplicationTable from '@/components/applications/ApplicationTable'

export default function CandidateTable({ candidates = [], onStatusChange, updatingId }) {
  return (
    <ApplicationTable
      applications={candidates}
      onStatusChange={onStatusChange}
      updatingId={updatingId}
    />
  )
}
