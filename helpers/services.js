import { always, clone, evolve, filter, identity, ifElse, map } from 'rambda'
import { FCL_SERVICE_METHODS, SERVICE_TYPES } from './constants'
import { replacePort } from './urls'

export const filterSupportedStrategies = (supportedStrategies = []) =>
  filter(s => supportedStrategies.includes(s.method))

export const filterUniqueServices =
  ({ address = true, uid = false }) =>
  services => {
    let foundIds = []
    return services.filter(p => {
      const pAddr = p?.provider?.address
      const pUid = p?.uid
      const hasAddress = foundIds.includes(pAddr)
      const hasUid = foundIds.includes(pUid)
      if ((address && hasAddress) || (uid && hasUid)) return false
      if (pAddr) foundIds.push(pAddr)
      if (pUid) foundIds.push(pUid)
      return true
    })
  }

export const combineServices = (
  existingServices = [],
  newServices = [],
  front = false,
) => {
  let combined
  if (front) {
    combined = newServices.concat(existingServices)
  } else {
    combined = existingServices.concat(newServices)
  }
  return combined
}

export const serviceListOfType = type =>
  filter(service => service.type === type)

export const serviceOfTypeAuthn = serviceListOfType(SERVICE_TYPES.AUTHN)

export const serviceListOfMethod = (services = [], method) =>
  services.filter(service => service.method === method)

// If it's an optIn service, make sure it's been asked to be included
export const filterOptInServices = ({ wallets, includeList = [] }) =>
  filter(service => {
    if (service.optIn) {
      const wallet = wallets?.find(w => w.uid === service.walletUid)
      return includeList.includes(service?.provider?.address || wallet?.address)
    }
    return true
  })

export const filterExcludedServices = ({ wallets, excludeList = [] }) =>
  filter(service => {
    const wallet = wallets?.find(w => w.uid === service.walletUid)
    return !excludeList.includes(service?.provider?.address || wallet?.address)
  })

export const isExtension = service =>
  service?.method === FCL_SERVICE_METHODS.EXT

export const isExtensionInstalled = (extensions, service) =>
  extensions.some(extension => {
    const extAddr = extension?.provider?.address
    const srvAddr = service?.provider?.address
    const extUid = extension?.uid
    const srvUid = service?.uid
    return (extAddr === srvAddr && extAddr) || (extUid === srvUid && extUid)
  })

export const requiresPlatform = service => {
  const requiredPlatformTypes = [FCL_SERVICE_METHODS.EXT]
  return requiredPlatformTypes.includes(service?.method)
}

export const filterServicesByPlatform = ({ wallets, platform, extensions }) =>
  filter(service => {
    if (!requiresPlatform(service)) return true

    // If extension is installed, ignore platform requirements
    if (isExtensionInstalled(extensions, service)) return true

    const wallet = wallets?.find(w => w.uid === service.walletUid)
    if (!wallet.installLink) return true

    const providerPlatforms = Object.keys(wallet?.installLink || {})
    return providerPlatforms.includes(platform?.toLowerCase())
  })

export const appendInstallData = ({ wallets, platform, extensions = [] }) =>
  map(
    ifElse(
      requiresPlatform,
      srv => {
        const service = clone(srv)
        service.provider = service.provider || {}
        service.provider['requires_install'] = true

        service.provider['is_installed'] = isExtensionInstalled(
          extensions,
          service,
        )

        const wallet = wallets.find(w => w.uid === service.walletUid)
        const installLink = wallet?.installLink?.[platform?.toLowerCase()]

        if (installLink) {
          service.provider['install_link'] = installLink
        }
        return service
      },
      identity,
    ),
  )

// Filter out services that require install and are not installed
export const filterUninstalledServices = ({ extensions = [] }) =>
  filter(x => {
    if (!requiresPlatform(x)) return true
    return isExtensionInstalled(extensions, x)
  })

// Filter out services for wallets that are passkey-only when not enabled/supported
export const filterPasskeyOnlyServices = ({ wallets, isPasskeysEnabled }) =>
  filter(service => {
    if (isPasskeysEnabled) return true
    const wallet = wallets?.find(w => w.uid === service.walletUid)
    const hasPasskeysFeature = wallet?.features?.includes('passkeys')
    return !hasPasskeysFeature
  })

export const overrideServicePorts = (shouldOverride, portOverride) =>
  ifElse(
    always(shouldOverride),
    map(
      evolve({
        endpoint: e => replacePort(e, portOverride),
      }),
    ),
    identity,
  )

export const sortStrategies = strategies =>
  [...strategies].sort((a, b) => {
    const IDEAL_SERVICE_ORDER = [
      FCL_SERVICE_METHODS.EXT,
      FCL_SERVICE_METHODS.WC,
      // rest...
    ]

    const getIndexOfMethod = method => {
      const index = IDEAL_SERVICE_ORDER.indexOf(method)
      return index === -1 ? IDEAL_SERVICE_ORDER.length : index
    }
    const aIndex = getIndexOfMethod(a)
    const bIndex = getIndexOfMethod(b)
    const delta = aIndex - bIndex
    return delta === 0 ? a.localeCompare(b) : delta
  })
