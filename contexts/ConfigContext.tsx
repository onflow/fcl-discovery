import { createContext, useContext } from 'react'
import { FclConfig } from '../hooks/useFcl'

export interface DiscoveryConfig extends FclConfig {
  network: string
  port: number
}

export const ConfigContext = createContext<DiscoveryConfig | null>(null)

interface ConfigProviderProps {
  children: React.ReactNode
  config: DiscoveryConfig
}

export function ConfigProvider({ children, config }: ConfigProviderProps) {
  return (
    <ConfigContext.Provider value={{ ...config }}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  const config = useContext(ConfigContext)
  if (!config) {
    throw new Error('useConfig must be used within a ConfigProvider')
  }
  return config
}
