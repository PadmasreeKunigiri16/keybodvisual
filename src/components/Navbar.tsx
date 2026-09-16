import React, { useState } from 'react';
import {
  Keyboard,
  BarChart3,
  BookOpen,
  Eye,
  Sliders,
  ShieldCheck,
  Smile,
  Home,
  Menu,
  X,
} from 'lucide-react';
import { Button } from './Button';

export type ActivePage =
  | 'landing'
  | 'dashboard'
  | 'keyboard'
  | 'practice'
  | 'analytics'
  | 'accessibility'
  | 'customization'
  | 'privacy'
  | 'emoji';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActivePage; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-4 h-4" /> },
    { id: 'keyboard', label: 'Keyboard', icon: <Keyboard className="w-4 h-4" /> },
    { id: 'practice', label: 'Practice', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'accessibility', label: 'Accessibility', icon: <Eye className="w-4 h-4" /> },
    { id: 'customization', label: 'Customize', icon: <Sliders className="w-4 h-4" /> },
    { id: 'emoji', label: 'Emoji Center', icon: <Smile className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0c]/95 backdrop-blur-md border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo - VKey Gold */}
          <button
            onClick={() => setActivePage('landing')}
            className="flex items-center gap-2.5 shrink-0 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg p-1 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform">
              <Keyboard className="w-5 h-5 text-black font-bold" />
            </div>
            <div className="flex items-baseline gap-1.5 whitespace-nowrap">
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                VKey
              </span>
              <span className="text-xs font-semibold text-amber-400/90 tracking-widest uppercase">
                Platform
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map(item => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-amber-300 hover:bg-amber-500/10'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Controls Right */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {activePage !== 'keyboard' && (
              <Button
                variant="primary"
                size="sm"
                icon={<Keyboard className="w-3.5 h-3.5" />}
                onClick={() => setActivePage('keyboard')}
              >
                Open Keyboard
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-amber-400 hover:text-white hover:bg-slate-800"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0a0a0c] border-b border-amber-500/30 px-4 pt-2 pb-4 space-y-1">
          {navItems.map(item => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 font-bold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
