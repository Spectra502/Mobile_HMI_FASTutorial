// components/AssistantButton.tsx

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TourChapter } from '../constants/types';
import { useProfile } from '../context/ProfileContext';

import ACCIcon from '@/assets/Assistants/acc.imageset/Adaptiver Geschwindigkeitsassistent.svg';
import ActivateIcon from '@/assets/Assistants/activate.imageset/Aktivierung.svg';
import AmpelIcon from '@/assets/Assistants/ampel.imageset/Ampelerkennung.svg';
import NotbremseIcon from '@/assets/Assistants/brake.imageset/brake.svg';
import DeactivateIcon from '@/assets/Assistants/deactivate.imageset/Deaktivierung.svg';
import SpurwechselIcon from '@/assets/Assistants/lane.imageset/Spurführungsassistent.svg';
import RisikenIcon from '@/assets/Assistants/risk.imageset/Risiken und Verantwortung.svg';

const iconMap: Record<TourChapter, React.FC<any>> = {
  ActivateDA: ActivateIcon,
  ACC: ACCIcon,
  LKA: AmpelIcon,
  Risiken: RisikenIcon,
  Deaktivierung: DeactivateIcon,
  Spurwechsel: SpurwechselIcon,
  Notbremse: NotbremseIcon,
};

interface Props {
  chapter: TourChapter;
  style: 'tutorial' | 'quiz';
  disabled?: boolean;
  onPress(): void;
}

export default function AssistantButton({ chapter, style, onPress, disabled }: Props) {

  const Icon = iconMap[chapter];

  console.log('ActivateIcon is', ActivateIcon);
  console.log('iconMap keys:', Object.keys(iconMap));
  console.log('Rendering chapter:', chapter, 'Icon=', Icon);
  
  const profile = useProfile();
  const done = profile.isChapterFinished(chapter);
  
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
      
      <View style={s.iconContainer}>
        {Icon ? (
          <Icon width={24} height={24} />
        ) : (
          <Text style={s.fallback}>?</Text>
        )}
      </View>
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
  fallback: {
    fontSize: 18,
    color: '#999',
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
