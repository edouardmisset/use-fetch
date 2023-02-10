import { useEffect, useState } from 'react'

export const useOnline = (): boolean => {
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    const setOffline: VoidFunction = () => setIsOnline(false)
    const setOnline: VoidFunction = () => setIsOnline(true)

    window.addEventListener('offline', setOffline)
    window.addEventListener('online', setOnline)

    return () => {
      window.removeEventListener('offline', setOffline)
      window.removeEventListener('online', setOnline)
    }
  }, [])

  return isOnline
}
