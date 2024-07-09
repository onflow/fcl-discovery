import { Stack, Text } from '@chakra-ui/react'
import ViewLayout from '../layout/ViewLayout'

interface GetWalletProps {
  onBack?: () => void
  onCloseModal?: () => void
}

export default function GetWallet({ onBack, onCloseModal }: GetWalletProps) {
  return (
    <ViewLayout header={{ title: 'Get Wallet', onBack, onClose: onCloseModal }}>
      <Stack>
        <Text>Get Wallet</Text>
      </Stack>
    </ViewLayout>
  )
}
