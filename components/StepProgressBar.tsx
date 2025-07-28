// components/StepProgressBar.tsx

import colors from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Props {
  steps: number;          // total number of steps
  currentStep: number;    // 0-based index of the active step
  style?: any;
}

export default function StepProgressBar({
  steps,
  currentStep,
  style,
}: Props) {
  // Animate between old and new currentStep
  const progressAnim = useRef(new Animated.Value(currentStep)).current;
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: currentStep,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentStep]);

  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: steps }).map((_, i) => {
        const isDone   = i < currentStep;
        const isActive = i === currentStep;

        // circle colors
        const bgColor     = isActive
          ? colors.light.highlight   // yellowish for current
          : isDone
          ? colors.light.tabIconSelected // blue for done
          : colors.light.cardBackground  // light grey for future
        const borderColor = isActive
          ? colors.light.highlight
          : isDone
          ? colors.light.tabIconSelected
          : colors.light.border;

        // connector fill fraction between this circle and the next
        const fillFraction = progressAnim.interpolate({
          inputRange: [i, i + 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        });

        return (
          <React.Fragment key={i}>
            {/* 1) Step Circle */}
            <View style={styles.stepContainer}>
              <Animated.View
                style={[
                  styles.circle,
                  {
                    backgroundColor: bgColor,
                    borderColor,
                  },
                ]}
              >
                {isDone ? (
                  <MaterialIcons name="check" size={14} color="#fff" />
                ) : (
                  <Text style={[styles.label, isActive && styles.labelActive]}>
                    {i + 1}
                  </Text>
                )}
              </Animated.View>
            </View>

            {/* 2) Connector (skip after the last circle) */}
            {i < steps - 1 && (
              <View style={styles.connectorContainer}>
                {/* filled portion */}
                <Animated.View
                  style={[
                    styles.connector,
                    {
                      flex: fillFraction,
                      backgroundColor: colors.light.tabIconSelected,
                    },
                  ]}
                />
                {/* unfilled portion */}
                <Animated.View
                  style={[
                    styles.connector,
                    {
                      flex: Animated.subtract(1, fillFraction),
                      backgroundColor: colors.light.border,
                    },
                  ]}
                />
              </View>
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}

const SIZE = 28;
const INNER = 24;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepContainer: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: INNER,
    height: INNER,
    borderRadius: INNER / 2,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: colors.light.icon,
  },
  labelActive: {
    color: '#fff',
    fontWeight: '600',
  },
  connectorContainer: {
    flex: 1,
    height: 2,
    flexDirection: 'row',
    marginHorizontal: 4,
  },
  connector: {
    height: 2,
  },
});
