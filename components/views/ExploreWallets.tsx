import { Container, Flex, Stack, Text } from '@chakra-ui/react'
import GetWalletList from '../GetWalletList'
import { Wallet } from '../../data/wallets'

interface ExploreWalletsProps {
  onGetWallet: (wallet: Wallet) => void
}

export default function ExploreWallets({ onGetWallet }: ExploreWalletsProps) {
  return (
    <Stack spacing={0} flexGrow={1} overflow="hidden">
      <Stack spacing={8} px={8} pb={6} flexGrow={1} overflow="scroll">
        <GetWalletList onGetWallet={onGetWallet} />
      </Stack>
      <Stack
        px={4}
        py={6}
        maxW="xs"
        spacing={2}
        justifyContent="center"
        mx="auto"
        textAlign="center"
      >
        <Text textStyle="Body 1 (Bold)">Not what you're looking for?</Text>
        <Text textStyle="Body 2" color="gray.500">
          Select a wallet on the left to get started with a different wallet
          provider.
        </Text>
      </Stack>
    </Stack>
  )
}
