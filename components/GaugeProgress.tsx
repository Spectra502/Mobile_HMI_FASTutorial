// components/GaugeProgress.tsx

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props {
  fraction: number;  // 0…1
  label: string;     // e.g. "80/100"
  size?: number;     // diameter in px
  strokeWidth?: number;
}

const polarToCartesian = (
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
) => {
  const a = ((angleDeg - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(a),
    y: cy + r * Math.sin(a),
  };
};

const describeArc = (
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return [
    'M', start.x, start.y,
    'A', r, r, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ');
};

export default function GaugeProgress({
  fraction,
  label,
  size = 200,
  strokeWidth = 20,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const startAngle = 165;
  const sweepAngle = 210;
  const endAngle = startAngle + sweepAngle;
  const filledAngle = startAngle + sweepAngle * Math.min(Math.max(fraction, 0), 1);

  const backgroundPath = describeArc(center, center, radius, startAngle, endAngle);
  const foregroundPath = describeArc(center, center, radius, startAngle, filledAngle);

  return (
    <View style={{ width: size, alignItems: 'center', marginVertical: 20 }}>
      <Svg width={size} height={size / 2}>
        {/* Background track */}
        <Path
          d={backgroundPath}
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <Path
          d={foregroundPath}
          stroke="#007aff"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
      </Svg>

      {/* Centered label */}
      <View style={[StyleSheet.absoluteFillObject, styles.center]}>
        <Text style={styles.mainLabel}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainLabel: {
    fontSize: 32,
    fontWeight: '700',
  },
});
