import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type InputProps = {
  label: string;
  errorMessage?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export function Input({ value, onChange, label, errorMessage }: InputProps) {
  return (
    <View>
      <TextInput aria-label={label} value={value} onChangeText={onChange} />
      {errorMessage && <Text role="alert">{errorMessage}</Text>}
    </View>
  );
}
