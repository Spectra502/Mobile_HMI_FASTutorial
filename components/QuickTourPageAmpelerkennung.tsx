import { TourChapter } from '@/constants/types';
import { useProfile } from '@/context/ProfileContext';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PlaceholderImage from './PlaceholderImage';
import TextWithSidebar from './TextWithSidebar';

import ampGIF4 from '@/assets/GIFs/1-1.gif';
import ampGIF1 from '@/assets/GIFs/5-1.gif';
import ampGIF2 from '@/assets/GIFs/5-2.gif';
import ampGIF3 from '@/assets/GIFs/5-3.gif';

export default function QuickTourPageAmpelerkennung() {
  const profile = useProfile();

  useEffect(() => {
    profile.markChapterFinished(TourChapter.AMPEL);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextWithSidebar>
        Das Fahrzeug erkennt Ampeln und zeigt diese im Display an.
      </TextWithSidebar>

      <PlaceholderImage source={ampGIF1} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Damit das Fahrzeug an roten Ampeln anhält, müssen Sie diese durch Drücken der{' '}
        <Text style={styles.highlight}>Set-Taste</Text> bestätigen.{'\n'}
        Nach der Bestätigung erscheint im Display ein{' '}
        <Text style={styles.green}>grüner Haken</Text>...
      </TextWithSidebar>

      <PlaceholderImage source={ampGIF2} />

      <TextWithSidebar>
        … und das Fahrzeug bremst automatisch bis zum Stillstand ab.
      </TextWithSidebar>

      <PlaceholderImage source={ampGIF3} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Im Stillstand müssen Sie übernehmen und manuell anfahren. Das teilautomatisierte Fahren
        kann wieder aktiviert werden, sobald{' '}
        <Text style={styles.highlight}>DRIVING ASSIST READY</Text> weiß im Display aufleuchtet.
      </TextWithSidebar>

      <PlaceholderImage source={ampGIF4} />
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
  green: {
    color: 'green',
    fontWeight: '600',
  },
});
