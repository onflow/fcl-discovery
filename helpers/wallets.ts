import { pipe } from 'rambda'
import { Service, ServicesPipeFactory } from '../types'
import { Wallet, WalletConfig } from '../data/wallets'
import { injectClientServices } from './inject-wallets'

export type ServiceWithWallet = Service & { walletUid: string }

export const getWalletPipe = ({
  network,
  clientServices,
  makeServicesPipe,
}: {
  network: string
  clientServices: ServiceWithWallet[]
  makeServicesPipe: ServicesPipeFactory
}) =>
  pipe(
    walletsForNetwork(network),
    injectClientServices(clientServices),
    transformWalletServices(makeServicesPipe)
  )

export const transformWalletServices =
  (makeServicesPipe: ServicesPipeFactory) => (wallets: Wallet[]) =>
    pipe(
      extractWalletServices(true),
      makeServicesPipe({ wallets }),
      collectWalletsFromServices({ wallets })
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
