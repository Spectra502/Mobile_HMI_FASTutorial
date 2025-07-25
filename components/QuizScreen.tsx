// components/QuizScreen.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { allChapters } from '@/constants/types';
import { useProfile } from '@/context/ProfileContext';
import { useQuizService } from '@/context/QuizServiceContext';
import AssistantButton from './AssistantButton';
import CustomProgressBar from './CustomProgressBar';
import FahrpunkteScreen from './FahrpunkteScreen';

export default function QuizScreen() {
  const insets = useSafeAreaInsets();
  const profile = useProfile();
  const router  = useRouter();
  //const quiz    = useQuizService();
  const quiz = useQuizService();
  const totalQ = quiz.totalQuestions();
  const correct = quiz.totalCorrectAnswers();

  // mimic the SwiftUI tab selection
  const [selectedTab, setSelectedTab] = useState<'test' | 'fahrpunkte'>('test');

  console.log('allChapters:', allChapters)
  console.log('totalQuestions:', quiz.totalQuestions())
  console.log('totalCorrectAnswers:', quiz.totalCorrectAnswers())


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
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, padding: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Progress Section */}
          <View style={styles.progressWrapper}>
            <CustomProgressBar
              progress={
                correct/
                Math.max(1, totalQ)
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
          
          <Text style={styles.sectionHeader}>
            Beantworten nach Kapiteln
          </Text>

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
  sectionHeader: {
  fontSize: 16,
  fontWeight: '600',
  color: '#333',
  marginHorizontal: 20,
  marginBottom: 12,
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

