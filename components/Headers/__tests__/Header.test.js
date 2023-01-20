import { render } from '@testing-library/react'
import Header from '../Header'
import { useFCL } from '../../../hooks/useFCL'
jest.mock('../../../hooks/useFCL')

jest.mock(
  '../../helpers/networks',
  () => ({
    isTestnet: jest.fn(() => true),
  }),
  { virtual: true }
)

describe('Component: Header', () => {
  test('should render the configurable component if version is old enough', () => {
    useFCL.mockImplementation(() => {
      return {
        appVersion: '1.0.0',
        appConfig: {
          title: 'Test App',
          icon: 'test.png',
        },
        clientConfig: {
          hostname: 'www.onflow.org',
        },
      }
    })

    const { container } = render(<Header />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('should NOT render the configurable component if version is too low', () => {
    useFCL.mockImplementation(() => {
      return {
        appVersion: '0.0.77',
        appConfig: {
          title: 'Test App',
          icon: 'test.png',
        },
        clientConfig: {
          hostname: 'www.onflow.org',
        },
      }
    })

    const { container } = render(<Header />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('should show the DeveloperMessage if config is missing', () => {
    useFCL.mockImplementation(() => {
      return {
        appVersion: '1.0.0',
        appConfig: {
          title: null,
          icon: null,
        },
        clientConfig: {
          hostname: null,
        },
      }
    })

    const { container } = render(<Header />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
