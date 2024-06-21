import { Pressable } from "react-native";

interface ButtonProps {
  onPress?: () => void;
}

export function Button({ onPress }: ButtonProps) {
  return <Pressable role="button" onPress={onPress} />;
}
