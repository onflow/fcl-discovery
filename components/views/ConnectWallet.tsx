import { Divider } from '@chakra-ui/react'
import { Wallet } from '../../data/wallets'
import { Service } from '../../types'
import { ConnectCard } from '../ConnectCard'
import { Fragment, useMemo } from 'react'
import { InstallCard } from '../InstallCard'
import { ViewContainer } from '../layout/ViewContainer'
import { useConfig } from '../../contexts/FclContext'
import { useInstallLinks } from '../../hooks/useInstallLinks'

interface ConnectWalletProps {
  onConnectService: (service: Service) => void
  wallet: Wallet
}

export default function ConnectWallet({
  onConnectService,
  wallet,
}: ConnectWalletProps) {
  const { supportedStrategies } = useConfig()
  const installLinks = useInstallLinks(wallet)
  const cards = useMemo(
    () =>
      supportedStrategies
        .map(method => {
          const serviceIdx = wallet.services.findIndex(s => s.method === method)
          const service = wallet.services[serviceIdx]
          if (service) {
            return (
              <ConnectCard
                key={service.method}
                onConnect={() => onConnectService(service)}
                wallet={wallet}
                serviceIdx={serviceIdx}
              ></ConnectCard>
            )
          }

          const installLink = installLinks[method]
          if (!installLink) {
            return null
          }
          return (
            <InstallCard
              key={method}
              type={method}
              wallet={wallet}
              installLink={installLinks[method]}
              onInstallMobile={() => {}}
            ></InstallCard>
          )
        })
        .filter(x => x != null),
    [wallet, onConnectService, supportedStrategies, installLinks],
  )

  return (
    <ViewContainer alignItems="center" spacing={4}>
      {cards.map((card, i) => (
        <Fragment key={card.key}>
          {card}
          {i < cards.length - 1 && <Divider w="90%"></Divider>}
        </Fragment>
      ))}
    </ViewContainer>
  )
}
