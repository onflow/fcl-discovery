import { Box, Button, Stack, Text } from '@chakra-ui/react'
import { Wallet } from '../../data/wallets'
import QRCode from '../QRCode'

interface ScanInstallProps {
  onContinue: () => void
  wallet: Wallet
}

export default function ScanInstall({ onContinue, wallet }: ScanInstallProps) {
  return (
    <Stack flexGrow={1} flexShrink={1} alignItems="center">
      <Text color="gray" fontWeight="bold" maxW="2xs" textAlign="center">
        Scan with your phone to install on iOS or Android
      </Text>

      <Box
        padding={4}
        bg="white"
        borderRadius="xl"
        shadow="md"
        border="1px"
        borderColor="gray.200"
      >
        <QRCode level="M" value={wallet.installLink?.mobile} size={300} />
      </Box>

      <Button
        colorScheme="blue"
        size="sm"
        mt="auto"
        mb={4}
        onClick={onContinue}
        fontWeight="bold"
        borderRadius="full"
      >
        Continue
      </Button>
    </Stack>
  )
}
