import { ActivityIndicator, FlatList } from "react-native";
import { ListItem } from "./ListItem";
import { ListEmpty } from "./ListEmpty";
import { Stargazer } from "@/api/useStargazers";

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
      contentContainerStyle={{ flexGrow: 1 }}
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
