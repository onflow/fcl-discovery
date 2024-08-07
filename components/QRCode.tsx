import { Box, Flex, Image } from '@chakra-ui/react'
import { Fragment, memo } from 'react'
import QRCodeLib from 'qrcode'
import NextImage, { StaticImageData } from 'next/image'
import { isDataURL } from '../helpers/urls'
import { convertToPixels } from '../helpers/sizes'

type QRCodeProps = {
  value: string
  image?: string | StaticImageData
  size?: string
  imageSize?: string
}

const QRCode = memo(function QRCode({
  value,
  image,
  size,
  imageSize,
}: QRCodeProps) {
  const qr = QRCodeLib.create(value, {
    errorCorrectionLevel: 'H',
  })
  const modules1D = qr.modules.data
  const modules: boolean[][] = []
  const length = Math.sqrt(modules1D.length)

  // Check if the module is part of the finder pattern
  const isFindingPattern = (x: number, y: number) =>
    (x < 8 && (y < 8 || y >= length - 8)) || (x >= length - 8 && y < 8)

  // Compute the scale factor so we can determine which modules are behind the image
  let isModuleBehindImage: (x: number, y: number) => boolean = () => false
  if (image) {
    const scaleFactor = length / convertToPixels(size)
    const imageViewboxSize = convertToPixels(imageSize) * scaleFactor
    const imagePadding = 1
    const imageTop = Math.floor((length - imageViewboxSize) / 2 - imagePadding)
    const imageBottom = Math.ceil(
      imageTop + imageViewboxSize + imagePadding * 2,
    )
    const imageLeft = Math.floor((length - imageViewboxSize) / 2 - imagePadding)
    const imageRight = Math.ceil(
      imageLeft + imageViewboxSize + imagePadding * 2,
    )
    isModuleBehindImage = (x: number, y: number) => {
      return (
        x >= imageTop && x < imageBottom && y >= imageLeft && y < imageRight
      )
    }
  }

  for (let i = 0; i < length; i++) {
    modules.push(
      [...modules1D.slice(i * length, (i + 1) * length)].map((bit, j) => {
        return bit && !isFindingPattern(i, j) && !isModuleBehindImage(i, j)
      }),
    )
  }

  // Positions of the finder patterns used for custom rendering
  const findingPatternPositions = [
    [0, 0],
    [0, length - 7],
    [length - 7, 0],
  ]

  return (
    <Box position="relative" width={size} height={size}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${modules.length} ${modules.length}`}
        width={size}
        height={size}
      >
        {modules.map((row, y) =>
          row.map((cell, x) => (
            <circle
              key={`${x}-${y}`}
              cx={x + 0.5}
              cy={y + 0.5}
              r={0.4}
              fill={cell ? 'black' : 'white'}
            />
          )),
        )}

        {findingPatternPositions.map(([x, y]) => (
          <Fragment key={`${x}-${y}`}>
            <rect x={x} y={y} width={7} height={7} fill="black" rx={2} ry={2} />

            <rect
              x={x + 1}
              y={y + 1}
              width={5}
              height={5}
              fill="white"
              rx={1.5}
              ry={1.5}
            />

            <rect x={x + 2} y={y + 2} width={3} height={3} fill="black" />
          </Fragment>
        ))}
      </svg>
      <Flex
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        justifyContent="center"
        alignItems="center"
      >
        {image && (
          <Image
            as={isDataURL(image as any) ? 'img' : NextImage}
            src={image as any}
            alt="QR Code"
            objectFit="contain"
            boxSize={imageSize}
            borderRadius="lg"
          />
        )}
      </Flex>
    </Box>
  )
})

export default QRCode
