import React from 'react';
import { Keyboard, Zap } from 'lucide-react';
import { ActivePage } from './Navbar';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  return (
    <footer className="bg-[#050507] border-t border-amber-500/20 mt-20 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-black font-bold">
                <Keyboard className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold text-amber-300">VKey Platform</span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              A smart, accessible typing assistant and typing practice platform designed to make typing visual, measurable, and customizable.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-3">Core Features</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActivePage('keyboard')} className="hover:text-amber-400 transition-colors">
                  Virtual Keyboard
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('practice')} className="hover:text-amber-400 transition-colors">
                  Practice Mode
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('analytics')} className="hover:text-amber-400 transition-colors">
                  Typing Analytics & Heatmap
                </button>
              </li>
            </ul>
          </div>

          {/* Accessibility & Customization */}
          <div>
            <h4 className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-3">Accessibility & Design</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActivePage('accessibility')} className="hover:text-amber-400 transition-colors">
                  Accessibility Center
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('customization')} className="hover:text-amber-400 transition-colors">
                  Customization Studio
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('emoji')} className="hover:text-amber-400 transition-colors">
                  Emoji & Kaomoji Center
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} VKey. Built with React & TypeScript.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Powered by Local Browser Storage</span>
            <Zap className="w-3.5 h-3.5 text-amber-400 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
