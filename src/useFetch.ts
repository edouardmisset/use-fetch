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
  const [abort, setAbort] = useState<VoidFunction>(() => () => {})

  useEffect(() => {
    const controller = new AbortController()
    // Save the abort function with proper context binding.
    setAbort(() => () => controller.abort())

    const fetchData = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(url, { ...options, signal: controller.signal })
        const json = await res.json()
        setResponse(json)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    // Cleanup: abort fetch and reset state
    return () => {
      controller.abort()
      setResponse(null)
      setError(null)
      setIsLoading(false)
    }
  }, [url, options])

  return { response, error, isLoading, abort }
}

export default useFetch
