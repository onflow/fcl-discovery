import { Button, Divider, HStack, Stack, Text } from '@chakra-ui/react'
import ServiceList from '../ServiceList'
import { useWallets } from '../../hooks/useWallets'
import { isGreaterThanOrEqualToVersion } from '../../helpers/version'
import { useConfig } from '../../contexts/ConfigContext'
import { SUPPORTED_VERSIONS } from '../../helpers/constants'
import { Wallet } from '../../data/wallets'
import { useIsCollapsed } from '../../hooks/useIsCollapsed'

type Props = {
  onClickWallet: (wallet: Wallet) => void
  onSwitchToLearnMore: () => void
  selectedWallet?: Wallet | null
}

export default function WalletSelection({
  onSwitchToLearnMore,
  onClickWallet,
  selectedWallet,
}: Props) {
  const { wallets } = useWallets()
  const { appVersion } = useConfig()
  const isFeaturesSupported = isGreaterThanOrEqualToVersion(
    appVersion,
    SUPPORTED_VERSIONS.SUGGESTED_FEATURES
  )

  const isCollapsed = useIsCollapsed()

  return (
    <Stack spacing={0} flexGrow={1} overflow="hidden">
      <Stack overflow="scroll" px={8} pb={6} flexGrow={1}>
        {/* TODO: replace this in future PR with Filter Bar */}
        {/*isFeaturesSupported && <Features />*/}
        <ServiceList
          onClickWallet={onClickWallet}
          wallets={wallets}
          selectedWallet={selectedWallet}
        />
      </Stack>

      {isCollapsed && (
        <>
          <Divider color="gray.300" />
          <HStack
            justifyContent="space-between"
            alignItems="center"
            padding={8}
          >
            <Text fontSize="sm" color="gray.500">
              Don't have a wallet?
            </Text>

            <Button onClick={onSwitchToLearnMore} variant="link" padding={0}>
              <Text fontSize="sm" color="blue.500">
                Learn More
              </Text>
            </Button>
          </HStack>
        </>
      )}
    </Stack>
  )
}
