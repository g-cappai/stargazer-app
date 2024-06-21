import { TextInput } from "react-native-gesture-handler";

type InputProps = {
  label: string;
};

export function Input({ label }: InputProps) {
  return <TextInput aria-label={label} />;
}
