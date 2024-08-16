export const baseColors = {
  primary: {
    '50': '#94B8FF',
    '100': '#7FA9FF',
    '200': '#699BFF',
    '300': '#548DFF',
    '400': '#3E7EFF',
    '500': '#2970FF',
    '600': '#2565E6',
    '700': '#215ACC',
    '800': '#1D4EB3',
    '900': '#194399',
  },
}

const lightColors = {
  background: '#FFFFFF',
  backgroundElevated: '#F7F7F7',
  buttonBackground: '#F2F2F2',
  borderColor: '#E0E0E0',
  foreground: {
    base: '#000000',
    '60%': 'rgba(0, 0, 0, 0.6)',
  },
}

const darkColors = {
  background: '#1C1C1E',
  backgroundElevated: '#2C2C2E',
  buttonBackground: '#2C2C2E',
  borderColor: '#3A3A3C',
  foreground: {
    base: '#FFFFFF',
    '60%': 'rgba(255, 255, 255, 0.6)',
  },
} as typeof lightColors

export const semanticColorTokens: Record<string, any> = {}
Object.entries(lightColors).forEach(([colorKey, colorValue]) => {
  if (typeof colorValue === 'string') {
    semanticColorTokens[colorKey] = {
      default: colorValue,
      _dark: darkColors[colorKey as keyof typeof darkColors],
    }
  } else if (typeof colorValue === 'object') {
    Object.entries(colorValue).forEach(([shadeKey, shadeValue]) => {
      const key = shadeKey === 'base' ? colorKey : `${colorKey}.${shadeKey}`
      semanticColorTokens[key] = {
        default: shadeValue,
        _dark: darkColors[colorKey][shadeKey],
      }
    })
  }
})
