import { Box, Button, Flex, Spacer, Stack, Text } from '@chakra-ui/react'
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
      spacing="lg"
      px="lg"
      pb="lg"
    >
      <Text color="gray" fontWeight="bold" maxW="2xs" textAlign="center">
        Scan with your phone to install on iOS or Android
      </Text>

      <Flex
        padding="md"
        bg="white"
        borderRadius="xl"
        shadow="md"
        border="1px"
        borderColor="gray.200"
      >
        <QRCode value={wallet.installLink?.mobile} size="18.75rem" />
      </Flex>

      <Button
        variant="primary"
        size="sm"
        onClick={onContinue}
        fontWeight="bold"
        borderRadius="full"
        mt="auto"
      >
        Continue
      </Button>
    </Stack>
  )
}
