import { render } from '@testing-library/react'
import FlowHeader from '../FlowHeader'

describe('Component: FlowHeader', () => {
  test('should render the FlowHeader component', () => {
    const { container } = render(<FlowHeader />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
