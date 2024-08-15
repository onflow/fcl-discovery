import { nextJsImageToBase64 } from '../../../helpers/image'
import { WalletConfig } from '../../wallets'
import FlowWalletIcon from './flow-wallet.svg'

const flowWallet: WalletConfig = {
  name: 'Flow Wallet',
  uid: 'flow-wallet',
  address: '0x33f75ff0b830dcec',
  description: 'Digital wallet created for everyone.',
  icon: nextJsImageToBase64(FlowWalletIcon),
  color: '#41CC5D',
  supportEmail: 'support@flow.com',
  website: 'https://core.flow.com',
  installLink: {
    chrome:
      'https://chromewebstore.google.com/detail/flow-wallet/hpclkefagolihohboafpheddmmgdffjm',
    browser: 'https://wallet.flow.com/download',
    ios: 'https://apps.apple.com/ca/app/flow-wallet-nfts-and-crypto/id6478996750',
    android:
      'https://play.google.com/store/apps/details?id=com.flowfoundation.wallet',
    mobile: 'https://wallet.flow.com/download',
  },
  services: {
    mainnet: [
      {
        f_type: 'Service',
        f_vsn: '1.0.0',
        type: 'authn',
        method: 'EXT/RPC',
        uid: 'fcw#authn',
        endpoint:
          'chrome-extension://hpclkefagolihohboafpheddmmgdffjm/popup.html',
        provider: {
          // Legacy override for systems using old /api/authn endpoint
          address: '0x33f75ff0b830dcec',
        },
      },
      {
        f_type: 'Service',
        f_vsn: '1.0.0',
        type: 'authn',
        method: 'WC/RPC',
        uid: 'https://fcw-link.lilico.app/wc',
        endpoint: 'flow_authn',
        provider: {
          // Legacy override for systems using old /api/authn endpoint
          name: 'Flow Wallet Mobile',
          address: '0xc7efa8c33fceee03',
        },
      },
    ],
    testnet: [
      {
        f_type: 'Service',
        f_vsn: '1.0.0',
        type: 'authn',
        method: 'EXT/RPC',
        uid: 'fcw#authn',
        endpoint:
          'chrome-extension://hpclkefagolihohboafpheddmmgdffjm/popup.html',
        provider: {
          // Legacy override for systems using old /api/authn endpoint
          address: '0x33f75ff0b830dcec',
        },
      },
      {
        f_type: 'Service',
        f_vsn: '1.0.0',
        type: 'authn',
        method: 'WC/RPC',
        uid: 'https://fcw-link.lilico.app/wc',
        endpoint: 'flow_authn',
        provider: {
          // Legacy override for systems using old /api/authn endpoint
          name: 'Flow Wallet Mobile',
          address: '0xc7efa8c33fceee03',
        },
      },
    ],
    previewnet: [
      {
        f_type: 'Service',
        f_vsn: '1.0.0',
        type: 'authn',
        method: 'EXT/RPC',
        uid: 'fcw#authn',
        endpoint:
          'chrome-extension://hpclkefagolihohboafpheddmmgdffjm/popup.html',
        provider: {
          // Legacy override for systems using old /api/authn endpoint
          address: '0x33f75ff0b830dcec',
        },
      },
      {
        f_type: 'Service',
        f_vsn: '1.0.0',
        type: 'authn',
        method: 'WC/RPC',
        uid: 'https://fcw-link.lilico.app/wc',
        endpoint: 'flow_authn',
        provider: {
          // Legacy override for systems using old /api/authn endpoint
          name: 'Flow Wallet Mobile',
          address: '0xc7efa8c33fceee03',
        },
      },
    ],
  },
  features: ['evm', 'mobile', 'extension'],
}

export default flowWallet
