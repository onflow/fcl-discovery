import { replacePort } from '../urls'

describe('url helpers: replacePort', () => {
  it('should replace port on url', () => {
    const url = 'http://localhost:8701/fcl/authn'
    const portReplacement = '8702'
    const expectedUrl = 'http://localhost:8702/fcl/authn'

    expect(replacePort(url, portReplacement)).toEqual(expectedUrl)
  })
})
