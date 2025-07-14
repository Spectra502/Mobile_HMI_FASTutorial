// components/QuickTourCard.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function QuickTourCard({ onPress }: { onPress(): void }) {
  
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Tutorial</Text>
      <Text style={styles.desc}>
        Schnellüberblick der wichtigsten Funktionen des teilautomatisierten Fahrens
      </Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Tutorial starten ▶︎</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFECEE',
    borderRadius: 15,
    padding: 17,
    marginBottom: 15,
  },
  title: { fontSize: 17, fontWeight: 'bold' },
  desc:  { fontSize: 14, marginVertical: 12 },
  button: {
    backgroundColor: '#FF5A4E',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 12,
  },
  buttonText: { color: 'white', fontSize: 15, fontWeight: 'bold' },
});
