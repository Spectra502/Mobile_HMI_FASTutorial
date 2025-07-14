import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  steps: number;
  currentStep: number;
  style?: any;
}

export default function StepProgressBar({ steps, currentStep, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: steps }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.segment,
            { backgroundColor: i <= currentStep ? '#007aff' : '#ddd' },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', height: 4, borderRadius: 2, overflow: 'hidden' },
  segment: { flex: 1, marginHorizontal: 1 },
});
