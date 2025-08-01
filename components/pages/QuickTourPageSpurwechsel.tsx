import { TourChapter } from '@/constants/types';
import { useProfile } from '@/context/ProfileContext';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PlaceholderImage from '../PlaceholderImage';
import TextWithSidebar from '../TextWithSidebar';

import spGIF1 from '@/assets/GIFs/7-1.gif';
import spGIF3 from '@/assets/GIFs/7-3.gif';
import spGIF4 from '@/assets/GIFs/7-4.gif';
import spGIF2 from '@/assets/GIFs/7-5.gif';
import spIMG1 from '@/assets/TourPage/7-2-1.imageset/7-2-1.png';
import spIMG2 from '@/assets/TourPage/7-2-2.imageset/7-2-2.png';

export default function QuickTourPageSpurwechsel() {
  const profile = useProfile();

  useEffect(() => {
    profile.markChapterFinished(TourChapter.SPURWECHSEL);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextWithSidebar>
        Das Fahrzeug wechselt auf mehrspurigen Straßen die Spur, wenn Sie den Blinker antippen und
        es der Verkehr zulässt.{'\n'}Es beobachtet dabei selbstständig die Umgebung.
      </TextWithSidebar>

      <PlaceholderImage source={spGIF1} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Das Spurwechsel-Symbol zeigt die Richtung des geplanten Spurwechsels an.
      </TextWithSidebar>

      <View style={styles.row}>
        <PlaceholderImage source={spIMG1} style={styles.imageRow} />
        <PlaceholderImage source={spIMG2} style={styles.imageRow} />
      </View>

      <View style={styles.divider} />

      <TextWithSidebar>
        Sind die Bedingungen für den Spurwechsel nicht erfüllt, erscheint im Display folgender Hinweis:{' '}
        „Automatischer Spurwechsel, sobald die Bedingungen erfüllt sind.“
      </TextWithSidebar>

      <PlaceholderImage source={spGIF2} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Das Fahrzeug macht eigenständig Vorschläge für einen Spurwechsel, wenn der Verkehr dies
        zulässt. Wenn Sie den Spurwechsel ausführen möchten, drücken Sie die{' '}
        <Text style={styles.highlight}>Set-Taste</Text>, um den Vorschlag zu bestätigen.
      </TextWithSidebar>

      <PlaceholderImage source={spGIF3} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Nach der Bestätigung erscheint im Display ein{' '}
        <Text style={styles.green}>grüner Haken.</Text> und der Spurwechsel wird ausgeführt.
      </TextWithSidebar>

      <PlaceholderImage source={spGIF4} />
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
