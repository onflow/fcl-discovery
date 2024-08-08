import { Box, Button, Stack, Text } from '@chakra-ui/react'
import { Wallet } from '../../data/wallets'
import QRCode from '../QRCode'

interface ScanInstallProps {
  onContinue: () => void
  wallet: Wallet
}

export default function ScanInstall({ onContinue, wallet }: ScanInstallProps) {
  return (
    <Stack
      flexGrow={1}
      flexShrink={1}
      alignItems="center"
      justifyContent="space-evenly"
      spacing="lg"
      px="lg"
      pb="lg"
    >
      <Text color="gray" fontWeight="bold" maxW="2xs" textAlign="center">
        Scan with your phone to install on iOS or Android
      </Text>

      <Box padding={3} borderRadius="0.75rem" borderWidth="1px">
        <QRCode value={wallet.installLink?.mobile} size="15rem" />
      </Box>

      <Button
        variant="primary"
        size="sm"
        onClick={onContinue}
        fontWeight="bold"
        borderRadius="full"
      >
        Connect to {wallet.name}
      </Button>
    </Stack>
  )
}
