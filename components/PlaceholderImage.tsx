// components/PlaceholderImage.tsx
import { Image } from 'expo-image';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export default function PlaceholderImage({
  source,
  style,
  contentFit = 'contain',
}: {
  source: number | { uri: string };
  style?: StyleProp<ViewStyle>;
  contentFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
}) {
  return (
    <Image
      source={source}
      style={[{ width: '100%', aspectRatio: 16 / 9, borderRadius: 8 }, style]}
      contentFit={contentFit}
      // nice-to-haves:
      transition={200}
      cachePolicy="disk"
    />
  );
}
