import { Box } from '@chakra-ui/react'
import { ComponentProps, memo, useMemo } from 'react'
import QRCodeLib from 'qrcode'

type QRCodeProps = {
  value: string
  size: number
} & ComponentProps<typeof Box>

const QRCode = memo(function QRCode({ value, size, ...props }: QRCodeProps) {
  const flatModules = QRCodeLib.create(value, {
    errorCorrectionLevel: 'H',
  }).modules.data

  const modules: boolean[][] = []
  const length = Math.sqrt(flatModules.length)

  for (let i = 0; i < length; i++) {
    modules.push(
      [...flatModules.slice(i * length, (i + 1) * length)].map(Boolean)
    )
  }

  return (
    <Box {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={`0 0 ${modules.length} ${modules.length}`}
      >
        {modules.map((row, y) =>
          row.map((cell, x) => (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={cell ? 'black' : 'white'}
            />
          ))
        )}
      </svg>
    </Box>
  )
})

export default QRCode
