import { Spinner, Stack, Text } from '@chakra-ui/react'
import { Wallet } from '../../data/wallets'
import { useEffect } from 'react'
import { Service } from '../../types'
import { FCL_SERVICE_METHODS, FclRpcMethod } from '../../helpers/constants'
import { useRpc } from '../../contexts/ConfigContext'

type ConnectExtensionProps = {
  wallet: Wallet
}

export default function ConnectExtension({ wallet }: ConnectExtensionProps) {
  const rpc = useRpc()
  function execParallelService(service: Service) {
    rpc.request(FclRpcMethod.EXEC_SERVICE, { service })
  }

  useEffect(() => {
    wallet.services.forEach(service => {
      if (service.method === FCL_SERVICE_METHODS.EXT) {
        execParallelService(service)
      }
    })
  }, [wallet])

  return (
    <Stack px={5} pb={5} alignItems="center" justifyContent="center">
      <Text textStyle="body2">Connecting to {wallet.name} extension...</Text>
      <Spinner size="xl" />
    </Stack>
  )
}
