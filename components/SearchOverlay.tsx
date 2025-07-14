// components/SearchOverlay.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  query: string;
  onSelectTutorial(chapter: string): void;
  onSelectQuiz(chapter: string): void;
  onClose(): void;
}

export default function SearchOverlay({
  query,
  onSelectTutorial,
  onSelectQuiz,
  onClose,
}: Props) {
  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.close} onPress={onClose}>
        <Text>×</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Suchergebnisse</Text>
      <Text style={styles.placeholder}>“{query}”</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 16,
  },
  close: {
    position: 'absolute',
    top: 32,
    right: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  placeholder: {
    color: '#666',
  },
});
