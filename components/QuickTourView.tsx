// components/QuickTourView.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TourChapter, allChapters } from '@/constants/types';
import StepProgressBar from './StepProgressBar';

import QuickTourPageACC from './QuickTourPageACC';
import QuickTourPageDA from './QuickTourPageActivateDA';
import QuickTourPageAmpelerkennung from './QuickTourPageAmpelerkennung';
import QuickTourPageDeactivateDA from './QuickTourPageDeactivateDA';
import QuickTourPageLKA from './QuickTourPageLKA';
import QuickTourPageSpurwechsel from './QuickTourPageSpurwechsel';
import QuickTourPageStauassistent from './QuickTourPageStauassistent';
import QuickTourPageVerkehrszeichen from './QuickTourPageVerkehrszeichen';

interface Props {
  initialChapter: TourChapter;
  showOverlay: boolean;
  onDone(): void;
}

export default function QuickTourView({ initialChapter, showOverlay, onDone }: Props) {
  const insets = useSafeAreaInsets();
  const pagerRef = useRef<PagerView>(null);
  const { width } = useWindowDimensions();

  const startIndex = allChapters.indexOf(initialChapter);
  const [index, setIndex] = useState(startIndex);

  function goNext() {
    if (index < allChapters.length - 1) {
      pagerRef.current?.setPage(index + 1);
    } else {
      onDone();
    }
  }
  function goBack() {
    pagerRef.current?.setPage(Math.max(0, index - 1));
  }

  return (
    <View style={styles.fill}>
      {/* Top nav + progress */}
      <View style={[styles.navbar, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => {/* toggle bookmark logic */}}>
          <Ionicons name="bookmark-outline" size={24} />
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
        onPageSelected={e => setIndex(e.nativeEvent.position)}
        ref={pagerRef}
      >
        <View key="1"><QuickTourPageACC /></View>
        <View key="2"><QuickTourPageDA/></View>
        <View key="3"><QuickTourPageAmpelerkennung/></View>
        <View key="4"><QuickTourPageDeactivateDA/></View>
        <View key="5"><QuickTourPageLKA/></View>
        <View key="6"><QuickTourPageSpurwechsel/></View>
        <View key="7"><QuickTourPageStauassistent/></View>
        <View key="8"><QuickTourPageVerkehrszeichen/></View>
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
