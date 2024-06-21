import { ReactNode } from "react";
import { Pressable } from "react-native";

interface ButtonProps {
  onPress?: () => void;
  children?: ReactNode;
}

export function Button({ onPress, children }: ButtonProps) {
  return (
    <Pressable role="button" onPress={onPress}>
      {children}
    </Pressable>
  );
}
