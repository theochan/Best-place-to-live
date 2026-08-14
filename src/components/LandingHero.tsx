import React from 'react';

export const LandingHero: React.FC = () => {
  return (
    <div className="relative pt-8 pb-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Headline */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-semibold text-slate-700 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Singapore Master Plan & Open Data Intelligence
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-4">
            Where should <br className="hidden sm:inline" />
            you live in Singapore?
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
            AI-powered insights from official government data to help you find the perfect neighbourhood that fits your lifestyle, budget, and commute.
          </p>
        </div>

        {/* Right Singapore Skyline Illustration matching wireframe */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-gradient-to-b from-slate-50/80 to-slate-100/40 p-4 rounded-2xl border border-slate-200/60 shadow-xs relative overflow-hidden">
            <svg
              viewBox="0 0 420 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto stroke-slate-400/80 text-slate-300"
            >
              {/* Skyline Art: Marina Bay Sands, Singapore Flyer, CBD Towers, Garden Supertrees */}
              <defs>
                <linearGradient id="skylineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Background fill */}
              <path
                d="M 10,160 L 40,160 L 40,120 L 70,120 L 70,100 L 95,100 L 95,140 L 120,140 L 120,80 L 150,80 L 150,130 L 180,130 L 180,95 L 205,95 L 205,160 L 410,160 Z"
                fill="url(#skylineGrad)"
              />

              {/* Singapore Flyer Wheel */}
              <circle cx="70" cy="95" r="32" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx="70" cy="95" r="4" fill="#94a3b8" />
              <line x1="70" y1="95" x2="70" y2="155" stroke="currentColor" strokeWidth="2" />
              <line x1="50" y1="155" x2="90" y2="155" stroke="currentColor" strokeWidth="2" />
              {/* Flyer Spokes */}
              <line x1="70" y1="63" x2="70" y2="127" stroke="currentColor" strokeWidth="1" opacity="0.6" />
              <line x1="38" y1="95" x2="102" y2="95" stroke="currentColor" strokeWidth="1" opacity="0.6" />
              <line x1="47" y1="72" x2="93" y2="118" stroke="currentColor" strokeWidth="1" opacity="0.6" />
              <line x1="47" y1="118" x2="93" y2="72" stroke="currentColor" strokeWidth="1" opacity="0.6" />

              {/* Marina Bay Sands 3 Towers + SkyPark */}
              {/* Tower 1 */}
              <path d="M 230,160 L 230,55 Q 235,50 240,55 L 240,160" stroke="#64748b" strokeWidth="1.8" fill="#f8fafc" />
              <line x1="235" y1="65" x2="235" y2="155" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 3" />

              {/* Tower 2 */}
              <path d="M 255,160 L 255,52 Q 260,48 265,52 L 265,160" stroke="#64748b" strokeWidth="1.8" fill="#f8fafc" />
              <line x1="260" y1="65" x2="260" y2="155" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 3" />

              {/* Tower 3 */}
              <path d="M 280,160 L 280,55 Q 285,50 290,55 L 290,160" stroke="#64748b" strokeWidth="1.8" fill="#f8fafc" />
              <line x1="285" y1="65" x2="285" y2="155" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 3" />

              {/* SkyPark Ship Cantilever Top */}
              <path
                d="M 215,48 C 240,46 295,46 315,50 C 318,51 315,55 305,56 L 225,56 C 218,56 212,52 215,48 Z"
                fill="#475569"
                stroke="#334155"
                strokeWidth="1.5"
              />

              {/* CBD Skyscrapers in background */}
              <rect x="130" y="85" width="22" height="75" stroke="#94a3b8" strokeWidth="1.5" fill="#f1f5f9" />
              <rect x="160" y="60" width="28" height="100" stroke="#64748b" strokeWidth="1.5" fill="#f8fafc" />
              {/* Window grid */}
              <line x1="166" y1="70" x2="166" y2="150" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="174" y1="70" x2="174" y2="150" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="182" y1="70" x2="182" y2="150" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />

              <rect x="195" y="75" width="20" height="85" stroke="#94a3b8" strokeWidth="1.5" fill="#f1f5f9" />

              {/* Supertree Grove */}
              {/* Supertree 1 */}
              <path d="M 330,160 L 335,115 C 325,105 325,95 337,90 C 349,95 349,105 339,115 L 344,160" stroke="#059669" strokeWidth="1.5" fill="#ecfdf5" />
              <path d="M 337,90 L 337,82" stroke="#059669" strokeWidth="1.5" />

              {/* Supertree 2 */}
              <path d="M 360,160 L 364,125 C 356,118 356,110 365,105 C 374,110 374,118 368,125 L 372,160" stroke="#059669" strokeWidth="1.5" fill="#ecfdf5" />

              {/* Base line */}
              <line x1="15" y1="160" x2="405" y2="160" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className="text-center mt-1">
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">
                Singapore Urban Planning Grid
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
