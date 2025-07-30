import { TourChapter } from '@/constants/types';
import { useProfile } from '@/context/ProfileContext';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PlaceholderImage from './PlaceholderImage';
import TextWithSidebar from './TextWithSidebar';

import vzGIF1 from '@/assets/GIFs/2-1.gif';
import vzGIF2 from '@/assets/GIFs/2-2.gif';
import vzGIF3 from '@/assets/GIFs/2-3.gif';
import vzGIF4 from '@/assets/GIFs/2-4.gif';

export default function QuickTourPageVerkehrszeichen() {
  const profile = useProfile();

  useEffect(() => {
    profile.markChapterFinished(TourChapter.STAU);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextWithSidebar>
        Das Fahrzeug erkennt Tempolimits.
      </TextWithSidebar>

      <PlaceholderImage source={vzGIF1} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Das erkannte Tempolimit wird im Display angezeigt. Bei einem neuen Tempolimit wird die erkannte Geschwindigkeit
        automatisch übernommen.
      </TextWithSidebar>

      <PlaceholderImage source={vzGIF2} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Drücken Sie den <Text style={styles.highlight}>Hebel</Text> bei einem Tempolimit,
        um die erkannte Geschwindigkeit zu übernehmen.{'\n'}Das Fahrzeug passt sich dann der
        Geschwindigkeit an.
      </TextWithSidebar>

      <PlaceholderImage source={vzGIF3} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Drücken Sie den <Text style={styles.highlight}>Hebel</Text> nach oben oder unten,
        um die Geschwindigkeit individuell zu erhöhen (oben) oder zu verringern (unten).
      </TextWithSidebar>

      <PlaceholderImage source={vzGIF4} />
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
