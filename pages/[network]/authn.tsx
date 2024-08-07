import { useRouter } from 'next/router'
import Discovery from '../../components/Discovery'
import { useFcl } from '../../hooks/useFcl'
import { FclProvider } from '../../contexts/FclContext'
import { Flex, Spinner, Text } from '@chakra-ui/react'
import { NETWORKS } from '../../helpers/constants'
import { notFound } from 'next/navigation'

const Router = () => {
  const router = useRouter()
  const { network: rawNetwork, port } = router.query
  const { config: fclConfig, rpc: fclRpc, error, isLoading } = useFcl()

  // Default to mainnet if no network is provided (e.g. /authn rewriten to /mainnet/authn)
  const network = (rawNetwork as string | undefined) || NETWORKS.MAINNET
  const isValidNetwork = Object.values(NETWORKS).includes(network)

  if (!isValidNetwork) {
    return notFound()
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
    <FclProvider
      config={{
        ...fclConfig,
        network: network as string,
        port: parseInt(port as string) || undefined,
      }}
      rpc={fclRpc}
    >
      <Discovery />
    </FclProvider>
  )
}

export default Router
