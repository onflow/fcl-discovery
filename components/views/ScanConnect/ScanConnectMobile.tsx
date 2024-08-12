import { Button, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import { Wallet } from '../../../data/wallets'
import HybridButton from '../../HybridButton'
import { useWcUri } from '../../../hooks/useWcUri'
import { useWalletHistory } from '../../../hooks/useWalletHistory'
import { handleCancel } from '../../../helpers/window'
import { getUserAgent } from '../../../helpers/platform'
import { useEffect } from 'react'
import { FCL_SERVICE_METHODS } from '../../../helpers/constants'
import WalletIcon from '../../Icons/WalletIcon'

interface ScanConnectProps {
  wallet: Wallet
  onGetWallet: () => void
}

export default function ScanConnect({ wallet, onGetWallet }: ScanConnectProps) {
  const { setLastUsed } = useWalletHistory()
  const { uri, connecting, error, isLoading } = useWcUri(() => {
    setLastUsed(wallet)
    handleCancel()
  })

  const service = wallet.services.find(
    service => service.method === FCL_SERVICE_METHODS.WC,
  )

  function openDeepLink() {
    const deeplink = new URL(service.uid)
    deeplink.searchParams.set('uri', uri)
    window.open(deeplink, '_blank')
  }

  useEffect(() => {
    if (!uri) return
    openDeepLink()
  }, [uri])

  if (connecting) {
    return (
      <Stack
        px={5}
        pb={5}
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
        textAlign="center"
      >
        <Spinner size="xl"></Spinner>
      </Stack>
    )
  }

  return (
    <Stack
      flexGrow={1}
      alignItems="center"
      spacing={2}
      px={5}
      pb={5}
      justifyContent="space-between"
    >
      {uri && (
        <Stack alignItems="center" spacing={6} my="auto">
          <WalletIcon wallet={wallet} boxSize="4rem" />
          <Stack spacing={2} alignItems="center">
            <Heading size="md">Opening {wallet.name}...</Heading>
            <Text textStyle="body2">Confirm in the mobile app</Text>
          </Stack>
          <Button variant="primary" size="sm" onClick={() => openDeepLink()}>
            Retry
          </Button>
        </Stack>
      )}
      {!uri && isLoading && (
        <Flex justifyContent="center" alignItems="center" flexGrow={1}>
          <Spinner size="xl" />
        </Flex>
      )}
      {error && (
        <Stack
          boxSize="20rem"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Text textStyle="body2" colorScheme="red">
            {`An error has occurred while generating the QR code. Please try again.`}
          </Text>
        </Stack>
      )}

      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <Text textStyle="body2">Don't have {wallet.name}?</Text>
        <HybridButton
          variant="secondary"
          size="sm"
          ml="auto"
          alignSelf="center"
          borderRadius="full"
          {...(!wallet.installLink
            ? { href: wallet.website }
            : {
                onClick: onGetWallet,
              })}
        >
          Get
        </HybridButton>
      </Flex>
    </Stack>
  )
}
