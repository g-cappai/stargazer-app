import { Pressable } from "react-native";

type ButtonProps = {
  onPress?: () => void;
};

export function Button({ onPress }: ButtonProps) {
  return <Pressable role="button" onPress={onPress} />;
}
