import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TextWithSidebar({ 
  children,
  barColor = '#007aff' 
}: { 
  children: React.ReactNode,
  barColor?: string,
}) {
  return (
    <View style={styles.row}>
      <View style={[styles.bar, { backgroundColor: barColor }]} />
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  bar: {
    width: 10,
    marginRight: 8,
    borderRadius: 2,
    alignSelf: 'stretch',
  },
  text: {
    flex: 1,
    fontSize: 18,
    lineHeight: 20,
  },
});