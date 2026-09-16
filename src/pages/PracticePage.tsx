import React, { useState } from 'react';
import {
  BookOpen,
  Play,
  RotateCcw,
  CheckCircle2,
  Code,
  Quote,
  Zap,
  AlignLeft,
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { MetricsBar } from '../features/typing/MetricsBar';
import { VirtualKeyboard } from '../features/keyboard/VirtualKeyboard';
import { TestResultsModal } from '../features/practice/TestResultsModal';
import { PRACTICE_TEXTS, PracticeTextItem } from '../data/practiceTexts';
import { useTypingEngine } from '../hooks/useTypingEngine';
import { usePhysicalKeyboardSync } from '../hooks/usePhysicalKeyboardSync';
import {
  PracticeCategory,
  PracticeDifficulty,
  CustomizationSettings,
  AccessibilitySettings,
  TypingSession,
} from '../types';

interface PracticePageProps {
  customization: CustomizationSettings;
  accessibility: AccessibilitySettings;
  onSaveSession: (session: TypingSession) => void;
  onGoHome: () => void;
}

export const PracticePage: React.FC<PracticePageProps> = ({
  customization,
  accessibility,
  onSaveSession,
  onGoHome,
}) => {
  const [category, setCategory] = useState<PracticeCategory>('common-words');
  const [difficulty, setDifficulty] = useState<PracticeDifficulty>('beginner');
  const [customInputText, setCustomInputText] = useState<string>('');
  const [activeTextItem, setActiveTextItem] = useState<PracticeTextItem | null>(PRACTICE_TEXTS[0]);
  const [isTestComplete, setIsTestComplete] = useState<boolean>(false);
  const [lastResults, setLastResults] = useState<{
    wpm: number;
    accuracy: number;
    errors: number;
    characters: number;
    duration: number;
  }>({ wpm: 0, accuracy: 0, errors: 0, characters: 0, duration: 0 });

  const targetText =
    category === 'custom'
      ? customInputText
      : activeTextItem?.text || 'The quick brown fox jumps over the lazy dog.';

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
    handleKeyInput,
    startSession,
  } = useTypingEngine({
    targetText,
    soundProfile: customization.soundProfile,
    soundVolume: customization.soundVolume,
    hapticEnabled: accessibility.hapticFeedback,
    onSessionComplete: res => {
      setLastResults({
        wpm: res.wpm,
        accuracy: res.accuracy,
        errors: res.errorCount,
        characters: res.charactersCount,
        duration: res.durationSeconds,
      });
      setIsTestComplete(true);

      const session: TypingSession = {
        id: `practice-${Date.now()}`,
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
        category,
        difficulty,
        keyUsage: res.keyUsage,
        keyErrors: res.keyErrors,
      };
      onSaveSession(session);
    },
  });

  const { activeKeys, isShiftPressed, isCapsLocked } = usePhysicalKeyboardSync(key => {
    handleKeyInput(key);
  });

  const filteredTexts = PRACTICE_TEXTS.filter(
    t => t.category === category && (category === 'custom' || t.difficulty === difficulty)
  );

  const handleSelectText = (item: PracticeTextItem) => {
    setActiveTextItem(item);
    startSession();
  };

  const handleStartTest = () => {
    startSession();
  };

  // Target text character rendering with real-time error highlight
  const renderTargetText = () => {
    const chars = targetText.split('');
    return chars.map((char, index) => {
      let charClass = 'text-slate-400';
      if (index < typedText.length) {
        charClass = typedText[index] === char ? 'text-teal-400 font-semibold bg-teal-500/10' : 'text-rose-400 font-bold bg-rose-500/20';
      } else if (index === typedText.length) {
        charClass = 'text-slate-100 underline decoration-teal-400 decoration-2 animate-pulse';
      }
      return (
        <span key={index} className={`font-mono transition-colors ${charClass}`}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="space-y-6 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category & Difficulty Selection */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-700/80 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-teal-400" />
              Typing Practice System
            </h1>
            <p className="text-xs text-slate-400">Choose practice category, difficulty, or paste your custom text</p>
          </div>

          {/* Difficulty Switcher */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
            {(['beginner', 'intermediate', 'advanced'] as PracticeDifficulty[]).map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-all ${
                  difficulty === d ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
          <button
            onClick={() => setCategory('common-words')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              category === 'common-words' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <AlignLeft className="w-4 h-4" /> Common Words
          </button>

          <button
            onClick={() => setCategory('sentences')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              category === 'sentences' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Zap className="w-4 h-4" /> Sentences
          </button>

          <button
            onClick={() => setCategory('code')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              category === 'code' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Code className="w-4 h-4" /> Programming Code
          </button>

          <button
            onClick={() => setCategory('quotes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              category === 'quotes' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Quote className="w-4 h-4" /> Famous Quotes
          </button>

          <button
            onClick={() => setCategory('custom')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              category === 'custom' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            Custom Text
          </button>
        </div>

        {/* Text Items Catalog */}
        {category !== 'custom' ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {filteredTexts.map(item => (
              <div
                key={item.id}
                onClick={() => handleSelectText(item)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  activeTextItem?.id === item.id
                    ? 'bg-teal-500/10 border-teal-500/60 shadow-md'
                    : 'glass-panel border-slate-700/60 hover:border-slate-600'
                }`}
              >
                <div className="text-xs font-bold text-slate-200 mb-1">{item.title}</div>
                <div className="text-[11px] text-slate-400 line-clamp-2">{item.text}</div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <textarea
              value={customInputText}
              onChange={e => setCustomInputText(e.target.value)}
              placeholder="Paste or type your custom paragraph here to practice..."
              className="w-full h-24 p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
        )}
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

      {/* Target Text Display & Typing Input */}
      <div className="space-y-4">
        <div className="glass-panel p-6 rounded-2xl border border-slate-700/80 space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Target Text To Type:</div>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-lg leading-relaxed whitespace-pre-wrap font-mono min-h-24 max-h-48 overflow-y-auto">
            {renderTargetText()}
          </div>
        </div>

        <div className="relative">
          <textarea
            value={typedText}
            onChange={e => setTypedText(e.target.value)}
            placeholder="Start typing the target text here..."
            className="w-full h-32 p-4 rounded-2xl glass-panel bg-slate-950/60 text-slate-100 text-base focus:outline-none focus:ring-2 focus:ring-teal-400/80 border border-slate-700/80 resize-none font-mono"
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<RotateCcw className="w-3.5 h-3.5" />}
              onClick={startSession}
            >
              Restart Practice
            </Button>
          </div>
        </div>
      </div>

      {/* Virtual Keyboard Sync */}
      <VirtualKeyboard
        onKeyInput={handleKeyInput}
        activeKeys={activeKeys}
        isShiftPressed={isShiftPressed}
        isCapsLocked={isCapsLocked}
        customization={customization}
        accessibility={accessibility}
      />

      {/* Test Completion Result Modal */}
      <TestResultsModal
        isOpen={isTestComplete}
        onClose={() => setIsTestComplete(false)}
        onRetry={() => {
          setIsTestComplete(false);
          startSession();
        }}
        onGoHome={onGoHome}
        wpm={lastResults.wpm}
        accuracy={lastResults.accuracy}
        errors={lastResults.errors}
        characters={lastResults.characters}
        durationSeconds={lastResults.duration}
      />
    </div>
  );
};
