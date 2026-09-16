import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Save,
  Sliders,
  Smile,
  Flame,
  LayoutGrid,
} from 'lucide-react';
import { Button } from '../components/Button';
import { MetricsBar } from '../features/typing/MetricsBar';
import { SuggestionBar } from '../features/typing/SuggestionBar';
import { SpellCheckWidget } from '../features/typing/SpellCheckWidget';
import { VirtualKeyboard } from '../features/keyboard/VirtualKeyboard';
import { useTypingEngine } from '../hooks/useTypingEngine';
import { usePhysicalKeyboardSync } from '../hooks/usePhysicalKeyboardSync';
import { CustomizationSettings, AccessibilitySettings, TypingSession, KeyboardLayoutType } from '../types';

interface KeyboardPageProps {
  customization: CustomizationSettings;
  setCustomization: React.Dispatch<React.SetStateAction<CustomizationSettings>>;
  accessibility: AccessibilitySettings;
  customWords: string[];
  onAddCustomWord: (word: string) => void;
  onSaveSession: (session: TypingSession) => void;
  onOpenEmoji: () => void;
  heatmapData: { usage: Record<string, number>; errors: Record<string, number> };
}

export const KeyboardPage: React.FC<KeyboardPageProps> = ({
  customization,
  setCustomization,
  accessibility,
  customWords,
  onAddCustomWord,
  onSaveSession,
  onOpenEmoji,
  heatmapData,
}) => {
  const [heatmapOverlay, setHeatmapOverlay] = useState<'none' | 'usage' | 'errors'>('none');

  const {
    typedText,
    setTypedText,
    elapsedSeconds,
    liveWpm,
    liveAccuracy,
    wordsCount,
    charactersCount,
    errorCount,
    backspaceCount,
    suggestions,
    spellWarning,
    keyUsage,
    keyErrors,
    handleKeyInput,
    applySuggestion,
    startSession,
    endSession,
  } = useTypingEngine({
    soundProfile: customization.soundProfile,
    soundVolume: customization.soundVolume,
    hapticEnabled: accessibility.hapticFeedback,
    customWords,
    onSessionComplete: res => {
      const newSession: TypingSession = {
        id: `sess-${Date.now()}`,
        date: new Date().toISOString(),
        startTime: Date.now() - res.durationSeconds * 1000,
        endTime: Date.now(),
        durationSeconds: res.durationSeconds,
        wpm: res.wpm,
        netWpm: res.netWpm,
        accuracy: res.accuracy,
        wordsCount: res.wordsCount,
        charactersCount: res.charactersCount,
        errorCount: res.errorCount,
        backspaceCount: res.backspaceCount,
        category: 'free-typing',
        keyUsage: res.keyUsage,
        keyErrors: res.keyErrors,
      };
      onSaveSession(newSession);
    },
  });

  const { activeKeys, isShiftPressed, isCapsLocked } = usePhysicalKeyboardSync(key => {
    handleKeyInput(key);
  });

  const toggleSound = () => {
    setCustomization(prev => ({
      ...prev,
      soundProfile: prev.soundProfile === 'silent' ? 'mechanical' : 'silent',
    }));
  };

  const handleLayoutChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLayout = e.target.value as KeyboardLayoutType;
    setCustomization(prev => ({ ...prev, layout: newLayout }));
  };

  return (
    <div className="space-y-6 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-700/80">
        <div>
          <h1 className="text-xl font-bold text-slate-100">Smart Virtual Keyboard</h1>
          <p className="text-xs text-slate-400">Interactive visual workspace with sound & layout sync</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Layout Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
            <LayoutGrid className="w-3.5 h-3.5 text-teal-400" />
            <select
              value={customization.layout}
              onChange={handleLayoutChange}
              className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              <option value="qwerty">QWERTY</option>
              <option value="dvorak">DVORAK</option>
              <option value="colemak">COLEMAK</option>
              <option value="numeric">NUMERIC</option>
            </select>
          </div>

          {/* Sound Toggle */}
          <Button
            variant="ghost"
            size="sm"
            icon={customization.soundProfile === 'silent' ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-teal-400" />}
            onClick={toggleSound}
          >
            {customization.soundProfile === 'silent' ? 'Muted' : 'Sound On'}
          </Button>

          {/* Heatmap Overlay Toggle */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
            <button
              onClick={() => setHeatmapOverlay('none')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                heatmapOverlay === 'none' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setHeatmapOverlay('usage')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                heatmapOverlay === 'usage' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Usage Heatmap
            </button>
            <button
              onClick={() => setHeatmapOverlay('errors')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                heatmapOverlay === 'errors' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Error Heatmap
            </button>
          </div>

          {/* Emoji Toggle */}
          <Button
            variant="secondary"
            size="sm"
            icon={<Smile className="w-4 h-4 text-amber-400" />}
            onClick={onOpenEmoji}
          >
            Emoji
          </Button>
        </div>
      </div>

      {/* Real-time Metrics Bar */}
      <MetricsBar
        wpm={liveWpm}
        accuracy={liveAccuracy}
        elapsedSeconds={elapsedSeconds}
        wordsCount={wordsCount}
        charactersCount={charactersCount}
        errorCount={errorCount}
        backspaceCount={backspaceCount}
      />

      {/* Typing Workspace */}
      <div className="space-y-2">
        {/* Suggestion & Spelling Widgets */}
        <SuggestionBar suggestions={suggestions} onSelectSuggestion={applySuggestion} />
        <SpellCheckWidget
          warning={spellWarning}
          onAcceptCorrection={applySuggestion}
          onAddToDictionary={onAddCustomWord}
        />

        <div className="relative">
          <textarea
            value={typedText}
            onChange={e => setTypedText(e.target.value)}
            placeholder="Click here or type with physical / virtual keyboard..."
            className="w-full h-40 p-4 rounded-2xl glass-panel bg-slate-950/60 text-slate-100 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-teal-400/80 border border-slate-700/80 resize-none font-mono leading-relaxed"
          />

          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<RotateCcw className="w-3.5 h-3.5" />}
              onClick={startSession}
            >
              Clear Workspace
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<Save className="w-3.5 h-3.5" />}
              onClick={endSession}
              disabled={typedText.length === 0}
            >
              Save Session
            </Button>
          </div>
        </div>
      </div>

      {/* Virtual Keyboard Component */}
      <VirtualKeyboard
        onKeyInput={handleKeyInput}
        activeKeys={activeKeys}
        isShiftPressed={isShiftPressed}
        isCapsLocked={isCapsLocked}
        customization={customization}
        accessibility={accessibility}
        onToggleEmoji={onOpenEmoji}
        heatmapData={heatmapData}
        heatmapMode={heatmapOverlay}
      />
    </div>
  );
};
