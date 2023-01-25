import { useRouter } from 'next/router'
import { Discovery } from '../components/Discovery'
import { isValidPath, getNetworkFromPath } from '../helpers/paths'
import { useFCL } from '../hooks/useFCL'

const Router = () => {
  const router = useRouter()
  const { path, port } = router.query // path: ['authn'] ['testnet', 'authn'] ['canarynet', 'authn']
  const {
    hasInitialized,
    loading,
    appVersion,
    extensions,
    walletInclude,
    clientServices,
    supportedStrategies,
  } = useFCL()
  const isValid = isValidPath(path)
  const network = getNetworkFromPath(path)

  return (
    <div>
      {!path && <div />}
      {path && !isValid && <div>Page Not Found</div>}
      {path && isValid && hasInitialized && !loading && (
        <Discovery
          network={network}
          appVersion={appVersion}
          extensions={extensions}
          walletInclude={walletInclude}
          clientServices={clientServices}
          supportedStrategies={supportedStrategies}
          port={port}
        />
      )}
    </div>
  )
}

export default Router
