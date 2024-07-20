import { StaticImageData } from 'next/image'
import { Provider, Service } from '../types'
import { AVAILABLE_FEATURES } from '../helpers/constants'
import blocto from './wallets/blocto/blocto'
import dapperWallet from './wallets/dapper-wallet/dapper-wallet'
import devWallet from './wallets/dev-wallet/dev-wallet'
import flowWallet from './wallets/flow-wallet/flow-wallet'
import ledger from './wallets/ledger/ledger'
import nufi from './wallets/nufi/nufi'
import shadow from './wallets/shadow/shadow'

type ServiceConfig = Omit<Service, 'provider'> & {
  provider?: Partial<Provider>
}

export interface Wallet {
  name: string
  uid: string
  address: string
  description: string
  icon: StaticImageData
  color?: string
  supportEmail?: string
  website: string
  installLink?: {
    chrome?: string
    browser?: string
    mobile?: string
  }
  services: {
    mainnet?: ServiceConfig[]
    testnet?: ServiceConfig[]
    previewnet?: ServiceConfig[]
    canarynet?: ServiceConfig[]
    local?: ServiceConfig[]
  }
  features?: typeof AVAILABLE_FEATURES[number]['id'][]
}

export const wallets: Wallet[] = [
  blocto,
  dapperWallet,
  devWallet,
  flowWallet,
  ledger,
  nufi,
  shadow,
]
