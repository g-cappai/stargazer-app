import { StyleSheet, View } from "react-native";
import { ReactNode } from "react";

export enum SearchStatus {
  LOADING = "LOADING",
  IDLE = "IDLE",
  ERROR = "ERROR",
}

interface SearchStatusIndicatorProps {
  status: SearchStatus;
  renderIdle: () => ReactNode;
  renderLoading: () => ReactNode;
  renderError: () => ReactNode;
}

export function SearchStatusIndicator({
  status,
  renderIdle,
  renderLoading,
  renderError,
}: SearchStatusIndicatorProps) {
  const getContent = () => {
    switch (status) {
      case SearchStatus.LOADING:
        return renderLoading();
      case SearchStatus.IDLE:
        return renderIdle();
      case SearchStatus.ERROR:
        return renderError();
    }
  };

  return <View style={styles.container}>{getContent()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
