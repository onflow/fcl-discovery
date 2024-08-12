import { useBreakpointValue } from '@chakra-ui/react'
import { useDeviceInfo } from '../contexts/DeviceInfoContext'

export function useModalType() {
  // Optimistic SSR fallback based on user agent
  const { isMobile, isTablet } = useDeviceInfo()
  const isDrawer = useBreakpointValue(
    { base: true, sm: false },
    { ssr: true, fallback: isMobile && !isTablet ? 'base' : 'sm' },
  )
  return isDrawer ? 'drawer' : 'modal'
}
