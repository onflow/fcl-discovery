import { Box, Button, Stack, Text } from '@chakra-ui/react'
import ViewLayout from '../ViewLayout'
import QRCode from 'react-qr-code'
import { Wallet } from '../../data/wallets'

interface ScanInstallProps {
  onBack: () => void
  onCloseModal: () => void
  onContinue: () => void
  wallet: Wallet
}

export default function ScanInstall({
  onBack,
  onCloseModal,
  onContinue,
  wallet,
}: ScanInstallProps) {
  return (
    <ViewLayout
      header={{
        title: `Install ${wallet.name}`,
        onBack,
        onClose: onCloseModal,
      }}
    >
      <Stack flexGrow={1} alignItems="center" spacing={8} padding={4}>
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
    </ViewLayout>
  )
}
