// components/QuestionScreen.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import PagerView from 'react-native-pager-view';

import { TourChapter } from '@/constants/types';
import { useQuizService } from '@/context/QuizServiceContext';

interface Params {
  chapter: string;
  onlyChapter?: string;
}

export default function QuestionScreen() {

  const { chapter: chapParam, onlyChapter } = useLocalSearchParams<Params>();
  const router = useRouter();
  const quiz = useQuizService();

  // Cast the incoming string to your enum
  const chapter = chapParam as TourChapter;
  const justThisChapter = onlyChapter === 'true';

  // 1) grab either "this chapter" or "all wrong/unanswered" from the service
  /*
  const all = justThisChapter
    ? // a simple filter of the service's own question list:
      quiz.questions.filter(q => q.chapter === chapter)
    : // your service should have an API that returns wrong/unanswered:
      quiz.incorrectlyAnsweredQuestions();*/

  const all = justThisChapter
   // 1) single‐chapter: just those questions
   ? quiz.questions.filter(q => q.chapter === chapter)
   // 2) full quiz: *all* questions (or only unanswered if you prefer)
   : quiz.questions;

  // 2) log it so you can see what you're about to render
  console.log('🗂 questions to display:', all, 'count=', all.length);

  // 3) now track the current index
  const [current, setCurrent] = useState(0);

  const [showOverlay, setOverlay] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);

  function onConfirm() {
    const q = all[current];
    if (q.userAnswerIndex == null) return;
    setLastCorrect(quiz.isAnsweredCorrectly(q.id));
    setOverlay(true);
  }

  function next() {
    setOverlay(false);
    if (current < all.length - 1) {
      setCurrent(current + 1);
    } else {
      Alert.alert(
        justThisChapter ? 'Kapitel abgeschlossen' : 'Quiz abgeschlossen',
        'Gut gemacht!',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }
  }

  console.log('📖 QuestionScreen for chapter:', chapter, 'onlyThisChapter?', justThisChapter);
  console.log('🔢 totalQuestions:', quiz.totalQuestions(chapter));
  console.log('❓ incorrectlyAnsweredQuestions():', quiz.incorrectlyAnsweredQuestions());

  return (
    <View style={styles.fill}>
      <PagerView
        style={styles.pager}
        initialPage={0}
        onPageSelected={e => setCurrent(e.nativeEvent.position)}
      >
        {all.map((q, idx) => (
          <View key={q.id} style={styles.page}>
            <Text style={styles.question}>{q.questionText}</Text>

            {q.possibleAnswers.map((ans, i) => (
              <TouchableOpacity
                key={i}
                style={styles.answerRow}
                onPress={() => quiz.setUserAnswer(q.id, i)}
              >
                <Text style={{
                  fontWeight: q.userAnswerIndex === i ? 'bold' : 'normal'
                }}>
                  {ans}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[
                styles.confirm,
                q.userAnswerIndex == null && styles.disabled
              ]}
              disabled={q.userAnswerIndex == null}
              onPress={onConfirm}
            >
              <Text>Bestätigen</Text>
            </TouchableOpacity>
          </View>
        ))}
      </PagerView>

      {showOverlay && (
        <View style={styles.overlay}>
          <Text style={styles.overlayIcon}>
            {lastCorrect ? '✅' : '❌'}
          </Text>
          <Text style={styles.overlayText}>
            {lastCorrect ? 'Richtig!' : 'Falsch!'}
          </Text>
          <TouchableOpacity onPress={next}>
            <Text style={styles.overlayButton}>OK</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fill:   { flex: 1, backgroundColor: '#fff' },
  pager:  { flex: 1 },
  page:   { flex: 1, padding: 20 },
  question: { fontSize: 18, marginBottom: 16 },
  answerRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  confirm: {
    marginTop: 20,
    backgroundColor: '#007aff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabled: { backgroundColor: '#ccc' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems:   'center',
  },
  overlayIcon:   { fontSize: 60, marginBottom: 12 },
  overlayText:   { fontSize: 24, color: 'white' },
  overlayButton: { marginTop: 20, color: 'white', fontSize: 18 },
});
