import { useEffect, useState } from 'react'

const useFetch = ({
  url,
  options,
}: {
  url: string
  options?: ResponseInit
}): {
  response: any
  error: Error | unknown
  isLoading: boolean
  abort: VoidFunction
} => {
  const [response, setResponse] = useState<unknown>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | unknown>(null)
  const [abort, setAbort] = useState<VoidFunction>(() => {})

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const abortController = new AbortController()
        const { signal } = abortController
        setAbort(abortController.abort)
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
  }, [options, url])

  return { response, error, isLoading, abort }
}

export default useFetch
