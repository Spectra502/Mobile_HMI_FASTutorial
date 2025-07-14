import React, { useState } from 'react';
import {
  //SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,            // ← make sure Text is imported
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeToolbar   from './HomeToolbar';
import QuickTourCard from './QuickTourCard';
import HomeSection   from './HomeSection';
import SearchOverlay from './SearchOverlay'; // see step 7
import { TourChapter } from '@/constants/types'; //added
import { useRouter } from 'expo-router';
import { useHomeViewModel } from '../hooks/useHomeViewModel';
import { useProfile }      from '../context/ProfileContext';

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
        onBlur={()  => { setSearchActive(false); setSearchText(''); }}
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


          <TouchableOpacity
            style={{
              marginTop: 20,
              padding: 12,
              backgroundColor: '#007aff',
              borderRadius: 8,
              alignSelf: 'center',
            }}
            onPress={() =>
              router.push({
                pathname: '/quick-tour/[chapter]',
                params: {
                  chapter: TourChapter.ActivateDA,
                  showOverlay: 'true',
                },
              })
            }
          >
            <Text style={{ color: '#fff' }}>🚀 Launch Quick Tour</Text>
          </TouchableOpacity>


          {/* you can add an invisible anchor after to scroll-to-bottom */}
        </ScrollView>

        {/* Search overlay */}
        {searchActive && (
          <SearchOverlay
            query={searchText}
            onSelectTutorial={(ch) => {/*…*/}}
            onSelectQuiz={(ch) => {/*…*/}}
            onClose={() => setSearchActive(false)}
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
  headerText:{ fontSize: 24, fontWeight: 'bold' },
});
