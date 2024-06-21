import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type InputProps = {
  label: string;
  errorMessage?: string;
  value?: string;
};

export function Input({ value, label, errorMessage }: InputProps) {
  return (
    <View>
      <TextInput aria-label={label} value={value} />
      {errorMessage && <Text role="alert">{errorMessage}</Text>}
    </View>
  );
}
