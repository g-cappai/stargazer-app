import { ReactNode } from "react";
import { Pressable } from "react-native";

interface ButtonProps {
  onPress?: () => void;
  children?: ReactNode;
  label?: string;
}

export function Button({ onPress, label, children }: ButtonProps) {
  return (
    <Pressable role="button" onPress={onPress} aria-label={label}>
      {children}
    </Pressable>
  );
}
