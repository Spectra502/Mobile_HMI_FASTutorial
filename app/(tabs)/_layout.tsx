// app/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

const ICON_MAP = {
  index:   'home-outline',
  quiz:    'help-circle-outline',
  profile: 'person-outline',
} as const;


export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        const iconName = ICON_MAP[route.name as keyof typeof ICON_MAP];
        return {
          headerShown: false,
          // tint colors can be adjusted here:
          tabBarActiveTintColor: '#0066CC',
          tabBarInactiveTintColor: '#888',
          // return the Ionicons component for the tab
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={iconName} size={size} color={color} />
          ),
        };
      }}
    >
      <Tabs.Screen name="index"   options={{ title: 'Home'    }} />
      <Tabs.Screen name="quiz"    options={{ title: 'Quiz'    }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}