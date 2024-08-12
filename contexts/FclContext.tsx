import { createContext, useContext } from 'react'
import { FclConfig } from '../hooks/useFcl'
import { FclRpcClient } from '../helpers/rpc'

export type DiscoveryConfig = FclConfig & {
  network: string
  port: number
}

export type FclContextType = {
  config: DiscoveryConfig
  rpc: FclRpcClient
}

export const FclContext = createContext<FclContextType | null>(null)

interface ConfigProviderProps {
  children: React.ReactNode
  config: DiscoveryConfig
  rpc: FclRpcClient
}

export function FclProvider({ children, config, rpc }: ConfigProviderProps) {
  return (
    <FclContext.Provider value={{ config, rpc }}>
      {children}
    </FclContext.Provider>
  )
}

export function useConfig() {
  const { config } = useContext(FclContext)
  if (!config) {
    throw new Error('useConfig must be used within a FclProvider')
  }
  return config
}

export function useRpc() {
  const ctx = useContext(FclContext)
  if (!ctx) {
    throw new Error('useRpc must be used within a FclProvider')
  }

  const {
    rpc,
    config: { rpcEnabled },
  } = ctx
  return {
    rpc,
    rpcEnabled: rpcEnabled || false,
  }
}
