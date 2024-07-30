export const truncateString = (str: string, n: number) => {
  if (str.length > n) {
    return str.substring(0, n) + '...'
  } else {
    return str
  }
}

export const toTitleCase = (str: string) =>
  str
    ?.split(' ')
    ?.map(c =>
      c.length > 0 ? c[0].toUpperCase() + c.substring(1).toLowerCase() : c
    )
    ?.join(' ') ?? str
