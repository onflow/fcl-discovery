// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cors from 'cors'
import { wallets } from '../../../data/wallets'
import { findMatchingPipeVersion } from '../../../helpers/version'
import Sentry from '../../../config/sentry.server'
import {
  removeWalletFromServices,
  extractWalletServices,
  getServicePipes,
  walletsForNetwork,
  walletIconsToBase64,
} from '../../../helpers/servicePipes'
import { NETWORKS } from '../../../helpers/constants'
import { pipe } from 'rambda'

// Initializing the cors middleware
export const cors = Cors({
  methods: ['POST'],
})

export async function discoveryServicesMiddleware(req, res, next) {
  const { network: rawNetwork, discoveryType, port: portQuery } = req.query
  const {
    fclVersion,
    include,
    extensions,
    userAgent,
    clientServices,
    supportedStrategies,
    port: portBody,
  } = req.body
  const isValid = Object.values(NETWORKS).includes(rawNetwork)
  const network = rawNetwork.toLowerCase()
  const discoveryRequestType = discoveryType || 'API'
  const services = clientServices || extensions || []

  if (!isValid) {
    return res.status(400).json({ error: 'Invalid network' })
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
  const versionPipe = findMatchingPipeVersion(fclVersion, servicePipes)

  // Support emulator and use local service configuration
  const netConfig = network === NETWORKS.EMULATOR ? NETWORKS.LOCAL : network

  // Extract authn services from wallets
  const discoveryServices = pipe(
    walletIconsToBase64,
    walletsForNetwork(netConfig),
    extractWalletServices,
    versionPipe
  )(wallets)

  req.discoveryServices = discoveryServices
  next()
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
