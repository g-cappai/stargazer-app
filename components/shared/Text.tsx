import { Colors } from "@/theme/Colors";
import { FontSize } from "@/theme/Font";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

interface TextProps extends RNTextProps {}

export function Text({ children, style, ...props }: TextProps) {
  return (
    <RNText
      style={[{ color: Colors.text, fontSize: FontSize.m }, style]}
      {...props}
    >
      {children}
    </RNText>
  );
}
