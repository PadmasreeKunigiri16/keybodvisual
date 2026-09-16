import React from 'react';
import { Sparkles } from 'lucide-react';
import { SmartSuggestion } from '../../types';

interface SuggestionBarProps {
  suggestions: SmartSuggestion[];
  onSelectSuggestion: (word: string) => void;
}

export const SuggestionBar: React.FC<SuggestionBarProps> = ({
  suggestions,
  onSelectSuggestion,
}) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2 px-3 bg-slate-900/80 rounded-xl border border-teal-500/30 mb-3 shadow-inner">
      <div className="flex items-center gap-1 text-xs font-semibold text-teal-400 shrink-0 pr-2 border-r border-slate-700">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Suggestions:</span>
      </div>

      <div className="flex items-center gap-2">
        {suggestions.map((sug, idx) => (
          <button
            key={idx}
            onClick={() => onSelectSuggestion(sug.word)}
            className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-slate-800 text-teal-300 hover:bg-teal-500/20 border border-teal-500/20 hover:border-teal-500/50 rounded-lg transition-all"
          >
            <span>{sug.word}</span>
            {sug.isCustom && <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1 rounded">Custom</span>}
            <span className="text-[10px] text-slate-500 ml-1">Tab ↹</span>
          </button>
        ))}
      </div>
    </div>
  );
};
