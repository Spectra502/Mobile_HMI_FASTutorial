// components/AssistantButton.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TourChapter } from '../constants/types';

interface Props {
  chapter: TourChapter;
  style: 'tutorial' | 'quiz';
  disabled?: boolean;
  onPress(): void;
}

export default function AssistantButton({ chapter, style, onPress, disabled }: Props) {
  // pick icon & title based on chapter + style
  const titleMap = {
    activation: 'Aktivierung',
    trafficSign: 'Verkehrszeichenassistent',
    acc: 'Abstandsregeltempomat',
    trafficLight: 'Ampelerkennung',
    spurwechsel: 'Spurführungsassistent',
    notbremse: 'Notbremsassistent',
    deaktivierung: 'Deaktivierung',
    risiken: 'Risiken und Verantwortung'
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={s.btn}>
      
      <Text style={s.text}>{titleMap[chapter]}</Text>
      {style === 'tutorial' ? <Text>✓</Text> : null}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 8,
  },
  text: { fontSize: 16 },
});

/*
// components/AssistantButton.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { TourChapter } from '@/constants/types';

// Import SVGs as React components:
import ActivateDAIcon         from '../assets/Assistants/acc.imageset/Adaptiver Geschwindigkeitsassistent.svg';
import ACCIcon                from '..\assets\Assistants\acc.imageset\Adaptiver Geschwindigkeitsassistent.svg';
import AbstandsregeltempomatIcon from '..\assets\Assistants\acc.imageset\Adaptiver Geschwindigkeitsassistent.svg';


interface Props {
  chapter: TourChapter;
  style: 'tutorial' | 'quiz';
  disabled?: boolean;
  onPress(): void;
}

const LABELS: Record<TourChapter, string> = {
  [TourChapter.ActivateDA]: "Aktivierung",
  [TourChapter.ACC]:         "Abstandsregel­tempomat",
  // …other chapters...
  [TourChapter.Abstandsregeltempomat]: "Abstandsregel­tempomat", // same label or tweak if you like
};

const ICONS: Record<TourChapter, ImageSourcePropType> = {
  [TourChapter.ActivateDA]:       ActivateDAIcon,
  [TourChapter.ACC]:              require('../assets/images/icon.png'),
  // …other chapters…
  [TourChapter.Abstandsregeltempomat]: require('../assets/images/icon.png'),
};

export default function AssistantButton({
  chapter,
  style,
  onPress,
  disabled = false,
}: Props) {
  const label = LABELS[chapter];
  const icon  = ICONS[chapter];

  return (
    <TouchableOpacity
      style={[s.btn, disabled && s.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={s.row}>
        <Image source={icon} style={s.icon} />

        <Text style={s.text}>{label}</Text>
      </View>


      {style === 'quiz' && (
        <Text style={s.chevron}>›</Text>
      )}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    // optional shadow:
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
    resizeMode: 'contain',
  },
  text: { fontSize: 16, flex: 1 },
  chevron: { fontSize: 18, color: '#ccc' },
  disabled: { opacity: 0.5 },
});

*/