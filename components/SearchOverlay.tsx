// components/SearchOverlay.tsx
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TourChapter } from '../constants/types';

interface Props {
  query: string;
  onSelectTutorial(chapter: TourChapter): void;
  onSelectQuiz(chapter: TourChapter): void;
  onClose(): void;
}

export default function SearchOverlay({
  query,
  onSelectTutorial,
  onSelectQuiz,
  onClose,
}: Props) {
  // 1) Filter your chapters by title match:
  const items = ALL_CHAPTERS.filter((ch) =>
    TITLE_MAP[ch].toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.close} onPress={onClose}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Suchergebnisse</Text>
      <Text style={styles.subtitle}>"{query}"</Text>

      <FlatList
        data={items}
        keyExtractor={(ch) => ch}
        style={styles.list}
        renderItem={({ item: chapter }) => (
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => onSelectTutorial(chapter)}
            >
              <Text style={styles.rowText}>
                Tutorial: {TITLE_MAP[chapter]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => onSelectQuiz(chapter)}
            >
              <Text style={[styles.rowText, styles.quizText]}>
                Quiz: {TITLE_MAP[chapter]}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Keine Ergebnisse gefunden</Text>
        }
      />
    </View>
  );
}

const ALL_CHAPTERS = Object.values(TourChapter);
const TITLE_MAP: Record<TourChapter, string> = {
  [TourChapter.ActivateDA]:      'Aktivierung',
  [TourChapter.Verkehrszeichen]: 'Verkehrszeichenassistent',
  [TourChapter.ACC]:             'Abstandsregeltempomat',
  [TourChapter.LKA]:             'Ampelerkennung',
  [TourChapter.Spurwechsel]:     'Spurführungsassistent',
  [TourChapter.Notbremse]:       'Notbremssassistent',
  [TourChapter.Deaktivierung]:   'Deaktivierung',
  [TourChapter.Risiken]:         'Risiken und Verantwortung',
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.98)',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  close: { position: 'absolute', top: 32, right: 16 },
  closeText: { fontSize: 24 },
  title: { fontSize: 18, fontWeight: '600' },
  subtitle: { color: '#666', marginBottom: 12 },
  list: { marginTop: 8 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  btn: { flex: 1 },
  rowText: { fontSize: 16 },
  quizText: { color: '#007aff' },
  empty: { textAlign: 'center', marginTop: 20, color: '#666' },
});
