import { clone, concat, filter, flip, map, pipe } from 'rambda'
import { Wallet } from '../data/wallets'
import { Service } from '../types'
import { ServiceWithWallet } from './wallets'
import { filterUniqueServices } from './services'

type InjectionPipeValue = [
  injectedServices: (ServiceWithWallet | Service)[],
  newWallets: Record<string, Wallet>
]

type WalletIdMap = {
  serviceUidToWalletUid: Record<string, string>
  providerAddressToWalletUid: Record<string, string>
}

export const injectClientServices =
  (clientServices: Service[] = []) =>
  (wallets: Wallet[] = []) => {
    const [injectedServices, newWallets] = pipe(
      assignServiceWallets(wallets),
      deriveWalletsFromUnknownServices
    )([clientServices, {}])

    const updatedWallets = concat(wallets, Object.values(newWallets))

    return updatedWallets.map(wallet => {
      const newServices = pipe(
        // Find corresponding services
        filter(
          (service: ServiceWithWallet) => service.walletUid === wallet.uid
        ),
        // Remove wallet uid
        map(({ walletUid: _, ...service }) => service),
        // Add original services
        flip(concat<Service>)(wallet.services),
        // Filter out duplicates
        filterUniqueServices({
          address: true,
          uid: true,
        })
      )(injectedServices as ServiceWithWallet[])

      const newWallet = clone(wallet)
      newWallet.services = newServices
      return newWallet
    })
  }

// Generate lookup table to map service uid/addr to wallet uid
export const generateWalletIdMap = (wallets: Wallet[]) =>
  wallets.reduce(
    (acc, wallet) => {
      wallet.services.forEach(service => {
        acc.serviceUidToWalletUid[service.uid] = wallet.uid
        if (service.provider?.address) {
          acc.providerAddressToWalletUid[service.provider.address] = wallet.uid
        }
      })
      return acc
    },
    {
      serviceUidToWalletUid: {},
      providerAddressToWalletUid: {},
    } as WalletIdMap
  )

export const assignServiceWallets =
  (wallets: Wallet[]) =>
  ([services, newWallets]: InjectionPipeValue): [
    injectedServices: ServiceWithWallet[],
    newWallets: Record<string, Wallet>
  ] => {
    const walletIdMap = generateWalletIdMap(wallets)
    return [
      services.map(service => {
        const walletUid =
          walletIdMap.serviceUidToWalletUid[service.uid] ||
          walletIdMap.providerAddressToWalletUid[service?.provider?.address]
        return {
          ...service,
          walletUid,
        }
      }),
      newWallets,
    ]
  }

export const deriveWalletsFromUnknownServices = ([
  services,
  newWallets,
]: InjectionPipeValue): InjectionPipeValue =>
  services.reduce(
    ([services, newWallets], service) => {
      if ((service as ServiceWithWallet).walletUid) {
        services.push(service)
        return [services, newWallets]
      }
      const newWallet = injectedServiceToWallet(service)
      newWallets[newWallet.uid] = newWallet
      services.push({
        ...service,
      })
      return [services, newWallets]
    },
    [[], clone(newWallets)] as InjectionPipeValue
  )

// Support legacy injected services which do not have an associated wallet known
export const injectedServiceToWallet = (service: Service) => {
  const provider = service.provider
  const wallet: Wallet = {
    name: provider.name || 'Unknown Wallet',
    uid: provider.address || service.uid,
    address: provider.address,
    description: provider.description || '',
    color: provider.color || '',
    website: provider.website || '',
    supportEmail: provider.supportEmail,
    icon: provider.icon || '',
    installLink: {
      chrome: provider?.['install_link'] || '',
    },
    services: [],
  }
  return wallet
}
