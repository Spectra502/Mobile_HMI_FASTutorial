import { useProfile } from '@/context/ProfileContext';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PlaceholderImage from '../PlaceholderImage';
import TextWithSidebar from '../TextWithSidebar';

import daGIF2 from '@/assets/HMI_GIFs/1-2.gif';
import daGIF4 from '@/assets/HMI_GIFs/1-4.gif';
import daGIF1 from '@/assets/HMI_GIFs/1neu1.gif';
import daGIF1_neu from '@/assets/HMI_GIFs/1neu2.gif';
import daGIF3 from '@/assets/HMI_GIFs/1neu3.gif';
import daJPG5 from '@/assets/HMI_GIFs/4-3.jpg';

export default function QuickTourPageDA() {
  const profile = useProfile();

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

      <PlaceholderImage source={daGIF1_neu} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Drücken Sie die <Text style={styles.highlight}>Aktivierungstaste</Text>, um das teilautomatisierte Fahren zu aktivieren.
      </TextWithSidebar>

      <PlaceholderImage source={daGIF2} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Bei erfolgreicher Aktivierung, leuchtet das Automationssymbol <Text style={styles.green}>grün.</Text> im Display auf.
      </TextWithSidebar>

      <PlaceholderImage source={daGIF3} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Zudem leuchten die Lenkradlichter <Text style={styles.green}>grün.</Text>
      </TextWithSidebar>

      <PlaceholderImage source={daGIF4} />

      <View style={styles.divider} />

      <TextWithSidebar>
        Es sind nun alle Fahrerassistenzsysteme aktiv und das Fahrzeug fährt teilautomatisiert. 
        Richten Sie Ihren Blick weiterhin auf die Straße und nehmen Sie die Füße von den Pedalen. Ihre Hände können Sie während der automatisierten Fahrt vom Lenkrad nehmen oder am Lenkrad belassen, ohne zu lenken.
      </TextWithSidebar>

      <PlaceholderImage source={daJPG5} />
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
