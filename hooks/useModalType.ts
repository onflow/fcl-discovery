import { useBreakpointValue } from '@chakra-ui/react'
import { useDeviceInfo } from '../contexts/DeviceInfoContext'
import { DeviceType } from '../helpers/device-info'

export function useModalType() {
  // Optimistic SSR fallback based on user agent
  const deviceInfo = useDeviceInfo()
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
