// components/CustomProgressBar.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  /** Between 0 and 1 */
  progress: number;
}

export default function CustomProgressBar({ progress }: Props) {
  const percent = Math.round(progress * 100);

  return (
    <View style={styles.track}>
      {/* Filled portion */}
      <View style={[styles.fill, { flex: progress }]}>
        <Text style={styles.label}>{`${percent}%`}</Text>
      </View>

      {/* Empty remainder */}
      <View style={[styles.empty, { flex: 1 - progress }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 24,              // match your design
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#EEE', // light grey track
    marginVertical: 12,      // or pull from spacing.ts
  },
  fill: {
    backgroundColor: '#2196f3', // your primary color (swap for colors.primary)
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 8,       // gives breathing room around the “%”
  },
  empty: {
    backgroundColor: 'transparent',
  },
  label: {
    color: '#fff',
    fontWeight: '600',
  },
});
