import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { Text } from "../shared/Text";
import { Colors } from "@/theme/Colors";
import { Spacing } from "@/theme/Spacing";

interface ListFooterProps {
  isLoading?: boolean;
  hasError?: boolean;
  tryAgain?: () => void;
}

export function ListFooter({ isLoading, hasError, tryAgain }: ListFooterProps) {
  const loading = (
    <View style={styles.container}>
      <ActivityIndicator accessibilityLabel="Loading more" />
    </View>
  );

  const retry = (
    <Pressable
      role="button"
      onPress={tryAgain}
      style={[styles.container, styles.alertContainer]}
    >
      <Text style={styles.alertMessage}>
        Something went wrong while loading more stargazers. Press here to
        <Text style={styles.tryAgain}> try again.</Text>
      </Text>
    </Pressable>
  );

  return isLoading ? loading : hasError ? retry : null;
}

const styles = StyleSheet.create({
  container: {
    margin: Spacing.m,
    padding: Spacing.m,
    alignItems: "center",
  },
  alertContainer: {
    borderWidth: 1,
    borderColor: Colors.alert,
    borderRadius: Spacing.xs,
  },
  alertMessage: {
    textAlign: "center",
  },
  tryAgain: {
    fontWeight: "bold",
  },
});
