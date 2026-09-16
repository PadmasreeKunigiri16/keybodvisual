import React from 'react';
import { Eye, Type, Volume2, Monitor } from 'lucide-react';
import { Card } from '../components/Card';
import { Toggle } from '../components/Toggle';
import { AccessibilitySettings } from '../types';

interface AccessibilityPageProps {
  accessibility: AccessibilitySettings;
  setAccessibility: React.Dispatch<React.SetStateAction<AccessibilitySettings>>;
}

export const AccessibilityPage: React.FC<AccessibilityPageProps> = ({
  accessibility,
  setAccessibility,
}) => {
  const updateSetting = <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
    setAccessibility(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Eye className="w-6 h-6 text-teal-400" />
            Accessibility Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Customize legibility, keyboard navigation, contrast, fonts, and motor controls.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visual & Typography */}
        <Card title="Visual & Typography" icon={<Type className="w-5 h-5 text-teal-400" />}>
          <div className="divide-y divide-slate-800">
            <Toggle
              checked={accessibility.highContrast}
              onChange={val => updateSetting('highContrast', val)}
              label="High Contrast Mode"
              description="Applies pure black background with stark yellow/white contrast for maximum readability."
            />
            <Toggle
              checked={accessibility.dyslexiaFont}
              onChange={val => updateSetting('dyslexiaFont', val)}
              label="Dyslexia-Friendly Font"
              description="Switches the primary typography face to OpenDyslexic to reduce character swapping."
            />
            <Toggle
              checked={accessibility.largeKeys}
              onChange={val => updateSetting('largeKeys', val)}
              label="Large Virtual Key Targets"
              description="Increases key button height and touch padding for easier motor targeting."
            />
            <Toggle
              checked={accessibility.focusIndicators}
              onChange={val => updateSetting('focusIndicators', val)}
              label="Enhanced Focus Indicators"
              description="Displays vivid teal focus borders on interactive elements during keyboard tab navigation."
            />
          </div>
        </Card>

        {/* Motor & Ergonomics */}
        <Card title="Motor & Ergonomics" icon={<Monitor className="w-5 h-5 text-purple-400" />}>
          <div className="divide-y divide-slate-800 space-y-2">
            <div className="py-2">
              <label className="text-sm font-medium text-slate-200 block mb-1">One-Handed Keyboard Mode</label>
              <p className="text-xs text-slate-400 mb-3">Shifts the virtual keyboard grid left or right for single-thumb typing.</p>
              <div className="grid grid-cols-3 gap-2">
                {(['none', 'left', 'right'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => updateSetting('oneHandMode', mode)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold capitalize border transition-all ${
                      accessibility.oneHandMode === mode
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    {mode === 'none' ? 'Centered' : `${mode} Shift`}
                  </button>
                ))}
              </div>
            </div>

            <Toggle
              checked={accessibility.reducedMotion}
              onChange={val => updateSetting('reducedMotion', val)}
              label="Reduced Motion"
              description="Disables key press ripple animations and smooth transitions."
            />
          </div>
        </Card>

        {/* Feedback & Notifications */}
        <Card title="Sensory & Audio Feedback" icon={<Volume2 className="w-5 h-5 text-emerald-400" />}>
          <div className="divide-y divide-slate-800">
            <Toggle
              checked={accessibility.soundFeedback}
              onChange={val => updateSetting('soundFeedback', val)}
              label="Audio Key Feedback"
              description="Plays synthesized click tones on virtual and physical keypresses."
            />
            <Toggle
              checked={accessibility.visualFeedback}
              onChange={val => updateSetting('visualFeedback', val)}
              label="Visual Key Feedback"
              description="Highlights key buttons with color ripples when pressed."
            />
            <Toggle
              checked={accessibility.hapticFeedback}
              onChange={val => updateSetting('hapticFeedback', val)}
              label="Haptic Vibration Feedback"
              description="Triggers device vibration API on supported mobile browsers."
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
