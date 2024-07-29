import { HStack, Heading, Image, Stack, Text } from '@chakra-ui/react'
import NextImage from 'next/image'
import { isDataURL } from '../helpers/urls'
import HybridButton from './HybridButton'

type WalletTypeCardProps = {
  icon: string
  title: string
  description: string
  button: {
    text: string
  } & (
    | {
        href: string
      }
    | {
        onClick: () => void
      }
  )
}

export default function WalletTypeCard({
  icon,
  title,
  description,
  button: { text: buttonText, ...buttonProps },
}: WalletTypeCardProps) {
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
          borderRadius="xl"
        />
        <Stack pt={1}>
          <Heading size="sm">{title}</Heading>
          <Text color="gray.500">{description}</Text>
          <HybridButton
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
          </HybridButton>
        </Stack>
      </HStack>
    </Stack>
  )
}
