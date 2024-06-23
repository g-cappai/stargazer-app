import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { StyleSheet, TextInput, View } from "react-native";
import { Text } from "./Text";
import { FontSize } from "@/constants/Font";

interface InputProps {
  label?: string;
  error?: boolean;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export function Input({
  value,
  placeholder,
  onChange,
  label,
  error,
}: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={Colors.textSecondary}
        placeholder={placeholder}
        aria-label={label}
        value={value}
        onChangeText={onChange}
        style={[styles.input, error && styles.inputInvalid]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.m,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: Colors.border,
    color: Colors.text,
    fontSize: FontSize.m,
  },
  inputInvalid: {
    borderColor: Colors.alert,
  },
  label: {
    fontSize: FontSize.s,
  },
});
