import { NextApiHandler } from 'next'
import { cors, getWalletsFromRequest, runMiddleware } from './_common'
import { Wallet } from '../../../data/wallets'

const handler: NextApiHandler = async (req, res) => {
  await runMiddleware(req, res, cors)

  // This endpoint is still subject to change and should not be used by
  // and third-party integrations yet.
  if (req.query.enableExperimentalWalletsEndpoint !== 'true') {
    return res.status(404).send('Not found')
  }

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
