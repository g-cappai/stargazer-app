import { Pressable } from "react-native";
import { Text } from "./Text";

interface ButtonProps {
  onPress?: () => void;
  title?: string;
  label?: string;
  disabled?: boolean;
}

export function Button({ onPress, label, disabled, title }: ButtonProps) {
  return (
    <Pressable
      role="button"
      onPress={onPress}
      aria-label={label}
      disabled={disabled}
    >
      <Text>{title}</Text>
    </Pressable>
  );
}
