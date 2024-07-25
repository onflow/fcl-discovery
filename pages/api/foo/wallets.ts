// Alias for /api/mainnet/wallets endpoint
import { NextApiRequest, NextApiResponse } from 'next'
import originalHandler from '../[network]/wallets'
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  req.query.network = 'mainnet'
  req.url = '/api/mainnet/wallets'
  return originalHandler(req, res)
}
