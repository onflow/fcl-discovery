import { NextApiHandler } from 'next'
import { cors, getWalletsFromRequest, runMiddleware } from './_common'

const handler: NextApiHandler = async (req, res) => {
  await runMiddleware(req, res, cors)

  const discoveryWallets = await getWalletsFromRequest(req)
  return res.status(200).json(discoveryWallets)
}

export default handler
