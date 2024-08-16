import { render as defaultRender } from '@testing-library/react'
import AppHeader from '../AppHeader'
import { FclProvider } from '../../../contexts/FclContext'

describe('Component: AppHeader', () => {
  const render = config => component => {
    return defaultRender(<FclProvider config={config}>{component}</FclProvider>)
  }

  test('should render the the component with icon', () => {
    const { container } = render({
      appConfig: {
        title: 'Test App',
        icon: 'test.png',
      },
      clientConfig: {
        hostname: 'www.onflow.org',
      },
    })(<AppHeader />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('should handle missing info and show unknown if no data', () => {
    const { container } = render({
      appConfig: {
        title: null,
        icon: null,
      },
      clientConfig: {
        hostname: null,
      },
    })(<AppHeader />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
