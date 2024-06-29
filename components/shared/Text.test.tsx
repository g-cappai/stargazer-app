import { render, screen } from '@testing-library/react-native'
import { Text } from './Text'

describe('Text component', () => {
  it('should allow overriding font color and size', () => {
    render(
      <Text
        style={{
          color: 'red',
          fontSize: 20
        }}
      >
        Text
      </Text>
    )
    const text = screen.getByText('Text')

    expect(text).toHaveStyle({
      color: 'red',
      fontSize: 20
    })
  })
})
