import { Button, Stack, Text } from '@chakra-ui/react'
import { Wallet } from '../../../data/wallets'
import WalletIcon from '../../icons/WalletIcon'
import HybridButton from '../../HybridButton'
import { ViewContainer } from '../../layout/ViewContainer'

interface InstallAppMobileProps {
  onContinue: () => void
  wallet: Wallet
}

export default function InstallAppMobile({
  onContinue,
  wallet,
}: InstallAppMobileProps) {
  return (
    <ViewContainer alignItems="center" spacing="lg">
      <Stack spacing={6} alignItems="center" my="auto">
        <WalletIcon wallet={wallet} boxSize="4rem" />
        <Stack spacing={2} alignItems="center" maxW="2xs" textAlign="center">
          <Text textStyle="body1Bold">Opened in the App Store</Text>
          <Text textStyle="body2" textAlign="center" opacity={0.7}>
            Once you have installed the app and created an account, click the
            button below to connect.
          </Text>
        </Stack>

        <Button
          variant="primary"
          size="sm"
          onClick={onContinue}
          fontWeight="bold"
          borderRadius="full"
        >
          Connect Now
        </Button>
      </Stack>

      <Text textStyle="body2" textAlign="center" p={1}>
        App Store didn't open?
        <HybridButton variant="link" ml={1} href={wallet.installLink.mobile}>
          Try another link
        </HybridButton>
      </Text>
    </ViewContainer>
  )
}
