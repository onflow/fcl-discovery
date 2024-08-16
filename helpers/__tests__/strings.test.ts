import { toTitleCase } from '../strings'

describe('strings helpers tests', () => {
  test('to title case', () => {
    const str = 'hello world'
    const result = toTitleCase(str)
    expect(result).toBe('Hello World')
  })

  test('to title case with empty string', () => {
    const str = ''
    const result = toTitleCase(str)
    expect(result).toBe('')
  })

  test('to title case with null', () => {
    const str = null
    const result = toTitleCase(str)
    expect(result).toBe(null)
  })

  test('to title case with undefined', () => {
    const str = undefined
    const result = toTitleCase(str)
    expect(result).toBe(undefined)
  })
})
