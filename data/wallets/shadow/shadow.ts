import { nextJsImageToBase64 } from '../../../helpers/image'
import { WalletConfig } from '../../wallets'
import ShadowIcon from './shadow.svg'

const shadow: WalletConfig = {
  address: '0x4204aa9c92ab68a1',
  name: 'Shadow',
  uid: 'shadow',
  icon: nextJsImageToBase64(ShadowIcon),
  description:
    'Shadow wallet, your Web3 sidekick. Store your assets, transact with friends, and connect to apps on multiple chains.',
  color: '#B79DFF',
  supportEmail: 'developer@flipper.org',
  website: 'https://shadow.app',

  services: {
    mainnet: [
      {
        f_type: 'Service',
        f_vsn: '1.0.0',
        type: 'authn',
        method: 'EXT/RPC',
        uid: 'shadow#authn',
        endpoint:
          'chrome-extension://lmmpaefggfcmnoddemmgdppddppnmhek/index.html',
      },
    ],
    testnet: [
      {
        f_type: 'Service',
        f_vsn: '1.0.0',
        type: 'authn',
        method: 'EXT/RPC',
        uid: 'shadow#authn',
        endpoint:
          'chrome-extension://lmmpaefggfcmnoddemmgdppddppnmhek/index.html',
      },
    ],
  },
  installLink: {
    chrome:
      'https://chromewebstore.google.com/detail/shadow-aptos-flow-wallet/lmmpaefggfcmnoddemmgdppddppnmhek?hl=en',
    browser: 'https://shadow.app',
  },
  features: ['extension'],
}

export default shadow
