// components/ProfileScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image as RNImage,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProfile }        from '@/context/ProfileContext';
import AssistantButton       from './AssistantButton';
import { TourChapter }       from '@/constants/types';
import { useRouter }         from 'expo-router';

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
        <RNImage
          //source={require('../assets/person-circle.png')} // replace with your icon
          style={styles.avatar}
        />
        <Text style={styles.profileCode}>
          {profile.activeProfile?.profileCode ?? 'No active profile'}
        </Text>
      </View>

      {/* Saved Section */}
      <View style={styles.savedSection}>
        <View style={styles.savedHeader}>
          <RNImage
            //source={require('../assets/bookmark-filled.png')} 
            style={styles.bookmarkIcon}
          />
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
    width: 80,
    height: 80,
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
  },
  emptyText: {
    color: '#888',
    fontStyle: 'italic',
  },
});
