import { Image, StyleSheet, View } from "react-native";
import { Text } from "../shared/Text";
import { Spacing } from "@/constants/Spacing";

interface ListItemProps {
  avatarUrl: string;
  userName: string;
}

export function ListItem({ avatarUrl, userName }: ListItemProps) {
  return (
    <View testID="stargazersListItem" style={styles.container}>
      <Image
        accessibilityRole="image"
        accessibilityLabel="User avatar"
        source={{ uri: avatarUrl }}
        style={styles.avatar}
      />
      <Text accessibilityLabel="User name">{userName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.m,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
