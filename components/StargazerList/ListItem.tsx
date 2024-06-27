import { Image, StyleSheet, View } from "react-native";
import { Text } from "../shared/Text";
import { Spacing } from "@/theme/Spacing";
import { memo } from "react";

interface ListItemProps {
  avatarUrl: string;
  userName: string;
}

export const ListItem = memo(({ avatarUrl, userName }: ListItemProps) => (
  <View testID="stargazersListItem" style={styles.container}>
    <Image
      accessibilityRole="image"
      accessibilityLabel="User avatar"
      source={{ uri: avatarUrl }}
      style={styles.avatar}
    />
    <Text accessibilityLabel="User name">{userName}</Text>
  </View>
));

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
