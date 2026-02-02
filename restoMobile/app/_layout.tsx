import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { CartProvider } from '@/contexts/CartContext';
export default function RootLayout() {
  const { isInitialized, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFBEB' }}>
        <ActivityIndicator size="large" color="#EA580C" />
      </View>
    );
  }

  return (
    <CartProvider>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
    </CartProvider>

  );
}