// app/quick-tour/[chapter].tsx
import QuickTourView from '@/components/QuickTourView';
import { TourChapter } from '@/constants/types';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';

export default function QuickTourRoute() {
  const { chapter, showOverlay } = useLocalSearchParams<{ chapter: string; showOverlay?: string }>();
  const router = useRouter();
  const showOv = showOverlay !== 'false'; // default true

  return (
    <QuickTourView
      initialChapter={chapter as TourChapter}
      showOverlay={showOv}
      onDone={() => router.back()}
    />
  );
}
