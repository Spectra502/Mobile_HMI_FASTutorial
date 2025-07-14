// app/quick-tour/[chapter].tsx
import React from 'react';
import { useSearchParams, useRouter } from 'expo-router';
import QuickTourView from '@/components/QuickTourView';
import { TourChapter } from '@/constants/types';

export default function QuickTourRoute() {
  const { chapter, showOverlay } = useSearchParams<{ chapter: string; showOverlay?: string }>();
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
