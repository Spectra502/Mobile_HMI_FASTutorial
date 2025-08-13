import { useProfile } from '@/context/ProfileContext';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PlaceholderImage from '../PlaceholderImage';
import TextWithSidebar from '../TextWithSidebar';

import riskGIF2 from '@/assets/GIFs/10-2.gif';
import riskGIF3 from '@/assets/GIFs/10-3.gif';
import { default as riskGIF4, default as riskIMG } from '@/assets/GIFs/10-4.gif';
import riskGIF1 from '@/assets/GIFs/6-2.gif';

export default function QuickTourPageRisiken() {
  const profile = useProfile();

  /*useEffect(() => {
    profile.markChapterFinished(TourChapter.Risiken);
  }, []);*/

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextWithSidebar barColor="red">
        Das teilautomatisierte Fahren entbindet Sie nicht von der Verantwortung als Fahrer*in.{'\n'}
        Es funktioniert in den meisten Fällen sehr gut, kann jedoch nicht alle Fahrsituationen
        abdecken. Kommt das System an seine Grenzen, warnt es Sie und fordert zur Übernahme auf.
      </TextWithSidebar>

      <PlaceholderImage source={riskIMG} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Es kann jedoch vorkommen, dass das Fahrzeug Fehler macht, ohne vorher zu warnen. Achten Sie
        deshalb immer auf den Verkehr und die Umgebung. Sie müssen jederzeit sofort eingreifen
        können.{'\n'}Im Folgenden einige Beispiele für mögliche Fehler:
      </TextWithSidebar>

      <TextWithSidebar>
        Das Fahrzeug erkennt einen Kreisverkehr nicht und lenkt falsch.
      </TextWithSidebar>
      <PlaceholderImage source={riskGIF1} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Das Fahrzeug erkennt die Fahrspur nicht wegen einer Baustelle.
      </TextWithSidebar>
      <PlaceholderImage source={riskGIF2} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Das Fahrzeug bremst bei einer roten Ampel trotz Betätigung der SET-Taste nicht ab.
      </TextWithSidebar>
      <PlaceholderImage source={riskGIF3} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Das Fahrzeug erkennt beim Spurwechsel umliegende Fahrzeuge nicht.
      </TextWithSidebar>
      <PlaceholderImage source={riskGIF4} />
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
});
