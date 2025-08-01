import { Ionicons } from '@expo/vector-icons'; // or your icon set
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface Props {
  value: string;
  onChange(text: string): void;
  onFocus(): void;
  onBlur(): void;
}

export default function HomeToolbar({ value, onChange, onFocus, onBlur }: Props) {
  return (
    <View style={s.row}>
      <TouchableOpacity style={s.bookmark}
        onPress={() => {
          const router = useRouter();
          router.push('/profile');
        }}
      >
        <Ionicons name="bookmark-outline" size={24} />
      </TouchableOpacity>

      <View style={s.searchBox}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          style={s.input}
          placeholder="Suche nach Schlüsselwörtern"
          value={value}
          onChangeText={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  bookmark: {
    width: 36, height: 36,
    backgroundColor: '#f0f0f0',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 8,
    height: 36,
  },
});
