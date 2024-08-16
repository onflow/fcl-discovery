import { Image } from '@chakra-ui/react'
import { Wallet } from '../../data/wallets'

type WalletIconProps = {
  wallet: Wallet
} & React.ComponentProps<typeof Image>

export default function WalletIcon({ wallet, ...props }: WalletIconProps) {
  return (
    <Image
      alt={wallet.name}
      src={wallet.icon}
      borderRadius="calc(100% / 4.8)"
      bg="#fff"
      {...props}
    ></Image>
  )
}
