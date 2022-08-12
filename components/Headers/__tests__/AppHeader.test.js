import { render } from '@testing-library/react'
import AppHeader from '../AppHeader'
import * as hooks from '../../../hooks/useFCL'

describe('Component: AppHeader', () => {
  let fclHookSpy

  beforeEach(() => {
    fclHookSpy = jest.spyOn(hooks, 'useFCL')
  })

  afterEach(() => {
    fclHookSpy.mockRestore()
  })

  test('should render the the component with icon', () => {
    fclHookSpy.mockImplementation(() => {
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
    fclHookSpy.mockImplementation(() => {
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
