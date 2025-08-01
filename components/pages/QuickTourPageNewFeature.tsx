import { TourChapter } from '@/constants/types';
import { useProfile } from '@/context/ProfileContext';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PlaceholderImage from '../PlaceholderImage';
import TextWithSidebar from '../TextWithSidebar';

import accGIF1 from '@/assets/GIFs/1-1.gif';
import accGIF2 from '@/assets/GIFs/1-2.gif';
import accGIF3 from '@/assets/GIFs/1-3.gif';

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

      <PlaceholderImage source={accGIF1}/>

      <View style={styles.divider} />

      <TextWithSidebar>
        Das Fahrzeug hält dann den Abstand zum Vorderfahrzeug automatisch.
        Es bremst oder beschleunigt, falls nötig.
      </TextWithSidebar>

      <PlaceholderImage source={accGIF2}/>

      <View style={styles.divider} />

      <TextWithSidebar>
        Drücken Sie die <Text style={styles.highlight}>Abstandstasten</Text> um den Abstand
        individuell anzupassen.
      </TextWithSidebar>

      <PlaceholderImage source={accGIF3}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 24 },
  divider:   { height: 1, backgroundColor: '#ccc', marginVertical: 20 },
  highlight: { color: '#007aff', fontWeight: '600' },
});
