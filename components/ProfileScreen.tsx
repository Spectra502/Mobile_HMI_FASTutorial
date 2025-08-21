// components/ProfileScreen.tsx
import { useProfile } from '@/context/ProfileContext';
import { useQuizService } from '@/context/QuizServiceContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react'; // ← add useState
import {
  Alert, ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AssistantButton from './AssistantButton';
import LoginOverlay from './LoginOverlay'; // ← import the overlay

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const profile = useProfile();
  const quiz = useQuizService();
  const router = useRouter();
  const bookmarks = profile.activeProfile?.bookmarkedChapters ?? [];

  // NEW: modal visibility for switching/creating/logging into a profile
  const [switchVisible, setSwitchVisible] = useState(false);

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

        {/* NEW: Switch profile button (above reset) */}
        {profile.profiles.length > 1 && (
          <View style={{ marginTop: 12 }}>
            <Text style={{ fontSize: 18, marginBottom: 8, color: '#666', fontWeight: '600' }}>
              Profile wechseln
            </Text>
            {profile.profiles.map(p => (
              <TouchableOpacity
                key={p.id}
                style={{ paddingVertical: 8 }}
                onPress={() => profile.loadProfile(p.profileCode)}
              >
                <Text style={{fontSize: 18, color: p.id === profile.activeProfile?.id ? '#007aff' : '#333' }}>
                  {p.profileCode}{p.id === profile.activeProfile?.id ? ' (aktiv)' : ''}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.switchBtn}
          onPress={() => setSwitchVisible(true)}
        >
          <Text style={styles.switchText}>Profil wechseln</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => {
            const code = profile.activeProfile?.profileCode ?? '';
            Alert.alert(
              'Profil löschen',
              `Möchten Sie das Profil "${code}" wirklich löschen?`,
              [
                { text: 'Abbrechen', style: 'cancel' },
                {
                  text: 'Löschen',
                  style: 'destructive',
                  onPress: async () => {
                    await profile.deleteActiveProfile();
                    // Optional: wipe quiz answers if you keep them per-profile
                    quiz.resetAll?.();
                  },
                },
              ],
            );
          }}
        >
          <Text style={styles.deleteText}>Aktuelles Profil löschen</Text>
        </TouchableOpacity>


        {/* DEV-only Reset */}
        {__DEV__ && (
          <TouchableOpacity
            style={styles.resetBtn}
            onPress={async () => {
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

      {/* NEW: LoginOverlay reused for switching/creating/login */}
      <LoginOverlay
        visible={switchVisible}
        onDismiss={() => setSwitchVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 40, backgroundColor: '#fff' },
  title: { fontSize: 30, fontWeight: 'bold', marginBottom: 20 },
  header: { alignItems: 'center', marginBottom: 40 },
  profileCode: { fontSize: 32, fontWeight: '600' },
  savedSection: { marginBottom: 40 },
  savedHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  savedTitle: { fontSize: 20, fontWeight: '600', color: '#555', marginLeft: 8 },
  emptyText: { fontSize: 18, color: '#888', marginTop: 10 },

  // NEW styles for the switch button
  switchBtn: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#0066cc',
    borderRadius: 6,
  },
  switchText: { color: 'white', textAlign: 'center', fontWeight: '600', fontSize: 18 },

  // Existing reset button
  resetBtn: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f44336',
    borderRadius: 6,
  },
  resetText: { color: 'white', textAlign: 'center' },
    deleteBtn: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#d32f2f',
    borderRadius: 6,
  },
  deleteText: { color: 'white', textAlign: 'center', fontWeight: '600', fontSize: 18 },

});
