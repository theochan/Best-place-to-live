import React from 'react';
import { ShieldCheck, Brain, UserCheck, BookmarkCheck } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      id: 'official-data',
      title: 'Official & Reliable Data',
      description: 'Powered by official gov.sg APIs: URA, LTA DataMall, OneMap, SingStat, MAS and more.',
      icon: ShieldCheck,
      iconBg: 'bg-emerald-50 text-emerald-700'
    },
    {
      id: 'ai-insights',
      title: 'AI-Powered Insights',
      description: 'Advanced analysis finds the best places based on what matters to your lifestyle and budget.',
      icon: Brain,
      iconBg: 'bg-blue-50 text-blue-700'
    },
    {
      id: 'personalised-results',
      title: 'Personalised Results',
      description: 'Ranked recommendations with multi-factor scores and evidence-backed explanations.',
      icon: UserCheck,
      iconBg: 'bg-indigo-50 text-indigo-700'
    },
    {
      id: 'save-compare',
      title: 'Save & Compare',
      description: 'Save your top searches and compare neighbourhoods side-by-side easily.',
      icon: BookmarkCheck,
      iconBg: 'bg-amber-50 text-amber-700'
    }
  ];

  return (
    <section className="my-10 pt-4 border-t border-slate-200/70">
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Why use WhereSG AI?
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
          Built on official Singapore datasets, deterministic mathematics, and clear transparency.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              id={`feature-card-${item.id}`}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow flex flex-col items-center text-center group"
            >
              <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center mb-4 transition-transform group-hover:scale-105`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
