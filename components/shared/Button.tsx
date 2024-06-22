import { Pressable, Text } from "react-native";

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
