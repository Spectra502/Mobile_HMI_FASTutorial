// components/QuickTourCard.tsx
import { TourChapter } from '@/constants/types';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function QuickTourCard() {
  const router = useRouter();

  function onPress() {
    router.push({
      pathname: '/quick-tour/[chapter]',
      params: {
        chapter: TourChapter.ActivateDA, // or whichever chapter you’d like to start
        showOverlay: 'true',
      },
    });
  }
  
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
    backgroundColor: '#e7e7e7ff',
    borderRadius: 15,
    padding: 17,
    marginBottom: 15,
  },
  title: { fontSize: 26, fontWeight: 'bold' },
  desc:  { fontSize: 20, marginVertical: 12 },
  button: {
    backgroundColor: '#FF5A4E',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 12,
  },
  buttonText: { color: 'white', fontSize: 22, fontWeight: 'bold' },
});
