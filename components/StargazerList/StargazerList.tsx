import { Stargazer } from '@/api/useStargazers'
import { Colors } from '@/theme/Colors'
import { FlatList, StyleSheet } from 'react-native'
import { ListEmpty } from './ListEmpty'
import { ListFooter } from './ListFooter'
import { ListItem } from './ListItem'

interface StargazerListProps {
  stargazers: Stargazer[]
  isLoadingMore?: boolean
  isLoadMoreFailed?: boolean
  loadMore?: () => void
}

export function StargazerList({
  stargazers,
  isLoadingMore,
  isLoadMoreFailed,
  loadMore
}: StargazerListProps) {
  return (
    <FlatList
      style={styles.contentContainer}
      accessibilityRole="list"
      aria-label="Stargazers list"
      data={stargazers}
      onEndReached={!isLoadingMore && !isLoadMoreFailed ? loadMore : null}
      renderItem={({ item: { avatarUrl, name } }) => (
        <ListItem avatarUrl={avatarUrl} userName={name} />
      )}
      ListEmptyComponent={<ListEmpty />}
      ListFooterComponent={
        <ListFooter
          hasError={isLoadMoreFailed}
          isLoading={isLoadingMore}
          tryAgain={loadMore}
        />
      }
    />
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.bgDefault
  }
})
