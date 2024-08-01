import { Box, Button, Heading, Stack } from '@chakra-ui/react'
import AboutCard from '../AboutCard'
import GalaxyImage from '../Icons/galaxy.jpeg'
import LockImage from '../Icons/lock.jpeg'
import HybridButton from '../HybridButton'

const LEARN_MORE_URL = 'https://developers.flow.com/ecosystem/wallets'

interface AboutWalletsProps {
  onGetWallet: () => void
}

export default function AboutWallets({ onGetWallet }: AboutWalletsProps) {
  return (
    <Stack
      align="center"
      spacing={8}
      overflow="auto"
      flexGrow={1}
      pb={8}
      px={5}
    >
      <Heading>What is a Wallet?</Heading>

      <Stack spacing={8} my="auto">
        <AboutCard
          title="Your Digital Assets Hub"
          description="Wallets serve as a hub for managing, storing, and showcasing digital assets such as FLOW and NFTs"
          image={GalaxyImage}
        />
        <AboutCard
          title="Login Made Easy with Wallets"
          description="Skip the hassle of crafting new accounts and passwords for each site; simply link your wallet for seamless access."
          image={LockImage}
        />
      </Stack>

      <Stack spacing={4}>
        <Button
          colorScheme="blue"
          borderRadius="full"
          size="sm"
          onClick={onGetWallet}
        >
          Get a Wallet
        </Button>
        <HybridButton
          href={LEARN_MORE_URL}
          variant="link"
          colorScheme="blue"
          size="sm"
        >
          Learn More
        </HybridButton>
      </Stack>
    </Stack>
  )
}
