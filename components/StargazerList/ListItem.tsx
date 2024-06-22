import { Image, Text, View } from "react-native";

interface ListItemProps {
  avatarUrl: string;
  userName: string;
}

export function ListItem({ avatarUrl, userName }: ListItemProps) {
  return (
    <View testID="stargazersListItem">
      <Image
        accessibilityRole="image"
        accessibilityLabel="User avatar"
        source={{ uri: avatarUrl }}
      />
      <Text accessibilityLabel="User name">{userName}</Text>
    </View>
  );
}
