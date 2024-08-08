import { Box, Flex, Spinner, Stack, Text } from '@chakra-ui/react'
import { Wallet } from '../../data/wallets'
import QRCode from '../QRCode'
import CopyButton from '../CopyButton'
import HybridButton from '../HybridButton'
import { useWcUri } from '../../hooks/useWcUri'

interface ScanConnectProps {
  wallet: Wallet
  onGetWallet: () => void
}

export default function ScanConnect({ wallet, onGetWallet }: ScanConnectProps) {
  const { uri, error, isLoading } = useWcUri()

  return (
    <Stack
      flexGrow={1}
      alignItems="center"
      spacing={2}
      px={5}
      pb={5}
      justifyContent="space-evenly"
    >
      <Flex justifyContent="space-between" width="100%" alignItems="center">
        <Text textStyle="body2">Scan in the {wallet.name} app to connect</Text>
        <CopyButton text={uri} />
      </Flex>

      <Box
        padding={3}
        borderRadius="0.75rem"
        border="1px"
        borderColor="gray.200"
      >
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
    </Stack>
  )
}
