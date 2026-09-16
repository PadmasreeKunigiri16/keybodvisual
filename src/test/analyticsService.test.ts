import { describe, it, expect } from 'vitest';
import { AnalyticsService } from '../services/analyticsService';
import { TypingSession } from '../types';

describe('AnalyticsService', () => {
  it('should correctly calculate WPM', () => {
    // 25 characters = 5 words. 60 seconds = 1 minute. WPM = 5.
    const wpm = AnalyticsService.calculateWpm(25, 60);
    expect(wpm).toBe(5);
  });

  it('should return 0 WPM for zero or negative duration', () => {
    expect(AnalyticsService.calculateWpm(100, 0)).toBe(0);
    expect(AnalyticsService.calculateWpm(100, -5)).toBe(0);
  });

  it('should correctly calculate accuracy percentage', () => {
    expect(AnalyticsService.calculateAccuracy(95, 100)).toBe(95);
    expect(AnalyticsService.calculateAccuracy(50, 50)).toBe(100);
    expect(AnalyticsService.calculateAccuracy(0, 0)).toBe(100);
  });

  it('should aggregate insights correctly from sessions', () => {
    const mockSessions: TypingSession[] = [
      {
        id: '1',
        date: new Date().toISOString(),
        startTime: Date.now() - 60000,
        endTime: Date.now(),
        durationSeconds: 60,
        wpm: 50,
        netWpm: 48,
        accuracy: 96,
        wordsCount: 50,
        charactersCount: 250,
        errorCount: 2,
        backspaceCount: 3,
        keyUsage: { e: 40, t: 30 },
        keyErrors: { r: 5 },
      },
    ];

    const insights = AnalyticsService.generateInsights(mockSessions);
    expect(insights.avgWpm).toBe(50);
    expect(insights.avgAccuracy).toBe(96);
    expect(insights.mostUsedKey).toBe('E');
    expect(insights.mostErrorKey).toBe('R');
    expect(insights.insights.length).toBeGreaterThan(0);
  });
});
