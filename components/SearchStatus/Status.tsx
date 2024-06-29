import { FontSize } from '@/theme/Font'
import { Spacing } from '@/theme/Spacing'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { Text } from '../shared/Text'

export function IdleStatus() {
  return (
    <View style={styles.idleTextContainer}>
      <Text style={styles.idleTextHeader}>Find stargazers.</Text>
      <Text>Search for a Github repository.</Text>
    </View>
  )
}

export function LoadingStatus() {
  return (
    <View style={styles.loadingTextContainer}>
      <Text style={styles.loadingText}>Looking for stargazers...</Text>
      <ActivityIndicator />
    </View>
  )
}

interface ErrorStatusProps {
  statusCode?: string
}

export function ErrorStatus({ statusCode }: ErrorStatusProps) {
  /**
   * Get a meaningful error message.
   * @param {string} code - The status code of the error.
   * @returns {string} - The error message.
   */

  const getErrorMessage = (code?: string): string => {
    switch (code) {
      case '404':
        return 'Repository not found.'
      case '403':
      case '429':
        return 'An error occurred. Please try again later.'
      default:
        return 'An error occurred. Try again.'
    }
  }

  return <Text>{getErrorMessage(statusCode)}</Text>
}

const styles = StyleSheet.create({
  idleTextHeader: {
    fontWeight: 'bold',
    fontSize: FontSize.xl,
    paddingBottom: Spacing.s
  },
  idleTextContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  loadingText: {
    paddingRight: Spacing.s
  },
  loadingTextContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
