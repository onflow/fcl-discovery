import { render } from '@testing-library/react'
import DeveloperMessage from '../DeveloperMessage'

describe('Component: DeveloperMessage', () => {
  test('should render the DeveloperMessage component', () => {
    const { container } = render(<DeveloperMessage />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
