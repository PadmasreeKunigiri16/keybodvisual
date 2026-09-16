import { KeyboardLayoutType } from '../types';

export interface KeyConfig {
  key: string;
  label?: string;
  display?: string;
  flexClass?: string;
  isModifier?: boolean;
}

export const KEYBOARD_LAYOUTS: Record<KeyboardLayoutType, KeyConfig[][]> = {
  qwerty: [
    // Row 1: Numbers & Backspace (14 keys)
    [
      { key: '`', display: '`' }, { key: '1' }, { key: '2' }, { key: '3' }, { key: '4' },
      { key: '5' }, { key: '6' }, { key: '7' }, { key: '8' }, { key: '9' }, { key: '0' },
      { key: '-' }, { key: '=' }, { key: 'backspace', display: '⌫ Backspace', flexClass: 'flex-[1.6]', isModifier: true }
    ],
    // Row 2: Tab & Top Row (14 keys)
    [
      { key: 'tab', display: 'Tab ↹', flexClass: 'flex-[1.4]', isModifier: true },
      { key: 'q' }, { key: 'w' }, { key: 'e' }, { key: 'r' }, { key: 't' }, { key: 'y' },
      { key: 'u' }, { key: 'i' }, { key: 'o' }, { key: 'p' }, { key: '[' }, { key: ']' }, { key: '\\' }
    ],
    // Row 3: Caps & Home Row (13 keys)
    [
      { key: 'caps', display: 'Caps ⇪', flexClass: 'flex-[1.75]', isModifier: true },
      { key: 'a' }, { key: 's' }, { key: 'd' }, { key: 'f' }, { key: 'g' }, { key: 'h' },
      { key: 'j' }, { key: 'k' }, { key: 'l' }, { key: ';' }, { key: "'" },
      { key: 'enter', display: 'Enter ↵', flexClass: 'flex-[2.25]', isModifier: true }
    ],
    // Row 4: Shift & Bottom Row (12 keys)
    [
      { key: 'shift', display: 'Shift ⇧', flexClass: 'flex-[2.25]', isModifier: true },
      { key: 'z' }, { key: 'x' }, { key: 'c' }, { key: 'v' }, { key: 'b' }, { key: 'n' },
      { key: 'm' }, { key: ',' }, { key: '.' }, { key: '/' },
      { key: 'shift', display: 'Shift ⇧', flexClass: 'flex-[2.25]', isModifier: true }
    ],
    // Row 5: Spacebar & Actions
    [
      { key: 'emoji', display: '😊 Emoji', flexClass: 'flex-[1.5]', isModifier: true },
      { key: 'space', display: 'Space Bar', flexClass: 'flex-[6]' },
      { key: 'left', display: '←', isModifier: true },
      { key: 'up', display: '↑', isModifier: true },
      { key: 'down', display: '↓', isModifier: true },
      { key: 'right', display: '→', isModifier: true }
    ]
  ],
  dvorak: [
    [
      { key: '`' }, { key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' },
      { key: '6' }, { key: '7' }, { key: '8' }, { key: '9' }, { key: '0' }, { key: '[' },
      { key: ']' }, { key: 'backspace', display: '⌫ Backspace', flexClass: 'flex-[1.6]', isModifier: true }
    ],
    [
      { key: 'tab', display: 'Tab ↹', flexClass: 'flex-[1.4]', isModifier: true },
      { key: "'" }, { key: ',' }, { key: '.' }, { key: 'p' }, { key: 'y' }, { key: 'f' },
      { key: 'g' }, { key: 'c' }, { key: 'r' }, { key: 'l' }, { key: '/' }, { key: '=' }
    ],
    [
      { key: 'caps', display: 'Caps ⇪', flexClass: 'flex-[1.75]', isModifier: true },
      { key: 'a' }, { key: 'o' }, { key: 'e' }, { key: 'u' }, { key: 'i' }, { key: 'd' },
      { key: 'h' }, { key: 't' }, { key: 'n' }, { key: 's' }, { key: '-' },
      { key: 'enter', display: 'Enter ↵', flexClass: 'flex-[2.25]', isModifier: true }
    ],
    [
      { key: 'shift', display: 'Shift ⇧', flexClass: 'flex-[2.25]', isModifier: true },
      { key: ';' }, { key: 'q' }, { key: 'j' }, { key: 'k' }, { key: 'x' }, { key: 'b' },
      { key: 'm' }, { key: 'w' }, { key: 'v' }, { key: 'z' },
      { key: 'shift', display: 'Shift ⇧', flexClass: 'flex-[2.25]', isModifier: true }
    ],
    [
      { key: 'emoji', display: '😊 Emoji', flexClass: 'flex-[1.5]', isModifier: true },
      { key: 'space', display: 'Space Bar', flexClass: 'flex-[6]' },
      { key: 'left', display: '←', isModifier: true },
      { key: 'right', display: '→', isModifier: true }
    ]
  ],
  colemak: [
    [
      { key: '`' }, { key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' },
      { key: '6' }, { key: '7' }, { key: '8' }, { key: '9' }, { key: '0' }, { key: '-' },
      { key: '=' }, { key: 'backspace', display: '⌫ Backspace', flexClass: 'flex-[1.6]', isModifier: true }
    ],
    [
      { key: 'tab', display: 'Tab ↹', flexClass: 'flex-[1.4]', isModifier: true },
      { key: 'q' }, { key: 'w' }, { key: 'f' }, { key: 'p' }, { key: 'g' }, { key: 'j' },
      { key: 'l' }, { key: 'u' }, { key: 'y' }, { key: ';' }, { key: '[' }, { key: ']' }
    ],
    [
      { key: 'caps', display: 'Backspace', flexClass: 'flex-[1.75]', isModifier: true },
      { key: 'a' }, { key: 'r' }, { key: 's' }, { key: 't' }, { key: 'd' }, { key: 'h' },
      { key: 'n' }, { key: 'e' }, { key: 'i' }, { key: 'o' }, { key: "'" },
      { key: 'enter', display: 'Enter ↵', flexClass: 'flex-[2.25]', isModifier: true }
    ],
    [
      { key: 'shift', display: 'Shift ⇧', flexClass: 'flex-[2.25]', isModifier: true },
      { key: 'z' }, { key: 'x' }, { key: 'c' }, { key: 'v' }, { key: 'b' }, { key: 'k' },
      { key: 'm' }, { key: ',' }, { key: '.' }, { key: '/' },
      { key: 'shift', display: 'Shift ⇧', flexClass: 'flex-[2.25]', isModifier: true }
    ],
    [
      { key: 'emoji', display: '😊 Emoji', flexClass: 'flex-[1.5]', isModifier: true },
      { key: 'space', display: 'Space Bar', flexClass: 'flex-[6]' },
      { key: 'left', display: '←', isModifier: true },
      { key: 'right', display: '→', isModifier: true }
    ]
  ],
  numeric: [
    [
      { key: '7' }, { key: '8' }, { key: '9' }, { key: 'backspace', display: '⌫', isModifier: true }
    ],
    [
      { key: '4' }, { key: '5' }, { key: '6' }, { key: '+' }
    ],
    [
      { key: '1' }, { key: '2' }, { key: '3' }, { key: '-' }
    ],
    [
      { key: '0', flexClass: 'flex-[2]' }, { key: '.' }, { key: 'enter', display: '↵', isModifier: true }
    ]
  ]
};
