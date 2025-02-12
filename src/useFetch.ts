import { useEffect, useState } from 'react'

type UseFetchResult = {
  response: any
  error: Error | unknown
  isLoading: boolean
  abort: VoidFunction
}

type UseFetchProps = {
  url: string
  options?: ResponseInit
}

const useFetch = (props: UseFetchProps): UseFetchResult => {
  const { url, options } = props
  const [response, setResponse] = useState<unknown>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | unknown>(null)
  const [abort, setAbort] = useState<(reason?: any) => void>(() => { })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const controller = new AbortController()
        const { signal } = controller
        setAbort(() => () => controller.abort())
        const res = await fetch(url, { ...options, signal })
        const json = await res.json()
        setResponse(json)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
    return () => {
      abort()
      setResponse(null)
      setError(null)
      setIsLoading(false)
    }
  }, [options, url])

  return { response, error, isLoading, abort }
}

export default useFetch
