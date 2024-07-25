// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cors from 'cors'
import { wallets } from '../../../data/wallets'
import { findMatchingPipeVersion } from '../../../helpers/version'
import { NETWORKS } from '../../../helpers/constants'
import { getServicePipes } from '../../../helpers/service-pipes'
import { getWalletPipe } from '../../../helpers/wallets'
import { NextApiRequest } from 'next'

// Initializing the cors middleware
export const cors = Cors({
  methods: ['POST'],
})

export async function getWalletsFromRequest(req: NextApiRequest) {
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

  if (!isValidNetwork) {
    throw new Error('Invalid network')
  }

  const servicePipes = getServicePipes({
    fclVersion,
    discoveryType,
    include,
    userAgent,
    clientServices: services,
    supportedStrategies,
    network,
    portOverride: portQuery || portBody,
  })
  const makeServicesPipe = findMatchingPipeVersion(
    fclVersion,
    servicePipes as any
  )

  // Support emulator and use local service configuration
  const netConfig = network === NETWORKS.EMULATOR ? NETWORKS.LOCAL : network

  // Get the pipe for processing wallets
  const walletPipe = getWalletPipe({
    network: netConfig,
    clientServices,
    makeServicesPipe,
  })

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
