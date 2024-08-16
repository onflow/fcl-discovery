import { Wallet } from '../../../data/wallets'
import { useDevice } from '../../../contexts/DeviceContext'
import { DeviceType } from '../../../helpers/device'
import { Service } from '../../../types'
import { FCL_SERVICE_METHODS } from '../../../helpers/constants'

import InstallAppDesktop from './InstallAppDesktop'
import InstallAppMobile from './InstallAppMobile'

interface InstallAppProps {
  connectWalletService: (wallet: Wallet, service: Service) => void
  wallet: Wallet
}

export default function InstallApp({
  connectWalletService,
  wallet,
}: InstallAppProps) {
  const { deviceInfo } = useDevice()

  function onContinue() {
    connectWalletService(
      wallet,
      wallet.services.find(
        service => service.method === FCL_SERVICE_METHODS.WC,
      ),
    )
  }

  if (deviceInfo.type === DeviceType.MOBILE) {
    return <InstallAppMobile onContinue={onContinue} wallet={wallet} />
  }

  return <InstallAppDesktop onContinue={onContinue} wallet={wallet} />
}
