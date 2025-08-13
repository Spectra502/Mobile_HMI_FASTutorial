import { useProfile } from '@/context/ProfileContext';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PlaceholderImage from '../PlaceholderImage';
import TextWithSidebar from '../TextWithSidebar';

import vzGIF1 from '@/assets/HMI_GIFs/2neu1.gif';
import vzGIF2 from '@/assets/HMI_GIFs/2neu2.gif';
import vzGIF3 from '@/assets/HMI_GIFs/2neu3.gif';

export default function QuickTourPageVerkehrszeichen() {
  const profile = useProfile();

  /*useEffect(() => {
    profile.markChapterFinished(TourChapter.Verkehrszeichen);
  }, []);*/

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextWithSidebar>
        Das Fahrzeug erkennt Tempolimits.
      </TextWithSidebar>

      <PlaceholderImage source={vzGIF1} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Das erkannte Tempolimit wird im Display angezeigt. Bei einem neuen Tempolimit wird die 
        erkannte Geschwindigkeit automatisch übernommen.
      </TextWithSidebar>

      <PlaceholderImage source={vzGIF2} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Drücken Sie den <Text style={styles.highlight}>Hebel</Text> nach oben oder unten, 
        um die Geschwindigkeit individuell zu erhöhen (oben) oder zu verringern (unten)
      </TextWithSidebar>

      <PlaceholderImage source={vzGIF2} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Ihre individuell eingestellte Geschwindigkeit wird im Display angezeigt.
      </TextWithSidebar>

      <PlaceholderImage source={vzGIF3} />
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
