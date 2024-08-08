import { Button, Heading, Stack } from '@chakra-ui/react'
import AboutCard from '../AboutCard'
import GalaxyImage from '../Icons/galaxy.jpeg'
import LockImage from '../Icons/lock.jpeg'
import HybridButton from '../HybridButton'
import { useIsCollapsed } from '../../hooks/useIsCollapsed'

const LEARN_MORE_URL = 'https://developers.flow.com/ecosystem/wallets'

interface AboutWalletsProps {
  onGetWallet: () => void
}

export default function AboutWallets({ onGetWallet }: AboutWalletsProps) {
  const isCollapsed = useIsCollapsed()
  return (
    <Stack
      align="center"
      overflow="auto"
      flexGrow={1}
      pb={8}
      px={isCollapsed ? 7 : 5}
    >
      <Heading display={['none', null, 'block']}>What is a Wallet?</Heading>

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

      <Stack spacing={3}>
        <Button
          variant="primary"
          borderRadius="full"
          size="sm"
          onClick={onGetWallet}
        >
          Get a Wallet
        </Button>
        <HybridButton
          variant="ghost"
          size="sm"
          href={LEARN_MORE_URL}
          colorScheme="primary"
        >
          Learn More
        </HybridButton>
      </Stack>
    </Stack>
  )
}
