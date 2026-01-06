import { Stack, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/hooks/useAuth';
export default function RootLayout() {
  const {user, checkAuth, isInitialized} = useAuth();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const segments = useSegments();
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isInitialized) return; // ждём пока проверится токен
    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      // Не залогинен → на логин
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      // Залогинен → на главную
      router.replace('/(tabs)');
    }
  }, [user, segments, isInitialized]);

  // Показываем загрузку пока проверяется токен
  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#EA580C" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}