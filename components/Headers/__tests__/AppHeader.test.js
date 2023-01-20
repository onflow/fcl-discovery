import { render } from '@testing-library/react'
import AppHeader from '../AppHeader'
import { useFCL } from '../../../hooks/useFCL'
jest.mock('../../../hooks/useFCL')

describe('Component: AppHeader', () => {
  test('should render the the component with icon', () => {
    useFCL.mockImplementation(() => {
      return {
        appConfig: {
          title: 'Test App',
          icon: 'test.png',
        },
        clientConfig: {
          hostname: 'www.onflow.org',
        },
      }
    })

    const { container } = render(<AppHeader />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('should handle missing info and show unknown if no data', () => {
    useFCL.mockImplementation(() => {
      return {
        appConfig: {
          title: null,
          icon: null,
        },
        clientConfig: {
          hostname: null,
        },
      }
    })

    const { container } = render(<AppHeader />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
