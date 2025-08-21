// constants/responsive.ts
import { Platform, useWindowDimensions } from 'react-native';

export function useResponsive() {
  const { width, height } = useWindowDimensions();
  const shortest = Math.min(width, height);

  // Basic tablet heuristic. Good enough for iPads; avoids an extra dependency.
  const isTablet = Platform.isPad || shortest >= 768;

  // Scale relative to 375pt “base phone” width.
  const base = 375;
  const scale = shortest / base;

  // Font scaling: a touch more aggressive on tablets
  const font = (size: number) => Math.round(size * (isTablet ? scale * 0.8 : scale));

  // Spacing scaling (more subtle than font scaling)
  const spacing = (n: number) => Math.round(n * (isTablet ? scale * 0.9 : scale * 0.85));

  // Constrain overly-wide content on tablets (centered, like iPad patterns)
  const container = isTablet
    ? { width: '100%', maxWidth: 720, alignSelf: 'center' as const }
    : null;

  // Useful flags
  return { isTablet, font, spacing, container, width, height, shortest };
}
