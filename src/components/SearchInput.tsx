import React, { useState } from 'react';
import { Search, Sparkles, Shield, Users, Wallet, Trees, ArrowRight } from 'lucide-react';

interface SearchInputProps {
  initialValue?: string;
  onSearch: (prompt: string) => void;
  isLoading?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  initialValue = '',
  onSearch,
  isLoading = false
}) => {
  const [prompt, setPrompt] = useState(initialValue);

  const examplePrompts = [
    {
      id: 'young-couple',
      title: 'Young couple, close to CBD, condo under $1.5m',
      icon: Shield,
      text: 'Young couple looking for a 2-bedroom condo under $1.5m. We work near Raffles Place and Tanjong Pagar in the CBD, prefer being within 500m of an MRT station and close to gym/lifestyle amenities.'
    },
    {
      id: 'family-kids',
      title: 'Family with kids, near good schools and MRT',
      icon: Users,
      text: 'We are a family of four looking for a 3-bedroom condo under $1.8m. I work at MBFC and my wife works at Changi. We want to be near MRT, within 1km of a primary school, and near parks.'
    },
    {
      id: 'budget-rental',
      title: 'Budget rental under $3k, near business parks',
      icon: Wallet,
      text: 'Looking for a 2-bedroom or 3-bedroom rental under $3,500/month. Work at one-north / Changi Business Park, need direct public transport access and nearby hawker centres.'
    },
    {
      id: 'retiree',
      title: 'Retiree, quiet area, near parks and healthcare',
      icon: Trees,
      text: 'Retiree looking for a quiet, serene residential neighbourhood near regional parks, community polyclinics, and healthcare facilities with peaceful surroundings.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSearch(prompt.trim());
    }
  };

  const handleSelectExample = (text: string) => {
    setPrompt(text);
  };

  return (
    <div className="w-full my-6">
      {/* Main Search Box Card matching wireframe */}
      <form
        onSubmit={handleSubmit}
        id="search-form"
        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 transition-all focus-within:border-slate-400 focus-within:shadow-md"
      >
        <div className="flex items-center justify-between mb-3">
          <label 
            htmlFor="search-prompt-input"
            className="block text-sm font-semibold text-slate-800 tracking-tight"
          >
            Describe what you're looking for
          </label>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Natural language analysis
          </span>
        </div>

        <div className="relative">
          <textarea
            id="search-prompt-input"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
            placeholder="Example: We are a family of four looking for a 3-bedroom condo under $1.8m. I work at MBFC and my wife works at Changi. We want to be near MRT, within 1km of a primary school, and near parks."
            className="w-full px-4 py-3.5 text-slate-800 text-base placeholder:text-slate-400 bg-slate-50/70 rounded-xl border border-slate-200/90 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 resize-none transition-all"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-2">
          <div className="text-xs text-slate-500 flex items-center gap-1.5 self-start sm:self-center">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Ranked deterministically using official URA, LTA & OneMap data
          </div>

          <button
            type="submit"
            id="search-submit-btn"
            disabled={!prompt.trim() || isLoading}
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-semibold text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Analyzing Singapore data...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Search</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Example Prompt Chips Section matching wireframe */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Try example prompts:
          </span>
          <span className="text-xs text-slate-400">Click to fill</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {examplePrompts.map((example) => {
            const Icon = example.icon;
            return (
              <button
                key={example.id}
                type="button"
                id={`example-prompt-${example.id}`}
                onClick={() => handleSelectExample(example.text)}
                className="text-left p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/80 hover:border-slate-300 transition-all flex items-start gap-3 group shadow-2xs cursor-pointer"
              >
                <div className="p-2 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-800 group-hover:text-slate-900 line-clamp-2 leading-snug">
                    {example.title}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
