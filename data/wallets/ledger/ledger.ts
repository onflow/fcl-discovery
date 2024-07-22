import { WalletConfig } from '../../wallets'
import LedgerIcon from './ledger.jpeg'

const ledger: WalletConfig = {
  name: 'Ledger',
  uid: 'ledger',
  address: '0xe5cd26afebe62781',
  description: 'Ledger wallets, designed with the highest security standards.',
  icon: LedgerIcon,
  color: '#1e2029',
  supportEmail: 'support@ledger.com',
  website: 'https://www.ledger.com',
  services: {
    mainnet: [
      {
        f_type: 'Service',
        f_vsn: '1.0.0',
        type: 'authn',
        method: 'IFRAME/RPC',
        uid: 'ledger#authn',
        endpoint: 'https://fcl-ledger.onflow.org/mainnet/authn',
        optIn: true,
      },
    ],
    testnet: [
      {
        f_type: 'Service',
        f_vsn: '1.0.0',
        type: 'authn',
        method: 'IFRAME/RPC',
        uid: 'ledger#authn',
        endpoint: 'https://fcl-ledger.onflow.org/testnet/authn',
        optIn: true,
      },
    ],
    canarynet: [
      {
        f_type: 'Service',
        f_vsn: '1.0.0',
        type: 'authn',
        method: 'IFRAME/RPC',
        uid: 'ledger#authn',
        endpoint: 'https://fcl-ledger.onflow.org/canarynet/authn',
        optIn: true,
      },
    ],
  },
}

export default ledger
