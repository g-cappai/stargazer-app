import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "Stargazer Viewers",
        headerTintColor: Colors.text,
        headerStyle: {
          backgroundColor: Colors.bgDefault,
        },
        headerShadowVisible: false,
        statusBarColor: Colors.bgDefault,
        statusBarStyle: "light",
        contentStyle: {
          backgroundColor: Colors.bgDefault,
        },
        navigationBarColor: Colors.bgDark,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
