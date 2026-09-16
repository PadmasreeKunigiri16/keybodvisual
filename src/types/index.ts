export type ThemeMode = 'dark' | 'light' | 'high-contrast' | 'cyberpunk';

export type KeyboardLayoutType = 'qwerty' | 'dvorak' | 'colemak' | 'numeric';

export type PracticeCategory = 'common-words' | 'sentences' | 'code' | 'quotes' | 'random' | 'custom';
export type PracticeDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'custom';

export type SoundProfile = 'mechanical' | 'soft' | 'typewriter' | 'beep' | 'silent';

export interface KeyPressLog {
  key: string;
  timestamp: number;
  isCorrect: boolean;
  expectedKey?: string;
}

export interface TypingSession {
  id: string;
  date: string; // ISO string
  startTime: number;
  endTime: number;
  durationSeconds: number;
  wpm: number;
  netWpm: number;
  accuracy: number;
  wordsCount: number;
  charactersCount: number;
  errorCount: number;
  backspaceCount: number;
  category?: PracticeCategory | 'free-typing';
  difficulty?: PracticeDifficulty;
  keyUsage: Record<string, number>;
  keyErrors: Record<string, number>;
}

export interface AccessibilitySettings {
  largeKeys: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  dyslexiaFont: boolean;
  oneHandMode: 'none' | 'left' | 'right';
  keyboardNavigation: boolean;
  focusIndicators: boolean;
  largerText: boolean;
  soundFeedback: boolean;
  visualFeedback: boolean;
  hapticFeedback: boolean;
}

export interface CustomizationSettings {
  keyHeightPx: number; // 40 to 70
  keySpacingPx: number; // 2 to 10
  layout: KeyboardLayoutType;
  fontSizePx: number; // 14 to 24
  soundProfile: SoundProfile;
  soundVolume: number; // 0 to 1
  animationIntensity: 'off' | 'subtle' | 'full';
  transparency: number; // 0.1 to 1
  theme: ThemeMode;
  keyShape: 'rounded' | 'square' | 'pill';
}

export interface SmartSuggestion {
  word: string;
  frequency: number;
  isCustom?: boolean;
}

export interface SpellingCorrection {
  original: string;
  suggestions: string[];
}

export interface TypingInsights {
  avgWpm: number;
  avgAccuracy: number;
  mostUsedKey: string;
  mostErrorKey: string;
  totalSessions: number;
  totalWordsTyped: number;
  totalTimeMinutes: number;
  streakDays: number;
  insights: string[];
}
