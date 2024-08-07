import { Box, Stack, Text } from '@chakra-ui/react'
import { Wallet } from '../../data/wallets'
import { useConfig } from '../../contexts/ConfigContext'
import QRCode from '../QRCode'

interface ScanConnectProps {
  wallet: Wallet
}

export default function ScanConnect({ wallet }: ScanConnectProps) {
  const { walletConnectUri } = useConfig()
  return (
    <Stack flexGrow={1} alignItems="center" spacing={8} padding={4}>
      <Text color="gray" fontWeight="bold" maxW="2xs" textAlign="center">
        Scan in the {wallet.name} app to connect
      </Text>

      <Box
        padding={4}
        bg="white"
        borderRadius="xl"
        shadow="md"
        border="1px"
        borderColor="gray.200"
      >
        <QRCode value={walletConnectUri} size="300px" />
      </Box>
    </Stack>
  )
}
