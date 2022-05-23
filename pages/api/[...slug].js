// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cors from 'cors'
import servicesJson from '../../data/services.json'
import { isValidPath, getNetworkFromPath } from '../../helpers/paths'
import {
  appendInstallLinkToUninstalledServices,
  combineServices,
  filterOptInServices,
  filterServicesByPlatform,
  filterServicesForInstalledExtensions,
  serviceOfTypeAuthn,
} from '../../helpers/services'
import { pipe } from '../../helpers/pipe'
import { SERVICE_METHODS, SUPPORTED_VERSIONS } from '../../helpers/constants'
import { isGreaterThanOrEqualToVersion } from '../../helpers/version'
import Sentry from '../../config/sentry.server'
import mixpanel from '../../config/mixpanel.server'
import { getPlatformFromUserAgent } from '../../helpers/userAgent'

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
    discoveryType === 'UI'
      ? SUPPORTED_VERSIONS.UNINSTALLED_EXTENSIONS
      : SUPPORTED_VERSIONS.UNINSTALLED_EXTENSIONS_API
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
    services => {
      if (!isFilteringSupported) return services
      return filterOptInServices(services, include)
    },
    appendInstallLinkToUninstalledServices(platform),
    filterServicesForInstalledExtensions(extensions),
    services => {
      if (!areExtensionsSupported) return services
      return combineServices(services, extensions, true)
    },
    serviceOfTypeAuthn,
    services => {
      if (!areUninstalledExtensionsSupported) {
        // Filter out extensions if not supported because they were added on the FCL side in previous versions
        return services.filter(s => s.method !== SERVICE_METHODS.EXTENSION)
      }
      return filterServicesByPlatform(platform, services)
    }
  )(servicesJson[network])

  return res.status(200).json(services)
}

export default Sentry.withSentry(handler)
