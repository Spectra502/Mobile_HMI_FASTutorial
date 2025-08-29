// components/SearchOverlay.tsx
import React from 'react'
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { TourChapter } from '../constants/types'
import AssistantButton from './AssistantButton'

interface Props {
  query: string
  onSelectTutorial(chapter: TourChapter): void
  onSelectQuiz(chapter: TourChapter): void
  onClose(): void
}

const ALL_CHAPTERS = Object.values(TourChapter)
const TITLE_MAP: Record<TourChapter, string> = {
  [TourChapter.ActivateDA]:      'Aktivierung',
  [TourChapter.Verkehrszeichen]: 'Verkehrszeichenassistent',
  [TourChapter.ACC]:             'Abstandsregeltempomat',
  [TourChapter.LKA]:             'Ampelerkennung',
  [TourChapter.Spurwechsel]:     'Spurführungsassistent',
  [TourChapter.Notbremse]:       'Notbremsung',
  [TourChapter.Deaktivierung]:   'Deaktivierung',
  [TourChapter.Risiken]:         'Risiken und Verantwortung',
}

export default function SearchOverlay({
  query,
  onSelectTutorial,
  onSelectQuiz,
  onClose,
}: Props) {
  // Only filter once the user has actually typed
  const trimmed = query.trim().toLowerCase()
  const matches = trimmed.length > 0
    ? ALL_CHAPTERS.filter(ch => TITLE_MAP[ch].toLowerCase().includes(trimmed))
    : []

  const sections = [
    { title: 'Tutorial', data: matches },
    { title: 'Quiz',     data: matches },
  ]

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.close} onPress={onClose}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Suchergebnisse</Text>
      {/* hide the subtitle if query is empty */}
      { trimmed.length > 0 && (
        <Text style={styles.subtitle}>"{query}"</Text>
      )}

      { trimmed.length > 0 && (
        <SectionList
          sections={sections}
          keyExtractor={item => item}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          renderItem={({ item: chapter, section }) => (
            <AssistantButton
              chapter={chapter}
              style={section.title === 'Tutorial' ? 'tutorial' : 'quiz'}
              onPress={() => {
                if (section.title === 'Tutorial') onSelectTutorial(chapter)
                else                               onSelectQuiz(chapter)
              }}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>Keine Übereinstimmungen gefunden.</Text>
          }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.98)',
    paddingTop: 65,
    paddingHorizontal: 16,
  },
  close: { position: 'absolute', top: 32, right: 16 },
  closeText: { fontSize: 35 },
  title: { fontSize: 20, fontWeight: '600' },
  subtitle: { color: '#666', marginBottom: 12 },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  empty: { textAlign: 'center', marginTop: 20, color: '#666' },
})
