import { Wallet, WalletConfig } from '../data/wallets'

export type Provider = {
  address?: string
  name?: string
  icon?: string
  description?: string
  color?: string
  supportEmail?: string
  website?: string
  is_installed?: boolean
}

export type Service = {
  f_type: 'Service'
  f_vsn: '1.0.0'
  type: 'authn'
  method: string
  uid?: string
  endpoint: string
  provider: Provider & Metadata
  optIn?: boolean
}

export type Metadata = {
  install_link?: string
}

export type WalletPipe = (wallets: WalletConfig[]) => Wallet[]
export interface VersionWalletPipe {
  supportedVersion: string
  pipe: WalletPipe
}
