import { useFetch } from '../hooks/useFetch'

export const Discovery = ({ network }) => {
  const requestUrl = `/api/services?=${network}`
  const { loading, data, error } = useFetch(requestUrl)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error Fetching Services</div>

  return (
    <div>{JSON.stringify(data)}</div>
  )
}