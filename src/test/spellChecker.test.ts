import { describe, it, expect } from 'vitest';
import { SpellChecker } from '../services/spellChecker';

describe('SpellChecker', () => {
  it('should detect typo "teh" and suggest "the"', () => {
    const checker = new SpellChecker();
    const result = checker.checkSpelling('teh');
    expect(result).not.toBeNull();
    expect(result?.suggestions).toContain('the');
  });

  it('should return null for correctly spelled words', () => {
    const checker = new SpellChecker();
    expect(checker.checkSpelling('keyboard')).toBeNull();
  });

  it('should calculate accurate Levenshtein distance', () => {
    const checker = new SpellChecker();
    expect(checker.calculateLevenshtein('kitten', 'sitting')).toBe(3);
    expect(checker.calculateLevenshtein('the', 'teh')).toBe(2);
  });
});
