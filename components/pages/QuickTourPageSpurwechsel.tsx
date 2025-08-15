import { useProfile } from '@/context/ProfileContext';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PlaceholderImage from '../PlaceholderImage';
import TextWithSidebar from '../TextWithSidebar';

import spGIF2 from '@/assets/HMI_GIFs/1-2.gif';
import spGIF1 from '@/assets/HMI_GIFs/6-2.gif';
import spGIF3 from '@/assets/HMI_GIFs/9-3.gif';

export default function QuickTourPageSpurwechsel() {
  const profile = useProfile();

  /*useEffect(() => {
    profile.markChapterFinished(TourChapter.Spurwechsel);
  }, []);*/

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextWithSidebar>
        Das Fahrzeug hält automatisch die Spur, wenn das teilautomatisierte Fahren aktiv ist.
      </TextWithSidebar>

      <PlaceholderImage source={spGIF1} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Das Fahrzeug wechselt auf mehrspurigen Straßen automatisch die Spur, wenn Sie den Blinker antippen und es 
        der Verkehr zulässt. Es beobachtet dabei selbstständig die Umgebung.
      </TextWithSidebar>

      <View style={styles.row}>
        <PlaceholderImage source={spGIF2} style={styles.imageRow} />
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <PlaceholderImage source={spGIF3} style={styles.imageRow} />
      </View>

      
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageRow: {
    flex: 1,
    marginHorizontal: 4,
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
