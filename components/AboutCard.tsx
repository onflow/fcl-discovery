import { Flex, Image, Text } from '@chakra-ui/react'
import NextImage, { StaticImageData } from 'next/image'

type AboutCardProps = {
  image: string | StaticImageData
  title: string
  description: string
}

export default function AboutCard({
  image,
  title,
  description,
}: AboutCardProps) {
  return (
    <Flex gap={6} maxW="22rem" alignItems="center">
      <Image
        as={NextImage}
        src={image as any}
        alt="Coinbase Wallet"
        boxSize="3.5rem"
        borderRadius="xl"
      />

      <Flex direction="column" textAlign="left" gap={1}>
        <Text fontSize="sm" as="b">
          {title}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {description}
        </Text>
      </Flex>
    </Flex>
  )
}
