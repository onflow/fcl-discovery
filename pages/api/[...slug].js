// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cors from 'cors'
import servicesJson from '../../data/services.json'
import { isValidPath, getNetworkFromPath } from '../../helpers/paths'
import { findMatchingPipeVersion } from '../../helpers/version'
import Sentry from '../../config/sentry.server'
import mixpanel from '../../config/mixpanel.server'
import { getServicePipes } from '../../helpers/servicePipes'
import { NETWORKS } from '../../helpers/constants'

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

  const { slug, discoveryType, port: portQuery } = req.query
  const {
    fclVersion,
    include,
    extensions,
    userAgent,
    clientServices,
    supportedStrategies,
    port: portBody,
  } = req.body
  const isValid = isValidPath(slug)
  const network = getNetworkFromPath(slug).toLowerCase()
  const discoveryRequestType = discoveryType || 'API'
  const services = clientServices || extensions || []

  if (!isValid) {
    return res.status(400).json({ message: 'Invalid Network' })
  }

  mixpanel?.track('Wallet Discovery Request', {
    type: discoveryRequestType,
    network,
    fclVersion,
  })

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
  
  // support emulator and use local service configuration
  const netConfig = network === NETWORKS.EMULATOR ? NETWORKS.LOCAL : network
  const discoveryServices = versionPipe(servicesJson[netConfig])

  return res.status(200).json(discoveryServices)
}

export default Sentry.withSentry(handler)
