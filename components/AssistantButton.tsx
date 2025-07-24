// components/AssistantButton.tsx

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
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
    ActivateDA: 'Aktivierung', 
    Verkehrszeichen: 'Verkehrszeichenassistent',
    ACC: 'Abstandsregeltempomat',
    LKA: 'Ampelerkennung',
    Spurwechsel: 'Spurführungsassistent',
    Notbremse: 'Notbremssassistent',
    Deaktivierung: 'Deaktivierung',
    Risiken: 'Risiken und Verantwortung',   
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
