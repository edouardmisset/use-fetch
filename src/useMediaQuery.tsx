import { useCallback, useEffect, useState } from 'react'

export const useMediaQuery = (query: string): boolean => {
  const getMatches = useCallback(
    (query: string): boolean =>
      // Prevents SSR issues
      typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
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
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange)
    } else {
      matchMedia.addEventListener('change', handleChange)
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange)
      } else {
        matchMedia.removeEventListener('change', handleChange)
      }
    }
  }, [handleChange, query])

  return matches
}
