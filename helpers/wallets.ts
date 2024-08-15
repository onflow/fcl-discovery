import { pipe } from 'rambda'
import { Service } from '../types'
import { Wallet, WalletConfig } from '../data/wallets'

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
