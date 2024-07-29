import { Container, Stack, Text } from '@chakra-ui/react'
import ViewLayout from '../ViewLayout'
import GetWalletList from '../GetWalletList'
import { Wallet } from '../../data/wallets'

interface ExploreWalletsProps {
  onBack?: () => void
  onCloseModal?: () => void
  onGetWallet: (wallet: Wallet) => void
}

export default function ExploreWallets({
  onBack,
  onCloseModal,
  onGetWallet,
}: ExploreWalletsProps) {
  return (
    <ViewLayout
      header={{ title: 'Get a Wallet', onBack, onClose: onCloseModal }}
    >
      <Stack spacing={0} flexGrow={1} overflow="hidden">
        <Stack spacing={8} px={8} pb={6} flexGrow={1} overflow="scroll">
          <GetWalletList onGetWallet={onGetWallet} />
        </Stack>
        <Container textAlign="center" p={8} maxW="xs">
          <Text fontSize="md" fontWeight="bold" mb={1}>
            Not what you're looking for?
          </Text>
          <Text fontSize="sm" color="gray.500">
            Select a wallet on the left to get started with a different wallet
            provider.
          </Text>
        </Container>
      </Stack>
    </ViewLayout>
  )
}
