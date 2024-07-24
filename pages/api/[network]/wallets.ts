import { cors, getWalletsFromRequest, runMiddleware } from './_common'

async function handler(req, res) {
  await runMiddleware(req, res, cors)

  const discoveryWallets = await getWalletsFromRequest(req)
  return res.status(200).json(discoveryWallets)
}

export default handler
