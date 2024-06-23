import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface InputProps {
  label?: string;
  error?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export function Input({ value, onChange, label, error }: InputProps) {
  return (
    <View style={styles.container}>
      <TextInput
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
  },
  inputInvalid: {
    borderColor: Colors.alert,
  },
});
