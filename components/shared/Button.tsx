import { Pressable, StyleSheet } from "react-native";
import { Text } from "./Text";
import { Colors } from "@/theme/Colors";
import { Spacing } from "@/theme/Spacing";
import { FontSize } from "@/theme/Font";

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
      style={[styles.button, disabled && styles.disabled]}
      android_ripple={{ color: Colors.border }}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: Colors.border,
    borderWidth: 1,
    alignItems: "center",
    padding: Spacing.s,
    borderRadius: Spacing.xs,
    backgroundColor: Colors.bgLight,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    textTransform: "uppercase",
    fontSize: FontSize.s,
    letterSpacing: 1.25,
  },
});
