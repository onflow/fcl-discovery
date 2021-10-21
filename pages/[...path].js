import { useRouter } from 'next/router'

const PATHS = {
  MAIN: '/authn',
  TESTNET: '/testnet/authn',
  CANARYNET: '/canarynet/authn'
}

const createPathFromArray = (arr = []) => `/${arr.join('/')}`

const Discovery = () => {
  const router = useRouter()
  const { path } = router.query
  const pathStr = createPathFromArray(path)
  const isValidRoute = Object.values(PATHS).some(p => p === pathStr)

  if (!isValidRoute) return <div>Page Not Found</div>

  return (
    <div>Discovery</div>
  )
}

export default Discovery