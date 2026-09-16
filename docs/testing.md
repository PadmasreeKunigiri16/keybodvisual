# KeyBod Visual — Testing Guide

## Unit & Integration Testing (Vitest)
Run all unit tests:
```bash
npm run test:unit
```
Test Coverage:
- `wpmCalculator.test.ts`: Verifies gross and net WPM formulas.
- `suggestionEngine.test.ts`: Verifies prefix completion and custom dictionary management.
- `spellChecker.test.ts`: Verifies Levenshtein distance typo detection.
- `analyticsService.test.ts`: Verifies session statistics aggregation and insights generation.

## End-to-End Testing (Playwright)
Run Playwright tests:
```bash
npx playwright test
```
E2E User Flows Covered:
- Landing page rendering and CTA navigation.
- Virtual key clicks and physical keyboard typing sync.
- Typing practice session completion.
- Accessibility high contrast and dyslexia font toggle.
- Privacy center JSON data export.
