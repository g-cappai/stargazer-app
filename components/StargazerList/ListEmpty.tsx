import { Text, View } from "react-native";

export function ListEmpty() {
  return (
    <Text accessibilityLabel="No stargazers found">No stargazers found</Text>
  );
}
