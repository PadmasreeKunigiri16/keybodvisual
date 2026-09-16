# KeyBod Visual

## Smart Keyboard, Typing Assistant & Accessibility Platform

KeyBod Visual is a modern, portfolio-level browser platform that transforms virtual typing, typing practice, and keyboard accessibility into an intuitive, visual experience. Built local-first with React 18, TypeScript, Vite, Tailwind CSS, Recharts, and Web Audio API synthesis.

---

## Overview

KeyBod Visual addresses the limitations of standard virtual keyboards and rigid typing tutors. It offers a fully customizable, accessible, and privacy-first environment for practicing typing, visualizing key usage heatmaps, receiving offline word suggestions, and customizing keyboard geometry.

---

## Problem Statement

- **Privacy Invasiveness**: Most modern typing assistants send raw user keystrokes to remote servers for spell-checking and autocomplete.
- **Accessibility Barriers**: Traditional typing tools lack support for dyslexia-friendly fonts, high-contrast themes, one-handed layouts, or simple modes for motor impaired users.
- **Lack of Visual Telemetry**: Users rarely have insight into which specific keys cause the highest error rates or slow down their WPM.

---

## Solution

KeyBod Visual provides a zero-backend, client-side browser platform that:
1. Performs all autocomplete, spell checking, and audio synthesis offline.
2. Synchronizes physical hardware key presses to a virtual key grid in real-time.
3. Computes live WPM, Net WPM, accuracy, mistake counts, and key usage heatmaps.
4. Provides WCAG 2.1 AA compliant accessibility controls (OpenDyslexic font, high contrast, one-hand shift mode, large keys).

---

## Key Features

- **Smart Virtual Keyboard**: QWERTY, DVORAK, COLEMAK, and NUMERIC layouts with physical key highlight sync and mouse gesture swipe typing.
- **Synthesized Web Audio Engine**: Zero-dependency audio feedback (Mechanical, Soft Chiclet, Typewriter, Beep, Silent).
- **Offline Autocomplete & Typo Assistance**: Local Trie word suggestions and Levenshtein distance spell checking (e.g. "teh" -> "the").
- **Typing Practice Platform**: Lessons across Common Words, Sentences, Programming Code snippets (JS/TS/React), Quotes, and Custom Text.
- **Analytics & Keyboard Heatmaps**: Interactive Recharts WPM/Accuracy curves and key color heatmaps (Usage vs Error rates).
- **Accessibility Center & Simple Mode**: High contrast mode, OpenDyslexic font toggle, one-handed shift, focus indicators, and low-cognitive-load Simple Mode.
- **Customization Studio**: Key height, gap spacing, font size, key shape, and visual theme switcher (Dark, Light, High Contrast, Cyberpunk).
- **Emoji, Kaomoji & Symbol Center**: Categorized symbols, kaomojis, and math characters with copy/insert support.
- **Privacy Center & Data Sovereignty**: 100% local storage, full JSON data backup export, and complete data purge capabilities.

---

## Technology Stack

- **Core Framework**: React 18, TypeScript, Vite
- **Styling & Icons**: Tailwind CSS, Lucide React Icons
- **Data Visualization**: Recharts
- **Audio Synthesis**: Web Audio API
- **Testing**: Vitest (Unit Tests), Playwright (E2E Tests)

---

## Project Structure

```
/src
├── components/          # Reusable UI (Navbar, Footer, Button, Card, Modal, Toggle)
├── pages/               # Landing, Dashboard, Keyboard, Practice, Analytics, Accessibility, Customization, Emoji, Privacy
├── features/
│   ├── keyboard/       # VirtualKeyboard, KeyButton, HeatmapVisualizer
│   ├── typing/         # MetricsBar, SuggestionBar, SpellCheckWidget
│   ├── practice/       # PracticeSession, TestResultsModal
│   ├── analytics/      # WpmTrendChart, KeyAccuracyMap
│   ├── accessibility/  # SimpleModeToggle, ContrastSettings
│   ├── customization/  # ThemePicker, KeySizeAdjuster
│   └── privacy/        # PrivacyAuditReport, DataExporter
├── services/           # SuggestionEngine, SpellChecker, AnalyticsService, AudioService, ExportManager
├── hooks/              # useTypingEngine, usePhysicalKeyboardSync, useKeyboardSettings, useLocalStorage
├── data/               # Dictionaries, practice texts, emojis, keyboard layouts
├── types/              # TypeScript interface definitions
└── styles/             # index.css with theme & font tokens
```

---

## Installation & Running Locally

### Prerequisites
- Node.js v18+ and npm

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/PadmasreeKunigiri16/keybodvisual.git
   cd keybodvisual
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run local development server:
   ```bash
   npm run dev
   ```
4. Build production bundle:
   ```bash
   npm run build
   ```

---

## Testing

### Unit Tests (Vitest)
```bash
npm run test:unit
```

### End-to-End Tests (Playwright)
```bash
npm run test:e2e
```

---

## Privacy Statement

KeyBod Visual operates 100% inside your browser. No keystroke logs, typed texts, or personal data are ever transmitted to any external server. You can export or delete your local data at any time in the Privacy Center.

---

## Limitations & Future Enhancements

- **Current Limitation**: Offline dictionary dataset is currently optimized for English text.
- **Future Roadmap**: Multi-language dictionaries (Spanish, French, German, Hindi), PWA offline installation, and Web Bluetooth mechanical keyboard telemetry.
