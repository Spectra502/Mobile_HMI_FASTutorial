// components/QuickTourView.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useResponsive } from '@/constants/responsive';
import { TourChapter, allChapters } from '@/constants/types';
import { useProfile } from '@/context/ProfileContext';
import CustomAlert from './CustomAlert'; // Import the new component
import StepProgressBar from './StepProgressBar';

import QuickTourPageAbstandsregeltempomat from './pages/QuickTourPageACC';
import QuickTourPageAktivierung from './pages/QuickTourPageActivateDA';
import QuickTourPageDeactivateDA from './pages/QuickTourPageDeactivateDA';
import QuickTourPageAmpelerkennung from './pages/QuickTourPageLKA';
import QuickTourPageNotbremse from './pages/QuickTourPageNotbremse';
import QuickTourPageRisiken from './pages/QuickTourPageRisiken';
import QuickTourPageSpurwechsel from './pages/QuickTourPageSpurwechsel';
import QuickTourPageVerkehrszeichen from './pages/QuickTourPageVerkehrszeichen';

interface Props {
  initialChapter: TourChapter;
  showOverlay: boolean;
  onDone(): void;
}

export default function QuickTourView({ initialChapter, showOverlay, onDone }: Props) {
  const insets = useSafeAreaInsets();
  const pagerRef = useRef<PagerView>(null);
  const router = useRouter();
  const { container, font } = useResponsive();

  const profile = useProfile();
  const startIndex = allChapters.indexOf(initialChapter);
  const [index, setIndex] = useState(startIndex);
  const currentChapter = allChapters[index];

  const allowMarkRef = useRef(false);
  const seenRef = useRef<Set<TourChapter>>(new Set());

  useEffect(() => {
    if (!seenRef.current.has(initialChapter)) {
      seenRef.current.add(initialChapter);
      profile.markChapterFinished(initialChapter);
    }
  }, [initialChapter]);

  function goNext() {
    if (index < allChapters.length - 1) {
      const next = index + 1;
      allowMarkRef.current = true;
      pagerRef.current?.setPage(next);
    } else {
      setDoneVisible(true);
    }
  }
  function goBack() {
    const prev = Math.max(0, index - 1);
    allowMarkRef.current = true;
    pagerRef.current?.setPage(prev);
  }

  const handlePageSelected = (e: any) => {
    const pos = e.nativeEvent.position as number;
    setIndex(pos);
    const ch = allChapters[pos];

    if (allowMarkRef.current && !seenRef.current.has(ch)) {
      seenRef.current.add(ch);
      profile.markChapterFinished(ch);
    }
    allowMarkRef.current = false;
  };

  const handleScrollState = (e: any) => {
    const state = e.nativeEvent.pageScrollState;
    if (state === 'dragging') {
      allowMarkRef.current = true;
    }
  };

  const [doneVisible, setDoneVisible] = useState(false);

  return (
    <View style={styles.fill}>
      {/* Top nav + progress */}
      <View style={[styles.navbar, container, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => profile.toggleBookmark(currentChapter)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons
            name={profile.isBookmarked(currentChapter) ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={profile.isBookmarked(currentChapter) ? '#007aff' : '#000'}
          />
        </TouchableOpacity>
        <Text style={[styles.navTitle, { fontSize: font(22) }]}>{currentChapter}</Text>
        <TouchableOpacity onPress={onDone} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="close" size={24} />
        </TouchableOpacity>
      </View>

      {showOverlay && (
        <StepProgressBar
          steps={allChapters.length}
          currentStep={index + 1}
          style={{ paddingHorizontal: 16, marginBottom: 10 }}
        />
      )}

      {/* PagerView */}
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={startIndex}
        onPageSelected={handlePageSelected}
        onPageScrollStateChanged={handleScrollState}
      >
        <View key="0"><QuickTourPageAktivierung /></View>
        <View key="1"><QuickTourPageVerkehrszeichen /></View>
        <View key="2"><QuickTourPageAbstandsregeltempomat /></View>
        <View key="3"><QuickTourPageAmpelerkennung /></View>
        <View key="4"><QuickTourPageSpurwechsel /></View>
        <View key="5"><QuickTourPageNotbremse /></View>
        <View key="6"><QuickTourPageDeactivateDA /></View>
        <View key="7"><QuickTourPageRisiken /></View>
      </PagerView>

      {/* Actions */}
      {showOverlay && (
        <View style={[styles.actions, { paddingBottom: insets.bottom + 10 }]}>
          <TouchableOpacity onPress={goBack} disabled={index === 0} style={[styles.actionBtnDimmed, index === 0 && styles.disabled]}>
            <Text style={styles.actionTextDimmed}>Zurück</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goNext} style={styles.actionBtn}>
            <Text style={styles.actionText}>{index === allChapters.length - 1 ? 'Fertig' : 'Weiter'}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Completion dialog */}
      <CustomAlert
        visible={doneVisible}
        title="Sie haben alle Inhalte des Tutorials gesehen!"
        message="Testen Sie nun das teilautomatisierte Fahren für mehr Sicherheit und Komfort! Gerne können Sie Ihr Wissen zuvor nochmal testen. Viel Spaß!"
        onClose={() => { setDoneVisible(false); onDone(); }}
        buttons={[
          {
            text: 'Wissen testen',
            style: 'primary',
            onPress: () => {
              setDoneVisible(false);
              onDone();
              router.push({ pathname: '/quiz/[chapter]', params: { chapter: allChapters[0], onlyChapter: 'false' } });
            },
          },
          {
            text: 'Hauptmenü',
            style: 'secondary',
            onPress: () => { setDoneVisible(false); onDone(); },
          },
          
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: '#fff' },
  navbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.8)', padding: 12 },
  navTitle: { fontSize: 18, fontWeight: '600' },
  pager: { flex: 1 },
  actions: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 },
  actionBtn: { width: 120, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#007aff', justifyContent: 'center', alignItems: 'center', backgroundColor: '#007aff' },
  actionBtnDimmed: { width: 120, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#868686ff', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  actionText: { fontSize: 20, fontWeight: '600', color: '#fff' },
  actionTextDimmed: { fontSize: 20, fontWeight: '600', color: '#868686ff' },
  disabled: { opacity: 0.5 },
});