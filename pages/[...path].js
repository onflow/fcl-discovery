import { useRouter } from 'next/router'
import { useFetch } from '../hooks/useFetch'
import { PATHS } from '../helpers/constants'
import { createPathFromArray } from '../helpers/paths'

const Services = ({ network }) => {
  const requestUrl = `/api/services?=${network}`
  const { loading, data, error } = useFetch(requestUrl)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error Fetching Services</div>

  return (
    <div>{JSON.stringify(data)}</div>
  )
}

const Discovery = () => {
  const router = useRouter()
  const { path } = router.query // ['authn'] ['testnet', 'authn'] ['canarynet', 'authn']
  const pathStr = createPathFromArray(path)
  const isValidRoute = Object.values(PATHS).some(p => p === pathStr)
  const network = path && path.length === 2 ? path[0] : 'mainnet'

  if (!isValidRoute) return <div>Page Not Found</div>
  
  return <Services network={network} />
}

export default Discovery