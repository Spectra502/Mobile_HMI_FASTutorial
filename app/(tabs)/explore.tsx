// app/(tabs)/explore.tsx
import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

export default function Explore() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🔍 Explore Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title:     { fontSize: 28 },
});
