// components/QuizScreen.tsx
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
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
  const quiz = useQuizService();
  const totalQ = quiz.totalQuestions();
  const correct = quiz.totalCorrectAnswers();

  const [selectedTab, setSelectedTab] = useState<'test' | 'fahrpunkte'>('test');

  //console.log('allChapters:', allChapters)
  //console.log('totalQuestions:', quiz.totalQuestions())
  //console.log('totalCorrectAnswers:', quiz.totalCorrectAnswers())

  // Show a one-time "100% complete" message when all questions are correct
  useEffect(() => {
    if (selectedTab !== 'test') return;
    if (totalQ <= 0) return;
    const alreadySeen = profile.activeProfile?.hasSeenQuizFinishedPopup;
    if (correct === totalQ && !alreadySeen) {
      Alert.alert(
        'Herzlichen Glückwunsch! 🎉',
        'Sie haben alle Quiz-Kapitel erfolgreich abgeschlossen.',
        [
          {
            text: 'OK',
            onPress: () => profile.markPopupAsSeen('quiz'),
          },
        ],
      );
    }
  }, [
    selectedTab,
    totalQ,
    correct,
    profile.activeProfile?.hasSeenQuizFinishedPopup,
    profile,
  ]);


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
            <Text style={styles.desc}>
              Füllen Sie 24 Fragen aus und testen Sie Ihr Wissen mit diesem Quiz!
            </Text>
            <CustomProgressBar
              progress={
                correct/
                Math.max(1, totalQ)
              }
            />
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => {
                // 1) Must finish all tutorials first
                if (!profile.areAllChaptersFinished()) {
                  Alert.alert(
                    'Erst Tutorial abschließen',
                    'Sie müssen zuerst alle Seiten des Tutorials absolvieren, bevor Sie das Quiz starten können!',
                    [{ text: 'OK' }],
                  );
                  return;
                }

                // 2) Compute remaining questions (unanswered OR incorrect)
                const remaining = quiz.questions.filter(
                  (q) => q.userAnswerIndex == null || !quiz.isAnsweredCorrectly(q.id)
                );

                if (remaining.length === 0) {
                  Alert.alert(
                    'Test abgeschlossen!',
                    'Sie haben bereits alle Fragen richtig beantwortet.',
                    [{ text: 'OK' }],
                  );
                  return;
                }

                // 3) Start at the first remaining question's chapter
                const firstChapter = remaining[0].chapter;

                router.push({
                  pathname: '/quiz/[chapter]',
                  params: {
                    chapter: firstChapter,
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
    paddingVertical: 16,
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
    fontSize: 30,
    marginTop: 12,
    backgroundColor: '#007aff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
  },
  startText: { fontSize: 24, color: '#fff', fontWeight: '600' },
  section: { marginTop: 24 },
  desc:  { fontSize: 22, marginVertical: 12 },
});

