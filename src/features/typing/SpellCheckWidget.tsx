import React from 'react';
import { AlertCircle, PlusCircle, Check } from 'lucide-react';
import { SpellingCorrection } from '../../types';

interface SpellCheckWidgetProps {
  warning: SpellingCorrection | null;
  onAcceptCorrection: (word: string) => void;
  onAddToDictionary: (word: string) => void;
}

export const SpellCheckWidget: React.FC<SpellCheckWidgetProps> = ({
  warning,
  onAcceptCorrection,
  onAddToDictionary,
}) => {
  if (!warning || warning.suggestions.length === 0) return null;

  return (
    <div className="flex items-center justify-between gap-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl mb-3 text-xs">
      <div className="flex items-center gap-2 text-amber-300">
        <AlertCircle className="w-4 h-4 shrink-0" />
        <span>
          Spelling check for &quot;<strong className="underline">{warning.original}</strong>&quot; — did you mean:
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {warning.suggestions.map((sug, idx) => (
          <button
            key={idx}
            onClick={() => onAcceptCorrection(sug)}
            className="flex items-center gap-1 px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 rounded-lg transition-all font-semibold"
          >
            <Check className="w-3 h-3" />
            {sug}
          </button>
        ))}

        <button
          onClick={() => onAddToDictionary(warning.original)}
          className="flex items-center gap-1 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg transition-all"
        >
          <PlusCircle className="w-3 h-3" />
          Add to Dictionary
        </button>
      </div>
    </div>
  );
};
