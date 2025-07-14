// components/CustomProgressBar.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function CustomProgressBar({ progress }: { progress: number }) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { flex: progress }]} />
      <View style={[styles.empty, { flex: 1 - progress }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 23,
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#EEE',
    margin: 15,
  },
  fill:   { backgroundColor: '#2196f3' },
  empty:  { backgroundColor: 'transparent' },
});
