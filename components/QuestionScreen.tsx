// components/QuestionScreen.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useResponsive } from '@/constants/responsive';
import { TourChapter } from '@/constants/types';
import { useQuizService } from '@/context/QuizServiceContext';

interface Params {
  chapter: string;
  onlyChapter?: string;
}

export default function QuestionScreen() {
  const { isTablet } = useResponsive();
  const overlayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { chapter: chapParam, onlyChapter } = useLocalSearchParams<Params>();
  const router = useRouter();
  const quiz = useQuizService();
  const insets = useSafeAreaInsets();

  const chapter = chapParam as TourChapter;
  const justThisChapter = onlyChapter === 'true';

  const initialIds = useMemo(() => {
    if (justThisChapter) {
      return quiz.questions.filter(q => q.chapter === chapter).map(q => q.id);
    }
    return quiz.questions
      .filter(q => q.userAnswerIndex == null || !quiz.isAnsweredCorrectly(q.id))
      .map(q => q.id);
  }, [justThisChapter, chapter, quiz.questions]);

  const [ids, setIds] = useState<string[]>(initialIds);
  const [current, setCurrent] = useState(0);
  const [retryRound, setRetryRound] = useState(false);
  const [pagerKey, setPagerKey] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const all = ids
    .map(id => quiz.questions.find(q => q.id === id))
    .filter((q): q is NonNullable<typeof q> => !!q);

  const [quizDone, setQuizDone] = useState(all.length === 0);
  const [showOverlay, setOverlay] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);

  useEffect(() => {
    if (showOverlay) {
      overlayTimer.current = setTimeout(() => {
        overlayTimer.current = null;
        next();
      }, 1000);
    }
    return () => {
      if (overlayTimer.current) {
        clearTimeout(overlayTimer.current);
        overlayTimer.current = null;
      }
    };
  }, [showOverlay]);

  useEffect(() => {
    if (current > all.length - 1) {
      setCurrent(Math.max(0, all.length - 1));
    }
  }, [all.length, current]);

  function onConfirm() {
    const q = all[current];
    if (!q || q.userAnswerIndex == null) return;
    setLastCorrect(quiz.isAnsweredCorrectly(q.id));
    setOverlay(true);
  }

  function movePagerTo(idx: number) {
    requestAnimationFrame(() => pagerRef.current?.setPage(idx));
  }

  function next() {
    setOverlay(false);

    if (current < all.length - 1) {
      movePagerTo(current + 1);
      return;
    }

    const incorrectIds = ids.filter(id => {
      const q = quiz.questions.find(x => x.id === id);
      return !!q && q.userAnswerIndex != null && !quiz.isAnsweredCorrectly(id);
    });

    if (incorrectIds.length > 0) {
      setRetryRound(true);
      setIds(incorrectIds);
      setCurrent(0);
      setPagerKey(k => k + 1);
      return;
    }
    setQuizDone(true);
  }

  const currentQuestion = all[current];
  const headerTitle = retryRound
    ? 'Quiz Wiederholung'
    : justThisChapter
    ? chapter
    : currentQuestion?.chapter ?? 'Quiz';

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.header}>{headerTitle}</Text>

      <PagerView
        key={pagerKey}
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) => setCurrent(e.nativeEvent.position)}
        scrollEnabled={false}
      >
        {all.map((q) => (
          <ScrollView
            key={q.id}
            contentContainerStyle={styles.page}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.question}>{q.questionText}</Text>
            {q.possibleAnswers.map((ans, i) => (
              <TouchableOpacity
                key={i}
                style={styles.answerRow}
                onPress={() => quiz.setUserAnswer(q.id, i)}
              >
                <View
                  style={[
                    styles.radio,
                    q.userAnswerIndex === i && styles.radioSelected,
                  ]}
                />
                <Text
                  style={[
                    styles.answerText,
                    isTablet && { fontSize: 24 },
                    q.userAnswerIndex === i && styles.answerTextSelected,
                  ]}
                >
                  {ans}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ))}
      </PagerView>

      <View style={styles.pagerIndicator}>
        <Text style={styles.pagerText}>
          {all.length === 0 ? 0 : Math.min(current + 1, all.length)}/{all.length}
        </Text>
      </View>

      <View style={[styles.actions, { paddingBottom: insets.bottom || 12 }]}>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
          <Text style={styles.cancelText}>Abbrechen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.confirmBtn,
            (!currentQuestion || currentQuestion.userAnswerIndex == null) && styles.confirmDisabled,
          ]}
          disabled={!currentQuestion || currentQuestion.userAnswerIndex == null}
          onPress={onConfirm}
        >
          <Text style={styles.confirmText}>Bestätigen</Text>
        </TouchableOpacity>
      </View>

      {showOverlay && (
        <View style={styles.overlay}>
          <Text style={styles.overlayIcon}>{lastCorrect ? '✅' : '❌'}</Text>
          <Text style={styles.overlayText}>
            {lastCorrect ? 'Richtig!' : 'Falsch!'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (overlayTimer.current) {
                clearTimeout(overlayTimer.current);
                overlayTimer.current = null;
              }
              next();
            }}
          >
            <Text style={styles.overlayButton}>OK</Text>
          </TouchableOpacity>
        </View>
      )}

      {quizDone && (
        <View style={styles.doneBackdrop}>
          <View className="card" style={styles.doneCard}>
            <Text style={styles.doneTitle}>Herzlichen Glückwunsch! 🎉</Text>
            <Text style={styles.doneBody}>
              {justThisChapter
                ? 'Sie haben alle Fragen des Kapitels korrekt beantwortet.'
                : 'Sie haben alle Quiz-Fragen korrekt beantwortet.'}
            </Text>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => {
                router.back();
              }}
            >
              <Text style={styles.doneButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const RADIO_SIZE = 20;
const BUTTON_HEIGHT = 48;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { textAlign: 'center', fontSize: 24, fontWeight: '600', marginBottom: 12, marginTop: 20 },
  page: { paddingHorizontal: 20, paddingBottom: BUTTON_HEIGHT + 40 },
  question: { fontSize: 22, marginBottom: 24, fontWeight: '600', marginTop: 18 },
  answerRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eee' },
  radio: { width: RADIO_SIZE, height: RADIO_SIZE, borderRadius: RADIO_SIZE / 2, borderWidth: 2, borderColor: '#888', marginRight: 12 },
  radioSelected: { backgroundColor: '#007aff', borderColor: '#007aff' },
  answerText: { fontSize: 18, color: '#111', width: '90%' },
  answerTextSelected: { fontWeight: '600', color: '#007aff' },
  pagerIndicator: { alignItems: 'center', paddingVertical: 6 },
  pagerText: { color: '#666' },
  actions: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', paddingTop: 8 },
  cancelBtn: { flex: 1, height: BUTTON_HEIGHT, marginHorizontal: 16, borderRadius: BUTTON_HEIGHT / 2, borderWidth: 1, borderColor: '#aaa', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' },
  cancelText: { color: '#333', fontSize: 16 },
  confirmBtn: { flex: 1, height: BUTTON_HEIGHT, marginHorizontal: 16, borderRadius: BUTTON_HEIGHT / 2, backgroundColor: '#007aff', justifyContent: 'center', alignItems: 'center' },
  confirmDisabled: { backgroundColor: '#ccc' },
  confirmText: { color: '#fff', fontSize: 16 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  overlayIcon: { fontSize: 60, marginBottom: 12 },
  overlayText: { fontSize: 24, color: 'white', marginBottom: 24 },
  overlayButton: { fontSize: 18, color: 'white' },
  doneBackdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  doneCard: { width: '80%', backgroundColor: '#fff', borderRadius: 16, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 6, elevation: 5 },
  doneTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8, textAlign: 'center' },
  doneBody: { fontSize: 14, color: '#555', marginBottom: 20, textAlign: 'center' },
  doneButton: { backgroundColor: '#007aff', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 24 },
  doneButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});