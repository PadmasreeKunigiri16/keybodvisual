import React, { useState } from 'react';
import {
  Keyboard,
  BarChart3,
  BookOpen,
  Eye,
  Sliders,
  Smile,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Button } from '../components/Button';
import { ActivePage } from '../components/Navbar';

interface LandingPageProps {
  setActivePage: (page: ActivePage) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setActivePage }) => {
  const [demoInput, setDemoInput] = useState('');

  return (
    <div className="space-y-20 py-10">
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto px-4 pt-8">
        {/* Glow backdrop */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-80 sm:w-96 h-80 sm:h-96 bg-amber-500/20 rounded-full blur-3xl" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Smart • Accessible • Visual Typing</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight mb-6">
          Type Smarter.{' '}
          <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Practice Better.
          </span>{' '}
          Stay in Control.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
          VKey is a smart, accessible typing platform designed to make typing visual, measurable, and fully customizable.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button
            variant="primary"
            size="lg"
            icon={<Keyboard className="w-5 h-5" />}
            onClick={() => setActivePage('keyboard')}
          >
            Try the Keyboard
          </Button>

          <Button
            variant="secondary"
            size="lg"
            icon={<BookOpen className="w-5 h-5" />}
            onClick={() => setActivePage('practice')}
          >
            Start Typing Practice
          </Button>
        </div>

        {/* Quick Demo Playground Card */}
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-amber-500/30 max-w-2xl mx-auto text-left shadow-2xl bg-[#141419]/90">
          <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" /> Instant Interactive Demo
            </span>
            <span className="text-amber-400 font-bold">Try typing below!</span>
          </div>

          <input
            type="text"
            value={demoInput}
            onChange={e => setDemoInput(e.target.value)}
            placeholder="Type anything here to test real-time visual feedback..."
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-amber-500/30 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono mb-3"
          />

          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Length: <strong className="text-amber-300 font-mono">{demoInput.length}</strong> chars</span>
            <span>Words: <strong className="text-yellow-400 font-mono">{demoInput.trim() ? demoInput.trim().split(/\s+/).length : 0}</strong></span>
            <button
              onClick={() => setActivePage('keyboard')}
              className="text-amber-400 font-bold hover:underline flex items-center gap-1"
            >
              Open Full Keyboard →
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Built for Typing Mastery & Universal Accessibility
          </h2>
          <p className="text-sm text-slate-400">
            Everything processed live inside your web browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            onClick={() => setActivePage('keyboard')}
            className="glass-panel p-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/60 transition-all cursor-pointer group bg-[#141419]/60"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Keyboard className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Smart Virtual Keyboard</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Real-time physical key synchronization, layout switching (QWERTY, DVORAK, COLEMAK), swipe typing, and Web Audio feedback.
            </p>
            <span className="text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Launch Keyboard <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => setActivePage('practice')}
            className="glass-panel p-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/60 transition-all cursor-pointer group bg-[#141419]/60"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Typing Practice Lessons</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Curated lessons covering common words, full sentences, code snippets (JS, TS, React), and custom texts with instant performance scores.
            </p>
            <span className="text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Start Lessons <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => setActivePage('analytics')}
            className="glass-panel p-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/60 transition-all cursor-pointer group bg-[#141419]/60"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Analytics & Heatmaps</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Visual WPM trends, accuracy curves, and interactive key heatmaps highlighting your most used vs error-prone keys.
            </p>
            <span className="text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              View Telemetry <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 4 */}
          <div
            onClick={() => setActivePage('accessibility')}
            className="glass-panel p-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/60 transition-all cursor-pointer group bg-[#141419]/60"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Accessibility Suite</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              OpenDyslexic font support, high contrast theme, one-hand shift mode, enlarged key targets, and visible focus rings.
            </p>
            <span className="text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Accessibility Settings <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 5 */}
          <div
            onClick={() => setActivePage('customization')}
            className="glass-panel p-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/60 transition-all cursor-pointer group bg-[#141419]/60"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Customization Studio</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Personalize key height, spacing gap, font size, key shapes, synthesized audio click profiles, and visual color themes.
            </p>
            <span className="text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Customize Design <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 6 */}
          <div
            onClick={() => setActivePage('emoji')}
            className="glass-panel p-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/60 transition-all cursor-pointer group bg-[#141419]/60"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Smile className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Emoji & Symbol Center</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Browse, copy, or insert emojis, kaomojis, math symbols, and arrows directly into your keyboard workspace.
            </p>
            <span className="text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Explore Emojis <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
