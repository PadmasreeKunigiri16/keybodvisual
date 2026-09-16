import React from 'react';
import { KeyConfig } from '../../data/keyboardLayouts';

interface KeyButtonProps {
  config: KeyConfig;
  isActive?: boolean;
  isCapsLock?: boolean;
  isShift?: boolean;
  onClick: (key: string) => void;
  heightPx?: number;
  fontSizePx?: number;
  shape?: 'rounded' | 'square' | 'pill';
  heatmapColor?: string;
  heatmapLabel?: string;
  isErrorKey?: boolean;
}

export const KeyButton: React.FC<KeyButtonProps> = ({
  config,
  isActive = false,
  isCapsLock = false,
  isShift = false,
  onClick,
  heightPx = 50,
  fontSizePx = 16,
  shape = 'rounded',
  heatmapColor,
  heatmapLabel,
  isErrorKey = false,
}) => {
  const { key, display, flexClass, isModifier } = config;

  let label = display || key;
  if (!isModifier && key.length === 1) {
    label = isCapsLock || isShift ? key.toUpperCase() : key.toLowerCase();
  }

  const roundedClasses = {
    rounded: 'rounded-lg sm:rounded-xl',
    square: 'rounded-none',
    pill: 'rounded-full',
  };

  const flexWidth = flexClass || 'flex-1';

  return (
    <button
      type="button"
      data-key={key}
      onClick={() => onClick(key)}
      style={{
        height: `${heightPx}px`,
        fontSize: `${fontSizePx}px`,
        backgroundColor: heatmapColor ? heatmapColor : undefined,
      }}
      className={`relative min-w-0 select-none flex flex-col items-center justify-center font-semibold transition-all duration-75 border ${flexWidth} ${roundedClasses[shape]} ${
        isActive
          ? 'bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-400 text-black border-amber-200 scale-[0.96] shadow-lg shadow-amber-500/70 z-10 font-black'
          : isErrorKey
          ? 'bg-rose-600/40 text-rose-200 border-rose-500/60'
          : isModifier
          ? 'bg-slate-900/90 text-amber-200 border-amber-500/30 hover:bg-amber-500/20 hover:text-white'
          : 'bg-slate-900/60 text-slate-100 border-slate-700/60 hover:bg-amber-500/10 hover:border-amber-500/40'
      } focus:outline-none focus:ring-2 focus:ring-amber-400`}
      aria-label={`Keyboard key ${label}`}
    >
      <span className="truncate px-0.5">{label}</span>
      {heatmapLabel && (
        <span className="text-[9px] font-mono text-amber-300 -mt-0.5">{heatmapLabel}</span>
      )}
    </button>
  );
};
