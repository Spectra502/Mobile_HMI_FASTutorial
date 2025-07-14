import React, { useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import PlaceholderImage from './PlaceholderImage';
import TextWithSidebar from './TextWithSidebar';
import { useProfile }  from '@/context/ProfileContext';
import { TourChapter } from '@/constants/types';

export default function QuickTourPageACC() {
  const profile = useProfile();

  useEffect(() => {
    profile.markChapterFinished(TourChapter.ACC);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextWithSidebar>
        Wenn das <Text style={styles.highlight}>ACC-Symbol</Text> im Display grün aufleuchtet,
        ist der Abstandsassistent aktiviert.
      </TextWithSidebar>

      <PlaceholderImage />

      <View style={styles.divider} />

      <TextWithSidebar>
        Das Fahrzeug hält dann den Abstand zum Vorderfahrzeug automatisch.
        Es bremst oder beschleunigt, falls nötig.
      </TextWithSidebar>

      <PlaceholderImage />

      <View style={styles.divider} />

      <TextWithSidebar>
        Drücken Sie die <Text style={styles.highlight}>Abstandstasten</Text> um den Abstand
        individuell anzupassen.
      </TextWithSidebar>

      <PlaceholderImage />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 24 },
  divider:   { height: 1, backgroundColor: '#ccc', marginVertical: 20 },
  highlight: { color: '#007aff', fontWeight: '600' },
});
