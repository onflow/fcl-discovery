import { Button, Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import { Wallet } from '../../data/wallets'
import { useEffect, useRef, useState } from 'react'
import { Service } from '../../types'
import { FCL_SERVICE_METHODS, FclRpcMethod } from '../../helpers/constants'
import { useRpc } from '../../contexts/FclContext'
import WalletIcon from '../Icons/WalletIcon'

type ConnectExtensionProps = {
  wallet: Wallet
}

export default function ConnectExtension({ wallet }: ConnectExtensionProps) {
  const rpc = useRpc()
  const [isConnecting, setIsConnecting] = useState(false)
  const firstRender = useRef(true)

  function connect() {
    setIsConnecting(true)
    wallet.services.forEach(service => {
      if (service.method === FCL_SERVICE_METHODS.EXT) {
        rpc
          .request(FclRpcMethod.EXEC_SERVICE, { service })
          .catch(e => {
            console.error('Failed to connect to extension', e)
          })
          .finally(() => {
            setIsConnecting(false)
          })
      }
    })
  }

  useEffect(() => {
    if (!firstRender.current) {
      return
    }
    connect()
    firstRender.current = false
  }, [wallet, isConnecting, rpc])

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
      {isConnecting && <Spinner size="lg" thickness="4px" speed="0.65s" />}
      {!isConnecting && (
        <Button variant="primary" size="sm" onClick={() => connect()}>
          Retry
        </Button>
      )}
    </Stack>
  )
}
