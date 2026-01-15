import { WalletConfig } from '../../wallets'
import NufiIcon from '!!url-loader?limit=true!./nufi.svg'

const nufi: WalletConfig = {
  address: '0x95b85a9ef4daabb1',
  name: 'NUFI',
  uid: 'nufi',
  icon: NufiIcon,
  description:
    'A powerful wallet for powerful users. Non-custodial, private and secure.',
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
  features: ['evm', 'hardware', 'extension'],
}

export default nufi
