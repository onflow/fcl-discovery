import { createContext, useContext } from 'react'
import { isMobile } from '../helpers/platform'

type DeviceInfoContextValue = {
  isMobile: boolean
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
  console.log(userAgent)
  return (
    <DeviceContext.Provider value={{ isMobile: _isMobile }}>
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
