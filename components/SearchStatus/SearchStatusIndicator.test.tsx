import { render, screen } from '@testing-library/react-native'
import React from 'react'
import { View } from 'react-native'
import { SearchStatus, SearchStatusIndicator } from './SearchStatusIndicator'

describe('SearchStatusIndicator component', () => {
  it.each([SearchStatus.IDLE, SearchStatus.LOADING, SearchStatus.ERROR])(
    'renders %s state correctly',
    status => {
      const renderError = () => <View testID="error" />
      const renderIdle = () => <View testID="idle" />
      const renderLoading = () => <View testID="loading" />
      render(
        <SearchStatusIndicator
          status={status}
          renderError={renderError}
          renderIdle={renderIdle}
          renderLoading={renderLoading}
        />
      )

      switch (status) {
        case SearchStatus.IDLE:
          expect(screen.getByTestId('idle')).toBeOnTheScreen()
          expect(screen.queryByTestId('loading')).not.toBeOnTheScreen()
          expect(screen.queryByTestId('error')).not.toBeOnTheScreen()
          break
        case SearchStatus.LOADING:
          expect(screen.getByTestId('loading')).toBeOnTheScreen()
          expect(screen.queryByTestId('idle')).not.toBeOnTheScreen()
          expect(screen.queryByTestId('error')).not.toBeOnTheScreen()
          break
        case SearchStatus.ERROR:
          expect(screen.getByTestId('error')).toBeOnTheScreen()
          expect(screen.queryByTestId('loading')).not.toBeOnTheScreen()
          expect(screen.queryByTestId('idle')).not.toBeOnTheScreen()
          break
      }
    }
  )

  it('does not render when status is null', () => {
    const renderError = () => <View testID="error" />
    const renderIdle = () => <View testID="idle" />
    const renderLoading = () => <View testID="loading" />
    render(
      <SearchStatusIndicator
        status={null}
        renderError={renderError}
        renderIdle={renderIdle}
        renderLoading={renderLoading}
      />
    )

    expect(screen.queryByTestId('error')).not.toBeOnTheScreen()
    expect(screen.queryByTestId('loading')).not.toBeOnTheScreen()
    expect(screen.queryByTestId('idle')).not.toBeOnTheScreen()
  })
})
