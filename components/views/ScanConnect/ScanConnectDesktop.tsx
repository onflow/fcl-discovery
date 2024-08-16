import { Box, Flex, Spinner, Stack, Text } from '@chakra-ui/react'
import { Wallet } from '../../../data/wallets'
import QRCode from '../../QRCode'
import CopyButton from '../../CopyButton'
import HybridButton from '../../HybridButton'
import { useWcUri } from '../../../hooks/useWcUri'
import { useWalletHistory } from '../../../hooks/useWalletHistory'
import { handleCancel } from '../../../helpers/window'
import { ViewContainer } from '../../layout/ViewContainer'

interface ScanConnectDesktopProps {
  wallet: Wallet
  onGetWallet: () => void
}

export default function ScanConnectDesktop({
  wallet,
  onGetWallet,
}: ScanConnectDesktopProps) {
  const { setLastUsed } = useWalletHistory()
  const { uri, connecting, error, isLoading } = useWcUri(() => {
    setLastUsed(wallet)
    handleCancel()
  })

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
      justifyContent="space-evenly"
    >
      <Flex justifyContent="space-between" width="100%" alignItems="center">
        <Text textStyle="body2">Scan in the {wallet.name} app to connect</Text>
        <CopyButton text={uri} />
      </Flex>

      <Box padding={3} borderRadius="0.75rem" borderWidth="1px" bg="white">
        {uri && (
          <QRCode
            value={uri}
            size="20rem"
            image={wallet.icon}
            imageSize="5rem"
          />
        )}
        {!uri && isLoading && (
          <Flex boxSize="20rem" justifyContent="center" alignItems="center">
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
      </Box>

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
