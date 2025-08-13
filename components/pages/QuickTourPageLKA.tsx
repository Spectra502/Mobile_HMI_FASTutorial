import { useProfile } from '@/context/ProfileContext';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PlaceholderImage from '../PlaceholderImage';
import TextWithSidebar from '../TextWithSidebar';

import ampGIF1 from '@/assets/HMI_GIFs/4neu1.gif';
import ampGIF2 from '@/assets/HMI_GIFs/4neu2.gif';

export default function QuickTourPageLKA() {
  const profile = useProfile();

  /*useEffect(() => {
    profile.markChapterFinished(TourChapter.LKA);
  }, []);*/

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextWithSidebar>
        Das Fahrzeug erkennt Ampeln und bremst bei roten Ampeln automatisch bis zum Stillstand ab.
      </TextWithSidebar>

      <PlaceholderImage source={ampGIF1} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Im Stillstand müssen Sie übernehmen und manuell anfahren. Das teilautomatisierte Fahren kann wieder aktiviert werden, sobald das Symbol weiß im Display aufleuchtet.
      </TextWithSidebar>

      <PlaceholderImage source={ampGIF2} />
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
  green: {
    color: 'green',
    fontWeight: '600',
  },
});
