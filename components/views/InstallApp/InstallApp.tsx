import { Wallet } from '../../../data/wallets'
import { useDevice } from '../../../contexts/DeviceContext'
import { DeviceType } from '../../../helpers/device'
import InstallAppDesktop from './InstallAppDesktop'
import InstallAppMobile from './InstallAppMobile'

interface InstallAppProps {
  onContinue: () => void
  wallet: Wallet
}

export default function InstallApp({ onContinue, wallet }: InstallAppProps) {
  const { deviceInfo } = useDevice()

  if (deviceInfo.type === DeviceType.MOBILE) {
    return <InstallAppMobile onContinue={onContinue} wallet={wallet} />
  }

  return <InstallAppDesktop onContinue={onContinue} wallet={wallet} />
}
