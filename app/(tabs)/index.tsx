// app/(tabs)/index.tsx
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import HomeScreen from '@/components/HomeScreen';

export default function Index() {
  const router = useRouter();

  return <HomeScreen />;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title:     { fontSize: 28, marginBottom: 24 },
  button:    { padding: 12, backgroundColor: '#007aff', borderRadius: 6 },
  buttonText:{ color: 'white', fontSize: 16 },
});
