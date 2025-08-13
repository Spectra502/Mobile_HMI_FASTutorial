import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { QuizQuestion, sampleQuestions } from '@/constants/quiz';
import { TourChapter } from '@/constants/types';
import { useProfile } from '@/context/ProfileContext';

export interface QuizService {
  questions: QuizQuestion[];
  totalQuestions: (chapter?: TourChapter) => number;
  question: (chapter: TourChapter, index: number) => QuizQuestion | undefined;
  setUserAnswer: (questionID: string, selectedIndex: number) => void;
  isAnsweredCorrectly: (questionID: string) => boolean;
  totalCorrectAnswers: () => number;
  incorrectlyAnsweredQuestions: () => { chapter: TourChapter; question: QuizQuestion }[];
  resetAll: () => void;
}

const QuizServiceContext = createContext<QuizService | undefined>(undefined);

const STORAGE_PREFIX = 'QuizProgress.'; // per-profile key: QuizProgress.<profileId>

export function QuizServiceProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const profile = useProfile();
  const profileId = profile.activeProfile?.id ?? null;
  const storageKey = profileId ? `${STORAGE_PREFIX}${profileId}` : null;

  // Helper: apply a saved answers map (questionID -> answerIndex) to base questions
  const applySavedAnswers = (
    base: QuizQuestion[],
    saved: Record<string, number> | null
  ): QuizQuestion[] => {
    if (!saved) return base;
    return base.map(q =>
      Object.prototype.hasOwnProperty.call(saved, q.id)
        ? { ...q, userAnswerIndex: saved[q.id] }
        : q
    );
  };

  // Rehydrate questions whenever the active profile changes.
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      // start from a clean copy of sampleQuestions
      let base = sampleQuestions.map(q => ({ ...q, userAnswerIndex: undefined as number | undefined }));
      // load per-profile saved answers if we have an active profile
      if (storageKey) {
        try {
          const raw = await AsyncStorage.getItem(storageKey);
          const saved = raw ? (JSON.parse(raw) as Record<string, number>) : null;
          base = applySavedAnswers(base, saved);
        } catch {
          // ignore parse errors
        }
      }
      if (!cancelled) setQuestions(base);
    };

    load();
    return () => { cancelled = true; };
  }, [storageKey]);

  const persistAnswers = async (qs: QuizQuestion[]) => {
    if (!storageKey) return; // no active profile -> ephemeral session only
    const map: Record<string, number> = {};
    for (const q of qs) {
      if (typeof q.userAnswerIndex === 'number') {
        map[q.id] = q.userAnswerIndex;
      }
    }
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(map));
    } catch {
      // ignore
    }
  };

  const totalQuestions = (chapter?: TourChapter) =>
    chapter
      ? questions.filter(q => q.chapter === chapter).length
      : questions.length;

  const question = (chapter: TourChapter, idx: number) =>
    questions.filter(q => q.chapter === chapter)[idx];

  const setUserAnswer = (questionID: string, selectedIndex: number) => {
    setQuestions(prev => {
      const next = prev.map(q =>
        q.id === questionID ? { ...q, userAnswerIndex: selectedIndex } : q
      );
      // fire and forget persistence
      void persistAnswers(next);
      return next;
    });
  };

  const isAnsweredCorrectly = (questionID: string) => {
    const q = questions.find(x => x.id === questionID);
    return !!(q && typeof q.userAnswerIndex === 'number' && q.userAnswerIndex === q.correctAnswerIndex);
  };

  const totalCorrectAnswers = () =>
    questions.filter(q => isAnsweredCorrectly(q.id)).length;

  const incorrectlyAnsweredQuestions = () =>
    questions
      .filter(q => typeof q.userAnswerIndex === 'number' && !isAnsweredCorrectly(q.id))
      .map(q => ({ chapter: q.chapter, question: q }));

  const resetAll = () => {
    setQuestions(prev => {
      const next = prev.map(q => ({ ...q, userAnswerIndex: undefined }));
      // remove persisted answers for this profile too
      if (storageKey) void AsyncStorage.removeItem(storageKey);
      return next;
    });
  };

  const value: QuizService = {
    questions,
    totalQuestions,
    question,
    setUserAnswer,
    isAnsweredCorrectly,
    totalCorrectAnswers,
    incorrectlyAnsweredQuestions,
    resetAll,
  };

  return (
    <QuizServiceContext.Provider value={value}>
      {children}
    </QuizServiceContext.Provider>
  );
}

export function useQuizService(): QuizService {
  const ctx = useContext(QuizServiceContext);
  if (!ctx) throw new Error('useQuizService must be inside QuizServiceProvider');
  return ctx;
}
