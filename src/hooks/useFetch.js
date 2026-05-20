import { useCallback, useEffect, useState } from 'react'

export function useFetch(fetchFn, dependencies = [], options = {}) {
  const { immediate = true } = options
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(immediate)

  const execute = useCallback(async (...args) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await fetchFn(...args)
      setData(result)
      return result
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [fetchFn])

  useEffect(() => {
    if (!immediate) return
    execute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return { data, error, isLoading, execute, setData }
}
