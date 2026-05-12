import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

/**
 * Root layout for GXQS mobile app.
 * Uses dark theme aligned with Exployer glow system (#00ffe1 / #ff00d4).
 */
export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#060a14' },
          headerTintColor: '#00ffe1',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#060a14' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
