import { Wallet } from '../../../data/wallets'
import ScanConnectDesktop from './ScanConnectDesktop'
import ScanConnectMobile from './ScanConnectMobile'
import { useDevice } from '../../../contexts/DeviceContext'
import { DeviceType } from '../../../helpers/device'

interface ScanConnectProps {
  wallet: Wallet
  onGetWallet: () => void
}

export default function ScanConnect({ wallet, onGetWallet }: ScanConnectProps) {
  const isMobile = useDevice().deviceInfo.type === DeviceType.MOBILE

  if (isMobile) {
    return <ScanConnectMobile wallet={wallet} onGetWallet={onGetWallet} />
  }

  return <ScanConnectDesktop wallet={wallet} onGetWallet={onGetWallet} />
}
