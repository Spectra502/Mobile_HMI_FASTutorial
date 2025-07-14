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
  const chapters: TourChapter[] = ['activation','trafficSign','acc','trafficLight', ];
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
      <Text style={styles.percent}>{Math.round(progress*100)}%</Text>

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
  container: { backgroundColor: '#F5F5F5', padding: 16, borderRadius: 15, marginBottom: 16 },
  header:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title:     { fontSize: 17, fontWeight: 'bold' },
  seeAll:    { fontSize: 13, fontWeight: '600' },
  percent:   { position: 'absolute', right: 24, top: 34, fontWeight: '600' },
});
