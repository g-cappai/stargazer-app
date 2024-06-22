import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ListItem } from "./ListItem";

interface StargazerListProps {
  stargazers: { id: number; avatarUrl: string; name: string }[];
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
      accessibilityRole="list"
      aria-label="Stargazers list"
      data={stargazers}
      renderItem={({ item: { avatarUrl, name } }) => (
        <ListItem avatarUrl={avatarUrl} userName={name} />
      )}
      onEndReached={loadMore}
      ListEmptyComponent={<View accessibilityLabel="No stargazers found" />}
      ListFooterComponent={
        isLoadingMore ? <View accessibilityLabel="Loading more" /> : null
      }
    />
  );
}
