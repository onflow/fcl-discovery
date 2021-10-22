import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!url) return
    fetch(url)
      .then(data => data.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError)
  }, [url])

  return {
    loading,
    data,
    error
  }
}