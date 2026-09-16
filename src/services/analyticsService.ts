import { TypingSession, TypingInsights } from '../types';

export class AnalyticsService {
  public static calculateWpm(charsTyped: number, durationSeconds: number): number {
    if (durationSeconds <= 0) return 0;
    const words = charsTyped / 5;
    const minutes = durationSeconds / 60;
    return Math.round(words / minutes);
  }

  public static calculateNetWpm(charsTyped: number, errorCount: number, durationSeconds: number): number {
    if (durationSeconds <= 0) return 0;
    const grossWpm = (charsTyped / 5) / (durationSeconds / 60);
    const errorRatePerMin = errorCount / (durationSeconds / 60);
    const net = Math.round(grossWpm - errorRatePerMin);
    return net > 0 ? net : 0;
  }

  public static calculateAccuracy(correctChars: number, totalKeystrokes: number): number {
    if (totalKeystrokes <= 0) return 100;
    const acc = (correctChars / totalKeystrokes) * 100;
    return Math.min(100, Math.max(0, Math.round(acc)));
  }

  public static generateInsights(sessions: TypingSession[]): TypingInsights {
    if (sessions.length === 0) {
      return {
        avgWpm: 0,
        avgAccuracy: 0,
        mostUsedKey: '-',
        mostErrorKey: '-',
        totalSessions: 0,
        totalWordsTyped: 0,
        totalTimeMinutes: 0,
        streakDays: 0,
        insights: [
          'No typing sessions recorded yet. Start practicing to generate insights!',
        ],
      };
    }

    const totalSessions = sessions.length;
    const avgWpm = Math.round(sessions.reduce((acc, s) => acc + s.wpm, 0) / totalSessions);
    const avgAccuracy = Math.round(sessions.reduce((acc, s) => acc + s.accuracy, 0) / totalSessions);
    const totalWordsTyped = sessions.reduce((acc, s) => acc + s.wordsCount, 0);
    const totalTimeMinutes = Math.round(sessions.reduce((acc, s) => acc + s.durationSeconds, 0) / 60);

    // Aggregate Key Usage & Errors
    const globalKeyUsage: Record<string, number> = {};
    const globalKeyErrors: Record<string, number> = {};

    sessions.forEach(session => {
      Object.entries(session.keyUsage || {}).forEach(([key, count]) => {
        globalKeyUsage[key] = (globalKeyUsage[key] || 0) + count;
      });
      Object.entries(session.keyErrors || {}).forEach(([key, count]) => {
        globalKeyErrors[key] = (globalKeyErrors[key] || 0) + count;
      });
    });

    let mostUsedKey = '-';
    let maxUsage = 0;
    Object.entries(globalKeyUsage).forEach(([key, val]) => {
      if (val > maxUsage && key.length === 1) {
        maxUsage = val;
        mostUsedKey = key.toUpperCase();
      }
    });

    let mostErrorKey = '-';
    let maxError = 0;
    Object.entries(globalKeyErrors).forEach(([key, val]) => {
      if (val > maxError && key.length === 1) {
        maxError = val;
        mostErrorKey = key.toUpperCase();
      }
    });

    const generatedInsights: string[] = [];

    if (avgAccuracy >= 95) {
      generatedInsights.push('You maintained an outstanding accuracy rate above 95%!');
    } else if (avgAccuracy < 85) {
      generatedInsights.push('Focus on speed control to boost your typing accuracy above 90%.');
    }

    if (mostErrorKey !== '-') {
      generatedInsights.push(`You made the most typing errors around the '${mostErrorKey}' key.`);
    }

    if (totalSessions >= 5) {
      const recentWpm = sessions.slice(-3).reduce((acc, s) => acc + s.wpm, 0) / 3;
      if (recentWpm > avgWpm) {
        generatedInsights.push('Your average WPM has increased over your recent typing sessions!');
      }
    }

    generatedInsights.push(`You have spent a total of ${totalTimeMinutes} minutes honing your typing skills.`);

    return {
      avgWpm,
      avgAccuracy,
      mostUsedKey,
      mostErrorKey,
      totalSessions,
      totalWordsTyped,
      totalTimeMinutes,
      streakDays: 1,
      insights: generatedInsights,
    };
  }
}
