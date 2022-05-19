import { useEffect, useState } from 'react'

const useFetch: (
  url: string,
  options: RequestInit,
) => { response: Response | null; error: Error | unknown } = (url, options) => {
  const [response, setResponse] = useState<Response | null>(null)
  const [error, setError] = useState<Error | unknown>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options)
        const json = await res.json()
        setResponse(json)
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, [options, url])

  return { response, error }
}

export default useFetch
