import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

interface StargazerListProps {
  stargazers: { id: number; avatarUrl: string; name: string }[];
}

export function StargazerList({ stargazers }: StargazerListProps) {
  return (
    <FlatList
      accessibilityRole="list"
      aria-label="Stargazers list"
      data={stargazers}
      renderItem={({ item }) => <View testID="stargazersListItem" />}
      ListEmptyComponent={<View accessibilityLabel="No stargazers found" />}
    />
  );
}
