import { Colors } from "@/theme/Colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

export default function RootLayout() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
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
            backgroundColor: Colors.bgDark,
          },
          navigationBarColor: Colors.bgDark,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </QueryClientProvider>
  );
}
