import React, { useState, useRef } from 'react';
import { KEYBOARD_LAYOUTS } from '../../data/keyboardLayouts';
import { KeyButton } from './KeyButton';
import { CustomizationSettings, AccessibilitySettings } from '../../types';

interface VirtualKeyboardProps {
  onKeyInput: (key: string) => void;
  activeKeys?: Set<string>;
  isShiftPressed?: boolean;
  isCapsLocked?: boolean;
  customization: CustomizationSettings;
  accessibility: AccessibilitySettings;
  onToggleEmoji?: () => void;
  heatmapData?: { usage: Record<string, number>; errors: Record<string, number> };
  heatmapMode?: 'none' | 'usage' | 'errors';
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  onKeyInput,
  activeKeys = new Set(),
  isShiftPressed = false,
  isCapsLocked = false,
  customization,
  accessibility,
  onToggleEmoji,
  heatmapData,
  heatmapMode = 'none',
}) => {
  const [internalCaps, setInternalCaps] = useState<boolean>(false);
  const [internalShift, setInternalShift] = useState<boolean>(false);
  const [swipePath, setSwipePath] = useState<string>('');

  const isMouseDown = useRef<boolean>(false);
  const currentSwipeWord = useRef<string>('');

  const activeShift = isShiftPressed || internalShift;
  const activeCaps = isCapsLocked || internalCaps;

  const layoutGrid = KEYBOARD_LAYOUTS[customization.layout] || KEYBOARD_LAYOUTS.qwerty;

  const handleKeyClick = (keyVal: string) => {
    if (keyVal === 'caps') {
      setInternalCaps(prev => !prev);
      return;
    }
    if (keyVal === 'shift') {
      setInternalShift(prev => !prev);
      return;
    }
    if (keyVal === 'emoji') {
      if (onToggleEmoji) onToggleEmoji();
      return;
    }

    onKeyInput(keyVal);

    if (internalShift) {
      setInternalShift(false);
    }
  };

  // Swipe-to-Type Gesture Logic
  const handleMouseDown = () => {
    isMouseDown.current = true;
    currentSwipeWord.current = '';
    setSwipePath('');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown.current) return;
    const target = document.elementFromPoint(e.clientX, e.clientY);
    if (target && target.hasAttribute('data-key')) {
      const keyVal = target.getAttribute('data-key') || '';
      if (keyVal.length === 1 && /[a-z]/i.test(keyVal)) {
        const lastChar = currentSwipeWord.current.slice(-1);
        if (lastChar !== keyVal.toLowerCase()) {
          currentSwipeWord.current += keyVal.toLowerCase();
          setSwipePath(currentSwipeWord.current);
        }
      }
    }
  };

  const handleMouseUp = () => {
    if (isMouseDown.current) {
      isMouseDown.current = false;
      if (currentSwipeWord.current.length >= 2) {
        for (const char of currentSwipeWord.current) {
          onKeyInput(char);
        }
        onKeyInput('space');
      }
      currentSwipeWord.current = '';
      setSwipePath('');
    }
  };

  const alignmentClass =
    accessibility.oneHandMode === 'left'
      ? 'max-w-2xl mr-auto'
      : accessibility.oneHandMode === 'right'
      ? 'max-w-2xl ml-auto'
      : 'max-w-5xl mx-auto';

  const getHeatmapDetails = (key: string) => {
    if (heatmapMode === 'none' || !heatmapData) return { color: undefined, label: undefined };

    if (heatmapMode === 'usage') {
      const count = heatmapData.usage[key.toLowerCase()] || 0;
      if (count === 0) return { color: undefined, label: undefined };
      const opacity = Math.min(0.9, 0.2 + (count / 30) * 0.7);
      return {
        color: `rgba(20, 184, 166, ${opacity})`,
        label: `${count}x`,
      };
    }

    if (heatmapMode === 'errors') {
      const count = heatmapData.errors[key.toLowerCase()] || 0;
      if (count === 0) return { color: undefined, label: undefined };
      const opacity = Math.min(0.9, 0.2 + (count / 10) * 0.7);
      return {
        color: `rgba(244, 63, 94, ${opacity})`,
        label: `${count}err`,
      };
    }

    return { color: undefined, label: undefined };
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={`glass-panel p-3 sm:p-5 rounded-2xl border border-slate-700/80 shadow-2xl transition-all ${alignmentClass} w-full overflow-x-auto`}
    >
      {/* Active Swipe Indicator */}
      {swipePath && (
        <div className="mb-2 text-center text-xs font-mono text-teal-400 bg-teal-500/10 py-1 px-3 rounded-full border border-teal-500/30 animate-pulse">
          Swiping: <span className="font-bold uppercase">{swipePath}</span>
        </div>
      )}

      {/* Keyboard Grid - Neat Flex Rows */}
      <div
        className="flex flex-col w-full"
        style={{ gap: `${customization.keySpacingPx}px` }}
      >
        {layoutGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-row w-full gap-1 sm:gap-1.5 justify-center">
            {row.map((keyConfig, keyIndex) => {
              const keyLower = keyConfig.key.toLowerCase();
              const isKeyActive =
                activeKeys.has(keyLower) ||
                (keyConfig.key === 'shift' && activeShift) ||
                (keyConfig.key === 'caps' && activeCaps);

              const { color: heatmapColor, label: heatmapLabel } = getHeatmapDetails(keyConfig.key);

              return (
                <KeyButton
                  key={`${rowIndex}-${keyIndex}`}
                  config={keyConfig}
                  isActive={isKeyActive}
                  isCapsLock={activeCaps}
                  isShift={activeShift}
                  onClick={handleKeyClick}
                  heightPx={accessibility.largeKeys ? customization.keyHeightPx + 12 : customization.keyHeightPx}
                  fontSizePx={customization.fontSizePx}
                  shape={customization.keyShape}
                  heatmapColor={heatmapColor}
                  heatmapLabel={heatmapLabel}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
