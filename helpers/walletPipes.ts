import { clone, identity, partial, pipe } from 'rambda'
import { filterUniqueServices } from './services'
import { nextJsImageToBase64 } from './image'
import { Service, ServicesPipeFactory } from '../types'
import { Wallet, WalletConfig } from '../data/wallets'

export type ServiceWithWallet = Service & { walletUid: string }
type WalletConfigWithProcessedIcon = Omit<WalletConfig, 'icon'> & {
  icon: string
}

export const getWalletPipe = ({
  network,
  clientServices,
  servicePipeFactory,
}: {
  network: string
  clientServices: ServiceWithWallet[]
  servicePipeFactory: ServicesPipeFactory
}) =>
  pipe(
    walletIconsToBase64,
    walletsForNetwork(network),
    partial(injectClientServices, clientServices),
    transformWalletServices(servicePipeFactory)
  )

export const transformWalletServices =
  (servicePipeFactory: ServicesPipeFactory) => (wallets: Wallet[]) =>
    pipe(
      extractWalletServices(true),
      servicePipeFactory({ wallets }),
      collectWalletsFromServices(wallets)
    )(wallets)

export const extractWalletServices =
  <T extends boolean>(withId: T) =>
  (wallets: Wallet[]): (T extends true ? ServiceWithWallet : Service)[] =>
    wallets.reduce((acc, wallet) => {
      acc.push(
        ...wallet.services.map(service => ({
          ...service,
          walletUid: withId ? wallet.uid : undefined,
        }))
      )
      return acc
    }, [])

export const injectClientServices = (
  clientServices: ServiceWithWallet[] = [],
  wallets: Wallet[] = []
) => {
  const { walletMap, services } = wallets.reduce(
    ({ walletMap, services }, wallet) => {
      wallet.services?.forEach(service => {
        const addr = service?.provider?.address || wallet?.address
        const uid = service?.uid
        if (addr) walletMap[addr] = wallet.uid
        if (uid) walletMap[uid] = wallet.uid
      })
      return {
        walletMap,
        services: [
          ...services,
          ...wallet.services.map(service => ({
            ...service,
            walletUid: wallet.uid,
          })),
        ],
      }
    },
    { walletMap: {}, services: [] }
  )

  const injectedServices = clientServices.map(srv => {
    const service = clone(srv)
    const walletUid = walletMap[service?.provider?.address]
    if (walletUid) {
      service.walletUid = walletUid
    } else {
      // TODO: Handle this case
      throw new Error(
        `Wallet not found for service with address ${service?.provider?.address}`
      )
    }
    return service
  })

  const unique = filterUniqueServices({ address: true, uid: false })([
    ...injectedServices,
    ...services,
  ])

  return collectWalletsFromServices(wallets)(unique)
}

export const walletsForNetwork =
  (network: string) =>
  (wallets: WalletConfigWithProcessedIcon[] = []): Wallet[] =>
    wallets
      .filter(wallet => wallet.services[network])
      .map(wallet => ({
        ...wallet,
        services: wallet.services[network],
      }))

export const walletIconsToBase64 = (
  wallets: WalletConfig[]
): WalletConfigWithProcessedIcon[] =>
  wallets.map((wallet: WalletConfig) => ({
    ...wallet,
    icon: wallet.icon ? nextJsImageToBase64(wallet.icon) : undefined,
  }))

export const collectWalletsFromServices =
  (wallets: Wallet[]) => (services: ServiceWithWallet[]) =>
    services.reduce((acc, service) => {
      const existingWalletIdx = acc.findIndex(
        wallet => wallet.uid === service.walletUid
      )

      if (existingWalletIdx === -1) {
        const wallet = wallets.find(wallet => wallet.uid === service.walletUid)
        acc.push({
          ...wallet,
          services: [service],
        })
      } else {
        // Append service without reference to wallet
        const { walletUid, ...serviceWithoutWallet } = service
        acc[existingWalletIdx].services.push(serviceWithoutWallet)
      }
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
