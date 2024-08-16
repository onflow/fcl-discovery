import { NextApiHandler } from 'next'
import { getWalletsFromRequest } from './_common'
import { Wallet } from '../../../data/wallets'

const handler: NextApiHandler = async (req, res) => {
  // Cors middleware intentionally disabled for this endpoint
  // This API schema is not finalized yet, and may change in the future
  // We should allow cross origin requests once the schema is stable for
  // an integration with FCL
  const discoveryWallets = await getWalletsFromRequest(req)
  return res.status(200).json(removeProviders(discoveryWallets))
}

function removeProviders(wallets: Wallet[]) {
  return wallets.map(wallet => ({
    ...wallet,
    services: wallet.services.map(service => {
      const { provider, ...rest } = service
      return rest
    }),
  }))
}

export default handler
