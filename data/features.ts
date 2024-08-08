import { theme } from '@chakra-ui/react'

const FEATURES = [
  {
    name: 'account-linking',
    description:
      'Users can link their wallet managed account to their various app accounts, giving them control of their assets.',
  },
]

// Assign a color to each feature
export default FEATURES.map((x, idx) => {
  const colorKeys = Object.keys(theme.colors)
  const colorIndex = idx % colorKeys.length
  const colorKey = colorKeys[colorIndex]
  const color = theme.colors[colorKey][500] || 'gray.500'

  return {
    ...x,
    color: color,
  }
})
