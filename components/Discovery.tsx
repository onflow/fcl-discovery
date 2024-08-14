import WalletSelection from './views/WalletSelection'
import ExploreWallets from './views/ExploreWallets'
import GetWallet from './views/GetWallet'
import InstallApp from './views/InstallApp/InstallApp'
import ConnectWallet from './views/ConnectWallet'
import ScanConnect from './views/ScanConnect/ScanConnect'
import AboutWallets from './views/AboutWallets'
import ConnectExtension from './views/ConnectExtension'

import { ComponentProps, useEffect, useMemo, useState } from 'react'
import { useWallets } from '../hooks/useWallets'
import { Wallet } from '../data/wallets'
import * as fcl from '@onflow/fcl'
import ViewHeader from './layout/ViewHeader'
import ViewLayout from './layout/ViewLayout'
import { FCL_SERVICE_METHODS } from '../helpers/constants'
import { useIsCollapsed } from '../hooks/useIsCollapsed'
import { Service } from '../types'
import { useRpc } from '../contexts/FclContext'
import { handleCancel } from '../helpers/window'
import { useDevice } from '../contexts/DeviceContext'
import { DeviceType } from '../helpers/device'

export enum VIEWS {
  WALLET_SELECTION,
  EXPLORE_WALLETS,
  GET_WALLET,
  INSTALL_APP,
  INSTALL_APP_FROM_CONNECT,
  CONNECT_WALLET,
  SCAN_CONNECT,
  SCAN_CONNECT_SKIP_DEEPLINK,
  ABOUT_WALLETS,
  CONNECT_EXTENSION,
}

export default function Discovery() {
  const { wallets, error } = useWallets()
  const [currentView, setCurrentView] = useState<VIEWS>(VIEWS.ABOUT_WALLETS)
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null)
  const { deviceInfo } = useDevice()
  const { rpcEnabled } = useRpc()

  // Skip the connect page if there is only one service available
  const shouldSkipConnectPage = (wallet: Wallet) =>
    new Set(
      [
        ...(wallet?.services?.map(s => s.method) || []),
        ...Object.keys(wallet?.installLink || {}).map(k =>
          k === 'mobile'
            ? FCL_SERVICE_METHODS.WC
            : k === 'browser'
              ? FCL_SERVICE_METHODS.EXT
              : null,
        ),
      ].filter(Boolean),
    ).size <= 1 && wallet?.services?.length >= 1

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

  const connectWalletService = (wallet: Wallet, service: Service) => {
    if (service.method === FCL_SERVICE_METHODS.WC && rpcEnabled) {
      setCurrentView(VIEWS.SCAN_CONNECT)
    } else if (service.method === FCL_SERVICE_METHODS.EXT && rpcEnabled) {
      setCurrentView(VIEWS.CONNECT_EXTENSION)
    } else {
      fcl.WalletUtils.redirect(service)
    }

    setSelectedWallet(wallet)
  }

  const onSelectWallet = (wallet: Wallet) => {
    setSelectedWallet(wallet)
    console.log('wallet', wallet)
    if (shouldSkipConnectPage(wallet)) {
      connectWalletService(wallet, wallet.services[0])
    } else {
      setCurrentView(VIEWS.CONNECT_WALLET)
    }
  }

  const backToHome = () => {
    if (deviceInfo.type === DeviceType.MOBILE) {
      setCurrentView(VIEWS.WALLET_SELECTION)
    } else {
      setCurrentView(VIEWS.ABOUT_WALLETS)
    }
    setSelectedWallet(null)
  }

  const backToConnectWallet = () => {
    if (shouldSkipConnectPage(selectedWallet)) {
      backToHome()
    } else {
      setCurrentView(VIEWS.CONNECT_WALLET)
    }
  }

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
          onInstallMobile={wallet => {
            setSelectedWallet(wallet)
            setCurrentView(VIEWS.INSTALL_APP)
            if (deviceInfo.type === DeviceType.MOBILE) {
              window.open(wallet?.installLink?.mobile, '_blank')
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
    case VIEWS.INSTALL_APP_FROM_CONNECT:
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
        onBack: () => {
          if (currentView === VIEWS.INSTALL_APP) {
            setCurrentView(VIEWS.GET_WALLET)
          } else {
            setCurrentView(VIEWS.SCAN_CONNECT_SKIP_DEEPLINK)
          }
        },
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
        onBack: backToHome,
      }
      break
    case VIEWS.SCAN_CONNECT:
    case VIEWS.SCAN_CONNECT_SKIP_DEEPLINK:
      viewContent = (
        <ScanConnect
          wallet={selectedWallet}
          onGetWallet={() => {
            setCurrentView(VIEWS.INSTALL_APP_FROM_CONNECT)
            // TODO: temp until navigation refactor
            if (deviceInfo.type === DeviceType.MOBILE) {
              window.open(selectedWallet?.installLink?.mobile, '_blank')
            }
          }}
          noDeepLink={currentView === VIEWS.SCAN_CONNECT_SKIP_DEEPLINK}
        />
      )
      headerProps = {
        title: `Connect to ${selectedWallet.name}`,
        onBack: backToConnectWallet,
      }
      break
    case VIEWS.CONNECT_EXTENSION:
      viewContent = <ConnectExtension wallet={selectedWallet} />
      headerProps = {
        title: `Connect to ${selectedWallet.name}`,
        onBack: backToConnectWallet,
      }
      break
  }

  return (
    <ViewLayout
      header={<ViewHeader {...{ onClose: handleCancel, ...headerProps }} />}
      sidebarHeader={
        <ViewHeader
          title="Connect a Wallet"
          titleProps={{ textAlign: 'left', width: 'full' }}
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
