import { render as defaultRender } from '@testing-library/react'
import Header from '../Header'
import { ConfigProvider } from '../../../contexts/ConfigContext'

jest.mock(
  '../../helpers/networks',
  () => ({
    isTestnet: jest.fn(() => true),
  }),
  { virtual: true }
)

describe('Component: Header', () => {
  const render = config => component => {
    return defaultRender(
      <ConfigProvider {...config}>{component}</ConfigProvider>
    )
  }

  test('should render the configurable component if version is old enough', () => {
    const { container } = render({
      appVersion: '1.0.0',
      appConfig: {
        title: 'Test App',
        icon: 'test.png',
      },
      clientConfig: {
        hostname: 'www.onflow.org',
      },
    })(<Header />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('should NOT render the configurable component if version is too low', () => {
    const { container } = render({
      appVersion: '0.0.77',
      appConfig: {
        title: 'Test App',
        icon: 'test.png',
      },
      clientConfig: {
        hostname: 'www.onflow.org',
      },
    })(<Header />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('should show the DeveloperMessage if config is missing', () => {
    const { container } = render({
      appVersion: '1.0.0',
      appConfig: {
        title: null,
        icon: null,
      },
      clientConfig: {
        hostname: null,
      },
    })(<Header />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
