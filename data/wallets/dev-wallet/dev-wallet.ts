import { WalletConfig } from '../../wallets'
import DevWalletIcon from '!!url-loader?limit=true!./dev-wallet.png'

const devWallet: WalletConfig = {
  name: 'Dev Wallet',
  uid: 'dev-wallet',
  address: '0xDevWallet',
  description:
    'Make sure you have Dev WalletConfigrunning on Port 8702, unless override specified.',
  icon: DevWalletIcon as any,
  color: '#FF5A9D',
  website: 'https://core.flow.com',
  services: {
    local: [
      {
        f_type: 'Service',
        f_vsn: '1.0.0',
        type: 'authn',
        method: 'HTTP/POST',
        uid: 'dev-wallet#authnpost',
        endpoint: 'http://localhost:8701/api/authn',
      },
    ],
  },
}

export default devWallet
