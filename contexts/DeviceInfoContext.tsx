import { createContext, useContext } from 'react'
import { isMobile, isTablet } from '../helpers/platform'

type DeviceInfoContextValue = {
  userAgent: string
  isMobile: boolean
  isTablet: boolean
}

export const DeviceContext = createContext<DeviceInfoContextValue | null>(null)

type DeviceInfoProviderProps = {
  children: React.ReactNode
  userAgent: string
}

export function DeviceInfoProvider({
  children,
  userAgent,
}: DeviceInfoProviderProps) {
  const _isMobile = isMobile(userAgent)
  const _isTablet = isTablet(userAgent)

  return (
    <DeviceContext.Provider
      value={{ userAgent, isMobile: _isMobile, isTablet: _isTablet }}
    >
      {children}
    </DeviceContext.Provider>
  )
}

export function useDeviceInfo() {
  const context = useContext(DeviceContext)
  if (!context) {
    throw new Error('useDeviceInfo must be used within a DeviceInfoProvider')
  }
  return context
}
