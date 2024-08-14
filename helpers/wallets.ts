import { pipe } from 'rambda'
import { Service } from '../types'
import { Wallet as _Wallet, WalletConfig } from '../data/wallets'
import { DeviceInfo, DeviceType } from './device'
import { FCL_SERVICE_METHODS } from './constants'

type WalletWithRawInstallLink = Omit<_Wallet, 'installLink'> & {
  installLink: WalletConfig['installLink']
}
type Wallet = _Wallet | WalletWithRawInstallLink

export type ServiceWithWallet = Service & { walletUid: string }
type ServicesPipeFactory = (args: {
  wallets: Wallet[]
}) => (services: ServiceWithWallet[]) => ServiceWithWallet[]

export const pipeWalletServices =
  (makeServicesPipe: ServicesPipeFactory) => (wallets: Wallet[]) =>
    pipe(
      extractWalletServices,
      makeServicesPipe({ wallets }),
      collectWalletsFromServices({ wallets }),
    )(wallets)

export const extractWalletServices = (wallets: Wallet[]): ServiceWithWallet[] =>
  wallets.reduce((acc, wallet) => {
    acc.push(
      ...wallet.services.map(service => ({
        ...service,
        walletUid: wallet.uid,
      })),
    )
    return acc
  }, [])

export const walletsForNetwork =
  (network: string) =>
  (wallets: WalletConfig[] = []): Wallet[] =>
    wallets
      .filter(wallet => wallet.services[network])
      .map(wallet => ({
        ...wallet,
        services: wallet.services[network],
      }))

export const collectWalletsFromServices =
  ({ wallets }: { wallets: Wallet[] }) =>
  (services: ServiceWithWallet[]) =>
    wallets.reduce((acc, wallet) => {
      acc.push({
        ...wallet,
        services: services
          .filter(service => service.walletUid === wallet.uid)
          .map(service => {
            const { walletUid, ..._service } = service
            return _service
          }),
      })
      return acc
    }, [])

// Convert a wallet object to a provider object which can be attached to legacy services
export const walletToProvider = (wallet: Wallet) => {
  return {
    name: wallet.name,
    address: wallet.address,
    description: wallet.description,
    icon: wallet.icon,
    color: wallet.color,
    website: wallet.website,
  }
}

export function extractAllServicesWithProvider(wallets: Wallet[]) {
  return wallets.reduce((acc, wallet) => {
    acc.push(
      ...wallet.services.map(service => ({
        ...service,
        provider: {
          ...walletToProvider(wallet),
          ...service.provider,
        },
      })),
    )
    return acc
  }, [])
}

export function removeEmptyWallets() {
  return (wallets: Wallet[]) =>
    wallets.filter(wallet => {
      return (
        wallet.services.length > 0 ||
        Object.keys(wallet.installLink || []).length > 0
      )
    })
}

export function getInstallLinkForMethod(
  wallet: { installLink?: WalletConfig['installLink'] },
  method: FCL_SERVICE_METHODS,
  deviceInfo: DeviceInfo,
): string | null {
  switch (method) {
    case FCL_SERVICE_METHODS.WC:
      if (deviceInfo.type === DeviceType.MOBILE) {
        return (
          wallet.installLink?.[deviceInfo.platform] ||
          wallet.installLink?.mobile ||
          null
        )
      }
      return wallet.installLink?.mobile || null
    case FCL_SERVICE_METHODS.EXT:
      return (
        wallet.installLink?.[deviceInfo.browser] ||
        wallet.installLink?.browser ||
        null
      )
  }

  return null
}

export function getCompatibleInstallLinks(
  wallet: Wallet,
  supportedStrategies: FCL_SERVICE_METHODS[],
  deviceInfo: DeviceInfo,
) {
  const installLinks: _Wallet['installLink'] = {}
  supportedStrategies.forEach(strategy => {
    switch (strategy) {
      case FCL_SERVICE_METHODS.WC:
        const mobileInstallLink = getInstallLinkForMethod(
          wallet,
          FCL_SERVICE_METHODS.WC,
          deviceInfo,
        )
        if (mobileInstallLink) {
          installLinks.mobile = mobileInstallLink
        }
        break
      case FCL_SERVICE_METHODS.EXT:
        const browserInstallLink = getInstallLinkForMethod(
          wallet,
          FCL_SERVICE_METHODS.EXT,
          deviceInfo,
        )
        if (browserInstallLink) {
          installLinks.browser = browserInstallLink
        }
        break
    }
  })

  return Object.keys(installLinks).length > 0 ? installLinks : null
}

export function processInstallLinks({
  supportedStrategies,
  deviceInfo,
}: {
  supportedStrategies: FCL_SERVICE_METHODS[]
  deviceInfo: DeviceInfo
}) {
  return (wallets: WalletWithRawInstallLink[]): Wallet[] =>
    wallets.map(wallet => {
      const installLinks = getCompatibleInstallLinks(
        wallet,
        supportedStrategies,
        deviceInfo,
      )
      if (installLinks) {
        return {
          ...wallet,
          installLink: installLinks,
        }
      }
      return wallet
    })
}
