import { Button, Stack, Text } from '@chakra-ui/react'
import { Wallet } from '../../../data/wallets'
import WalletIcon from '../../icons/WalletIcon'
import HybridButton from '../../HybridButton'
import { useInstallLinks } from '../../../hooks/useInstallLinks'
import Link from 'next/link'

interface InstallAppMobileProps {
  onContinue: () => void
  wallet: Wallet
}

export default function InstallAppMobile({
  onContinue,
  wallet,
}: InstallAppMobileProps) {
  const installLink = useInstallLinks(wallet)['WC/RPC']

  return (
    <Stack
      flexGrow={1}
      flexShrink={1}
      alignItems="center"
      justifyContent="space-evenly"
      spacing="lg"
      px={7}
      pb={5}
    >
      <Text textStyle="body1Bold" textAlign="center" opacity={0.6} maxW="3xs">
        Please install the {wallet.name} app to continue.
      </Text>

      <Stack spacing={4} alignItems="center">
        <WalletIcon wallet={wallet} boxSize="7rem" />
        <Button
          variant="primary"
          size="sm"
          onClick={onContinue}
          fontWeight="bold"
          borderRadius="full"
        >
          Connect
        </Button>
      </Stack>

      <Text textStyle="body2" textAlign="center">
        App Store didn't open?
        <HybridButton variant="link" ml={1} href={wallet.installLink.mobile}>
          Try another link
        </HybridButton>
      </Text>
    </Stack>
  )
}
