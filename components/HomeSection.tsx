// components/HomeSection.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TourChapter } from '../constants/types';
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
  const [showAll, setShowAll] = useState(false);
  const profile = useProfile();
  const chapters: TourChapter[] = ['ActivateDA', 'Verkehrszeichen', 'ACC', 'LKA', 'Spurwechsel', 'Notbremse', 'Deaktivierung', 'Risiken'];
  const total    = chapters.length;
  const done     = profile.finishedChapters.length;
  const progress = total > 0 ? done / total : 0;

  const toDisplay = showAll ? chapters : chapters.slice(0, 3);

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

      <CustomProgressBar progress={progress} />

      {toDisplay.map((ch) => (
        <AssistantButton
          key={ch}
          chapter={ch}
          style="tutorial"
          onPress={() => onChapter(ch)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#e7e7e7ff', padding: 16, borderRadius: 15, marginBottom: 16 },
  header:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title:     { fontSize: 17, fontWeight: 'bold' },
  seeAll:    { fontSize: 13, fontWeight: '600' },
});
