import { useState, useEffect, useCallback, useRef } from 'react';
import { SuggestionEngine } from '../services/suggestionEngine';
import { SpellChecker } from '../services/spellChecker';
import { AnalyticsService } from '../services/analyticsService';
import { audioService } from '../services/audioService';
import { SoundProfile, SmartSuggestion, SpellingCorrection } from '../types';

interface UseTypingEngineProps {
  targetText?: string;
  soundProfile?: SoundProfile;
  soundVolume?: number;
  hapticEnabled?: boolean;
  customWords?: string[];
  onSessionComplete?: (result: {
    wpm: number;
    netWpm: number;
    accuracy: number;
    durationSeconds: number;
    wordsCount: number;
    charactersCount: number;
    errorCount: number;
    backspaceCount: number;
    keyUsage: Record<string, number>;
    keyErrors: Record<string, number>;
  }) => void;
}

export function useTypingEngine({
  targetText = '',
  soundProfile = 'mechanical',
  soundVolume = 0.5,
  hapticEnabled = false,
  customWords = [],
  onSessionComplete,
}: UseTypingEngineProps) {
  const [typedText, setTypedText] = useState<string>('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  const [totalKeystrokes, setTotalKeystrokes] = useState<number>(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [backspaceCount, setBackspaceCount] = useState<number>(0);

  const [keyUsage, setKeyUsage] = useState<Record<string, number>>({});
  const [keyErrors, setKeyErrors] = useState<Record<string, number>>({});

  const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([]);
  const [spellWarning, setSpellWarning] = useState<SpellingCorrection | null>(null);

  const suggestionEngineRef = useRef<SuggestionEngine>(new SuggestionEngine(customWords));
  const spellCheckerRef = useRef<SpellChecker>(new SpellChecker(customWords));

  // Sync custom words
  useEffect(() => {
    suggestionEngineRef.current = new SuggestionEngine(customWords);
    spellCheckerRef.current = new SpellChecker(customWords);
  }, [customWords]);

  // Timer loop
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive && startTime && !endTime) {
      interval = setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, startTime, endTime]);

  const startSession = useCallback(() => {
    setTypedText('');
    setStartTime(Date.now());
    setEndTime(null);
    setElapsedSeconds(0);
    setIsActive(true);
    setTotalKeystrokes(0);
    setCorrectKeystrokes(0);
    setErrorCount(0);
    setBackspaceCount(0);
    setKeyUsage({});
    setKeyErrors({});
    setSuggestions([]);
    setSpellWarning(null);
  }, []);

  const pauseSession = useCallback(() => {
    setIsActive(false);
  }, []);

  const resumeSession = useCallback(() => {
    if (startTime) setIsActive(true);
  }, [startTime]);

  const endSession = useCallback(() => {
    if (!startTime) return;
    const end = Date.now();
    setEndTime(end);
    setIsActive(false);
    const duration = Math.max(1, Math.floor((end - startTime) / 1000));
    setElapsedSeconds(duration);

    const wpm = AnalyticsService.calculateWpm(typedText.length, duration);
    const netWpm = AnalyticsService.calculateNetWpm(typedText.length, errorCount, duration);
    const accuracy = AnalyticsService.calculateAccuracy(correctKeystrokes, totalKeystrokes);
    const wordsCount = typedText.trim() ? typedText.trim().split(/\s+/).length : 0;

    if (onSessionComplete) {
      onSessionComplete({
        wpm,
        netWpm,
        accuracy,
        durationSeconds: duration,
        wordsCount,
        charactersCount: typedText.length,
        errorCount,
        backspaceCount,
        keyUsage,
        keyErrors,
      });
    }
  }, [startTime, typedText, errorCount, correctKeystrokes, totalKeystrokes, backspaceCount, keyUsage, keyErrors, onSessionComplete]);

  // Handle character input
  const handleKeyInput = useCallback((keyVal: string) => {
    if (!startTime) {
      setStartTime(Date.now());
      setIsActive(true);
    }

    audioService.playKeySound(soundProfile, soundVolume);
    audioService.triggerHaptic(hapticEnabled);

    const charLower = keyVal.toLowerCase();
    setKeyUsage(prev => ({ ...prev, [charLower]: (prev[charLower] || 0) + 1 }));
    setTotalKeystrokes(prev => prev + 1);

    if (keyVal === 'backspace' || keyVal === '⌫') {
      setBackspaceCount(prev => prev + 1);
      setTypedText(prev => prev.slice(0, -1));
      return;
    }

    let nextChar = keyVal;
    if (keyVal === 'enter' || keyVal === '↵') nextChar = '\n';
    if (keyVal === 'tab' || keyVal === 'Tab ↹') nextChar = '  ';
    if (keyVal === 'space' || keyVal === 'Space Bar') nextChar = ' ';

    // Target text accuracy validation if practice target text is given
    if (targetText) {
      const currentPos = typedText.length;
      const expectedChar = targetText[currentPos];
      if (expectedChar && nextChar !== expectedChar) {
        setErrorCount(prev => prev + 1);
        setKeyErrors(prev => ({ ...prev, [charLower]: (prev[charLower] || 0) + 1 }));
      } else {
        setCorrectKeystrokes(prev => prev + 1);
      }
    } else {
      setCorrectKeystrokes(prev => prev + 1);
    }

    const updatedText = typedText + nextChar;
    setTypedText(updatedText);

    // Update suggestions and spell check
    const words = updatedText.split(/\s+/);
    const lastWord = words[words.length - 1] || '';

    if (lastWord.length >= 1) {
      const sugList = suggestionEngineRef.current.getSuggestions(lastWord, 4);
      setSuggestions(sugList);

      const correction = spellCheckerRef.current.checkSpelling(lastWord);
      setSpellWarning(correction);
    } else {
      setSuggestions([]);
      setSpellWarning(null);
    }

    // Auto complete session if target text typed in full
    if (targetText && updatedText.length >= targetText.length) {
      endSession();
    }
  }, [startTime, soundProfile, soundVolume, hapticEnabled, targetText, typedText, endSession]);

  const applySuggestion = useCallback((suggestedWord: string) => {
    setTypedText(prev => {
      const words = prev.split(/(\s+)/);
      // Replace last word token
      let foundIndex = -1;
      for (let i = words.length - 1; i >= 0; i--) {
        if (words[i].trim().length > 0) {
          foundIndex = i;
          break;
        }
      }

      if (foundIndex !== -1) {
        words[foundIndex] = suggestedWord;
        return words.join('') + ' ';
      }
      return prev + suggestedWord + ' ';
    });

    suggestionEngineRef.current.recordWordUse(suggestedWord);
    setSuggestions([]);
    setSpellWarning(null);
  }, []);

  const liveWpm = AnalyticsService.calculateWpm(typedText.length, elapsedSeconds);
  const liveAccuracy = AnalyticsService.calculateAccuracy(correctKeystrokes, totalKeystrokes);
  const wordsCount = typedText.trim() ? typedText.trim().split(/\s+/).length : 0;

  return {
    typedText,
    setTypedText,
    elapsedSeconds,
    isActive,
    liveWpm,
    liveAccuracy,
    wordsCount,
    charactersCount: typedText.length,
    errorCount,
    backspaceCount,
    suggestions,
    spellWarning,
    keyUsage,
    keyErrors,
    handleKeyInput,
    applySuggestion,
    startSession,
    pauseSession,
    resumeSession,
    endSession,
  };
}
