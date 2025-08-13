import { useProfile } from '@/context/ProfileContext';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PlaceholderImage from '../PlaceholderImage';
import TextWithSidebar from '../TextWithSidebar';

import decGIF1 from '@/assets/GIFs/1-2.gif';
import decGIF3 from '@/assets/GIFs/9-2.gif';
import decGIF2 from '@/assets/GIFs/9-3.gif';
import decGIF4 from '@/assets/GIFs/9-4.gif';

export default function QuickTourPageDeactivateDA() {
  const profile = useProfile();

  /*useEffect(() => {
    profile.markChapterFinished(TourChapter.Deaktivierung);
  }, []);*/

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextWithSidebar>
        Drücken Sie die <Text style={styles.highlight}>Aktivierungstaste</Text> erneut, um das
        teilautomatisierte Fahren zu beenden.
      </TextWithSidebar>

      <PlaceholderImage source={decGIF1} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Er wird auch beendet, wenn Sie lenken oder das Bremspedal drücken.
      </TextWithSidebar>

      <PlaceholderImage source={decGIF2} style={styles.imageFill} />

      <PlaceholderImage source={decGIF3} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Bei erfolgreicher Deaktivierung erlöschen die Lenkradlichter und das Symbol{' '}
        <Text style={styles.highlight}>DRIVING ASSIST</Text> im Display.
      </TextWithSidebar>

      <PlaceholderImage source={decGIF4} />
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
  imageFill: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
    borderRadius: 12,
  },
});
