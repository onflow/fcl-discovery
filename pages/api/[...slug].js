// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cors from 'cors'
import servicesJson from '../../data/services.json'
import { isValidPath, getNetworkFromPath } from '../../helpers/paths'
import {
  appendInstallData,
  combineServices,
  filterOptInServices,
  filterServicesByPlatform,
  isExtension,
  serviceOfTypeAuthn,
} from '../../helpers/services'
import { SUPPORTED_VERSIONS } from '../../helpers/constants'
import { isGreaterThanOrEqualToVersion } from '../../helpers/version'
import Sentry from '../../config/sentry.server'
import mixpanel from '../../config/mixpanel.server'
import { getPlatformFromUserAgent } from '../../helpers/userAgent'
import { always, ifElse, partial, pipe, reject, when } from 'rambda'

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

  const { slug, discoveryType } = req.query
  const { fclVersion, include, extensions, userAgent } = req.body
  const isValid = isValidPath(slug)
  const network = getNetworkFromPath(slug).toLowerCase()
  const isFilteringSupported = isGreaterThanOrEqualToVersion(
    fclVersion,
    SUPPORTED_VERSIONS.FILTERING
  )
  const areExtensionsSupported = isGreaterThanOrEqualToVersion(
    fclVersion,
    SUPPORTED_VERSIONS.EXTENSIONS
  )
  const areUninstalledExtensionsSupported = isGreaterThanOrEqualToVersion(
    fclVersion,
    SUPPORTED_VERSIONS.UNINSTALLED_EXTENSIONS
  )
  const platform = getPlatformFromUserAgent(userAgent)
  const discoveryRequestType = discoveryType || 'API'

  if (!isValid) {
    return res.status(400).json({ message: 'Invalid Network' })
  }

  mixpanel.track('Wallet Discovery Request', {
    type: discoveryRequestType,
    network,
  })

  // In newer versions, we'll have extensions sent
  // In older versions they were added on the FCL side
  // If below certain version, there is no user agent

  const services = pipe(
    // Remove opt in services unless marked as include, if supported
    when(always(isFilteringSupported), partial(filterOptInServices, include)),
    // Add installation data
    partial(appendInstallData, platform, extensions),
    // Add extensions if supported
    when(always(areExtensionsSupported), services =>
      combineServices(services, extensions, true)
    ),
    serviceOfTypeAuthn,
    // Filter out extensions if not supported because they were added on the FCL side in previous versions
    ifElse(
      always(areUninstalledExtensionsSupported),
      partial(filterServicesByPlatform, platform),
      partial(reject, isExtension)
    )
  )(servicesJson[network])

  return res.status(200).json(services)
}

export default Sentry.withSentry(handler)
