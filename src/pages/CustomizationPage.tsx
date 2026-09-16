import React from 'react';
import { Sliders, Volume2, Palette, RotateCcw, LayoutGrid } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { CustomizationSettings, ThemeMode, SoundProfile, KeyboardLayoutType } from '../types';

interface CustomizationPageProps {
  customization: CustomizationSettings;
  setCustomization: React.Dispatch<React.SetStateAction<CustomizationSettings>>;
  onResetDefault: () => void;
}

export const CustomizationPage: React.FC<CustomizationPageProps> = ({
  customization,
  setCustomization,
  onResetDefault,
}) => {
  const updateSetting = <K extends keyof CustomizationSettings>(key: K, value: CustomizationSettings[K]) => {
    setCustomization(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Sliders className="w-6 h-6 text-teal-400" />
            Keyboard Customization Studio
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Personalize key dimensions, gap spacing, themes, sound effects, and typography.
          </p>
        </div>

        <Button variant="outline" icon={<RotateCcw className="w-4 h-4" />} onClick={onResetDefault}>
          Reset to Default
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Themes & Visual Style */}
        <Card title="Themes & Visual Style" icon={<Palette className="w-5 h-5 text-teal-400" />}>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Color Theme</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'dark', name: 'Dark Slate', bg: 'bg-slate-900', border: 'border-slate-700' },
                  { id: 'light', name: 'Clean Light', bg: 'bg-slate-100 text-slate-900', border: 'border-slate-300' },
                  { id: 'high-contrast', name: 'High Contrast', bg: 'bg-black text-yellow-300', border: 'border-yellow-400' },
                  { id: 'cyberpunk', name: 'Cyberpunk Neon', bg: 'bg-purple-950 text-cyan-300', border: 'border-pink-500' },
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => updateSetting('theme', t.id as ThemeMode)}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${t.bg} ${
                      customization.theme === t.id ? 'ring-2 ring-teal-400 border-teal-400 scale-[1.02]' : t.border
                    }`}
                  >
                    <span>{t.name}</span>
                    {customization.theme === t.id && <span className="w-2 h-2 rounded-full bg-teal-400" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Key Corner Shape</label>
              <div className="grid grid-cols-3 gap-2">
                {(['rounded', 'square', 'pill'] as const).map(shape => (
                  <button
                    key={shape}
                    onClick={() => updateSetting('keyShape', shape)}
                    className={`py-2 text-xs font-semibold capitalize rounded-lg border transition-all ${
                      customization.keyShape === shape
                        ? 'bg-teal-500/20 text-teal-300 border-teal-500/50'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Keyboard Geometry */}
        <Card title="Dimensions & Spacing" icon={<LayoutGrid className="w-5 h-5 text-purple-400" />}>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>Key Height</span>
                <span>{customization.keyHeightPx}px</span>
              </div>
              <input
                type="range"
                min={40}
                max={70}
                value={customization.keyHeightPx}
                onChange={e => updateSetting('keyHeightPx', Number(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>Key Spacing Gap</span>
                <span>{customization.keySpacingPx}px</span>
              </div>
              <input
                type="range"
                min={2}
                max={10}
                value={customization.keySpacingPx}
                onChange={e => updateSetting('keySpacingPx', Number(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>Font Size</span>
                <span>{customization.fontSizePx}px</span>
              </div>
              <input
                type="range"
                min={12}
                max={22}
                value={customization.fontSizePx}
                onChange={e => updateSetting('fontSizePx', Number(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
            </div>
          </div>
        </Card>

        {/* Audio Profiles */}
        <Card title="Audio Feedback Profiles" icon={<Volume2 className="w-5 h-5 text-emerald-400" />}>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Sound Synthesizer Profile</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'mechanical', name: 'Mechanical Click' },
                  { id: 'soft', name: 'Soft Chiclet' },
                  { id: 'typewriter', name: 'Typewriter Clack' },
                  { id: 'beep', name: 'Electronic Beep' },
                  { id: 'silent', name: 'Silent / Muted' },
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => updateSetting('soundProfile', p.id as SoundProfile)}
                    className={`p-2.5 rounded-lg border text-xs font-semibold text-left transition-all ${
                      customization.soundProfile === p.id
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>Sound Volume</span>
                <span>{Math.round(customization.soundVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={customization.soundVolume}
                onChange={e => updateSetting('soundVolume', Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
