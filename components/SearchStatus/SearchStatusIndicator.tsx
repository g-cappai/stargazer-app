import { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'

export enum SearchStatus {
  LOADING = 'LOADING',
  IDLE = 'IDLE',
  ERROR = 'ERROR'
}

interface SearchStatusIndicatorProps {
  status: SearchStatus | null
  renderIdle: () => ReactNode
  renderLoading: () => ReactNode
  renderError: () => ReactNode
}

export function SearchStatusIndicator({
  status,
  renderIdle,
  renderLoading,
  renderError
}: SearchStatusIndicatorProps) {
  const getContent = () => {
    switch (status) {
      case SearchStatus.LOADING:
        return renderLoading()
      case SearchStatus.IDLE:
        return renderIdle()
      case SearchStatus.ERROR:
        return renderError()
    }
  }

  if (!status) {
    return null
  }

  return <View style={styles.container}>{getContent()}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
