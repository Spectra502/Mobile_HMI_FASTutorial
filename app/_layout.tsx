// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import 'react-native-reanimated';

import { ProfileProvider } from '@/context/ProfileContext';
import { QuizServiceProvider } from '@/context/QuizServiceContext';
import { useColorScheme } from '@/hooks/useColorScheme';
//import LoginOverlay from '../components/LoginOverlay';

export default function RootLayout() {
  const [loginVisible, setLoginVisible] = useState(true);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ProfileProvider>
      {/* show login until a profile is active */}
      {/*}
      <LoginOverlay
        visible={loginVisible}
        onDismiss={() => setLoginVisible(false)}
      />
      */}
      <QuizServiceProvider>
        <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="quick-tour/[chapter]"
              options={{
                presentation: 'modal',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="quiz/[chapter]"
              options={{
                presentation: 'modal',
                headerShown: false,
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </QuizServiceProvider>
    </ProfileProvider>
  );
}
