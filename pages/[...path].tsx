import { useRouter } from 'next/router'
import Discovery from '../components/Discovery'
import { isValidPath, getNetworkFromPath } from '../helpers/paths'
import { useFcl } from '../hooks/useFcl'
import { ConfigProvider } from '../contexts/ConfigContext'
import { Flex, Spinner, Text } from '@chakra-ui/react'

const Router = () => {
  const router = useRouter()
  const { path, port } = router.query // path: ['authn'] ['testnet', 'authn'] ['canarynet', 'authn']
  const { config: fclConfig, error, isLoading } = useFcl()
  const isValid = isValidPath(path)
  const network = getNetworkFromPath(path)

  if (!isValid) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Text>404 - Not Found</Text>
      </Flex>
    )
  }

  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner />
      </Flex>
    )
  }

  if (error) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Text>{error}</Text>
      </Flex>
    )
  }

  return (
    <ConfigProvider
      config={{
        ...fclConfig,
        network,
        port: parseInt(port as string) || undefined,
      }}
    >
      <Discovery />
    </ConfigProvider>
  )
}

export default Router
