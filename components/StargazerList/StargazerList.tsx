import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { ListItem } from "./ListItem";
import { ListEmpty } from "./ListEmpty";
import { Stargazer } from "@/api/useStargazers";
import { Colors } from "@/theme/Colors";

interface StargazerListProps {
  stargazers: Stargazer[];
  isLoadingMore?: boolean;
  loadMore?: () => void;
}

export function StargazerList({
  stargazers,
  isLoadingMore,
  loadMore,
}: StargazerListProps) {
  return (
    <FlatList
      style={styles.contentContainer}
      accessibilityRole="list"
      aria-label="Stargazers list"
      data={stargazers}
      onEndReached={!isLoadingMore ? loadMore : null}
      renderItem={({ item: { avatarUrl, name } }) => (
        <ListItem avatarUrl={avatarUrl} userName={name} />
      )}
      ListEmptyComponent={<ListEmpty />}
      ListFooterComponent={
        isLoadingMore ? (
          <ActivityIndicator accessibilityLabel="Loading more" />
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.bgDefault,
  },
});
