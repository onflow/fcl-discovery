import { render } from '@testing-library/react'
import Explainer from '../Explainer'
import * as hooks from '../../hooks/useFCL'

describe('Component: Explainer', () => {
  let fclHookSpy

  beforeEach(() => {
    fclHookSpy = jest.spyOn(hooks, 'useFCL')
  })

  afterEach(() => {
    fclHookSpy.mockRestore()
  })

  test('should render the component with app title', () => {
    fclHookSpy.mockImplementation(() => ({
      appConfig: {
        title: 'Test App',
      },
    }))

    const { container } = render(<Explainer />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('should render app as unknown in Explainer component if no title', () => {
    fclHookSpy.mockImplementation(() => ({
      appConfig: {
        title: null,
      },
    }))

    const { container } = render(<Explainer />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
