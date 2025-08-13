import { useProfile } from '@/context/ProfileContext';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PlaceholderImage from '../PlaceholderImage';
import TextWithSidebar from '../TextWithSidebar';

import staGIF4 from '@/assets/GIFs/1-1.gif';
import staGIF1 from '@/assets/GIFs/4-1.gif';
import staGIF2 from '@/assets/GIFs/4-2.gif';
import staIMG3 from '@/assets/TourPage/4-3.imageset/4-3.jpg';

export default function QuickTourPageStauassistent() {
  const profile = useProfile();

  /*useEffect(() => {
    profile.markChapterFinished(TourChapter.ACC);
  }, []);*/

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextWithSidebar>
        Erkennt das Fahrzeug eine Stausituation (bei weniger als 60 km/h), wird der Stauassistent
        automatisch aktiviert.{'\n'}Im Display leuchtet das Symbol TRAFFIC ASSIST{' '}
        <Text style={styles.green}>grün</Text> auf.
      </TextWithSidebar>

      <PlaceholderImage source={staGIF1} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Das Fahrzeug beschleunigt, bremst und lenkt dann selbstständig und hält den Abstand zum
        Vorderfahrzeug automatisch.
      </TextWithSidebar>

      <PlaceholderImage source={staGIF2} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Wenn der Stauassistent aktiviert ist, können Sie die Hände vom Lenkrad nehmen.{'\n'}Ihr
        Blick muss aber weiterhin auf die Straße gerichtet sein.
      </TextWithSidebar>

      <PlaceholderImage source={staIMG3} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Bremst das Fahrzeug bis zum Stillstand ab, müssen Sie übernehmen und manuell anfahren. Das
        teilautomatisierte Fahren kann wieder aktiviert werden, sobald{' '}
        <Text style={styles.highlight}>DRIVING ASSIST READY</Text> weiß im Display aufleuchtet.
      </TextWithSidebar>

      <PlaceholderImage source={staGIF4} />
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
