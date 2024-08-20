import { useBreakpointValue } from '@chakra-ui/react'
import { useDevice } from '../contexts/DeviceContext'
import { DeviceType } from '../helpers/device'

export function useIsCollapsed() {
  const { deviceInfo } = useDevice()
  const isCollapsed = useBreakpointValue(
    { base: true, md: false },
    {
      ssr: true,
      fallback:
        deviceInfo.type === DeviceType.MOBILE && !deviceInfo.isTablet
          ? 'md'
          : 'base',
    },
  )
  return isCollapsed
}
