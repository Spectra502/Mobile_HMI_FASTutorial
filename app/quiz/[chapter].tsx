// app/quiz/[chapter].tsx
import QuestionScreen from '@/components/QuestionScreen';
import { TourChapter } from '@/constants/types';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';

export default function QuizChapterModal() {
  const { chapter, onlyChapter } = useLocalSearchParams<{
    chapter: string;
    onlyChapter?: string;
  }>();
  const router = useRouter();

  if (!chapter) {
    // malformed URL? just close
    router.back();
    return null;
  }

  const onlySingle = onlyChapter === 'true';

  return (
    <QuestionScreen
      chapter={chapter as TourChapter}
      onlyChapter={onlySingle}
      onDone={() => router.back()}
    />
  );
}
