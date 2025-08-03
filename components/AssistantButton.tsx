// components/AssistantButton.tsx

import colors from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TourChapter } from '../constants/types';
import { useProfile } from '../context/ProfileContext';

// SVG imports…
import ActivateIcon from '@/assets/Assistants/activate.imageset/Aktivierung.svg';
import AmpelIcon from '@/assets/Assistants/ampel.imageset/Ampelerkennung.svg';
import NotbremseIcon from '@/assets/Assistants/brake.imageset/brake.svg';
import DeactivateIcon from '@/assets/Assistants/deactivate.imageset/Deaktivierung.svg';
import RisikenIcon from '@/assets/Assistants/risk.imageset/Risiken und Verantwortung.svg';
import VerkehrIcon from '@/assets/Assistants/sign.imageset/Verkehrszeichenassistent.svg';
import SpurIcon from '@/assets/Assistants/switchLane.imageset/Spurführungsassistent.svg';
import TrafficIcon from '@/assets/Assistants/traffic.imageset/Adaptiver Geschwindigkeitsassistent.svg';

const iconMap: Record<TourChapter, React.FC<any>> = {
  [TourChapter.ActivateDA]: ActivateIcon,
  [TourChapter.Verkehrszeichen]: VerkehrIcon,
  [TourChapter.ACC]: TrafficIcon,
  [TourChapter.LKA]: AmpelIcon,
  [TourChapter.Spurwechsel]: SpurIcon,
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

export default function AssistantButton({
  chapter,
  style,
  onPress,
  disabled,
}: Props) {
  const profile = useProfile();
  const done = profile.isChapterFinished(chapter);

  const IconLeft = iconMap[chapter];
  const title    = titleMap[chapter];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={s.card}
      activeOpacity={0.7}
    >
      {/* Left SVG */}
      <View style={s.iconContainer}>
        <IconLeft width={24} height={24} />
      </View>

      {/* Title */}
      <Text style={s.title}>{title}</Text>

      {/* Right‐hand status */}
      {style === 'tutorial' ? (
        <View style={[s.statusCircle, done ? s.statusDone : s.statusTodo]}>
          {done ? (
            <MaterialIcons name="check" size={16} color="#fff" />
          ) : (
            <MaterialIcons name="check" size={16} color={colors.light.border} />
          )}
        </View>
      ) : (
        // for quiz‐style you might show a number badge or different icon
        <View style={[s.statusCircle, done ? s.statusQuizTodo : s.statusTodo]}>
          <MaterialIcons
            name={done ? 'check' : 'lock'}
            size={16}
            color={done ? colors.light.border : colors.light.border}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,

    // Android elevation
    elevation: 3,
  },
  iconContainer: {
    width: 24,
    height: 24,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: colors.light.textPrimary,
  },
  searchOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusDone: {
    backgroundColor: colors.light.success,
    borderColor: colors.light.success,
  },
  statusQuizTodo: {
    backgroundColor: 'transparent',
    borderColor: colors.light.border,
  },
  statusTodo: {
    backgroundColor: 'transparent',
    borderColor: colors.light.border,
  },
});
