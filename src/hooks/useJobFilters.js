import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { buildQueryParams } from '@/utils/buildQueryParams'

const DEFAULT_FILTERS = {
  q: '',
  location: '',
  jobType: '',
  minSalary: '',
  sort: 'createdAt,desc',
}

export function useJobFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo(() => {
    const next = { ...DEFAULT_FILTERS }
    Object.keys(DEFAULT_FILTERS).forEach((key) => {
      const value = searchParams.get(key)
      if (value !== null) next[key] = value
    })
    return next
  }, [searchParams])

  const setFilter = useCallback(
    (key, value) => {
      const next = new URLSearchParams(searchParams)
      if (value === '' || value === null || value === undefined) {
        next.delete(key)
      } else {
        next.set(key, String(value))
      }
      next.delete('page')
      setSearchParams(next)
    },
    [searchParams, setSearchParams],
  )

  const setFilters = useCallback(
    (partial) => {
      const next = new URLSearchParams(searchParams)
      Object.entries(partial).forEach(([key, value]) => {
        if (value === '' || value === null || value === undefined) {
          next.delete(key)
        } else {
          next.set(key, String(value))
        }
      })
      next.delete('page')
      setSearchParams(next)
    },
    [searchParams, setSearchParams],
  )

  const clearFilters = useCallback(() => {
    setSearchParams({})
  }, [setSearchParams])

  const queryParams = useMemo(() => buildQueryParams(filters), [filters])

  return { filters, setFilter, setFilters, clearFilters, queryParams }
}
