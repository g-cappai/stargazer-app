import { render, screen } from '@testing-library/react-native'
import { ListItem } from './ListItem'

describe('StargazerList/ListItem', () => {
  it('should render the list item', () => {
    const userName = 'User'
    render(<ListItem userName={userName} avatarUrl="avatarUrl" />)
    expect(screen.getByLabelText('User avatar')).toBeOnTheScreen()
    expect(screen.getByText(userName)).toBeOnTheScreen()
  })
})
