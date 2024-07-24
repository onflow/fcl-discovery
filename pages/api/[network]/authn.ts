// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiHandler } from 'next'
import Sentry from '../../../config/sentry.server'
import { walletToProvider } from '../../../helpers/walletPipes'
import { cors, getWalletsFromRequest, runMiddleware } from './_common'
import { Wallet } from '../../../data/wallets'

const handler: NextApiHandler = async (req, res) => {
  await runMiddleware(req, res, cors)

  const discoveryWallets = await getWalletsFromRequest(req)
  const discoveryServices = extractAllWalletServices(discoveryWallets)

  return res.status(200).json(discoveryServices)
}

function extractAllWalletServices(wallets: Wallet[]) {
  return wallets.reduce((acc, wallet) => {
    acc.push(
      ...wallet.services.map(service => ({
        ...service,
        provider: {
          ...walletToProvider(wallet),
          ...service.provider,
        },
      }))
    )
    return acc
  }, [])
}

export default Sentry.wrapApiHandlerWithSentry(handler)
