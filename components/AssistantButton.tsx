// components/AssistantButton.tsx
import colors from '@/constants/Colors';
import { useQuizService } from '@/context/QuizServiceContext';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TourChapter } from '../constants/types';
import { useProfile } from '../context/ProfileContext';

// SVG imports…
import ActivateIcon from '@/assets/Assistants/activate.imageset/Aktivierung.svg';
import AmpelIcon from '@/assets/Assistants/ampel.imageset/Ampelerkennung.svg';
import NotbremseIcon from '@/assets/Assistants/brake.imageset/brake.svg';
import DeactivateIcon from '@/assets/Assistants/deactivate.imageset/Deaktivierung.svg';
import RisikenIcon from '@/assets/Assistants/risk.imageset/Risiken und Verantwortung.svg';
import VerkehrIcon from '@/assets/Assistants/sign.imageset/Verkehrszeichenassistent_fixed_v3.svg';
import SpurIcon from '@/assets/Assistants/switchLane.imageset/Spurführungsassistent_fixed.svg';
import TrafficIcon from '@/assets/Assistants/traffic.imageset/Abstandsregeltempomat_fixed.svg';

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

export default function AssistantButton({ chapter, style, onPress, disabled }: Props) {
  const profile = useProfile();
  const quiz = useQuizService();

  // Tutorial completion (used for style="tutorial" UI and to know if quiz is unlocked)
  const tutorialDone = profile.isChapterFinished(chapter);
  const unlockedForQuiz = tutorialDone; // parent may also pass disabled, but we still show lock icon here

  // Quiz completion: all questions for this chapter answered correctly
  const quizAllCorrect = useMemo(() => {
    const qs = quiz.questions.filter(q => q.chapter === chapter);
    if (qs.length === 0) return false; // no questions defined -> treat as not complete
    return qs.every(q => typeof q.userAnswerIndex === 'number' && quiz.isAnsweredCorrectly(q.id));
  }, [quiz.questions, chapter]);

  const IconLeft = iconMap[chapter];
  const title = titleMap[chapter];

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={s.card} activeOpacity={0.7}>
      {/* Left SVG */}
      <View style={s.iconContainer}>
        <IconLeft width={24} height={24} />
      </View>

      {/* Title */}
      <Text style={s.title}>{title}</Text>

      {/* Right status */}
      {style === 'tutorial' ? (
        // Tutorial row: green when tutorial finished
        <View style={[s.statusCircle, tutorialDone ? s.statusDone : s.statusTodo]}>
          <MaterialIcons
            name="check"
            size={16}
            color={tutorialDone ? '#fff' : colors.light.border}
          />
        </View>
      ) : (
        // Quiz row: green when ALL chapter questions are correct
        <View
          style={[
            s.statusCircle,
            quizAllCorrect ? s.statusDone : unlockedForQuiz ? s.statusTodo : s.statusLocked,
          ]}
        >
          {quizAllCorrect ? (
            <MaterialIcons name="check" size={16} color="#fff" />
          ) : unlockedForQuiz ? (
            <MaterialIcons name="check" size={16} color={colors.light.border} />
          ) : (
            <MaterialIcons name="lock" size={16} color={colors.light.border} />
          )}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  iconContainer: {
    width: 24,
    height: 24,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { flex: 1, fontSize: 18, color: colors.light.textPrimary },
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
  statusTodo: {
    backgroundColor: 'transparent',
    borderColor: colors.light.border,
  },
  statusLocked: {
    backgroundColor: 'transparent',
    borderColor: colors.light.border,
    opacity: 0.7,
  },
});
