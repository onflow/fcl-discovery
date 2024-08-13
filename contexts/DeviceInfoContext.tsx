import { createContext, useContext } from 'react'
import { DeviceInfo, DeviceType, getDeviceInfo } from '../helpers/device-info'
import { getBrowserInfo } from '../helpers/browsers'

type DeviceInfoContextValue = DeviceInfo & {
  userAgent: string
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
  const deviceInfo = getDeviceInfo(userAgent)

  return (
    <DeviceContext.Provider value={{ userAgent, ...deviceInfo }}>
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
