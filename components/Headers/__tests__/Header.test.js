import { render } from '@testing-library/react'
import Header from '../Header'
import * as hooks from '../../../hooks'

describe('Component: Header', () => {
  test('should render the configurable Header component if version is old enough', () => {
    jest.spyOn(hooks, 'useFCL').mockImplementation(() => {
      return {
        appVersion: '1.0.0',
      }
    })

    const { container } = render(<Header />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('should NOT render the configurable Header component if version is too low', () => {
    jest.spyOn(hooks, 'useFCL').mockImplementation(() => {
      return {
        appVersion: '0.0.77',
      }
    })

    const { container } = render(<Header />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
