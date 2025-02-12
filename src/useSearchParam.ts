import { useState, useEffect, useCallback } from 'react'

const useSearchParam = (param: string): string | null => {
  const getValue = useCallback(
    () => new URLSearchParams(window.location.search).get(param),
    [param]
  )

  const [value, setValue] = useState(getValue)

  useEffect(() => {
    const onChange = () => setValue(getValue())

    const { abort, signal } = new AbortController()

    window.addEventListener('popstate', onChange, { signal })
    window.addEventListener('pushstate', onChange, { signal })
    window.addEventListener('replacestate', onChange, { signal })

    return () => {
      abort()
    }
  }, [getValue])

  return value
}

export default useSearchParam
