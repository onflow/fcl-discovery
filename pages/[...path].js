import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useFetch } from '../hooks/useFetch'

const PATHS = {
  MAIN: '/authn',
  TESTNET: '/testnet/authn',
  CANARYNET: '/canarynet/authn'
}

const createPathFromArray = (arr = []) => `/${arr.join('/')}`

const Discovery = () => {
  const router = useRouter()
  const { path } = router.query // ['authn'] ['testnet', 'authn'] ['canarynet', 'authn']
  const pathStr = createPathFromArray(path)
  const isValidRoute = Object.values(PATHS).some(p => p === pathStr)
  const network = path && path.length === 2 ? path[0] : 'mainnet'
  const requestUrl = isValidRoute ? `/api/services?=${network}` : null

  const { loading, data, error } = useFetch(requestUrl)

  if (!isValidRoute) return <div>Page Not Found</div>
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error Fetching Services</div>
  
  return (
    <div>{JSON.stringify(data)}</div>
  )
}

export default Discovery