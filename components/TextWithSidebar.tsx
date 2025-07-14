import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TextWithSidebar({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.row}>
      <View style={styles.bar} />
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  bar:  { width: 4, backgroundColor: '#007aff', marginRight: 8, borderRadius: 2 },
  text: { flex: 1, fontSize: 14, lineHeight: 20 },
});
