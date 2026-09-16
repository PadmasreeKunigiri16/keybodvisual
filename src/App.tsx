import React, { useState, useMemo } from 'react';
import { Navbar, ActivePage } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { KeyboardPage } from './pages/KeyboardPage';
import { PracticePage } from './pages/PracticePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { CustomizationPage } from './pages/CustomizationPage';
import { EmojiPage } from './pages/EmojiPage';

// Hooks & Services
import { useLocalStorage } from './hooks/useLocalStorage';
import { useKeyboardSettings } from './hooks/useKeyboardSettings';
import { TypingSession } from './types';

export function App() {
  const [activePage, setActivePage] = useState<ActivePage>('landing');

  // Persistent typing sessions & custom dictionary
  const [sessions, setSessions] = useLocalStorage<TypingSession[]>('keybod_sessions', []);
  const [customWords, setCustomWords] = useLocalStorage<string[]>('keybod_custom_words', []);

  // Settings Hook
  const {
    accessibility,
    setAccessibility,
    customization,
    setCustomization,
    resetAllSettings,
  } = useKeyboardSettings();

  const handleSaveSession = (newSession: TypingSession) => {
    setSessions(prev => [...prev, newSession]);
  };

  const handleAddCustomWord = (word: string) => {
    const clean = word.toLowerCase().trim();
    if (clean && !customWords.includes(clean)) {
      setCustomWords(prev => [...prev, clean]);
    }
  };

  // Aggregated Key Usage & Key Errors across all sessions for Heatmaps
  const heatmapData = useMemo(() => {
    const usage: Record<string, number> = {};
    const errors: Record<string, number> = {};

    sessions.forEach(session => {
      Object.entries(session.keyUsage || {}).forEach(([key, count]) => {
        usage[key] = (usage[key] || 0) + count;
      });
      Object.entries(session.keyErrors || {}).forEach(([key, count]) => {
        errors[key] = (errors[key] || 0) + count;
      });
    });

    return { usage, errors };
  }, [sessions]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activePage === 'landing' && <LandingPage setActivePage={setActivePage} />}

        {activePage === 'dashboard' && (
          <DashboardPage sessions={sessions} setActivePage={setActivePage} />
        )}

        {activePage === 'keyboard' && (
          <KeyboardPage
            customization={customization}
            setCustomization={setCustomization}
            accessibility={accessibility}
            customWords={customWords}
            onAddCustomWord={handleAddCustomWord}
            onSaveSession={handleSaveSession}
            onOpenEmoji={() => setActivePage('emoji')}
            heatmapData={heatmapData}
          />
        )}

        {activePage === 'practice' && (
          <PracticePage
            customization={customization}
            accessibility={accessibility}
            onSaveSession={handleSaveSession}
            onGoHome={() => setActivePage('dashboard')}
          />
        )}

        {activePage === 'analytics' && (
          <AnalyticsPage
            sessions={sessions}
            customization={customization}
            accessibility={accessibility}
            heatmapData={heatmapData}
          />
        )}

        {activePage === 'accessibility' && (
          <AccessibilityPage
            accessibility={accessibility}
            setAccessibility={setAccessibility}
          />
        )}

        {activePage === 'customization' && (
          <CustomizationPage
            customization={customization}
            setCustomization={setCustomization}
            onResetDefault={resetAllSettings}
          />
        )}

        {activePage === 'emoji' && (
          <EmojiPage
            onInsertEmoji={emoji => {
              setActivePage('keyboard');
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}
