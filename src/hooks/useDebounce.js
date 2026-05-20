import { useEffect, useState } from 'react'
import { DEBOUNCE_MS } from '@/utils/constants'

export function useDebounce(value, delay = DEBOUNCE_MS) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
