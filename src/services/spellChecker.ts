import { DEFAULT_DICTIONARY } from '../data/defaultDictionary';
import { SpellingCorrection } from '../types';

export class SpellChecker {
  private dictionary: string[];

  constructor(customWords: string[] = []) {
    this.dictionary = Array.from(new Set([...DEFAULT_DICTIONARY, ...customWords.map(w => w.toLowerCase())]));
  }

  public calculateLevenshtein(a: string, b: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  public checkSpelling(word: string): SpellingCorrection | null {
    const cleanWord = word.toLowerCase().trim().replace(/[^\w]/g, '');
    if (!cleanWord || cleanWord.length < 2) return null;

    if (this.dictionary.includes(cleanWord)) return null; // Correctly spelled

    // Find closest dictionary entries within distance <= 2
    const candidates: { word: string; dist: number }[] = [];

    for (const dictWord of this.dictionary) {
      if (Math.abs(dictWord.length - cleanWord.length) > 2) continue;
      const dist = this.calculateLevenshtein(cleanWord, dictWord);
      if (dist <= 2) {
        candidates.push({ word: dictWord, dist });
      }
    }

    candidates.sort((a, b) => a.dist - b.dist);

    const suggestions = candidates.slice(0, 3).map(c => c.word);
    if (suggestions.length === 0) return null;

    return {
      original: word,
      suggestions,
    };
  }
}
