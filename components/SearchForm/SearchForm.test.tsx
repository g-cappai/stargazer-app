import { Colors } from '@/theme/Colors'
import {
  render,
  screen,
  userEvent,
  waitFor
} from '@testing-library/react-native'
import { SearchForm, SearchFormLabels } from './SearchForm'

describe('SearchForm component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('should render a search form', () => {
    render(<SearchForm onSubmit={() => {}} />)
    const repositoryOwnerInput = screen.getByLabelText(SearchFormLabels.owner)
    const repoInput = screen.getByLabelText(SearchFormLabels.repo)
    const searchButton = screen.getByText(SearchFormLabels.search)

    expect(repositoryOwnerInput).toBeDefined()
    expect(repoInput).toBeDefined()
    expect(searchButton).toBeDefined()
  })

  it('should submit form if valid when search button is pressed', async () => {
    const handleSubmit = jest.fn()
    render(<SearchForm onSubmit={handleSubmit} />)
    const repositoryOwnerInput = screen.getByLabelText(SearchFormLabels.owner)
    const repoInput = screen.getByLabelText(SearchFormLabels.repo)
    const searchButton = screen.getByLabelText(SearchFormLabels.search)

    const owner = 'facebook'
    const name = 'react'

    const user = userEvent.setup()
    await user.type(repositoryOwnerInput, owner)
    await user.type(repoInput, name)
    await user.press(searchButton)

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          owner: owner,
          repo: name
        })
      )
    )
  })

  it('should not submit form if invalid', async () => {
    const handleSubmit = jest.fn()
    render(<SearchForm onSubmit={handleSubmit} />)
    const searchButton = screen.getByLabelText('Search')

    const user = userEvent.setup()
    await user.press(searchButton)

    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled()
    })
  })

  it('should submit and cleanup errors after a failed submission when resubmitted with valid values', async () => {
    const handleSubmit = jest.fn()
    render(<SearchForm onSubmit={handleSubmit} />)
    const repositoryOwnerInput = screen.getByLabelText(SearchFormLabels.owner)
    const repoInput = screen.getByLabelText(SearchFormLabels.repo)
    const searchButton = screen.getByLabelText(SearchFormLabels.search)

    const user = userEvent.setup()
    await user.press(searchButton)
    await waitFor(() => {
      expect(repositoryOwnerInput).toHaveStyle({ borderColor: Colors.alert })
      expect(repoInput).toHaveStyle({ borderColor: Colors.alert })
    })

    const owner = 'facebook'
    const name = 'react'

    await user.type(repositoryOwnerInput, owner)
    await user.type(repoInput, name)
    await user.press(searchButton)

    await waitFor(() => {
      expect(repositoryOwnerInput).toHaveStyle({ borderColor: Colors.border })
      expect(repoInput).toHaveStyle({ borderColor: Colors.border })

      expect(handleSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          owner: owner,
          repo: name
        })
      )
    })
  })

  it('should trim input values', async () => {
    const handleSubmit = jest.fn()
    render(<SearchForm onSubmit={handleSubmit} />)
    const repositoryOwnerInput = screen.getByLabelText(SearchFormLabels.owner)
    const repoInput = screen.getByLabelText(SearchFormLabels.repo)

    const user = userEvent.setup()
    await user.type(repositoryOwnerInput, '  facebook ')
    await user.type(repoInput, '  react ')

    await waitFor(() => {
      expect(repositoryOwnerInput).toHaveProp('value', 'facebook')
      expect(repoInput).toHaveProp('value', 'react')
    })
  })
})
