import { Button, Divider, HStack, Spinner, Stack, Text } from '@chakra-ui/react'
import ServiceList from '../ServiceList'
import { Wallet } from '../../data/wallets'
import { useIsCollapsed } from '../../hooks/useIsCollapsed'
import { useDevice } from '../../contexts/DeviceContext'
import { useWcUri } from '../../hooks/useWcUri'
import { useWallets } from '../../hooks/useWallets'
import { DeviceType } from '../../helpers/device'
import { ViewContainer } from '../layout/ViewContainer'
import { useRpc } from '../../contexts/FclContext'
import { useEffect, useState } from 'react'

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
  const { deviceInfo } = useDevice()

  const content = (
    <Stack spacing={0} flexGrow={1} overflow="hidden">
      <Stack overflow="auto" px={4} pb={5} flexGrow={1}>
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

  return deviceInfo.type === DeviceType.MOBILE ? (
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
  const { rpcEnabled } = useRpc()
  const shouldShowLoading = (wcUriLoading && rpcEnabled) || isLoading

  // If the WC URI is still loading after 5 seconds, there is likely an issue
  // with WalletConnect. The loading spinner will be disabled in order to prevent
  // blocking the entire page. If the user proceeds to a mobile wallet and the WC URI
  // happens to load, deep linking may not work as expected, but the user can still
  // manually retry the connection.
  const [isTimedOut, setIsTimedOut] = useState(false)
  useEffect(() => {
    if (!wcUriLoading) {
      return
    }
    const timeout = setTimeout(() => {
      setIsTimedOut(true)
    }, 5000)
    return () => clearTimeout(timeout)
  }, [wcUriLoading])

  return (
    <LoadingWrapper isLoading={shouldShowLoading && !isTimedOut}>
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
      <ViewContainer
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Spinner size="xl"></Spinner>
      </ViewContainer>
    )
  }

  return <>{children}</>
}
