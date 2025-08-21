// components/FahrpunkteScreen.tsx

import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GaugeProgress from './GaugeProgress';

export default function FahrpunkteScreen() {
  const insets = useSafeAreaInsets();
  const value = 80;
  const total = 100;
  const fraction = value / total;

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom + 20 }
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* 1) Gauge */}
      <GaugeProgress
        fraction={fraction}
        label={`${value}/${total}`}
        size={240}
        strokeWidth={16}
      />

      {/* 2) "GUT" + subtitle */}
      <View style={styles.status}>
        <Text style={styles.statusTitle}>GUT</Text>
        <Text style={styles.statusSub}>Assistenzkilometer</Text>
        <Text style={styles.statusSub}>0 km</Text>
      </View>

      {/* 3) Section header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Punktzahl-Faktor</Text>
        <Text style={styles.sectionSub}>
          Faktoren, die Ihre Punktzahl beeinflussen
        </Text>
      </View>

      {/* 4) Example event row */}
      <View style={styles.eventRow}>
        <View style={styles.eventIconPlaceholder}>
          {/* Ideally use an actual icon */}
          <Text style={{ fontSize: 20 }}>👤</Text>
        </View>
        <View style={styles.eventText}>
          <Text style={styles.eventTitle}>Bonusprogramm:</Text>
          <Text style={styles.eventSub}>Profil erstellt</Text>
        </View>
        <Text style={styles.eventPoints}>+{value}</Text>
        {/* <Text style={styles.eventDate}>31.07.2025</Text> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  status: {
    alignItems: 'center',
    marginTop: -20, // pull up closer to gauge
    marginBottom: 20,
  },
  statusTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4CAF50',
  },
  statusSub: {
    fontSize: 18,
    color: 'black',
  },
  sectionHeader: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionSub: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  eventIconPlaceholder: {
    width: 32,
    alignItems: 'center',
  },
  eventText: {
    flex: 1,
    paddingHorizontal: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  eventSub: {
    fontSize: 16,
    color: '#666',
  },
  eventPoints: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4CAF50',
    width: 48,
    textAlign: 'right',
  },
  eventDate: {
    fontSize: 16,
    color: '#999',
    marginLeft: 8,
  },
});
