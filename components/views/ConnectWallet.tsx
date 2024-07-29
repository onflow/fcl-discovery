import { Divider, Stack } from '@chakra-ui/react'
import ViewLayout from '../ViewLayout'
import WalletTypeCard from '../WalletTypeCard'
import ChromeIcon from '../Icons/chrome.svg'
import { Wallet } from '../../data/wallets'
import { FCL_SERVICE_METHODS } from '../../helpers/constants'
import { toTitleCase } from '../../helpers/strings'
import { toLower } from 'rambda'
import * as fcl from '@onflow/fcl'
import { Fragment } from 'react'

const CANNONICAL_SERVICE_NAMES = {
  'WC/RPC': 'Mobile App',
  [FCL_SERVICE_METHODS.EXT]: 'Browser Extension',
  [FCL_SERVICE_METHODS.HTTP]: 'Web Browser',
  [FCL_SERVICE_METHODS.TAB]: 'Web Browser',
  [FCL_SERVICE_METHODS.POP]: 'Web Browser',
  [FCL_SERVICE_METHODS.IFRAME]: 'Web Browser',
}

interface GetWalletProps {
  onBack: () => void
  onCloseModal: () => void
  wallet: Wallet
}

export default function ConnectWallet({
  onBack,
  onCloseModal,
  wallet,
}: GetWalletProps) {
  return (
    <ViewLayout
      header={{
        title: `Connect to ${wallet.name}`,
        onBack,
        onClose: onCloseModal,
      }}
    >
      <Stack flexGrow={1} alignItems="center" spacing={4} px={6} pb={6}>
        {wallet.services.map((service, i) => {
          const cannonicalName = CANNONICAL_SERVICE_NAMES[service.method]
          return (
            <Fragment key={i}>
              <WalletTypeCard
                icon={ChromeIcon}
                title={`${wallet.name} ${toTitleCase(cannonicalName)}`}
                description={`Confirm the connection in the ${toLower(
                  cannonicalName
                )}`}
                button={{
                  text: `Connect`,
                  onClick: () => fcl.WalletUtils.redirect(service),
                }}
                unstyled
              ></WalletTypeCard>
              {i < wallet.services.length - 1 && <Divider w="80%" />}
            </Fragment>
          )
        })}
      </Stack>
    </ViewLayout>
  )
}
