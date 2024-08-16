import { Stack, Text } from '@chakra-ui/react'
import { Wallet } from '../../data/wallets'
import GetWalletCard from '../GetWalletCard'
import { useWallets } from '../../hooks/useWallets'

interface ExploreWalletsProps {
  onGetWallet: (wallet: Wallet) => void
}

export default function ExploreWallets({ onGetWallet }: ExploreWalletsProps) {
  const { wallets } = useWallets()

  return (
    <Stack spacing={0} flexGrow={1} overflow="hidden">
      <Stack px={5} pb={5} overflow="scroll">
        <Stack spacing="1rem">
          {wallets.map(wallet => {
            return (
              <GetWalletCard
                key={wallet.uid}
                wallet={wallet}
                onGetWallet={() => onGetWallet(wallet)}
              />
            )
          })}
        </Stack>
      </Stack>
      <Stack
        px={5}
        py={6}
        maxW="xs"
        spacing={2}
        justifyContent="center"
        mx="auto"
        textAlign="center"
      >
        <Text textStyle="body1Bold">Not what you're looking for?</Text>
        <Text display={['inline', null, 'none']} textStyle="body2">
          Return to the main screen to select a different wallet provider
        </Text>
        <Text display={['none', null, 'inline']} textStyle="body2">
          Select a wallet on the left to get started with a different wallet
          provider.
        </Text>
      </Stack>
    </Stack>
  )
}
