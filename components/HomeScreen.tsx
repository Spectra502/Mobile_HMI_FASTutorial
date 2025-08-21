// components/HomeScreen.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  //SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfile } from '../context/ProfileContext';
import { useHomeViewModel } from '../hooks/useHomeViewModel';
import HomeSection from './HomeSection';
import HomeToolbar from './HomeToolbar';
import QuickTourCard from './QuickTourCard';
import SearchOverlay from './SearchOverlay';

export default function HomeScreen() {
  const { showQuickTour, setShowQuickTour, currentCar } = useHomeViewModel();
  const profile = useProfile();
  const [searchText, setSearchText] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <HomeToolbar
        value={searchText}
        onChange={setSearchText}
        
        onFocus={() => setSearchActive(true)}
        // we’ll only close via the overlay’s × button
        onBlur={() => {}}
      />

      <View style={styles.content}>
        <ScrollView>
          {/* header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>{currentCar.fullTitle}</Text>
          </View>

          {/* QuickTour card */}
          <QuickTourCard onPress={() => setShowQuickTour(true)} />

          {/* Tutorial list */}
          <HomeSection
            onSeeAll={() => {/* scroll or expand logic */}}
            onChapter={(chapter) => {
              setShowQuickTour(true);
              // store selected chapter in state if you need it
            }}
          />
        
          {/* you can add an invisible anchor after to scroll-to-bottom */}
        </ScrollView>

        {/* Search overlay */}
        {searchActive && (
          <SearchOverlay
            query={searchText}
            onSelectTutorial={(ch) => {
               setSearchActive(false);
               router.push({
                 pathname: '/quick-tour/[chapter]',
                 params: { chapter: ch, showOverlay: 'true' },
               });
             }}
            onSelectQuiz={(ch) => {
               setSearchActive(false);
               router.push({
                 pathname: '/quiz/[chapter]',
                 params: { chapter: ch, onlyChapter: 'true' },
               });
             }}
            onClose={() => {
               setSearchActive(false);
               setSearchText('');
             }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content:   { flex: 1, paddingHorizontal: 16 },
  header:    { marginTop: 17, marginBottom: 12 },
  headerText:{ fontSize: 26, fontWeight: 'bold' },
});
