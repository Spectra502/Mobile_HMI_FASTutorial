// components/HomeSection.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TourChapter, allChapters } from '../constants/types';
import { useProfile } from '../context/ProfileContext';
import AssistantButton from './AssistantButton';
import CustomProgressBar from './CustomProgressBar';


export default function HomeSection({
  onSeeAll,
  onChapter,
}: {
  onSeeAll(): void;
  onChapter(ch: TourChapter): void;
}) {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);
  const profile = useProfile();
  
  const total    = allChapters.length;
  const done = allChapters.filter(ch => profile.isChapterFinished(ch)).length;
  const progress = total > 0 ? done / total : 0;

  console.log('HomeSection: done', done, 'total', total, 'progress', progress);

  //const toDisplay = showAll ? chapters : chapters.slice(0, 3);
  const toDisplay = showAll
    ? allChapters
    : allChapters.slice(0, 3);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tutorial</Text>
        <TouchableOpacity onPress={() => {
          if (!showAll) onSeeAll();
          setShowAll(!showAll);
        }}>
          <Text style={styles.seeAll}>Alle anzeigen</Text>
        </TouchableOpacity>
      </View>

      <CustomProgressBar progress={done/total} />

      {toDisplay.map((ch) => (
        <AssistantButton
          key={ch}
          chapter={ch}
          style="tutorial"
          onPress={() => {
            //console.log('Jumping to chapter', ch);
            router.push({
              pathname: '/quick-tour/[chapter]',
              params: { chapter: ch, showOverlay: 'false' },
            });
          }

          }
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#e7e7e7ff', padding: 16, borderRadius: 15, marginBottom: 16 },
  header:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title:     { fontSize: 20, fontWeight: 'bold' },
  seeAll:    { fontSize: 16, fontWeight: '600' },
});
