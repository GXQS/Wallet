import { Tabs } from 'expo-router';

/**
 * Tab layout for GXQS mobile app.
 * Tabs: Wallet · Mining · Validator · Telemetry
 */
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#00ffe1',
        tabBarInactiveTintColor: '#4a5568',
        tabBarStyle: {
          backgroundColor: '#0d1117',
          borderTopColor: '#1a2332',
        },
        headerStyle: { backgroundColor: '#060a14' },
        headerTintColor: '#00ffe1',
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Wallet' }} />
      <Tabs.Screen name="mining" options={{ title: 'Mining' }} />
      <Tabs.Screen name="validator" options={{ title: 'Validator' }} />
      <Tabs.Screen name="telemetry" options={{ title: 'Telemetry' }} />
    </Tabs>
  );
}
