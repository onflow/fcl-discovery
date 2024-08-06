import { Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import { Wallet } from '../../data/wallets'
import { useEffect } from 'react'
import { Service } from '../../types'
import { FCL_SERVICE_METHODS, FclRpcMethod } from '../../helpers/constants'
import { useRpc } from '../../contexts/ConfigContext'
import Image from 'next/image'
import WalletIcon from '../Icons/WalletIcon'

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
    <Stack
      px={5}
      pb={5}
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
      spacing={4}
      textAlign="center"
    >
      <WalletIcon wallet={wallet} boxSize="3rem" borderRadius="0.75rem" />
      <Stack>
        <Heading size="md">Opening {wallet.name}...</Heading>
        <Text textStyle="body2">Confirm connection in the extension</Text>
      </Stack>
      <Spinner size="lg" thickness="4px" speed="0.65s" />
    </Stack>
  )
}
