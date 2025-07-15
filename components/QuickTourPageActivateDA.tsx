import { TourChapter } from '@/constants/types';
import { useProfile } from '@/context/ProfileContext';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PlaceholderImage from './PlaceholderImage';
import TextWithSidebar from './TextWithSidebar';

import daGIF1 from '@/assets/GIFs/1-1.gif';
import daGIF2 from '@/assets/GIFs/1-2.gif';
import daGIF3 from '@/assets/GIFs/1-3.gif';
import daGIF4 from '@/assets/GIFs/1-4.gif';
import daGIF6 from '@/assets/GIFs/1-6.gif';
import daIMG5 from '@/assets/TourPage/1-5.imageset/1-5.jpg';

export default function QuickTourPageDA() {
  const profile = useProfile();

  useEffect(() => {
    profile.markChapterFinished(TourChapter.DRIVING_ASSIST);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextWithSidebar>
        Wenn das <Text style={styles.highlight}>DRIVING ASSIST READY</Text> weiß im Display
        aufleuchtet, ist das teilautomatisierte Fahren verfügbar.
      </TextWithSidebar>

      <PlaceholderImage source={daGIF1} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Bei Bedingungen, wie zum Beispiel schlechtem Wetter, kann es unter Umständen nicht
        verfügbar sein. Drücken Sie die <Text style={styles.highlight}>Aktivierungstaste</Text>,
        um den DRIVING ASSIST zu aktivieren.
      </TextWithSidebar>

      <PlaceholderImage source={daGIF2} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Bei erfolgreicher Aktivierung leuchtet DRIVING ASSIST{' '}
        <Text style={styles.green}>grün</Text> im Display auf.
      </TextWithSidebar>

      <PlaceholderImage source={daGIF3} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Zudem leuchten die Lenkradlichter <Text style={styles.green}>grün.</Text>
      </TextWithSidebar>

      <PlaceholderImage source={daGIF4} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Es sind nun alle Fahrerassistenzsysteme aktiv und das Fahrzeug fährt teilautomatisiert.
        Ihre Hände müssen während der automatisierten Fahrt am Lenkrad bleiben, ohne zu lenken.
        Ihre Füße müssen Sie von den Pedalen nehmen.
      </TextWithSidebar>

      <PlaceholderImage source={daIMG5} />

      <View style={styles.divider} />

      <PlaceholderImage source={daGIF6} />
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
