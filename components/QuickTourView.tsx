// components/QuickTourView.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Modal, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useResponsive } from '@/constants/responsive';
import { TourChapter, allChapters } from '@/constants/types';
import { useProfile } from '@/context/ProfileContext';
import StepProgressBar from './StepProgressBar';

import QuickTourPageAbstandsregeltempomat from './pages/QuickTourPageACC';
import QuickTourPageAktivierung from './pages/QuickTourPageActivateDA';
import QuickTourPageDeactivateDA from './pages/QuickTourPageDeactivateDA';
import QuickTourPageAmpelerkennung from './pages/QuickTourPageLKA';
import QuickTourPageNotbremse from './pages/QuickTourPageNotbremse';
import QuickTourPageRisiken from './pages/QuickTourPageRisiken';
import QuickTourPageSpurwechsel from './pages/QuickTourPageSpurwechsel';
import QuickTourPageVerkehrszeichen from './pages/QuickTourPageVerkehrszeichen';

function CenteredDialog({ visible, onClose, onTest }: { visible: boolean; onClose(): void; onTest(): void; }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={dlgStyles.backdrop}>
        <View style={dlgStyles.card}>
          <Text style={dlgStyles.title}>Sie haben alle Inhalte des Tutorials gesehen!</Text>
          <Text style={dlgStyles.body}>
            Testen Sie nun das teilautomatisierte Fahren für mehr Sicherheit und Komfort! …
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
  const insets = useSafeAreaInsets();
  const pagerRef = useRef<PagerView>(null);
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { container, font, spacing } = useResponsive();

  const profile = useProfile();
  const startIndex = allChapters.indexOf(initialChapter);
  const [index, setIndex] = useState(startIndex);
  const currentChapter = allChapters[index];

  // --- NEW: “allow mark” toggle & “seen” set
  const allowMarkRef = useRef(false);
  const seenRef = useRef<Set<TourChapter>>(new Set());

  // Mark the first page as seen once (we actually show it)
  useEffect(() => {
    if (!seenRef.current.has(initialChapter)) {
      seenRef.current.add(initialChapter);
      profile.markChapterFinished(initialChapter);
    }
  }, [initialChapter]);

  // Called when user taps next/back
  function goNext() {
    if (index < allChapters.length - 1) {
      const next = index + 1;
      allowMarkRef.current = true;             // allow marking for this programmatic change
      pagerRef.current?.setPage(next);
    } else {
      setDoneVisible(true);
    }
  }
  function goBack() {
    const prev = Math.max(0, index - 1);
    allowMarkRef.current = true;               // allow marking for this programmatic change
    pagerRef.current?.setPage(prev);
  }

  // Mark when the page actually becomes selected (user drag or goNext/goBack)
  const handlePageSelected = (e: any) => {
    const pos = e.nativeEvent.position as number;
    setIndex(pos);
    const ch = allChapters[pos];

    if (allowMarkRef.current && !seenRef.current.has(ch)) {
      seenRef.current.add(ch);
      profile.markChapterFinished(ch);
    }
    // consume the “token”
    allowMarkRef.current = false;
  };

  // Detect user-initiated swipes; PagerView will emit:
  // 'dragging' -> 'settling' -> 'idle'
  const handleScrollState = (e: any) => {
    const state = e.nativeEvent.pageScrollState; // 'idle' | 'dragging' | 'settling'
    if (state === 'dragging') {
      allowMarkRef.current = true;   // user started a gesture
    }
    if (state === 'idle') {
      // no-op; marking is consumed in onPageSelected
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
        <Text style={[styles.navTitle, { fontSize: font(24) }]}>{currentChapter}</Text>
        <TouchableOpacity onPress={onDone} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="close" size={24} />
        </TouchableOpacity>
      </View>

      {showOverlay && (
        <StepProgressBar
          steps={allChapters.length}
          currentStep={index + 1} // 1-based for display
          style={{ paddingHorizontal: 16 }}
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
          <TouchableOpacity onPress={goBack} disabled={index === 0} style={[styles.actionBtn, index === 0 && styles.disabled]}>
            <Text style={styles.actionText}>Zurück</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goNext} style={styles.actionBtn}>
            <Text style={styles.actionText}>{index === allChapters.length - 1 ? 'Fertig' : 'Weiter'}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Completion dialog */}
      <CenteredDialog
        visible={doneVisible}
        onClose={() => { setDoneVisible(false); onDone(); }}
        onTest={() => {
          setDoneVisible(false);
          onDone();
          router.push({ pathname: '/quiz/[chapter]', params: { chapter: allChapters[0], onlyChapter: 'false' } });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: '#fff' },
  navbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.8)', padding: 12 },
  navTitle: { fontSize: 18, fontWeight: '600' },
  pager: { flex: 1},
  actions: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 },
  actionBtn: { width: 120, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#007aff', justifyContent: 'center', alignItems: 'center', backgroundColor: '#007aff' },
  actionText: { fontSize: 20, fontWeight: '600', color: '#fff' },
  disabled: { opacity: 0.5 },
});

const dlgStyles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  card: { width: '80%', backgroundColor: '#fff', borderRadius: 12, padding: 20, elevation: 8, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 12, textAlign: 'center' },
  body: { fontSize: 16, lineHeight: 20, marginBottom: 24, textAlign: 'center' },
  actions: { flexDirection: 'row', justifyContent: 'space-between' },
  primaryBtn: { backgroundColor: '#007aff', padding: 12, borderRadius: 6 },
  primaryText: { color: '#fff', fontWeight: '600' },
  secondaryBtn: { borderWidth: 1, borderColor: '#007aff', padding: 12, borderRadius: 6 },
  secondaryText: { color: '#007aff', fontWeight: '600' },
});
