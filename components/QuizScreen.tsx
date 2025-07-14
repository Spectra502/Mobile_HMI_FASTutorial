// components/QuizScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter }         from 'expo-router';

import FahrpunkteScreen from './FahrpunkteScreen';
import CustomProgressBar from './CustomProgressBar';
import AssistantButton   from './AssistantButton';
import { TourChapter, allChapters } from '@/constants/types';
import { useProfile }    from '@/context/ProfileContext';

export default function QuizScreen() {
  const insets = useSafeAreaInsets();
  const profile = useProfile();
  const router  = useRouter();

  // mimic the SwiftUI tab selection
  const [selectedTab, setSelectedTab] = useState<'test' | 'fahrpunkte'>('test');

  return (
    <View style={[styles.fill, { paddingTop: insets.top }]}>
      {/* Top Tab Selector */}
      <View style={styles.tabSelector}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'test' && styles.tabSelected,
          ]}
          onPress={() => setSelectedTab('test')}
        >
          <Text style={selectedTab==='test'?styles.tabTextSel:styles.tabText}>Test</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'fahrpunkte' && styles.tabSelected,
          ]}
          onPress={() => setSelectedTab('fahrpunkte')}
        >
          <Text style={selectedTab==='fahrpunkte'?styles.tabTextSel:styles.tabText}>Fahrpunkte</Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'test' ? (
        <ScrollView contentContainerStyle={styles.content}>
          {/* Progress Section */}
          <View style={styles.progressWrapper}>
            <CustomProgressBar
              progress={
                profile.totalCorrectAnswers() /
                Math.max(1, profile.totalQuestions())
              }
            />
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => {
                // onlyChapter quiz – start at first chapter
                if (!profile.areAllChaptersFinished()) {
                  // show alert instead?
                  return;
                }
                router.push({
                  pathname: '/quiz/[chapter]',
                  params: {
                    chapter: allChapters[0],
                    onlyChapter: 'false',
                  },
                });
              }}
            >
              <Text style={styles.startText}>Starten ▶</Text>
            </TouchableOpacity>
          </View>

          {/* Chapter-by-chapter */}
          <View style={styles.section}>
            {allChapters.map((chap) => (
              <AssistantButton
                key={chap}
                chapter={chap}
                style="quiz"
                disabled={!profile.isChapterFinished(chap)}
                onPress={() =>
                  router.push({
                    pathname: '/quiz/[chapter]',
                    params: { chapter: chap, onlyChapter: 'true' },
                  })
                }
              />
            ))}
          </View>
        </ScrollView>
      ) : (
        <FahrpunkteScreen />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: '#fff' },
  tabSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#eee',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabSelected: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#007aff',
  },
  tabText: { color: '#666', fontWeight: '600' },
  tabTextSel: { color: '#007aff', fontWeight: '700' },
  content: { padding: 20 },
  progressWrapper: {
    backgroundColor: '#f5f5f5',
    borderRadius: 17,
    marginBottom: 20,
    alignItems: 'center',
    padding: 16,
  },
  startButton: {
    marginTop: 12,
    backgroundColor: '#007aff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
  },
  startText: { color: '#fff', fontWeight: '600' },
  section: { marginTop: 24 },
});
