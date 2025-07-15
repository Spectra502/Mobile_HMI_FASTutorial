import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

type Props = {
  source?: ImageSourcePropType;
  style?: any;
};

export default function PlaceholderImage({ source, style }: Props) {
  // If no source is provided, fall back to the old placeholder box
  if (!source) {
    return (
      <View style={[styles.box, style]}>
        <Text style={styles.label}>Placeholder Image</Text>
      </View>
    );
  }

  return (
    <Image
      source={source}
      style={[styles.image, style]}
    />
  );
}

const styles = StyleSheet.create({
  box: {
    height: 325,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  label: {
    fontStyle: 'italic',
    color: '#555',
  },
  image: {
    width: '100%',
    height: 325,
    borderRadius: 19,
    resizeMode: 'contain',
    marginVertical: 16,
  },
});
