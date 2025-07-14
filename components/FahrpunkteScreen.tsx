// components/FahrpunkteScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Spacer } from 'react-native';
import { useProfile }    from '@/context/ProfileContext';
import GaugeProgress     from './GaugeProgress'; // from your earlier port

export default function FahrpunkteScreen() {
  const [value] = useState(80);
  const total   = 100;

  return (
    <View style={styles.fill}>
      <GaugeProgress
        fraction={value/total}
        label={`${value}/${total}`}
      />
      <View style={styles.header}>
        <Text style={styles.title}>Punktzahl-Faktor</Text>
        <Text style={styles.subtitle}>
          Faktoren, die Ihre Punktzahl beeinflussen
        </Text>
      </View>
      {/* insert your FahrpunkteEventView port here */}
    </View>
  );
}

const styles = StyleSheet.create({
  fill:     { flex: 1, backgroundColor: '#fff' },
  header:   { padding: 20, backgroundColor: 'rgba(255,255,255,0.8)' },
  title:    { fontWeight: '600', fontSize: 16 },
  subtitle: { fontSize: 12, color: '#666' },
});
