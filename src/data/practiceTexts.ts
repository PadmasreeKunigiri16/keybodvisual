import { PracticeCategory, PracticeDifficulty } from '../types';

export interface PracticeTextItem {
  id: string;
  category: PracticeCategory;
  difficulty: PracticeDifficulty;
  title: string;
  text: string;
}

export const PRACTICE_TEXTS: PracticeTextItem[] = [
  // Common Words
  {
    id: 'cw-beginner-1',
    category: 'common-words',
    difficulty: 'beginner',
    title: 'Top 25 Common English Words',
    text: 'the be to of and a in that have i it for not on with he as you do at this but his by from'
  },
  {
    id: 'cw-inter-1',
    category: 'common-words',
    difficulty: 'intermediate',
    title: 'Productivity & Workplace Vocabulary',
    text: 'keyboard typing practice system visualization feedback suggestion performance accuracy efficiency velocity progress layout customization'
  },
  {
    id: 'cw-adv-1',
    category: 'common-words',
    difficulty: 'advanced',
    title: 'Advanced Technology & Science Terms',
    text: 'accessibility architecture synchronization telemetry microsecond optimization stateful component deterministic algorithm biometrics threshold'
  },

  // Sentences
  {
    id: 'sent-beg-1',
    category: 'sentences',
    difficulty: 'beginner',
    title: 'The Quick Brown Fox',
    text: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.'
  },
  {
    id: 'sent-int-1',
    category: 'sentences',
    difficulty: 'intermediate',
    title: 'Ergonomic & Mindful Typing',
    text: 'Consistent daily typing practice builds muscle memory, increases WPM, and preserves wrist health over long coding sessions.'
  },
  {
    id: 'sent-adv-1',
    category: 'sentences',
    difficulty: 'advanced',
    title: 'Privacy and Decentralization',
    text: 'Local-first browser architectures ensure your personal data, keystroke records, and private documents never touch third-party servers.'
  },

  // Programming Code
  {
    id: 'code-beg-1',
    category: 'code',
    difficulty: 'beginner',
    title: 'JavaScript Array Method',
    text: 'const calculateWpm = (chars, seconds) => Math.round((chars / 5) / (seconds / 60));'
  },
  {
    id: 'code-int-1',
    category: 'code',
    difficulty: 'intermediate',
    title: 'React Custom Hook Pattern',
    text: 'const useLocalStorage = <T>(key: string, initial: T) => {\n  const [val, setVal] = useState(() => JSON.parse(localStorage.getItem(key) || JSON.stringify(initial)));\n  return [val, setVal];\n};'
  },
  {
    id: 'code-adv-1',
    category: 'code',
    difficulty: 'advanced',
    title: 'Levenshtein Distance Calculation',
    text: 'function levenshtein(a: string, b: string): number {\n  const matrix = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));\n  return matrix[a.length][b.length];\n}'
  },

  // Quotes
  {
    id: 'quote-beg-1',
    category: 'quotes',
    difficulty: 'beginner',
    title: 'Simplicity in Design',
    text: 'Simplicity is about subtracting the obvious and adding the meaningful. — John Maeda'
  },
  {
    id: 'quote-int-1',
    category: 'quotes',
    difficulty: 'intermediate',
    title: 'Practice and Mastery',
    text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit. — Will Durant'
  },
  {
    id: 'quote-adv-1',
    category: 'quotes',
    difficulty: 'advanced',
    title: 'Craftsmanship in Software',
    text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand. — Martin Fowler'
  }
];
