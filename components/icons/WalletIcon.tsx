import { Image } from '@chakra-ui/react'
import { Wallet } from '../../data/wallets'
import { isDataURL } from '../../helpers/urls'
import NextImage from 'next/image'

type WalletIconProps = {
  wallet: Wallet
} & React.ComponentProps<typeof Image>

export default function WalletIcon({ wallet, ...props }: WalletIconProps) {
  return (
    <Image
      as={isDataURL(wallet.icon) ? 'img' : NextImage}
      alt={wallet.name}
      src={wallet.icon}
      borderRadius="calc(100% / 6.4)"
      bg="#fff"
      {...props}
    ></Image>
  )
}
