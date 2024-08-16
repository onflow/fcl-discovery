import { Wallet } from '../../data/wallets'
import { InstallCard } from '../InstallCard'
import { useConfig } from '../../contexts/FclContext'
import { ViewContainer } from '../layout/ViewContainer'
import { Fragment, useMemo } from 'react'
import { useInstallLinks } from '../../hooks/useInstallLinks'
import { Divider } from '@chakra-ui/react'

interface GetWalletProps {
  onInstallMobile: (wallet: Wallet) => void
  wallet: Wallet
}

export default function GetWallet({ wallet, onInstallMobile }: GetWalletProps) {
  const { supportedStrategies } = useConfig()
  const installLinks = useInstallLinks(wallet)

  const cards = useMemo(
    () =>
      supportedStrategies
        .map(method => {
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
              onInstallMobile={() => onInstallMobile(wallet)}
            ></InstallCard>
          )
        })
        .filter(x => x != null),
    [wallet, supportedStrategies, onInstallMobile, installLinks],
  )

  return (
    <ViewContainer alignItems="center" spacing={4}>
      {cards.map((card, i) => (
        <Fragment key={card.key}>
          {card}
          {i < cards.length - 1 && <Divider w="90%" />}
        </Fragment>
      ))}
    </ViewContainer>
  )
}
