import { Colors } from "@/constants/Colors";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

interface TextProps extends RNTextProps {}

export function Text({ children, ...props }: TextProps) {
  return (
    <RNText style={{ color: Colors.text }} {...props}>
      {children}
    </RNText>
  );
}
