import { describe, it, expect } from 'vitest';
import { SuggestionEngine } from '../services/suggestionEngine';

describe('SuggestionEngine', () => {
  it('should return prefix suggestions for typed words', () => {
    const engine = new SuggestionEngine();
    const suggestions = engine.getSuggestions('key', 3);
    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions.some(s => s.word === 'keyboard')).toBe(true);
  });

  it('should include custom user added words in suggestions', () => {
    const engine = new SuggestionEngine(['supercalifragilistic']);
    const suggestions = engine.getSuggestions('super', 5);
    expect(suggestions.some(s => s.word === 'supercalifragilistic')).toBe(true);
  });

  it('should remove custom words when requested', () => {
    const engine = new SuggestionEngine(['mycustomword']);
    engine.removeCustomWord('mycustomword');
    const suggestions = engine.getSuggestions('mycustom', 5);
    expect(suggestions.some(s => s.word === 'mycustomword')).toBe(false);
  });
});
