import { useState, useEffect, useCallback } from 'react'

const useSearchParam: (param: string) => string | null = param => {
  const getValue = useCallback(
    () => new URLSearchParams(window.location.search).get(param),
    [param]
  )

  const [value, setValue] = useState(getValue)

  useEffect(() => {
    const onChange = () => {
      setValue(getValue())
    }

    window.addEventListener('popstate', onChange)
    window.addEventListener('pushstate', onChange)
    window.addEventListener('replacestate', onChange)

    return () => {
      window.removeEventListener('popstate', onChange)
      window.removeEventListener('pushstate', onChange)
      window.removeEventListener('replacestate', onChange)
    }
  }, [getValue])

  return value
}

export default useSearchParam
