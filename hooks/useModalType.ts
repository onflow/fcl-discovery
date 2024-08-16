import { useBreakpointValue } from '@chakra-ui/react'
import { useDevice } from '../contexts/DeviceContext'
import { DeviceType } from '../helpers/device'

export function useModalType() {
  // Optimistic SSR fallback based on user agent
  const { deviceInfo } = useDevice()
  const isDrawer = useBreakpointValue(
    { base: true, sm: false },
    {
      ssr: true,
      fallback:
        deviceInfo.type === DeviceType.MOBILE && !deviceInfo.isTablet
          ? 'base'
          : 'sm',
    },
  )
  return isDrawer ? 'drawer' : 'modal'
}
