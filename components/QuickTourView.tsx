// components/QuickTourView.tsx
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TourChapter, allChapters } from '@/constants/types';
import { useProfile } from '@/context/ProfileContext';
import StepProgressBar from './StepProgressBar';

import QuickTourPageACC from './pages/QuickTourPageACC';
import QuickTourPageDA from './pages/QuickTourPageActivateDA';
import QuickTourPageAmpelerkennung from './pages/QuickTourPageAmpelerkennung';
import QuickTourPageDeactivateDA from './pages/QuickTourPageDeactivateDA';
import QuickTourPageLKA from './pages/QuickTourPageLKA';
import QuickTourPageSpurwechsel from './pages/QuickTourPageSpurwechsel';
import QuickTourPageStauassistent from './pages/QuickTourPageStauassistent';
import QuickTourPageVerkehrszeichen from './pages/QuickTourPageVerkehrszeichen';

function CenteredDialog({ visible, onClose, onTest }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={dlgStyles.backdrop}>
        <View style={dlgStyles.card}>
          <Text style={dlgStyles.title}>
            Sie haben alle Inhalte des Tutorials gesehen!
          </Text>
          <Text style={dlgStyles.body}>
            Testen Sie nun das teilautomatisierte Fahren für mehr Sicherheit
            und Komfort! Gerne können Sie Ihr Wissen zuvor nochmal testen. Viel Spaß!
          </Text>

          <View style={dlgStyles.actions}>
            <TouchableOpacity style={dlgStyles.primaryBtn} onPress={onTest}>
              <Text style={dlgStyles.primaryText}>Wissen testen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={dlgStyles.secondaryBtn} onPress={onClose}>
              <Text style={dlgStyles.secondaryText}>Weiter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}



interface Props {
  initialChapter: TourChapter;
  showOverlay: boolean;
  onDone(): void;
}

export default function QuickTourView({ initialChapter, showOverlay, onDone }: Props) {
  const startIndex = allChapters.indexOf(initialChapter);
  const [index, setIndex] = useState(startIndex);
  console.log('🔢 QuickTourView render – index is', index);
  const insets = useSafeAreaInsets();
  const pagerRef = useRef<PagerView>(null);
  const { width } = useWindowDimensions();
  const profile = useProfile();
  const currentChapter = allChapters[index]

  
  

  // state for the “finished” popup
  const [doneVisible, setDoneVisible] = useState(false);

  useEffect(() => {
    profile.markChapterFinished(initialChapter);
  }, [initialChapter]);

  function goNext() {
    if (index < allChapters.length - 1) {
      const next = index + 1;
      // 1) update our own index
      setIndex(next);
      // 2) mark that chapter seen
      profile.markChapterFinished(allChapters[next]);
      // 3) tell PagerView to go there
      pagerRef.current?.setPage(next);
    } else {
      //onDone();
      // instead of closing immediately, show our menu
      setDoneVisible(true);
    }
  }
  function goBack() {
    const prev = Math.max(0, index - 1);
    setIndex(prev);
    profile.markChapterFinished(allChapters[prev]);
    pagerRef.current?.setPage(prev);
  }

  return (
    <View style={styles.fill}>
      {/* Top nav + progress */}
      <View style={[styles.navbar, { paddingTop: insets.top }]}>
        <TouchableOpacity
          onPress={() => profile.toggleBookmark(currentChapter)}
        >
          <Ionicons
            name={profile.isBookmarked(currentChapter) ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={profile.isBookmarked(currentChapter) ? '#007aff' : '#000'}
         />
       </TouchableOpacity>
        <Text style={styles.navTitle}>{allChapters[index]}</Text>
        <TouchableOpacity onPress={onDone}>
          <Ionicons name="close" size={24} />
        </TouchableOpacity>
      </View>

      {showOverlay && (
        <StepProgressBar
          steps={allChapters.length}
          currentStep={index}
          style={{ paddingHorizontal: 16 }}
        />
      )}

      {/* PagerView */}
      <PagerView
        style={styles.pager}
        initialPage={startIndex}
        //onPageSelected={e => setIndex(e.nativeEvent.position)}
        onPageSelected={e => {
          const newIndex = e.nativeEvent.position;
          setIndex(newIndex);
          // mark this chapter as finished
          profile.markChapterFinished(allChapters[newIndex]);
        }}
        ref={pagerRef}
      >
        <View key="1"><QuickTourPageDA/></View>
        <View key="2"><QuickTourPageVerkehrszeichen/></View>
        <View key="3"><QuickTourPageACC/></View>
        <View key="4"><QuickTourPageDeactivateDA/></View>
        <View key="5"><QuickTourPageLKA/></View>
        <View key="6"><QuickTourPageSpurwechsel/></View>
        <View key="7"><QuickTourPageStauassistent/></View>
        <View key="8"><QuickTourPageAmpelerkennung/></View>
        {/* …other pages in same order as allChapters */}
      </PagerView>

      {/* Action buttons */}
      {showOverlay && (
        <View style={[styles.actions, { paddingBottom: insets.bottom + 10 }]}>
          <TouchableOpacity
            style={[styles.actionBtn, index === 0 && styles.disabled]}
            onPress={goBack}
            disabled={index === 0}
          >
            <Text style={styles.actionText}>Zurück</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={goNext}>
            <Text style={[styles.actionText, styles.nextText]}>
              {index === allChapters.length - 1 ? 'Fertig' : 'Weiter'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/*  COMPLETION POPUP */}
      <CenteredDialog
        visible={doneVisible}
        onClose={() => { setDoneVisible(false); onDone(); }}
        onTest={() => {
          setDoneVisible(false);
          onDone();
          router.push({ pathname: '/quiz', params: { chapter: allChapters[0], onlyChapter: 'false' } });
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: '#fff' },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 12,
  },
  navTitle: { fontSize: 18, fontWeight: '600' },
  pager: { flex: 1 },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  actionBtn: {
    width: 120,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#007aff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007aff',
  },
  actionText: { fontSize: 17, fontWeight: '600', color: '#fff' },
  nextText: {},
  disabled: { opacity: 0.5 },
});

const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  body: {
    fontSize: 14,
    marginBottom: 24,
    lineHeight: 20,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryBtn: {
    backgroundColor: '#007aff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  primaryText: {
    color: '#fff',
    fontWeight: '600',
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#007aff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  secondaryText: {
    color: '#007aff',
    fontWeight: '600',
  },
});

const dlgStyles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 8,            // Android shadow
    shadowColor: '#000',     // iOS shadow
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryBtn: {
    backgroundColor: '#007aff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  primaryText: {
    color: '#fff',
    fontWeight: '600',
  },
  secondaryBtn: {
    borderColor: '#007aff',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  secondaryText: {
    color: '#007aff',
    fontWeight: '600',
  },
});
