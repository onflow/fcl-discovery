import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import { Wallet } from '../../data/wallets'
import { useConfig } from '../../contexts/ConfigContext'
import QRCode from '../QRCode'
import CopyButton from '../CopyButton'
import HybridButton from '../HybridButton'

interface ScanConnectProps {
  wallet: Wallet
  onGetWallet: () => void
}

export default function ScanConnect({ wallet, onGetWallet }: ScanConnectProps) {
  const {
    walletconnect: { uri },
  } = useConfig()

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
        <QRCode value={uri} size="20rem" image={wallet.icon} imageSize="5rem" />
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
