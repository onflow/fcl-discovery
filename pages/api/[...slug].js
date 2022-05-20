// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cors from 'cors'
import servicesJson from '../../data/services.json'
import { isValidPath, getNetworkFromPath } from '../../helpers/paths'
import {
  filterOptInServices,
  filterServicesByPlatform,
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

const shouldFilterOrReturnDefault = (filterFn, fact, original) =>
  fact ? filterFn() : original

async function handler(req, res) {
  await runMiddleware(req, res, cors)

  const { slug, discoveryType } = req.query
  const { fclVersion, include, userAgent } = req.body
  const isValid = isValidPath(slug)
  const network = getNetworkFromPath(slug).toLowerCase()
  const isFilteringSupported = isGreaterThanOrEqualToVersion(
    fclVersion,
    SUPPORTED_VERSIONS.FILTERING
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
    services =>
      shouldFilterOrReturnDefault(
        () => filterOptInServices(services, include),
        isFilteringSupported,
        services
      ),
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
