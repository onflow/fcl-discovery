import { Button, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import { Wallet } from '../../data/wallets'
import { useEffect, useRef, useState } from 'react'
import { FCL_SERVICE_METHODS } from '../../helpers/constants'
import { useRpc } from '../../contexts/FclContext'
import { FclRequest } from '../../helpers/rpc'
import WalletIcon from '../Icons/WalletIcon'
import { useWalletHistory } from '../../hooks/useWalletHistory'
import { handleCancel } from '../../helpers/window'

type ConnectExtensionProps = {
  wallet: Wallet
}

export default function ConnectExtension({ wallet }: ConnectExtensionProps) {
  const rpc = useRpc()
  const [isConnecting, setIsConnecting] = useState(false)
  const hasAttemptedConnection = useRef(true)
  const showSpinner = !rpc || isConnecting
  const { setLastUsed } = useWalletHistory()

  function connect() {
    setIsConnecting(true)
    wallet.services.forEach(service => {
      if (service.method === FCL_SERVICE_METHODS.EXT) {
        rpc
          .request(FclRequest.EXEC_SERVICE, { service })
          .then(() => {
            console.log('Connected to extension')
            setLastUsed(wallet)
            handleCancel()
          })
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
    if (!hasAttemptedConnection.current) {
      return
    }
    if (!rpc) {
      return
    }
    connect()
    hasAttemptedConnection.current = false
  }, [wallet, rpc])

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
      {showSpinner && <Spinner size="lg" thickness="4px" speed="0.65s" />}
      {!showSpinner && (
        <Button variant="primary" size="sm" onClick={() => connect()}>
          Retry
        </Button>
      )}
    </Stack>
  )
}
