import { Button, Divider, HStack, Spinner, Stack, Text } from '@chakra-ui/react'
import ServiceList from '../ServiceList'
import { Wallet } from '../../data/wallets'
import { useIsCollapsed } from '../../hooks/useIsCollapsed'
import { useDeviceInfo } from '../../contexts/DeviceInfoContext'
import { useWcUri } from '../../hooks/useWcUri'
import { useWallets } from '../../hooks/useWallets'
import { DeviceType } from '../../helpers/device-info'

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
  const isCollapsed = useIsCollapsed()
  const { isLoading: walletsLoading } = useWallets()
  const { type: deviceType } = useDeviceInfo()
  useWcUri()

  const content = (
    <Stack spacing={0} flexGrow={1} overflow="hidden">
      <Stack overflow="scroll" px={4} pb={5} flexGrow={1}>
        <ServiceList
          onSelectWallet={onSelectWallet}
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

  return deviceType === DeviceType.MOBILE ? (
    <MobileWrapper isLoading={walletsLoading}>{content}</MobileWrapper>
  ) : (
    <LoadingWrapper isLoading={walletsLoading}>{content}</LoadingWrapper>
  )
}

// We must wait for a WC URI to be generated before allowing the user to proceed
// Otherwise the deep link may be blocked by popup blockers
const MobileWrapper = ({
  children,
  isLoading,
}: {
  children: React.ReactNode
  isLoading?: boolean
}) => {
  const { isLoading: wcUriLoading } = useWcUri()

  return (
    <LoadingWrapper isLoading={wcUriLoading || isLoading}>
      {children}
    </LoadingWrapper>
  )
}

function LoadingWrapper({
  children,
  isLoading,
}: {
  children: React.ReactNode
  isLoading: boolean
}) {
  if (isLoading) {
    return (
      <Stack
        flexGrow={1}
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Spinner size="xl"></Spinner>
      </Stack>
    )
  }

  return <>{children}</>
}
