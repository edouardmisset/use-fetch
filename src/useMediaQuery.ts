import { useCallback, useEffect, useState } from 'react'

export const useMediaQuery = (query: string): boolean => {
  const getMatches = useCallback(
    (query: string): boolean =>
      // Prevents SSR issues
      globalThis.window === undefined ? false : window.matchMedia(query).matches,
    [],
  )

  const [matches, setMatches] = useState<boolean>(getMatches(query))

  const handleChange = useCallback(
    () => setMatches(getMatches(query)),
    [getMatches, query],
  )

  useEffect(() => {
    const matchMedia = window.matchMedia(query)

    // Triggered at the first client-side load and if query changes
    handleChange()

    // Listen matchMedia
    matchMedia.addEventListener('change', handleChange)

    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
  }, [handleChange, query])

  return matches
}
