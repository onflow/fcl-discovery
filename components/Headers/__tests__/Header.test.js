import { render } from '@testing-library/react'
import Header from '../Header'
import * as hooks from '../../../hooks/useFCL'

describe('Component: Header', () => {
  let fclHookSpy

  beforeEach(() => {
    fclHookSpy = jest.spyOn(hooks, 'useFCL')
  })

  afterEach(() => {
    fclHookSpy.mockRestore()
  })

  test('should render the configurable component if version is old enough', () => {
    fclHookSpy.mockImplementation(() => {
      return {
        appVersion: '1.0.0',
      }
    })

    const { container } = render(<Header />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('should NOT render the configurable component if version is too low', () => {
    fclHookSpy.mockImplementation(() => {
      return {
        appVersion: '0.0.77',
      }
    })

    const { container } = render(<Header />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
