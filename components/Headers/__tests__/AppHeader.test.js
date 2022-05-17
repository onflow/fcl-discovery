import { render } from '@testing-library/react'
import AppHeader from '../AppHeader'
import * as hooks from '../../../hooks'

describe('Component: AppHeader', () => {
  test('should render the AppHeader component with icon', () => {
    jest.spyOn(hooks, 'useFCL').mockImplementation(() => {
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

  test('should render the default image in AppHeader component if no icon', () => {
    jest.spyOn(hooks, 'useFCL').mockImplementation(() => {
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
