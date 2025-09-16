// constants/Colors.ts

// Shared (cross–theme) colors
export const success = '#4CAF50';
export const border  = '#E0E0E0';
export const highlight = '#FFC107';

// Light & dark “tint” (your original primary)
const tintColorLight = '#0a7ea4';
const tintColorDark  = '#fff';

export default {
  light: {
    // Text
    textPrimary:   '#11181C',
    textSecondary: '#687076',

    // Backgrounds
    background: '#FFFFFF',
    cardBackground: '#F5F5F5',          // background for cards / sections
    tutorialCardBackground: '#FFEAEA',  
    // Icons & tints
    icon:   '#687076',
    tint:   tintColorLight,
    primary: tintColorLight,            // semantic alias

    // Buttons
    buttonText: '#FFFFFF',

    // Progress, success, highlight
    success,

    highlight,
    // Borders
    border,

    // Tabs
    tabIconDefault:  '#687076',
    tabIconSelected: tintColorLight,
  },

  dark: {
    // Text
    textPrimary:   '#ECEDEE',
    textSecondary: '#9BA1A6',

    // Backgrounds
    background: '#151718',
    cardBackground: '#1E1E1E',
    tutorialCardBackground: 'rgba(255,90,80,0.1)',

    // Icons & tints
    icon:   '#9BA1A6',
    tint:   tintColorDark,
    primary: tintColorDark,

    // Buttons
    buttonText: '#FFFFFF',

    // Progress, success, highlight
    highlight,
    success,

    // Borders
    border: '#2E2E2E',

    // Tabs
    tabIconDefault:  '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
