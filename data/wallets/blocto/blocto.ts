import { WalletConfig } from '../../wallets'
import BloctoIcon from '!!url-loader?limit=true!./blocto.svg'

const blocto: WalletConfig = {
  name: 'Blocto',
  uid: 'blocto',
  address: '0x55ad22f01ef568a1',
  description: 'Your entrance to the blockchain world.',
  icon: BloctoIcon,
  color: '#0075FF',
  supportEmail: 'support@blocto.app',
  website: 'https://blocto.io',
  services: {
    mainnet: [
      {
        f_type: 'Service',
        f_vsn: '1.0.0',
        type: 'authn',
        method: 'HTTP/POST',
        uid: 'blocto#authn',
        endpoint: 'https://wallet-v2.blocto.app/api/flow/authn',
      },
    ],
    testnet: [
      {
        f_type: 'Service',
        f_vsn: '1.0.0',
        type: 'authn',
        method: 'HTTP/POST',
        uid: 'blocto#authn',
        endpoint: 'https://wallet-v2-dev.blocto.app/api/flow/authn',
      },
    ],
  },
  features: ['web'],
}

export default blocto
