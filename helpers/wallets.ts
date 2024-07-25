import { pipe } from 'rambda'
import { Service } from '../types'
import { Wallet, WalletConfig } from '../data/wallets'

export type ServiceWithWallet = Service & { walletUid: string }
export type ServicesPipeFactory = (args: {
  wallets: Wallet[]
}) => (services: ServiceWithWallet[]) => ServiceWithWallet[]

export const pipeWalletServices =
  (makeServicesPipe: ServicesPipeFactory) => (wallets: Wallet[]) =>
    pipe(
      extractWalletServices,
      makeServicesPipe({ wallets }),
      collectWalletsFromServices({ wallets })
    )(wallets)

export const extractWalletServices = (wallets: Wallet[]): ServiceWithWallet[] =>
  wallets.reduce((acc, wallet) => {
    acc.push(
      ...wallet.services.map(service => ({
        ...service,
        walletUid: wallet.uid,
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
