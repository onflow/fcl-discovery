import { createContext, useContext } from 'react'
import { DeviceInfo, getDeviceInfo } from '../helpers/device'

type DeviceContextValue = {
  deviceInfo: DeviceInfo
  userAgent: string
}

export const DeviceContext = createContext<DeviceContextValue | null>(null)

type DeviceProviderProps = {
  children: React.ReactNode
  userAgent: string
}

export function DeviceProvider({ children, userAgent }: DeviceProviderProps) {
  const deviceInfo = getDeviceInfo(userAgent)

  return (
    <DeviceContext.Provider value={{ deviceInfo, userAgent }}>
      {children}
    </DeviceContext.Provider>
  )
}

export function useDevice() {
  const context = useContext(DeviceContext)
  if (!context) {
    throw new Error('useDevice must be used within a DeviceProvider')
  }
  return context
}
