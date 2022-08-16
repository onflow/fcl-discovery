import { render } from '@testing-library/react'
import Explainer from '../Explainer'
import { useFCL } from '../../hooks/useFCL'
jest.mock('../../hooks/useFCL')

describe('Component: Explainer', () => {
  test('should render the component with app title', () => {
    useFCL.mockImplementation(() => ({
      appConfig: {
        title: 'Test App',
      },
    }))

    const { container } = render(<Explainer />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('should render app as unknown in Explainer component if no title', () => {
    useFCL.mockImplementation(() => ({
      appConfig: {
        title: null,
      },
    }))

    const { container } = render(<Explainer />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
