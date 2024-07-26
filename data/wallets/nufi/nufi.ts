import { nextJsImageToBase64 } from '../../../helpers/image'
import { WalletConfig } from '../../wallets'
import NuFiIcon from './nufi.svg'

const nufi: WalletConfig = {
  address: '0x95b85a9ef4daabb1',
  name: 'NuFi',
  uid: 'nufi',
  icon: nextJsImageToBase64(NuFiIcon),
  description:
    'A Web3 crypto wallet for Cardano, Flow and Solana. Store, stake and connect to Dapps.',
  website: 'https://nu.fi',
  services: {
    mainnet: [
      {
        f_type: 'Service',
        f_vsn: '1.0.0',
        type: 'authn',
        method: 'EXT/RPC',
        uid: 'nufi#authn',
        endpoint: 'ext:0x95b85a9ef4daabb1',
      },
    ],
  },
  installLink: {
    chrome:
      'https://chromewebstore.google.com/detail/nufi/gpnihlnnodeiiaakbikldcihojploeca',
    browser: 'https://nu.fi',
  },
}

export default nufi
