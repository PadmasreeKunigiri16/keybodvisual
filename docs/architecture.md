# KeyBod Visual — System Architecture Documentation

## Overview
KeyBod Visual is designed as a local-first, zero-backend, client-side web application built with React 18, TypeScript, Vite, and Tailwind CSS. All computation—including typing metrics calculation, Levenshtein distance spell checking, word autocomplete tries, audio synthesis, and analytics aggregation—happens directly within the user's browser thread.

## Component Hierarchy & Architecture

```
src/
├── App.tsx                     # Main container, routing state, global persistent hooks
├── components/                 # Atomic reusable UI components (Navbar, Footer, Button, Card, Modal, Toggle)
├── features/                   # Feature-specific modules
│   ├── keyboard/               # VirtualKeyboard, KeyButton, HeatmapVisualizer
│   ├── typing/                 # MetricsBar, SuggestionBar, SpellCheckWidget
│   ├── practice/               # PracticeSession, TestResultsModal
│   ├── analytics/              # Recharts WPM & Accuracy trends, Key error tables
│   ├── accessibility/          # Accessibility controls, Focus guides
│   ├── customization/          # Theme picker, Key dimension sliders
│   └── privacy/                # Export/Import data manager, Data reset dialog
├── services/                   # Pure business logic & service engines
│   ├── suggestionEngine.ts     # Autocomplete & Trie lookup engine
│   ├── spellChecker.ts         # Levenshtein distance spell corrector
│   ├── analyticsService.ts     # WPM/Accuracy formulas & key error mapping
│   ├── audioService.ts         # Synthesized Web Audio API sound generator
│   └── exportManager.ts        # LocalStorage backup exporter/purger
├── hooks/                      # Custom hooks
│   ├── useTypingEngine.ts      # Live typing state tracking (WPM, Acc, Errors, Time)
│   ├── usePhysicalKeyboardSync # Real-time hardware key highlight listener
│   ├── useKeyboardSettings     # Persistent accessibility & theme configuration
│   └── useLocalStorage        # Type-safe window.localStorage wrapper
└── types/                      # TypeScript domain model interface definitions
```

## Data Persistence Strategy
- All state is stored locally using `window.localStorage` under key namespaces:
  - `keybod_sessions`: Array of completed typing session logs.
  - `keybod_accessibility`: User accessibility preferences.
  - `keybod_customization`: Keyboard design studio settings.
  - `keybod_custom_words`: Personal dictionary additions.
  - `keybod_simple_mode`: Minimal interface toggle state.
