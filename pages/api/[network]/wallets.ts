// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cors from 'cors'
import { wallets } from '../../../data/wallets'
import { findMatchingPipeVersion } from '../../../helpers/version'
import Sentry from '../../../config/sentry.server'
import {
  extractWalletServices,
  getServicePipes,
  removeWalletFromServices,
  walletsForNetwork,
} from '../../../helpers/servicePipes'
import { NETWORKS } from '../../../helpers/constants'
import { pipe } from 'rambda'
import fs from 'fs'
import path from 'path'

// Initializing the cors middleware
const cors = Cors({
  methods: ['POST'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, result => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function handler(req, res) {
  await runMiddleware(req, res, cors)

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
    return res.status(400).json({ message: 'Invalid Network' })
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
  const discoveryWallets = wallets.reduce((acc, wallet) => {
    const newServices = pipe(
      wallets =>
        wallets.map(wallet => ({
          ...wallet,
          icon: wallet.icon
            ? imageToBase64(wallet.icon.src.replace(/^\/\_next/, '.next'))
            : undefined,
        })),
      walletsForNetwork(netConfig),
      extractWalletServices,
      versionPipe,
      removeWalletFromServices,
      services =>
        services.map(({ provider: _, ...service }) => ({ ...service }))
    )([wallet])

    if (newServices.length) {
      acc.push(...newServices)
    }
    return acc
  }, [])

  return res.status(200).json(discoveryWallets)
}

export default Sentry.wrapApiHandlerWithSentry(handler)
