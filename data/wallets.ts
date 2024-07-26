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

export interface BaseWallet {
  name: string
  uid: string
  icon: string
  address: string
  description: string
  color?: string
  supportEmail?: string
  website: string
  installLink?: {
    chrome?: string
    browser?: string
    mobile?: string
  }
  features?: typeof AVAILABLE_FEATURES[number]['id'][]
}

export interface WalletConfig extends BaseWallet {
  services: {
    mainnet?: ServiceConfig[]
    testnet?: ServiceConfig[]
    previewnet?: ServiceConfig[]
    canarynet?: ServiceConfig[]
    local?: ServiceConfig[]
  }
}

export interface Wallet extends BaseWallet {
  services: Service[]
}

export const wallets: WalletConfig[] = [
  blocto,
  dapperWallet,
  devWallet,
  flowWallet,
  ledger,
  nufi,
  shadow,
]
