import { useEffect, useState } from "react";

const useFetch: (url: string, options: any) => ({ response: any, error: any }) = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError]: [Error | null, any] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [options, url]);

  return { response, error };
};

export default useFetch;
