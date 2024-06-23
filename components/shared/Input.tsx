import { Text, TextInput, View } from "react-native";

interface InputProps {
  label?: string;
  errorMessage?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function Input({ value, onChange, label, errorMessage }: InputProps) {
  return (
    <View>
      <TextInput aria-label={label} value={value} onChangeText={onChange} />
      {errorMessage && <Text role="alert">{errorMessage}</Text>}
    </View>
  );
}
