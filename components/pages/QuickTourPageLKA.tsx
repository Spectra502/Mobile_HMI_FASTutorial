import { TourChapter } from '@/constants/types';
import { useProfile } from '@/context/ProfileContext';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PlaceholderImage from '../PlaceholderImage';
import TextWithSidebar from '../TextWithSidebar';

import lkaGIF2 from '@/assets/GIFs/10-1.gif';
import lkaGIF1 from '@/assets/GIFs/6-1.gif';

export default function QuickTourPageLKA() {
  const profile = useProfile();

  useEffect(() => {
    profile.markChapterFinished(TourChapter.LKA);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextWithSidebar>
        Wenn das <Text style={styles.green}>LKA-Symbol</Text> im Display{' '}
        <Text style={styles.green}>grün</Text> aufleuchtet, ist der Spurhalteassistent aktiviert.
      </TextWithSidebar>

      <PlaceholderImage source={lkaGIF1} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Das Fahrzeug hält dann automatisch die Spur.
      </TextWithSidebar>

      <PlaceholderImage source={lkaGIF2} />
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
