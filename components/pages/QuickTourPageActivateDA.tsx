import { useProfile } from '@/context/ProfileContext';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PlaceholderImage from '../PlaceholderImage';
import TextWithSidebar from '../TextWithSidebar';

import daGIF1 from '@/assets/GIFs/1-1.gif';
import daGIF2 from '@/assets/GIFs/1-2.gif';
import daGIF3 from '@/assets/GIFs/1-3.gif';
import daGIF4 from '@/assets/GIFs/1-4.gif';
import daGIF6 from '@/assets/GIFs/1-6.gif';
import daIMG5 from '@/assets/TourPage/1-5.imageset/1-5.jpg';

export default function QuickTourPageDA() {
  const profile = useProfile();

  /*useEffect(() => {
    profile.markChapterFinished(TourChapter.ActivateDA);
  }, []);*/

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextWithSidebar>
        Der Status der Automation wird durch das Automationssymbol im Display angezeigt. 
        Erscheint das Symbol grau, ist das teilautomatisierte Fahren <Text style={styles.highlight}>nicht</Text> verfügbar.
      </TextWithSidebar>

      <PlaceholderImage source={daGIF1} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Wenn das Automationssymbol weiß im Display aufleuchtet, ist das teilautomatisierte Fahren verfügbar. 
        Bei Bedingungen, wie zum Beispiel schlechtem Wetter, kann es unter Umständen nicht verfügbar sein.
      </TextWithSidebar>

      <PlaceholderImage source={daGIF2} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Drücken Sie die <Text style={styles.highlight}>Aktivierungstaste</Text>, um das teilautomatisierte Fahren zu aktivieren.
      </TextWithSidebar>

      <PlaceholderImage source={daGIF3} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Bei erfolgreicher Aktivierung, leuchtet das Automationssymbol <Text style={styles.green}>grün.</Text> im Display auf.
      </TextWithSidebar>

      <PlaceholderImage source={daGIF4} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Zudem leuchten die Lenkradlichter <Text style={styles.green}>grün.</Text>
      </TextWithSidebar>

      <PlaceholderImage source={daGIF6} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Es sind nun <Text style={styles.highlight}>alle</Text> Fahrerassistenzsysteme aktiv und das Fahrzeug fährt <Text style={styles.highlight}>teilautomatisiert</Text>. 
        Richten Sie Ihren Blick weiterhin auf die Straße und nehmen Sie die Füße von den Pedalen. Ihre Hände können Sie während der automatisierten Fahrt vom Lenkrad nehmen oder am Lenkrad belassen, ohne zu lenken.
      </TextWithSidebar>

      <PlaceholderImage source={daIMG5} />
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
