import { Divider, Stack } from '@chakra-ui/react'
import { Wallet } from '../../data/wallets'
import { FCL_SERVICE_METHODS } from '../../helpers/constants'
import { Service } from '../../types'
import { ConnectCard } from '../ConnectCard'
import { Fragment } from 'react'

const IDEAL_SERVICE_ORDER = [FCL_SERVICE_METHODS.EXT, FCL_SERVICE_METHODS.WC]

interface ConnectWalletProps {
  onConnectService: (service: Service) => void
  wallet: Wallet
}

export default function ConnectWallet({
  onConnectService,
  wallet,
}: ConnectWalletProps) {
  // Create entries for each service
  const cardMap = wallet.services.reduce(
    (acc, service, idx) => ({
      ...acc,
      [service.method]: (
        <ConnectCard
          key={service.method}
          onConnect={() => onConnectService(service)}
          wallet={wallet}
          serviceIdx={idx}
        ></ConnectCard>
      ),
    }),
    {} as Record<FCL_SERVICE_METHODS, JSX.Element>,
  )

  // Add install cards for missing services
  if (!cardMap[FCL_SERVICE_METHODS.WC]) {
    cardMap[FCL_SERVICE_METHODS.EXT] = (
      <ConnectCard
        key={FCL_SERVICE_METHODS.EXT}
        onConnect={() => console.log('Connect')}
        wallet={wallet}
        serviceIdx={0}
      ></ConnectCard>
    )
  }

  const sortedCards = Object.entries(cardMap).sort(([a], [b]) => {
    const getIndexOfMethod = (method: string) => {
      const index = IDEAL_SERVICE_ORDER.indexOf(method as FCL_SERVICE_METHODS)
      return index === -1 ? IDEAL_SERVICE_ORDER.length : index
    }
    const aIndex = getIndexOfMethod(a)
    const bIndex = getIndexOfMethod(b)
    const delta = aIndex - bIndex
    return delta === 0 ? a.localeCompare(b) : delta
  })

  return (
    <Stack flexGrow={1} alignItems="center" spacing={4} px={5} pb={5}>
      {sortedCards
        .filter(x => x != null)
        .map(([, card], i) => (
          <Fragment key={card.key}>
            {card}
            {i < sortedCards.length - 1 && <Divider w="90%"></Divider>}
          </Fragment>
        ))}
    </Stack>
  )
}
