import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type InputProps = {
  label: string;
  errorMessage?: string;
};

export function Input({ label, errorMessage }: InputProps) {
  return (
    <View>
      <TextInput aria-label={label} />
      {errorMessage && <Text role="alert">{errorMessage}</Text>}
    </View>
  );
}
