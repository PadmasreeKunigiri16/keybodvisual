import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { AccessibilitySettings, CustomizationSettings } from '../types';

export const DEFAULT_ACCESSIBILITY: AccessibilitySettings = {
  largeKeys: false,
  highContrast: false,
  reducedMotion: false,
  dyslexiaFont: false,
  oneHandMode: 'none',
  keyboardNavigation: true,
  focusIndicators: true,
  largerText: false,
  soundFeedback: true,
  visualFeedback: true,
  hapticFeedback: false,
};

export const DEFAULT_CUSTOMIZATION: CustomizationSettings = {
  keyHeightPx: 50,
  keySpacingPx: 4,
  layout: 'qwerty',
  fontSizePx: 16,
  soundProfile: 'mechanical',
  soundVolume: 0.5,
  animationIntensity: 'full',
  transparency: 1,
  theme: 'dark',
  keyShape: 'rounded',
};

export function useKeyboardSettings() {
  const [accessibility, setAccessibility] = useLocalStorage<AccessibilitySettings>(
    'keybod_accessibility',
    DEFAULT_ACCESSIBILITY
  );

  const [customization, setCustomization] = useLocalStorage<CustomizationSettings>(
    'keybod_customization',
    DEFAULT_CUSTOMIZATION
  );

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const body = document.body;

    // Themes
    body.classList.remove('theme-light', 'theme-high-contrast', 'theme-cyberpunk');
    if (accessibility.highContrast) {
      body.classList.add('theme-high-contrast');
    } else if (customization.theme !== 'dark') {
      body.classList.add(`theme-${customization.theme}`);
    }

    // Dyslexia font
    if (accessibility.dyslexiaFont) {
      body.classList.add('font-dyslexic');
    } else {
      body.classList.remove('font-dyslexic');
    }
  }, [customization.theme, accessibility.highContrast, accessibility.dyslexiaFont]);

  const resetAllSettings = () => {
    setAccessibility(DEFAULT_ACCESSIBILITY);
    setCustomization(DEFAULT_CUSTOMIZATION);
  };

  return {
    accessibility,
    setAccessibility,
    customization,
    setCustomization,
    resetAllSettings,
  };
}
