import { useProfile } from '@/context/ProfileContext';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PlaceholderImage from '../PlaceholderImage';
import TextWithSidebar from '../TextWithSidebar';

import nbGIF2 from '@/assets/HMI_GIFs/6neu1.gif';
import nbGIF1 from '@/assets/HMI_GIFs/8-2.gif';

export default function QuickTourPageNotbremse() {
  const profile = useProfile();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextWithSidebar>
        Das Fahrzeug erkennt Hindernisse. Bevor es zum Zusammenstoß mit einem Hindernis, einer Person oder einem weiteren Fahrzeug kommt, bremst das Fahrzeug bis zum Stillstand ab
      </TextWithSidebar>

      <PlaceholderImage source={nbGIF1} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Im Stillstand müssen Sie übernehmen und manuell anfahren. Das teilautomatisierte Fahren kann wieder
        aktiviert werden, sobald das Symbol weiß im Display aufleuchtet.
      </TextWithSidebar>

      <PlaceholderImage source={nbGIF2} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  highlight: {
    color: '#007aff',
    fontWeight: '600',
  },
});
