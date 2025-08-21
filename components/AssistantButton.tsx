// components/AssistantButton.tsx
import colors from '@/constants/Colors';
import { useQuizService } from '@/context/QuizServiceContext';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
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

// Small ring component for circular progress around the icon
function ProgressRing({
  size = 28,
  stroke = 3,
  progress, // 0..1
  trackColor,
  progressColor,
  children,
}: {
  size?: number;
  stroke?: number;
  progress: number;
  trackColor: string;
  progressColor: string;
  children?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dashOffset = c * (1 - Math.max(0, Math.min(1, progress)));

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={trackColor}
          strokeWidth={stroke}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={progressColor}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${c} ${c}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </Svg>

      {/* Center icon */}
      <View style={{ position: 'absolute', width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        {children}
      </View>
    </View>
  );
}

export default function AssistantButton({ chapter, style, onPress, disabled }: Props) {
  const profile = useProfile();
  const quiz = useQuizService();

  // Tutorial completion (used to unlock the quiz)
  const tutorialDone = profile.isChapterFinished(chapter);
  const unlockedForQuiz = tutorialDone;

  // Compute quiz progress + all-correct for this chapter
  const { quizAllCorrect, progress } = useMemo(() => {
    const qs = quiz.questions.filter(q => q.chapter === chapter);
    const total = qs.length;

    if (total === 0) return { quizAllCorrect: false, progress: 0 };

    const correct = qs.filter(q => typeof q.userAnswerIndex === 'number' && quiz.isAnsweredCorrectly(q.id)).length;

    // ▶ If you prefer "answered progress" (selected != null) instead of "correct progress", use:
    // const answered = qs.filter(q => q.userAnswerIndex != null).length;
    // const prog = answered / total;
    const prog = correct / total;

    return { quizAllCorrect: correct === total && total > 0, progress: prog };
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
      ) : !unlockedForQuiz ? (
        // Locked quiz
        <View style={[s.statusCircle, s.statusLocked]}>
          <MaterialIcons name="lock" size={16} color={colors.light.border} />
        </View>
      ) : quizAllCorrect ? (
        // Fully correct -> keep your solid green circle
        <View style={[s.statusCircle, s.statusDone]}>
          <MaterialIcons name="check" size={16} color="#fff" />
        </View>
      ) : (
        // Unlocked but in-progress -> progress ring around a check
        <ProgressRing
          progress={progress}
          trackColor={colors.light.border}
          progressColor={colors.light.success}
        >
          <MaterialIcons name="check" size={16} color={colors.light.border} />
        </ProgressRing>
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
