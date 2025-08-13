import { useProfile } from '@/context/ProfileContext';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PlaceholderImage from '../PlaceholderImage';
import TextWithSidebar from '../TextWithSidebar';

import nbGIF3 from '@/assets/GIFs/1-1.gif';
import nbGIF1 from '@/assets/GIFs/8-1.gif';
import nbGIF2 from '@/assets/GIFs/8-2.gif';

export default function QuickTourPageNotbremse() {
  const profile = useProfile();

  /*useEffect(() => {
    profile.markChapterFinished(TourChapter.Notbremse);
  }, []);*/

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextWithSidebar>
        Das Fahrzeug erkennt Hindernisse und warnt bei Kollisionsgefahr.
      </TextWithSidebar>

      <PlaceholderImage source={nbGIF1} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Bevor es zum Zusammenstoß mit einem Hindernis, einer Person oder einem weiteren Fahrzeug
        kommt, bremst das Fahrzeug bis zum Stillstand ab.
      </TextWithSidebar>

      <PlaceholderImage source={nbGIF2} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Im Stillstand müssen Sie übernehmen und manuell anfahren. Das teilautomatisierte Fahren
        kann wieder aktiviert werden, sobald{' '}
        <Text style={styles.highlight}>DRIVING ASSIST READY</Text> weiß im Display aufleuchtet.
      </TextWithSidebar>

      <PlaceholderImage source={nbGIF3} />
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
