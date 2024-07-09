import { Box, useModalContext } from '@chakra-ui/react'
import { useState } from 'react'
import { useWallets } from '../../hooks/useWallets'
import GetWallet from './GetWallet'
import WalletSelection from './WalletSelection'

export default function Discovery() {
  const { wallets, error } = useWallets()
  const [learnMoreOpen, setLearnMoreOpen] = useState(false)
  const modal = useModalContext()

  if (!wallets) return <div />
  if (error) return <div>Error Loading Data</div>

  return (
    <Box w={470} maxH={600}>
      {learnMoreOpen ? (
        <GetWallet
          onBack={() => setLearnMoreOpen(false)}
          onCloseModal={modal.onClose}
        />
      ) : (
        <WalletSelection onSwitchToLearnMore={() => setLearnMoreOpen(true)} />
      )}
    </Box>
  )
}
