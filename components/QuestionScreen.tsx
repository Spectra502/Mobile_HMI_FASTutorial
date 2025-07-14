// components/QuestionScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView,
  StyleSheet, TouchableOpacity,
} from 'react-native';
import { useSearchParams, useRouter } from 'expo-router';
import { TourChapter }    from '@/constants/types';
import { useProfile }     from '@/context/ProfileContext';
import { useQuizService } from '@/context/QuizServiceContext'; // your port
import AssistantButton    from './AssistantButton';

export default function QuestionScreen() {
  const { chapter, onlyChapter } = useSearchParams<{
    chapter: string;
    onlyChapter?: string;
  }>();
  const router = useRouter();
  const profile = useProfile();
  const quiz    = useQuizService();

  const chap    = chapter as TourChapter;
  const chapterOnly = onlyChapter === 'true';

  // Implement question paging & overlays here,
  // mirroring your SwiftUI TabView + Alerts… 
  // For brevity, you can start with a simple placeholder:

  return (
    <View style={styles.fill}>
      <Text style={styles.header}>
        {chapterOnly ? chap : 'Gesamt-Quiz'}
      </Text>
      {/* TODO: render question pages */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={{ color: '#007aff' }}>Schließen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fill:   { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 20, fontWeight: '600', marginBottom: 16 },
});
