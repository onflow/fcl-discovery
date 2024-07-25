// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiHandler } from 'next'
import { cors, getWalletsFromRequest, runMiddleware } from './_common'
import { extractAllServicesWithProvider } from '../../../helpers/wallets'

const handler: NextApiHandler = async (req, res) => {
  await runMiddleware(req, res, cors)

  const discoveryWallets = await getWalletsFromRequest(req)
  const discoveryServices = extractAllServicesWithProvider(discoveryWallets)

  return res.status(200).json(discoveryServices)
}

export default handler
