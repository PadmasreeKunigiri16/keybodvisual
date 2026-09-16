import React, { useState } from 'react';
import { Smile, Search, Copy, Check, Sparkles } from 'lucide-react';
import { Card } from '../components/Card';
import { EMOJI_CATEGORIES } from '../data/emojisData';

interface EmojiPageProps {
  onInsertEmoji: (emoji: string) => void;
}

export const EmojiPage: React.FC<EmojiPageProps> = ({ onInsertEmoji }) => {
  const [activeCategory, setActiveCategory] = useState<string>('emotions');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = (item: string) => {
    navigator.clipboard.writeText(item);
    setCopiedItem(item);
    setTimeout(() => setCopiedItem(null), 1500);
  };

  const currentCategoryObj = EMOJI_CATEGORIES.find(c => c.id === activeCategory);
  const itemsToDisplay = currentCategoryObj
    ? currentCategoryObj.items.filter(item => item.includes(searchQuery))
    : [];

  return (
    <div className="space-y-6 py-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Smile className="w-6 h-6 text-amber-400" />
            Emoji & Symbol Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse, copy, or insert emojis, kaomojis, and mathematical symbols directly into your keyboard workspace.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Filter symbols..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {EMOJI_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <Card>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
          {itemsToDisplay.map((item, idx) => (
            <div
              key={idx}
              className="group relative p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-400/50 hover:bg-slate-800/80 transition-all text-center flex flex-col items-center justify-center cursor-pointer"
              onClick={() => onInsertEmoji(item)}
            >
              <span className="text-2xl select-none">{item}</span>

              {/* Quick Copy Button overlay */}
              <button
                onClick={e => {
                  e.stopPropagation();
                  handleCopy(item);
                }}
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 p-1 rounded bg-slate-800 text-slate-300 hover:text-white transition-opacity"
                title="Copy to clipboard"
              >
                {copiedItem === item ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
