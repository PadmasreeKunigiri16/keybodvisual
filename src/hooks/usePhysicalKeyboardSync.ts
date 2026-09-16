import { useState, useEffect } from 'react';

export function usePhysicalKeyboardSync(onPhysicalKey?: (key: string, isShift: boolean) => void) {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [isShiftPressed, setIsShiftPressed] = useState<boolean>(false);
  const [isCapsLocked, setIsCapsLocked] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const rawKey = e.key.toLowerCase();
      setActiveKeys(prev => new Set(prev).add(rawKey));

      if (e.key === 'Shift') setIsShiftPressed(true);
      if (e.key === 'CapsLock') setIsCapsLocked(e.getModifierState('CapsLock'));

      // If typing inside native textarea/input, native input event handles character insertion.
      // We avoid duplicate keystroke insertion while maintaining physical key highlight.
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === 'textarea' || targetTag === 'input') {
        return;
      }

      if (onPhysicalKey) {
        onPhysicalKey(e.key, e.shiftKey || isCapsLocked);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const rawKey = e.key.toLowerCase();
      setActiveKeys(prev => {
        const next = new Set(prev);
        next.delete(rawKey);
        return next;
      });

      if (e.key === 'Shift') setIsShiftPressed(false);
      if (e.key === 'CapsLock') setIsCapsLocked(e.getModifierState('CapsLock'));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onPhysicalKey, isCapsLocked]);

  return {
    activeKeys,
    isShiftPressed,
    isCapsLocked,
  };
}
