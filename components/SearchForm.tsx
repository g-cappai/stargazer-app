import { View } from "react-native";
import { Input } from "./Input";
import { Button } from "./Button";

export function SearchForm() {
  return (
    <View>
      <Input label="Repository owner" />
      <Input label="Repository name" />
      <Button label="Search" />
    </View>
  );
}
