import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'
import ServiceList from '../ServiceList'
import { useWallets } from '../../hooks/useWallets'
import { isGreaterThanOrEqualToVersion } from '../../helpers/version'
import { useConfig } from '../../contexts/FclContext'
import { SUPPORTED_VERSIONS } from '../../helpers/constants'
import { Wallet } from '../../data/wallets'
import { useIsCollapsed } from '../../hooks/useIsCollapsed'

type Props = {
  onSelectWallet: (wallet: Wallet) => void
  onSwitchToLearnMore?: () => void
  selectedWallet?: Wallet | null
}

export default function WalletSelection({
  onSwitchToLearnMore,
  onSelectWallet,
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
      <Stack overflow="scroll" px={5} pb={5} flexGrow={1}>
        {/* TODO: replace this in future PR with Filter Bar */}
        {/*isFeaturesSupported && <Features />*/}
        <ServiceList
          onSelectWallet={onSelectWallet}
          wallets={wallets}
          selectedWallet={selectedWallet}
        />
      </Stack>

      {isCollapsed && (
        <>
          <Divider color="gray.300" />
          <HStack justifyContent="space-between" alignItems="center" p={5}>
            <Text fontSize="sm">Don't have a wallet?</Text>

            <Button onClick={onSwitchToLearnMore} variant="link" padding={0}>
              Learn More
            </Button>
          </HStack>
        </>
      )}
    </Stack>
  )
}
