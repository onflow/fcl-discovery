import WalletSelection from './views/WalletSelection'
import ExploreWallets from './views/ExploreWallets'
import GetWallet from './views/GetWallet'
import ScanInstall from './views/ScanInstall'
import ConnectWallet from './views/ConnectWallet'
import ScanConnect from './views/ScanConnect'

import { Flex, useModalContext } from '@chakra-ui/react'
import { ComponentProps, useState } from 'react'
import { useWallets } from '../hooks/useWallets'
import { Wallet } from '../data/wallets'
import * as fcl from '@onflow/fcl'
import ViewHeader from './ViewHeader'
import ViewLayout from './ViewLayout'

export enum VIEWS {
  WALLET_SELECTION,
  EXPLORE_WALLETS,
  GET_WALLET,
  SCAN_INSTALL,
  CONNECT_WALLET,
  SCAN_CONNECT,
  ABOUT_WALLETS,
}

export default function Discovery() {
  const { wallets, error } = useWallets()
  const [currentView, setCurrentView] = useState<VIEWS>(VIEWS.ABOUT_WALLETS)
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null)
  const modal = useModalContext()

  if (!wallets) return <div />
  if (error) return <div>Error Loading Data</div>

  let viewContent = <div />
  let headerProps: ComponentProps<typeof ViewHeader> = {}
  switch (currentView) {
    case VIEWS.WALLET_SELECTION:
      viewContent = (
        <WalletSelection
          onSwitchToLearnMore={() => setCurrentView(VIEWS.EXPLORE_WALLETS)}
          onClickWallet={wallet => {
            setSelectedWallet(wallet)
            if (wallet.services.length === 1) {
              // TODO: make sure WC/RPC behaviour is handled once integrated into Discovery
              // (future PR)
              fcl.WalletUtils.redirect(wallet.services[0])
            } else {
              setCurrentView(VIEWS.CONNECT_WALLET)
            }
          }}
        />
      )
      headerProps = { title: 'Select a Wallet' }
      break
    case VIEWS.EXPLORE_WALLETS:
      viewContent = (
        <ExploreWallets
          onGetWallet={wallet => {
            setSelectedWallet(wallet)
            setCurrentView(VIEWS.GET_WALLET)
          }}
        />
      )
      headerProps = {
        title: 'Get a Wallet',
        onBack: () => setCurrentView(VIEWS.WALLET_SELECTION),
      }
      break
    case VIEWS.GET_WALLET:
      viewContent = (
        <GetWallet
          wallet={selectedWallet}
          onGetQRCode={wallet => {
            setSelectedWallet(wallet)
            setCurrentView(VIEWS.SCAN_INSTALL)
          }}
        />
      )
      headerProps = {
        title: `Get ${selectedWallet?.name}`,
        onBack: () => setCurrentView(VIEWS.EXPLORE_WALLETS),
      }
      break
    case VIEWS.SCAN_INSTALL:
      viewContent = (
        <ScanInstall
          // TODO: Implement next page
          onContinue={() => setCurrentView(VIEWS.WALLET_SELECTION)}
          wallet={selectedWallet}
        />
      )
      headerProps = {
        title: `Install ${selectedWallet?.name}`,
        onBack: () => setCurrentView(VIEWS.WALLET_SELECTION),
      }
      break
    case VIEWS.CONNECT_WALLET:
      viewContent = (
        <ConnectWallet
          onConnectQRCode={() => setCurrentView(VIEWS.SCAN_CONNECT)}
          wallet={selectedWallet}
        />
      )
      headerProps = {
        title: `Connect to ${selectedWallet?.name}`,
        onBack: () => setCurrentView(VIEWS.WALLET_SELECTION),
      }
      break
    case VIEWS.SCAN_CONNECT:
      viewContent = <ScanConnect wallet={selectedWallet} />
      headerProps = {
        title: `Connect to ${selectedWallet.name}`,
        onBack: () => setCurrentView(VIEWS.WALLET_SELECTION),
      }
    case VIEWS.ABOUT_WALLETS:
      viewContent = <div>TODO: About Wallets</div>
      headerProps = {}
      break
  }

  return (
    <ViewLayout
      header={{ onClose: modal.onClose, ...headerProps }}
      sidebar={
        <WalletSelection
          onSwitchToLearnMore={() => setCurrentView(VIEWS.EXPLORE_WALLETS)}
          onClickWallet={wallet => {
            setSelectedWallet(wallet)
            if (wallet.services.length === 1) {
              // TODO: make sure WC/RPC behaviour is handled once integrated into Discovery
              // (future PR)
              fcl.WalletUtils.redirect(wallet.services[0])
            } else {
              setCurrentView(VIEWS.CONNECT_WALLET)
            }
          }}
        />
      }
    >
      {viewContent}
    </ViewLayout>
  )
}
