import { FlatList, StyleSheet } from "react-native";
import { ListItem } from "./ListItem";
import { ListEmpty } from "./ListEmpty";
import { Stargazer } from "@/api/useStargazers";
import { Colors } from "@/theme/Colors";
import { ListFooter } from "./ListFooter";

interface StargazerListProps {
  stargazers: Stargazer[];
  isLoadingMore?: boolean;
  isLoadMoreFailed?: boolean;
  loadMore?: () => void;
}

export function StargazerList({
  stargazers,
  isLoadingMore,
  isLoadMoreFailed,
  loadMore,
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
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.bgDefault,
  },
});
