import { useRouter } from 'next/router'
import { Discovery } from '../components/Discovery'
import { isValidPath, getNetworkFromPath } from '../helpers/paths'
import { useFcl } from '../hooks/useFcl'
import { ConfigProvider } from '../contexts/ConfigContext'

const Router = () => {
  const router = useRouter()
  const { path, port } = router.query // path: ['authn'] ['testnet', 'authn'] ['canarynet', 'authn']
  const { config: fclConfig, error } = useFcl()
  const isValid = isValidPath(path)
  const network = getNetworkFromPath(path)

  return (
    <div>
      {!path && <div />}
      {path && !isValid && <div>Page Not Found</div>}
      {path && isValid && fclConfig && (
        <ConfigProvider
          config={{
            ...fclConfig,
            network,
            port: parseInt(port as string) || undefined,
          }}
        >
          <Discovery />
        </ConfigProvider>
      )}
      {path && isValid && error && <div>{error}</div>}
    </div>
  )
}

export default Router
