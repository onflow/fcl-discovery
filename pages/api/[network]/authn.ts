// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiHandler } from 'next'
import { walletToProvider } from '../../../helpers/wallets'
import { cors, getWalletsFromRequest, runMiddleware } from './_common'
import { Wallet } from '../../../data/wallets'

const handler: NextApiHandler = async (req, res) => {
  await runMiddleware(req, res, cors)

  const start = performance.now()
  const discoveryWallets = await getWalletsFromRequest(req)
  const discoveryServices = extractAllWalletServices(discoveryWallets)

  console.log(
    `Discovery: ${discoveryServices.length} services in ${
      performance.now() - start
    }ms`
  )

  return res.status(200).json(discoveryServices)
}

// Extraction of wallet services with provider for legacy endpoint
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

export default handler
