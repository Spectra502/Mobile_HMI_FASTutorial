import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

export default function PlaceholderImage() {
  return (
    <View style={styles.box}>
      <Text style={styles.label}>Placeholder Image</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 325,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  label: { fontStyle: 'italic', color: '#555' },
});
