import { Box, Button, Stack, Text } from '@chakra-ui/react'
import { Wallet } from '../../../data/wallets'
import QRCode from '../../QRCode'

interface InstallAppDesktopProps {
  onContinue: () => void
  wallet: Wallet
}

export default function InstallAppDesktop({
  onContinue,
  wallet,
}: InstallAppDesktopProps) {
  return (
    <Stack
      flexGrow={1}
      alignItems="center"
      justifyContent="space-evenly"
      spacing="lg"
      px={5}
      pb={5}
    >
      <Text
        textStyle="body1Bold"
        maxW="2xs"
        textAlign="center"
        lineHeight={1.5}
        opacity={0.6}
      >
        Scan with your phone to install on iOS or Android
      </Text>

      <Box padding={3} borderRadius="0.75rem" borderWidth="1px">
        <QRCode value={wallet.installLink?.mobile} size="12.5rem" />
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
