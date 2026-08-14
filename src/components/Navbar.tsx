import React from 'react';
import { MapPin, Sparkles, Database, Scale, Bookmark, Info, HelpCircle } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'results' | 'data-sources';
  onNavigate: (view: 'landing' | 'results' | 'data-sources') => void;
  onOpenHowItWorks: () => void;
  onOpenCompare?: () => void;
  onOpenSaved?: () => void;
  savedCount?: number;
  hasResults?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenHowItWorks,
  onOpenCompare,
  onOpenSaved,
  savedCount = 0,
  hasResults = false
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm group-hover:bg-slate-800 transition-colors">
            <div className="relative">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-slate-900 tracking-tight">WhereSG AI</span>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                Official SG Data
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">Find the best place in Singapore for you.</p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {hasResults && (
            <button
              onClick={() => onNavigate('results')}
              id="nav-btn-results"
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                currentView === 'results'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Results
            </button>
          )}

          <button
            onClick={() => onNavigate('landing')}
            id="nav-btn-search"
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              currentView === 'landing'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Search
          </button>

          <button
            onClick={onOpenHowItWorks}
            id="nav-btn-how-it-works"
            className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors hidden md:inline-flex items-center gap-1"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            How it works
          </button>

          <button
            onClick={() => onNavigate('data-sources')}
            id="nav-btn-data-sources"
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'data-sources'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Database className="w-4 h-4 text-slate-400" />
            Data sources
          </button>

          {onOpenCompare && hasResults && (
            <button
              onClick={onOpenCompare}
              id="nav-btn-compare"
              className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Scale className="w-4 h-4 text-slate-400" />
              Compare
            </button>
          )}

          {onOpenSaved && (
            <button
              onClick={onOpenSaved}
              id="nav-btn-saved"
              className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Bookmark className="w-4 h-4 text-slate-400" />
              Saved
              {savedCount > 0 && (
                <span className="w-5 h-5 text-xs bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">
                  {savedCount}
                </span>
              )}
            </button>
          )}

          {/* User badge */}
          <div className="pl-2 border-l border-slate-200 ml-1">
            <div 
              title="Verified Singapore Resident Profile"
              className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-semibold text-xs flex items-center justify-center shadow-xs"
            >
              TC
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
