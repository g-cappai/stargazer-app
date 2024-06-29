import { fireEvent, render, screen } from '@testing-library/react-native'
import { Button } from './Button'

describe('Button component', () => {
  it('should call the onPress function when the button is pressed', () => {
    const onPress = jest.fn()
    render(<Button onPress={onPress} />)
    const button = screen.getByRole('button')
    fireEvent.press(button)
    expect(onPress).toHaveBeenCalled()
  })

  it('should display the text passed as children', () => {
    const text = 'buttonText'
    render(<Button title={text} />)
    const button = screen.getByText(text)
    expect(button).toBeOnTheScreen()
  })

  it('should not call the onPress when disabled', () => {
    const handlePress = jest.fn()
    render(<Button disabled onPress={handlePress} />)
    const button = screen.getByRole('button')
    fireEvent.press(button)
    expect(handlePress).toHaveBeenCalledTimes(0)
  })
})
