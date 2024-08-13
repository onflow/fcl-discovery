import WalletSelection from './views/WalletSelection'
import ExploreWallets from './views/ExploreWallets'
import GetWallet from './views/GetWallet'
import InstallApp from './views/InstallApp/InstallApp'
import ConnectWallet from './views/ConnectWallet'
import ScanConnect from './views/ScanConnect/ScanConnect'
import AboutWallets from './views/AboutWallets'
import ConnectExtension from './views/ConnectExtension'

import { ComponentProps, useCallback, useEffect, useState } from 'react'
import { useWallets } from '../hooks/useWallets'
import { Wallet } from '../data/wallets'
import * as fcl from '@onflow/fcl'
import ViewHeader from './ViewHeader'
import ViewLayout from './ViewLayout'
import { FCL_SERVICE_METHODS } from '../helpers/constants'
import { useIsCollapsed } from '../hooks/useIsCollapsed'
import { Service } from '../types'
import { useRpc } from '../contexts/FclContext'
import { handleCancel } from '../helpers/window'
import { useDevice } from '../contexts/DeviceContext'
import { DeviceType } from '../helpers/device-info'
import { useInstallLinks } from '../hooks/useInstallLinks'

export enum VIEWS {
  WALLET_SELECTION,
  EXPLORE_WALLETS,
  GET_WALLET,
  INSTALL_APP,
  CONNECT_WALLET,
  SCAN_CONNECT,
  ABOUT_WALLETS,
  CONNECT_EXTENSION,
}

export default function Discovery() {
  const { wallets, error } = useWallets()
  const [currentView, setCurrentView] = useState<VIEWS>(VIEWS.ABOUT_WALLETS)
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null)
  const { deviceInfo } = useDevice()
  const installLinks = useInstallLinks(selectedWallet)
  const { rpcEnabled } = useRpc()

  // WALLET_SELECTION does not exist when expanded
  // We may need to adjust the current view when the sidebar is collapsed
  const isCollapsed = useIsCollapsed()
  useEffect(() => {
    setCurrentView(v => {
      if (v === VIEWS.ABOUT_WALLETS && isCollapsed) {
        return VIEWS.WALLET_SELECTION
      } else if (v === VIEWS.WALLET_SELECTION && !isCollapsed) {
        return VIEWS.ABOUT_WALLETS
      }
      return v
    })
  }, [isCollapsed])

  const connectWalletService = useCallback(
    (wallet: Wallet, service: Service) => {
      if (service.method === FCL_SERVICE_METHODS.WC && rpcEnabled) {
        setCurrentView(VIEWS.SCAN_CONNECT)
      } else if (service.method === FCL_SERVICE_METHODS.EXT && rpcEnabled) {
        setCurrentView(VIEWS.CONNECT_EXTENSION)
      } else {
        fcl.WalletUtils.redirect(service)
      }

      setSelectedWallet(wallet)
    },
    [],
  )

  const onSelectWallet = useCallback((wallet: Wallet) => {
    setSelectedWallet(wallet)
    if (wallet.services.length === 1) {
      connectWalletService(wallet, wallet.services[0])
    } else {
      setCurrentView(VIEWS.CONNECT_WALLET)
    }
  }, [])

  const onBackToConnectWallet = useCallback(() => {
    if (selectedWallet?.services.length === 1) {
      setCurrentView(VIEWS.ABOUT_WALLETS)
      setSelectedWallet(null)
    } else {
      setCurrentView(VIEWS.CONNECT_WALLET)
    }
  }, [selectedWallet])

  if (!wallets) return <div />
  if (error) return <div>Error Loading Data</div>

  let viewContent = <div />
  let headerProps: ComponentProps<typeof ViewHeader> = {}
  switch (currentView) {
    case VIEWS.WALLET_SELECTION:
      viewContent = (
        <WalletSelection
          onSwitchToLearnMore={() => setCurrentView(VIEWS.ABOUT_WALLETS)}
          onSelectWallet={onSelectWallet}
        />
      )
      headerProps = { title: 'Select a Wallet' }
      break
    case VIEWS.ABOUT_WALLETS:
      viewContent = (
        <AboutWallets
          onGetWallet={() => setCurrentView(VIEWS.EXPLORE_WALLETS)}
        />
      )
      headerProps = {
        onBack: isCollapsed
          ? () => setCurrentView(VIEWS.WALLET_SELECTION)
          : undefined,
        title: isCollapsed ? 'What is a Wallet?' : undefined,
      }
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
        onBack: () => setCurrentView(VIEWS.ABOUT_WALLETS),
      }
      break
    case VIEWS.GET_WALLET:
      viewContent = (
        <GetWallet
          wallet={selectedWallet}
          onGetQRCode={wallet => {
            setSelectedWallet(wallet)
            setCurrentView(VIEWS.SCAN_CONNECT)
            if (deviceInfo.type === DeviceType.MOBILE) {
              window.open(installLinks['WC/RPC'], '_blank')
            }
          }}
        />
      )
      headerProps = {
        title: `Get ${selectedWallet?.name}`,
        onBack: () => {
          setCurrentView(VIEWS.EXPLORE_WALLETS)
          setSelectedWallet(null)
        },
      }
      break
    case VIEWS.INSTALL_APP:
      viewContent = (
        <InstallApp
          onContinue={() => {
            setCurrentView(VIEWS.SCAN_CONNECT)
          }}
          wallet={selectedWallet}
        />
      )
      headerProps = {
        title: `Install ${selectedWallet?.name}`,
        onBack: () => setCurrentView(VIEWS.GET_WALLET),
      }
      break
    case VIEWS.CONNECT_WALLET:
      viewContent = (
        <ConnectWallet
          onConnectService={service =>
            connectWalletService(selectedWallet, service)
          }
          wallet={selectedWallet}
        />
      )
      headerProps = {
        title: `Connect to ${selectedWallet?.name}`,
        onBack: () => {
          setCurrentView(VIEWS.ABOUT_WALLETS)
          setSelectedWallet(null)
        },
      }
      break
    case VIEWS.SCAN_CONNECT:
      viewContent = (
        <ScanConnect
          wallet={selectedWallet}
          onGetWallet={() => {
            setCurrentView(VIEWS.INSTALL_APP)
          }}
        />
      )
      headerProps = {
        title: `Connect to ${selectedWallet.name}`,
        onBack: onBackToConnectWallet,
      }
      break
    case VIEWS.CONNECT_EXTENSION:
      viewContent = <ConnectExtension wallet={selectedWallet} />
      headerProps = {
        title: `Connect to ${selectedWallet.name}`,
        onBack: onBackToConnectWallet,
      }
      break
  }

  return (
    <ViewLayout
      header={<ViewHeader {...{ onClose: handleCancel, ...headerProps }} />}
      sidebarHeader={
        <ViewHeader
          title="Connect a Wallet"
          titleProps={{ textAlign: 'left' }}
          titleOnly
        />
      }
      sidebar={
        <WalletSelection
          selectedWallet={selectedWallet}
          onSelectWallet={onSelectWallet}
        />
      }
    >
      {viewContent}
    </ViewLayout>
  )
}
