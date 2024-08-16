import { WalletConfig } from '../../wallets'
import DapperWalletIcon from '!!url-loader?limit=true!./dapper-wallet.svg'

const dapperWallet: WalletConfig = {
  address: '0xead892083b3e2c6c',
  name: 'Dapper Wallet',
  uid: 'dapper-wallet',
  icon: DapperWalletIcon,
  description: 'The trusted gateway to your digital world.',
  color: '#FF5A9D',
  supportEmail: 'support@meetdapper.com',
  website: 'https://meetdapper.com',
  services: {
    mainnet: [
      {
        f_type: 'Service',
        f_vsn: '1.0.0',
        type: 'authn',
        method: 'POP/RPC',
        uid: 'dapper-wallet#authn',
        endpoint: 'https://accounts.meetdapper.com/fcl/authn-restricted',
        optIn: true,
      },
    ],
    testnet: [
      {
        f_type: 'Service',
        f_vsn: '1.0.0',
        type: 'authn',
        method: 'POP/RPC',
        uid: 'dapper-wallet#authn',
        endpoint:
          'https://staging.accounts.meetdapper.com/fcl/authn-restricted',
        optIn: true,
        provider: {
          address: '0x82ec283f88a62e65',
        },
      },
    ],
  },
  features: ['web'],
}

export default dapperWallet
