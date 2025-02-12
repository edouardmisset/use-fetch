import { useEffect, useState } from 'react'

export const useOnline = (): boolean => {
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const setOffline = () => setIsOnline(false)
    const setOnline = () => setIsOnline(true)

    window.addEventListener('offline', setOffline, { signal })
    window.addEventListener('online', setOnline, { signal })

    return () => {
      controller.abort()
    }
  }, [])

  return isOnline
}
