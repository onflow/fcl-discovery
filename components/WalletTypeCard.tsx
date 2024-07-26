import { Button, HStack, Heading, Image, Stack, Text } from '@chakra-ui/react'
import NextImage from 'next/image'
import Link from 'next/link'
import { ComponentProps } from 'react'
import { isDataURL } from '../helpers/urls'

type WalletTypeCardBaseProps = {
  icon: string
  title: string
  description: string
  buttonText: string
}

type LinkVariantProps = {
  variant: 'link'
  href: string
} & WalletTypeCardBaseProps

type ButtonVariantProps = {
  variant: 'button'
  onButtonClick: () => void
} & WalletTypeCardBaseProps

type WalletTypeCardProps = LinkVariantProps | ButtonVariantProps

export function WalletTypeCard(props: LinkVariantProps)
export function WalletTypeCard(props: ButtonVariantProps)
export default function WalletTypeCard({
  variant,
  icon,
  title,
  description,
  buttonText,
  ...otherProps
}: WalletTypeCardProps) {
  let buttonProps: ComponentProps<typeof Button>
  switch (variant) {
    case 'link': {
      const { href } = otherProps as LinkVariantProps
      buttonProps = {
        as: Link,
        href,
        target: '_blank',
      }
      break
    }
    case 'button': {
      const { onButtonClick } = otherProps as ButtonVariantProps
      buttonProps = {
        onClick: onButtonClick,
      }
      break
    }
    default:
      break
  }

  return (
    <Stack
      borderWidth="1px"
      borderRadius="2xl"
      flex={1}
      width="100%"
      justifyContent="center"
      alignItems="center"
      backgroundColor="gray.100"
    >
      <HStack p={4} w="sm" spacing={8}>
        <Image
          as={isDataURL(icon) ? 'img' : NextImage}
          src={icon}
          alt={title}
          boxSize="5rem"
          alignSelf="start"
        />
        <Stack pt={1}>
          <Heading size="sm">{title}</Heading>
          <Text color="gray.500">{description}</Text>
          <Button
            size="sm"
            colorScheme="blue"
            alignSelf="flex-start"
            borderRadius="full"
            fontWeight="bold"
            fontSize="sm"
            mt={2}
            {...buttonProps}
          >
            {buttonText}
          </Button>
        </Stack>
      </HStack>
    </Stack>
  )
}
