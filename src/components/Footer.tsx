import React from 'react';

interface FooterProps {
  onOpenDataSources?: () => void;
  onOpenHowItWorks?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDataSources, onOpenHowItWorks }) => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          <span className="font-semibold text-slate-700">WhereSG AI</span> — AI-powered Singapore home-location intelligence.
          <p className="text-[11px] text-slate-400 mt-0.5">© 2026 WhereSG AI. All official data belongs to respective Singapore Government statutory agencies.</p>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={onOpenHowItWorks}
            className="hover:text-slate-900 transition-colors"
          >
            How it works
          </button>
          <button 
            onClick={onOpenDataSources}
            className="hover:text-slate-900 transition-colors"
          >
            Data sources
          </button>
          <span className="text-slate-300">|</span>
          <span className="text-slate-400">Terms</span>
          <span className="text-slate-400">Privacy</span>
          <span className="text-slate-400">Contact</span>
        </div>
      </div>
    </footer>
  );
};
