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
    height: 26,              
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#EEE',
    marginVertical: 12,      
  },
  fill: {
    backgroundColor: '#2196f3', 
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 4,       
  },
  empty: {
    backgroundColor: 'transparent',
  },
  label: {
    color: '#fff',
    fontWeight: '600',
  },
});
