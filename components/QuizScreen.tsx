// components/QuizScreen.tsx
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
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
import CustomAlert from './CustomAlert'; // Import the new component
import CustomProgressBar from './CustomProgressBar';
import FahrpunkteScreen from './FahrpunkteScreen';

type AlertInfo = {
  visible: boolean;
  title: string;
  message: string;
  buttons: { text: string; style?: 'primary' | 'secondary'; onPress: () => void; }[];
} | null;

export default function QuizScreen() {
  const insets = useSafeAreaInsets();
  const profile = useProfile();
  const router  = useRouter();
  const quiz = useQuizService();
  const totalQ = quiz.totalQuestions();
  const correct = quiz.totalCorrectAnswers();

  const [selectedTab, setSelectedTab] = useState<'test' | 'fahrpunkte'>('test');
  const [alertInfo, setAlertInfo] = useState<AlertInfo>(null); // State for alerts

  useEffect(() => {
    if (selectedTab !== 'test' || !profile.activeProfile) return;
    if (totalQ <= 0) return;
    const alreadySeen = profile.activeProfile.hasSeenQuizFinishedPopup;
    if (correct === totalQ && !alreadySeen) {
      setAlertInfo({
        visible: true,
        title: 'Herzlichen Glückwunsch! 🎉',
        message: 'Sie haben alle Quiz-Kapitel erfolgreich abgeschlossen.',
        buttons: [
          {
            text: 'OK',
            onPress: () => {
              profile.markPopupAsSeen('quiz');
              setAlertInfo(null);
            },
          },
        ],
      });
    }
  }, [
    selectedTab,
    totalQ,
    correct,
    profile.activeProfile,
    profile,
  ]);

  return (
    <View style={[styles.fill, { paddingTop: insets.top }]}>
      <View style={styles.tabSelector}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'test' && styles.tabSelected]}
          onPress={() => setSelectedTab('test')}
        >
          <Text style={selectedTab === 'test' ? styles.tabTextSel : styles.tabText}>Test</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'fahrpunkte' && styles.tabSelected]}
          onPress={() => setSelectedTab('fahrpunkte')}
        >
          <Text style={selectedTab === 'fahrpunkte' ? styles.tabTextSel : styles.tabText}>Fahrpunkte</Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'test' ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, padding: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.progressWrapper}>
            <Text style={styles.desc}>
              Füllen Sie 24 Fragen aus und testen Sie Ihr Wissen mit diesem Quiz!
            </Text>
            <CustomProgressBar progress={correct / Math.max(1, totalQ)} />
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => {
                if (!profile.areAllChaptersFinished()) {
                  setAlertInfo({
                    visible: true,
                    title: 'Erst Tutorial abschließen',
                    message: 'Sie müssen zuerst alle Seiten des Tutorials absolvieren, bevor Sie das Quiz starten können!',
                    buttons: [{ text: 'OK', onPress: () => setAlertInfo(null) }],
                  });
                  return;
                }

                const remaining = quiz.questions.filter(
                  (q) => q.userAnswerIndex == null || !quiz.isAnsweredCorrectly(q.id)
                );

                const firstRemainingQuestion = remaining[0];

                if (firstRemainingQuestion) {
                  router.push({
                    pathname: '/quiz/[chapter]',
                    params: {
                      chapter: firstRemainingQuestion.chapter,
                      onlyChapter: 'false',
                    },
                  });
                } else {
                  setAlertInfo({
                    visible: true,
                    title: 'Test abgeschlossen!',
                    message: 'Sie haben bereits alle Fragen richtig beantwortet.',
                    buttons: [{ text: 'OK', onPress: () => setAlertInfo(null) }],
                  });
                }
              }}
            >
              <Text style={styles.startText}>Starten ▶</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.sectionHeader}>
            Beantworten nach Kapiteln
          </Text>

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

      {alertInfo && (
        <CustomAlert
          visible={alertInfo.visible}
          title={alertInfo.title}
          message={alertInfo.message}
          buttons={alertInfo.buttons}
          onClose={() => setAlertInfo(null)}
        />
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
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 20,
    marginBottom: 0,
    marginTop: 5,
  },
  tabSelected: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#007aff',
  },
  tabText: { color: '#666', fontWeight: '600', fontSize: 16 },
  tabTextSel: { color: '#007aff', fontWeight: '700', fontSize: 16 },
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
  startText: { fontSize: 18, color: '#fff', fontWeight: '600' },
  section: { marginTop: 24 },
  desc:  { fontSize: 18, marginVertical: 12 },
});