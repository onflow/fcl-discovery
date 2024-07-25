// Alias for /api/mainnet/authn endpoint
import { NextApiRequest, NextApiResponse } from 'next'
import originalHandler from '../[network]/authn'
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  req.query.network = 'mainnet'
  req.url = '/api/mainnet/authn'
  return originalHandler(req, res)
}
