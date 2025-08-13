// components/ProfileScreen.tsx
import { useProfile } from '@/context/ProfileContext';
import { useQuizService } from '@/context/QuizServiceContext'; // <-- add this
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AssistantButton from './AssistantButton';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const profile = useProfile();
  const quiz = useQuizService();                     // <-- use the hook
  const router = useRouter();
  const bookmarks = profile.activeProfile?.bookmarkedChapters ?? [];

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
        <Ionicons name="person-circle" size={90} color="#007aff" />
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

        {bookmarks.length ? (
          bookmarks.map((chapter) => (
            <AssistantButton
              key={chapter}
              chapter={chapter}
              style="tutorial"
              onPress={() =>
                router.push({
                  pathname: '/quick-tour/[chapter]',
                  params: { chapter, showOverlay: 'false' },
                })
              }
            />
          ))
        ) : (
          <Text style={styles.emptyText}>
            Sie haben noch keine Seiten gespeichert.
          </Text>
        )}

        {/* DEV-only Reset */}
        {__DEV__ && (
          <TouchableOpacity
            style={styles.resetBtn}
            onPress={async () => {
              // both resets — profile & quiz answers
              if (typeof profile.resetProfiles === 'function') {
                await profile.resetProfiles();
              }
              quiz.resetAll();
            }}
          >
            <Text style={styles.resetText}>🗑️ Reset Profiles</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 40, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  header: { alignItems: 'center', marginBottom: 40 },
  profileCode: { fontSize: 20, fontWeight: '600' },
  savedSection: { marginBottom: 40 },
  savedHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  savedTitle: { fontSize: 16, fontWeight: '600', color: '#555', marginLeft: 8 },
  emptyText: { fontSize: 16, color: '#888', marginTop: 10 },
  resetBtn: { marginTop: 20, padding: 12, backgroundColor: '#f44336', borderRadius: 6 },
  resetText: { color: 'white', textAlign: 'center' },
});
