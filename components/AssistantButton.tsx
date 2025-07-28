// components/AssistantButton.tsx

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TourChapter } from '../constants/types';
import { useProfile } from '../context/ProfileContext';

import ActivateIcon from '@/assets/Assistants/activate.imageset/Aktivierung.svg';
import AmpelIcon from '@/assets/Assistants/ampel.imageset/Ampelerkennung.svg';
import NotbremseIcon from '@/assets/Assistants/brake.imageset/brake.svg';
import DeactivateIcon from '@/assets/Assistants/deactivate.imageset/Deaktivierung.svg';
import RisikenIcon from '@/assets/Assistants/risk.imageset/Risiken und Verantwortung.svg';
import VerkehrIcon from '@/assets/Assistants/sign.imageset/verkehrszeichenassistent.svg';


const iconMap: Record<TourChapter, React.FC<any>> = {
  [TourChapter.ActivateDA]: ActivateIcon,
  [TourChapter.Verkehrszeichen]: VerkehrIcon, 
  [TourChapter.ACC]: ActivateIcon,
  [TourChapter.LKA]: AmpelIcon,
  [TourChapter.Spurwechsel]: ActivateIcon,
  [TourChapter.Notbremse]: NotbremseIcon,
  [TourChapter.Deaktivierung]: DeactivateIcon,
  [TourChapter.Risiken]: RisikenIcon,
};

const titleMap: Record<TourChapter, string> = {
  [TourChapter.ActivateDA]: 'Aktivierung',
  [TourChapter.Verkehrszeichen]: 'Verkehrszeichenassistent',
  [TourChapter.ACC]: 'Abstandsregeltempomat',
  [TourChapter.LKA]: 'Ampelerkennung',
  [TourChapter.Spurwechsel]: 'Spurführungsassistent',
  [TourChapter.Notbremse]: 'Notbremssassistent',
  [TourChapter.Deaktivierung]: 'Deaktivierung',
  [TourChapter.Risiken]: 'Risiken und Verantwortung',
};

interface Props {
  chapter: TourChapter;
  style: 'tutorial' | 'quiz';
  disabled?: boolean;
  onPress(): void;
}

export default function AssistantButton({ chapter, style, onPress, disabled }: Props) {
  //console.log('ActivateIcon is', ActivateIcon);
  //console.log('iconMap keys:', Object.keys(iconMap));
  //console.log('Rendering chapter:', chapter, 'Icon=', Icon);
  
  const profile = useProfile();
  const done = profile.isChapterFinished(chapter);

  const Icon = iconMap[chapter];
  const title = titleMap[chapter];


  //console.log('AssistantButton render:', chapter);
  const handlePress = () => {
    //console.log('Pressed chapter:', chapter);
    onPress();
  };


  return (
    <TouchableOpacity onPress={handlePress} disabled={disabled} style={s.btn}>
      
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
