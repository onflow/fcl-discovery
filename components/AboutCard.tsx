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
    <Flex gap={4} maxW="22rem" alignItems="center">
      <Image
        as={NextImage}
        src={image as any}
        alt={title}
        boxSize="3rem"
        borderRadius="xl"
      />

      <Flex direction="column" textAlign="left" gap={1}>
        <Text textStyle="body2Bold">{title}</Text>
        <Text textStyle="body2">{description}</Text>
      </Flex>
    </Flex>
  )
}
