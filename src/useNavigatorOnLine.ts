import { useEffect, useState } from 'react'

function getOnLineStatus(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true
}

const useNavigatorOnLine: () => boolean = () => {
  const [status, setStatus] = useState<boolean>(getOnLineStatus())

  const setOnline = () => setStatus(true)
  const setOffline = () => setStatus(false)

  useEffect(() => {
    const { signal, abort } = new AbortController()

    window.addEventListener('online', setOnline, { signal })
    window.addEventListener('offline', setOffline, { signal })

    return () => {
      abort()
    }
  }, [])

  return status
}

export default useNavigatorOnLine
