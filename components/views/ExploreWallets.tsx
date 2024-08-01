import { Stack, Text } from '@chakra-ui/react'
import GetWalletList from '../GetWalletList'
import { Wallet } from '../../data/wallets'
import { useIsCollapsed } from '../../hooks/useIsCollapsed'

interface ExploreWalletsProps {
  onGetWallet: (wallet: Wallet) => void
}

export default function ExploreWallets({ onGetWallet }: ExploreWalletsProps) {
  return (
    <Stack spacing={0} flexGrow={1} overflow="hidden">
      <Stack px={5} pb={5} flexGrow={1} overflow="scroll">
        <GetWalletList onGetWallet={onGetWallet} />
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
        <Text textStyle="Body 1 (Bold)">Not what you're looking for?</Text>
        <Text display={['inline', null, 'none']} textStyle="Body 2">
          Return to the main screen to select a different wallet provider
        </Text>
        <Text display={['none', null, 'inline']} textStyle="Body 2">
          Select a wallet on the left to get started with a different wallet
          provider.
        </Text>
      </Stack>
    </Stack>
  )
}
