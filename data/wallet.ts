import { Provider, Service } from '../types'

export enum WalletPlatform {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
}

export interface Wallet {
  provider: Provider
  services: {
    [key in WalletPlatform]: Omit<Service, 'provider'>
  }
  installLink: {
    [key in WalletPlatform]: string
  }
}
