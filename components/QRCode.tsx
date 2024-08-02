import { Box, Image } from '@chakra-ui/react'
import { memo } from 'react'
import QRCodeLib from 'qrcode'
import NextImage, { StaticImageData } from 'next/image'

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

  const isFindingPattern = (x: number, y: number) =>
    (x < 8 && (y < 8 || y >= length - 8)) || (x >= length - 8 && y < 8)

  for (let i = 0; i < length; i++) {
    modules.push(
      [...modules1D.slice(i * length, (i + 1) * length)].map((bit, j) => {
        return bit && !isFindingPattern(i, j)
      })
    )
  }

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
          ))
        )}

        {findingPatternPositions.map(([x, y]) => (
          <>
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={7}
              height={7}
              fill="black"
              rx={2}
              ry={2}
            />

            <rect
              key={`${x}-${y}-inner`}
              x={x + 1}
              y={y + 1}
              width={5}
              height={5}
              fill="white"
              rx={1.5}
              ry={1.5}
            />

            <rect
              key={`${x}-${y}-inner2`}
              x={x + 2}
              y={y + 2}
              width={3}
              height={3}
              fill="black"
            />
          </>
        ))}
      </svg>
      <Box
        position="absolute"
        top={`calc(50% - ${imageSize} / 2)`}
        left={`calc(50% - ${imageSize} / 2)`}
        width={imageSize}
        height={imageSize}
        bg="white"
      >
        <Image
          as={NextImage}
          src={image as any}
          alt="QR Code"
          layout="fill"
          objectFit="contain"
          boxSize={imageSize}
          borderRadius="lg"
        />
      </Box>
    </Box>
  )
})

export default QRCode
