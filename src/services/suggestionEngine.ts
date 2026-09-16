import { DEFAULT_DICTIONARY } from '../data/defaultDictionary';
import { SmartSuggestion } from '../types';

export class SuggestionEngine {
  private dictionary: Set<string>;
  private customDictionary: Set<string>;
  private wordFrequencies: Map<string, number>;

  constructor(customWords: string[] = []) {
    this.dictionary = new Set(DEFAULT_DICTIONARY);
    this.customDictionary = new Set(customWords.map(w => w.toLowerCase()));
    this.wordFrequencies = new Map();

    // Initialize frequencies
    DEFAULT_DICTIONARY.forEach((word, idx) => {
      this.wordFrequencies.set(word, DEFAULT_DICTIONARY.length - idx);
    });

    customWords.forEach(word => {
      this.wordFrequencies.set(word.toLowerCase(), 9999);
    });
  }

  public getSuggestions(inputWord: string, limit: number = 5): SmartSuggestion[] {
    const cleanInput = inputWord.toLowerCase().trim();
    if (!cleanInput) return [];

    const matches: SmartSuggestion[] = [];

    // Check custom dictionary & standard dictionary
    const allWords = new Set([...Array.from(this.dictionary), ...Array.from(this.customDictionary)]);

    for (const word of allWords) {
      if (word.startsWith(cleanInput) && word !== cleanInput) {
        const freq = this.wordFrequencies.get(word) || 1;
        matches.push({
          word,
          frequency: freq,
          isCustom: this.customDictionary.has(word),
        });
      }
    }

    return matches
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, limit);
  }

  public addCustomWord(word: string): void {
    const clean = word.toLowerCase().trim();
    if (clean && !this.customDictionary.has(clean)) {
      this.customDictionary.add(clean);
      this.wordFrequencies.set(clean, 9999);
    }
  }

  public removeCustomWord(word: string): void {
    const clean = word.toLowerCase().trim();
    this.customDictionary.delete(clean);
    this.wordFrequencies.delete(clean);
  }

  public getCustomWords(): string[] {
    return Array.from(this.customDictionary);
  }

  public recordWordUse(word: string): void {
    const clean = word.toLowerCase().trim();
    if (clean) {
      const current = this.wordFrequencies.get(clean) || 0;
      this.wordFrequencies.set(clean, current + 10);
    }
  }
}
