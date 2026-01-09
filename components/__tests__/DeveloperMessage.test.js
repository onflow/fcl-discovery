import { render } from '@testing-library/react'
import DeveloperMessage from '../DeveloperMessage'

describe('Component: DeveloperMessage', () => {
  test('should render the missing app config message', () => {
    const { container } = render(<DeveloperMessage showMissingAppConfig={true} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('should render the missing WalletConnect message', () => {
    const { container } = render(<DeveloperMessage showMissingWalletConnect={true} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('should render both messages when both are missing', () => {
    const { container } = render(
      <DeveloperMessage
        showMissingAppConfig={true}
        showMissingWalletConnect={true}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test('should render nothing when no props are passed', () => {
    const { container } = render(<DeveloperMessage />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
