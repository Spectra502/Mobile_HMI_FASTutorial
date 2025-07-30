// components/QuestionScreen.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TourChapter } from '@/constants/types';
import { useQuizService } from '@/context/QuizServiceContext';

interface Params {
  chapter: string;
  onlyChapter?: string;
}

export default function QuestionScreen() {
  const { chapter: chapParam, onlyChapter } =
    useLocalSearchParams<Params>();
  const router = useRouter();
  const quiz = useQuizService();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const chapter = chapParam as TourChapter;
  const justThisChapter = onlyChapter === 'true';

  const all = justThisChapter
    ? quiz.questions.filter((q) => q.chapter === chapter)
    : quiz.questions; // or unanswered only

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

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* 1) Header */}
      <Text style={styles.header}>{chapter}</Text>

      {/* 2) Pager for question + answers */}
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) => setCurrent(e.nativeEvent.position)}
      >
        {all.map((q) => (
          <ScrollView
            key={q.id}
            contentContainerStyle={styles.page}
            showsVerticalScrollIndicator={false}
          >
            {/* Question Text */}
            <Text style={styles.question}>{q.questionText}</Text>

            {/* Answers List */}
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

      {/* 3) Pager indicator (e.g. “1/3”) */}
      <View style={styles.pagerIndicator}>
        <Text style={styles.pagerText}>
          {current + 1}/{all.length}
        </Text>
      </View>

      {/* 4) Action row pinned to bottom */}
      <View
        style={[
          styles.actions,
          { paddingBottom: insets.bottom || 12 },
        ]}
      >
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelText}>Abbrechen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.confirmBtn,
            all[current].userAnswerIndex == null &&
              styles.confirmDisabled,
          ]}
          disabled={all[current].userAnswerIndex == null}
          onPress={onConfirm}
        >
          <Text style={styles.confirmText}>Bestätigen</Text>
        </TouchableOpacity>
      </View>

      {/* 5) Feedback overlay */}
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

const RADIO_SIZE = 20;
const BUTTON_HEIGHT = 48;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  page: {
    paddingHorizontal: 20,
    paddingBottom: BUTTON_HEIGHT + 40, // leave room for buttons
  },
  question: {
    fontSize: 18,
    marginBottom: 24,
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  radio: {
    width: RADIO_SIZE,
    height: RADIO_SIZE,
    borderRadius: RADIO_SIZE / 2,
    borderWidth: 2,
    borderColor: '#888',
    marginRight: 12,
  },
  radioSelected: {
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  answerText: {
    fontSize: 16,
    color: '#111',
  },
  answerTextSelected: {
    fontWeight: '600',
    color: '#007aff',
  },
  pagerIndicator: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  pagerText: {
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingTop: 8,
  },
  cancelBtn: {
    flex: 1,
    height: BUTTON_HEIGHT,
    marginHorizontal: 16,
    borderRadius: BUTTON_HEIGHT / 2,
    borderWidth: 1,
    borderColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  cancelText: {
    color: '#333',
    fontSize: 16,
  },
  confirmBtn: {
    flex: 1,
    height: BUTTON_HEIGHT,
    marginHorizontal: 16,
    borderRadius: BUTTON_HEIGHT / 2,
    backgroundColor: '#007aff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmDisabled: {
    backgroundColor: '#ccc',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayIcon: {
    fontSize: 60,
    marginBottom: 12,
  },
  overlayText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 24,
  },
  overlayButton: {
    fontSize: 18,
    color: 'white',
  },
});
