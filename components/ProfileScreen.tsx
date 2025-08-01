// components/ProfileScreen.tsx
import { TourChapter } from '@/constants/types';
import { useProfile } from '@/context/ProfileContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AssistantButton from './AssistantButton';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const profile = useProfile();
  const router = useRouter();
  const [selectedChapter, setSelectedChapter] = useState<TourChapter | null>(null);

  // when `selectedChapter` is set, navigate to QuickTour modal
  if (selectedChapter) {
    router.push({
      pathname: '/quick-tour',
      params: { chapter: selectedChapter, showOverlay: 'false' },
    });
    setSelectedChapter(null);
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingTop: insets.top + 4, paddingHorizontal: 20 },
      ]}
      showsVerticalScrollIndicator
    >
      <Text style={styles.title}>Profil</Text>

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="person-circle" size={90} style={styles.avatar} />
        <Text style={styles.profileCode}>
          {profile.activeProfile?.profileCode ?? 'No active profile'}
        </Text>
      </View>

      {/* Saved Section */}
      <View style={styles.savedSection}>
        <View style={styles.savedHeader}>
          <Ionicons name="bookmark-outline" size={24} />
          <Text style={styles.savedTitle}>Gespeichert</Text>
        </View>

        {profile.activeProfile?.bookmarkedChapters.length ? (
          profile.activeProfile.bookmarkedChapters.map((chapter) => (
            <AssistantButton
              key={chapter}
              chapter={chapter}
              style="tutorial"
              onPress={() => setSelectedChapter(chapter)}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>
            Sie haben noch keine Seiten gespeichert.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 90,
    height: 90,
    tintColor: '#007AFF',
    marginBottom: 8,
  },
  profileCode: {
    fontSize: 20,
    fontWeight: '600',
  },
  savedSection: {
    marginBottom: 40,
  },
  savedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  bookmarkIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  savedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginLeft: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
});
