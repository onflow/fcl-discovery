// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cors from 'cors'
import { wallets } from '../../../data/wallets'
import { findMatchingPipeVersion } from '../../../helpers/version'
import { NETWORKS } from '../../../helpers/constants'
import { getWalletPipes } from '../../../helpers/wallet-pipes'
import { NextApiRequest } from 'next'
import mixpanel from 'mixpanel'

// Initializing the cors middleware
export const cors = Cors({
  methods: ['POST'],
  origin: '*',
})

export async function getWalletsFromRequest(
  req: NextApiRequest,
  { includeUninstalledServices = false } = {},
) {
  const {
    network,
    discoveryType,
    port: portQuery,
  } = req.query as {
    network: string
    discoveryType: string
    port: string
  }
  const {
    fclVersion,
    include,
    extensions,
    userAgent,
    clientServices,
    supportedStrategies,
    port: portBody,
  } = req.body
  const isValidNetwork = Object.values(NETWORKS).includes(network)
  const discoveryRequestType = discoveryType || 'API'
  const services = clientServices || extensions || []

  mixpanel?.track('Wallet Discovery Request', {
    type: discoveryRequestType,
    network,
    fclVersion,
  })

  if (!isValidNetwork) {
    throw new Error('Invalid network')
  }

  // Support emulator and use local service configuration
  const netConfig = network === NETWORKS.EMULATOR ? NETWORKS.LOCAL : network

  const walletPipes = getWalletPipes({
    fclVersion,
    discoveryType: discoveryRequestType,
    include,
    userAgent,
    clientServices: services,
    supportedStrategies,
    network: netConfig,
    portOverride: portQuery || portBody,
    includeUninstalledServices,
  })
  const walletPipe = findMatchingPipeVersion(fclVersion, walletPipes)

  return walletPipe(wallets)
}

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, result => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}
