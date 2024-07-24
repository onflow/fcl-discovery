import { BaseWallet, Wallet, WalletConfig } from '../../../data/wallets'
import { Service } from '../../../types'

type WalletFixture = {
  base: () => BaseWallet
  config: () => WalletConfig
  mainnet: () => Wallet
  services: () => Service[]
}

export const walletFixtures = {
  flowWallet: {
    base() {
      return {
        uid: 'flow-wallet',
        name: 'Flow Wallet',
        icon: 'flow-wallet.png',
        address: '0x1234',
        description: 'Digital wallet created for everyone.',
        website: 'https://core.flow.com',
        color: '#41CC5D',
        supportEmail: 'support@flow.com',
        installLink: {
          chrome:
            'https://chromewebstore.google.com/detail/flow-wallet/hpclkefagolihohboafpheddmmgdffjm',
          browser: 'https://wallet.flow.com/download',
          mobile: 'https://wallet.flow.com/download',
        },
        features: [],
      }
    },
    config(this: WalletFixture) {
      return {
        ...this.base(),
        services: {
          mainnet: this.services(),
        },
      }
    },
    mainnet(this: WalletFixture) {
      return {
        ...this.base(),
        services: this.services(),
      }
    },
    services() {
      return [
        {
          f_type: 'Service',
          f_vsn: '1.0.0',
          type: 'authn',
          method: 'EXT/RPC',
          uid: 'fcw#authn',
          endpoint:
            'chrome-extension://hpclkefagolihohboafpheddmmgdffjm/popup.html',
          provider: {},
        },
        {
          f_type: 'Service',
          f_vsn: '1.0.0',
          type: 'authn',
          method: 'WC/RPC',
          uid: 'https://fcw-link.lilico.app/wc',
          endpoint: 'flow_authn',
          provider: {
            name: 'Flow Wallet Mobile',
            address: '0xc7efa8c33fceee03',
          },
        },
      ]
    },
  } as WalletFixture,
  anotherWallet: {
    base() {
      return {
        uid: 'another-wallet',
        name: 'Another Wallet',
        address: '0x4567',
        description: 'Some wallet I made.',
        website: 'https://example.com',
        icon: 'another-wallet.png',
        color: '#123456',
        supportEmail: 'support@example.com',
        installLink: {
          chrome: 'https://chromewebstore.google.com/detail/foo-wallet/foo',
          browser: 'https://wallet.foo.com/download',
          mobile: 'https://wallet.foo.com/download',
        },
        features: [],
      }
    },
    config(this: WalletFixture) {
      return {
        ...this.base(),
        services: {
          mainnet: this.services(),
        },
      }
    },
    mainnet(this: WalletFixture) {
      return {
        ...this.base(),
        services: this.services(),
      }
    },
    services(this: WalletFixture) {
      return [
        {
          f_type: 'Service',
          f_vsn: '1.0.0',
          type: 'authn',
          method: 'HTTP/POST',
          uid: 'another#authn',
          endpoint: 'https://example.com/authn',
          provider: {},
        },
      ]
    },
  } as WalletFixture,
}

export const getAllServices = () => {
  return Object.values(walletFixtures).flatMap(x => x.services())
}

export const getMockWalletsConfig: () => WalletConfig[] = () =>
  Object.values(walletFixtures).map(x => x.config())

export const getMockWalletsMainnet: () => Wallet[] = () =>
  Object.values(walletFixtures).map(x => x.mainnet())
