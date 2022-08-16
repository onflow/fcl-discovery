import { render } from '@testing-library/react'
import AppHeader from '../AppHeader'
import { useFCL } from '../../../hooks/useFCL'
jest.mock('../../../hooks/useFCL')

describe('Component: AppHeader', () => {
  test('should render the the component with icon', () => {
    useFCL.mockImplementation(() => {
      return {
        appConfig: {
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

  test('should render the default image in the component if no icon', () => {
    useFCL.mockImplementation(() => {
      return {
        appConfig: {
          icon: null,
        },
      }
    })

    const { container } = render(<AppHeader />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
