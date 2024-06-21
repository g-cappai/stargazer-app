import { ReactNode } from "react";
import { Pressable } from "react-native";

interface ButtonProps {
  onPress?: () => void;
  children?: ReactNode;
  label?: string;
  disabled?: boolean;
}

export function Button({ onPress, label, disabled, children }: ButtonProps) {
  return (
    <Pressable
      role="button"
      onPress={onPress}
      aria-label={label}
      disabled={disabled}
    >
      {children}
    </Pressable>
  );
}
