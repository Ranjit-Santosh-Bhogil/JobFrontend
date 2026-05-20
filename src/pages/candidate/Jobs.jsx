import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { jobApi } from '@/api/jobApi'
import PageHeader from '@/components/common/PageHeader'
import SearchBar from '@/components/common/SearchBar'
import Pagination from '@/components/common/Pagination'
import Loader from '@/components/common/Loader'
import EmptyState from '@/components/common/EmptyState'
import JobFilter from '@/components/jobs/JobFilter'
import JobList from '@/components/jobs/JobList'
import { useDebounce } from '@/hooks/useDebounce'
import { useJobFilters } from '@/hooks/useJobFilters'
import { usePagination } from '@/hooks/usePagination'
import { buildQueryParams } from '@/utils/buildQueryParams'

export default function Jobs() {
  const { filters, setFilter } = useJobFilters()
  const [searchParams, setSearchParams] = useSearchParams()
  const debouncedQuery = useDebounce(filters.q)
  const { page, totalPages, setPage, resetPage, updateFromResponse, paginationParams } =
    usePagination()

  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchJobs = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const params = buildQueryParams({
        ...filters,
        q: debouncedQuery,
        ...paginationParams,
        page: Number(searchParams.get('page') ?? page),
      })
      const { data } = await jobApi.getJobs(params)
      setJobs(data.content ?? data ?? [])
      updateFromResponse(data)
    } catch (err) {
      setError(err.message || 'Failed to load jobs')
      setJobs([])
    } finally {
      setIsLoading(false)
    }
  }, [filters, debouncedQuery, paginationParams, page, searchParams, updateFromResponse])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  const handlePageChange = (nextPage) => {
    setPage(nextPage)
    const next = new URLSearchParams(searchParams)
    next.set('page', String(nextPage))
    setSearchParams(next)
  }

  const handleSearchChange = (value) => {
    resetPage()
    setFilter('q', value)
  }

  return (
    <>
      <PageHeader title="Browse Jobs" subtitle="Search and filter open positions" />

      <div className="mb-4">
        <SearchBar value={filters.q} onChange={handleSearchChange} placeholder="Search jobs..." />
      </div>

      <JobFilter filters={filters} onChange={setFilter} />

      {isLoading && <Loader />}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!isLoading && !error && jobs.length === 0 && (
        <EmptyState title="No jobs found" message="Try adjusting your filters." />
      )}
      {!isLoading && !error && jobs.length > 0 && <JobList jobs={jobs} />}

      <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} disabled={isLoading} />
    </>
  )
}
