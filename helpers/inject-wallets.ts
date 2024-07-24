import { clone, concat, pipe } from 'rambda'
import { Wallet } from '../data/wallets'
import { Provider, Service } from '../types'
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

export const injectClientServices = (
  clientServices: Service[] = [],
  wallets: Wallet[] = []
) => {
  const [injectedServices, newWallets] = pipe(
    assignServiceWallets(wallets),
    deriveWalletsFromUnknownServices
  )([clientServices, {}])

  const updatedWallets = concat(wallets, Object.values(newWallets))

  return updatedWallets.map(wallet => {
    const newServices = (injectedServices as ServiceWithWallet[]).filter(
      service => service.walletUid === wallet.uid
    )
    if (!newServices.length) {
      return wallet
    }

    const newWallet = clone(wallet)
    newWallet.services = filterUniqueServices({
      address: true,
      uid: true,
    })(concat(newServices, wallet.services))

    return newWallet
  })
}

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
      const newWallet = legacyProviderToWallet(service.provider)
      newWallets[newWallet.uid] = newWallet
      services.push({
        ...service,
        walletUid: newWallet.uid,
      })
      return [services, newWallets]
    },
    [[], clone(newWallets)] as InjectionPipeValue
  )

export const legacyProviderToWallet = (provider: Provider) => {
  const wallet: Wallet = {
    name: provider.name || 'Unknown Wallet',
    uid: provider.address,
    address: provider.address,
    description: provider.description || '',
    color: provider.color || '',
    website: provider.website || '',
    supportEmail: provider.supportEmail,
    icon: provider.icon || '',
    services: [],
  }
  return wallet
}
