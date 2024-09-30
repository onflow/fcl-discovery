import { Button, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import { Wallet } from '../../../data/wallets'
import HybridButton from '../../HybridButton'
import { useWcUri } from '../../../hooks/useWcUri'
import { useWalletHistory } from '../../../hooks/useWalletHistory'
import { handleCancel } from '../../../helpers/window'
import { useEffect, useRef } from 'react'
import { FCL_SERVICE_METHODS } from '../../../helpers/constants'
import WalletIcon from '../../icons/WalletIcon'
import { ViewContainer } from '../../layout/ViewContainer'

interface ScanConnectMobileProps {
  wallet: Wallet
  onGetWallet: () => void
  noDeepLink?: boolean
}

export default function ScanConnectMobile({
  wallet,
  onGetWallet,
  noDeepLink,
}: ScanConnectMobileProps) {
  const { setLastUsed } = useWalletHistory()
  const { uri, connecting, error, isLoading } = useWcUri(() => {
    setLastUsed(wallet)
    handleCancel()
  })
  const shouldOpenLink = useRef(true)

  const service = wallet.services.find(
    service => service.method === FCL_SERVICE_METHODS.WC,
  )

  function openDeepLink() {
    const deeplink = new URL(service.uid)
    deeplink.searchParams.set('uri', uri)

    if (deeplink.toString().startsWith('http')) {
      // Workaround for https://github.com/rainbow-me/rainbowkit/issues/524.
      // Using 'window.open' causes issues on iOS in non-Safari browsers and
      // WebViews where a blank tab is left behind after connecting.
      // This is especially bad in some WebView scenarios (e.g. following a
      // link from Twitter) where the user doesn't have any mechanism for
      // closing the blank tab.
      // For whatever reason, links with a target of "_blank" don't suffer
      // from this problem, and programmatically clicking a detached link
      // element with the same attributes also avoids the issue.
      const link = document.createElement('a')
      link.href = deeplink.toString()
      link.target = '_blank'
      link.rel = 'noreferrer noopener'
      link.click()
    } else {
      window.location.href = deeplink.toString()
    }
  }

  useEffect(() => {
    if (!uri || !shouldOpenLink.current || noDeepLink) {
      return
    }
    openDeepLink()
    shouldOpenLink.current = false
  }, [uri])

  if (connecting) {
    return (
      <ViewContainer
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Spinner size="xl"></Spinner>
      </ViewContainer>
    )
  }

  return (
    <ViewContainer
      alignItems="center"
      spacing={2}
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
            {`An error has occurred while connecting to your mobile wallet. Please try again.`}
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
    </ViewContainer>
  )
}
