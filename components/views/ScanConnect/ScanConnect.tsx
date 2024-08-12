import { Wallet } from '../../../data/wallets'
import ScanConnectDesktop from './ScanConnectDesktop'
import ScanConnectMobile from './ScanConnectMobile'
import { useDeviceInfo } from '../../../contexts/DeviceInfoContext'

interface ScanConnectProps {
  wallet: Wallet
  onGetWallet: () => void
}

export default function ScanConnect({ wallet, onGetWallet }: ScanConnectProps) {
  const isMobile = useDeviceInfo().isMobile

  if (isMobile) {
    return <ScanConnectMobile wallet={wallet} onGetWallet={onGetWallet} />
  }

  return <ScanConnectDesktop wallet={wallet} onGetWallet={onGetWallet} />
}
