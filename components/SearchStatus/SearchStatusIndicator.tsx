import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Text } from "../shared/Text";
import { ReactNode } from "react";
import { FontSize } from "@/constants/Font";
import { Spacing } from "@/constants/Spacing";

export enum SearchStatus {
  LOADING = "LOADING",
  IDLE = "IDLE",
  ERROR = "ERROR",
}

interface SearchStatusIndicatorProps {
  status: SearchStatus;
  errorMessage?: string;
}

export function SearchStatusIndicator({
  status,
  errorMessage,
}: SearchStatusIndicatorProps) {
  let content = (
    <View testID="idleStatus" style={styles.idleTextContainer}>
      <Text style={styles.idleTextHeader}>Find stargazers.</Text>
      <Text>Search for a Github repository.</Text>
    </View>
  );

  if (status === SearchStatus.LOADING) {
    content = (
      <View testID="loadingStatus" style={styles.loadingTextContainer}>
        <Text style={styles.loadingText}>Looking for stargazers...</Text>
        <ActivityIndicator />
      </View>
    );
  }

  if (status === SearchStatus.ERROR) {
    content = (
      <Text testID="errorStatus">
        {errorMessage || "An error has occurred. Try again."}
      </Text>
    );
  }

  return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  idleTextHeader: {
    fontWeight: "bold",
    fontSize: FontSize.xl,
    paddingBottom: Spacing.s,
  },
  idleTextContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  loadingText: {
    paddingRight: Spacing.s,
  },
  loadingTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
