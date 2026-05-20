import { useCallback, useState, useMemo } from 'react'
import { PAGE_SIZE } from '@/utils/constants'

export function usePagination(initialSize = PAGE_SIZE) {
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(initialSize)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)

  const resetPage = useCallback(() => setPage(0), [])

  const updateFromResponse = useCallback((data) => {
    setTotalPages(data?.totalPages ?? 0)
    setTotalElements(data?.totalElements ?? 0)
    if (typeof data?.number === 'number') setPage(data.number)
    if (typeof data?.size === 'number') setSize(data.size)
  }, [])

  return {
    page,
    size,
    totalPages,
    totalElements,
    setPage,
    setSize,
    resetPage,
    updateFromResponse,
    paginationParams: useMemo(() => ({ page, size }), [page, size]),
  }
}
