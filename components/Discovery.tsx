import { Flex, useModalContext } from '@chakra-ui/react'
import { useState } from 'react'
import { useWallets } from '../hooks/useWallets'

import WalletSelection from './views/WalletSelection'
import ExploreWallets from './views/ExploreWallets'
import GetWallet from './views/GetWallet'
import ScanInstall from './views/ScanInstall'
import { Wallet } from '../data/wallets'

export enum VIEWS {
  WALLET_SELECTION,
  EXPLORE_WALLETS,
  GET_WALLET,
  SCAN_INSTALL,
  SCAN_CONNECT,
}

export default function Discovery() {
  const { wallets, error } = useWallets()
  const [currentView, setCurrentView] = useState<VIEWS>(VIEWS.WALLET_SELECTION)
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null)
  const modal = useModalContext()

  if (!wallets) return <div />
  if (error) return <div>Error Loading Data</div>

  let viewContent = <div />
  switch (currentView) {
    case VIEWS.WALLET_SELECTION:
      viewContent = (
        <WalletSelection
          onSwitchToLearnMore={() => setCurrentView(VIEWS.EXPLORE_WALLETS)}
        />
      )
      break
    case VIEWS.EXPLORE_WALLETS:
      viewContent = (
        <ExploreWallets
          onBack={() => setCurrentView(VIEWS.WALLET_SELECTION)}
          onCloseModal={modal.onClose}
          onGetWallet={wallet => {
            setSelectedWallet(wallet)
            setCurrentView(VIEWS.GET_WALLET)
          }}
        />
      )
      break
    case VIEWS.GET_WALLET:
      viewContent = (
        <GetWallet
          onBack={() => setCurrentView(VIEWS.EXPLORE_WALLETS)}
          onCloseModal={modal.onClose}
          wallet={selectedWallet}
          onGetQRCode={wallet => {
            setSelectedWallet(wallet)
            setCurrentView(VIEWS.SCAN_INSTALL)
          }}
        />
      )
      break
    case VIEWS.SCAN_INSTALL:
      viewContent = (
        <ScanInstall
          onBack={() => setCurrentView(VIEWS.WALLET_SELECTION)}
          onCloseModal={modal.onClose}
          /* TODO: This should link to the CONNECT_WALLET view once added */
          onContinue={() => setCurrentView(VIEWS.WALLET_SELECTION)}
          wallet={selectedWallet}
        />
      )
      break
  }

  return (
    <Flex w={470} h={600} maxH={600} direction="column">
      {viewContent}
    </Flex>
  )
}
