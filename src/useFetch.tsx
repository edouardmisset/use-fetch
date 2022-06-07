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
} => {
  const [response, setResponse] = useState<unknown>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | unknown>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(url, options)
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

  return { response, error, isLoading }
}

export default useFetch
