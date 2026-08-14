import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export const LoadingSteps: React.FC = () => {
  const steps = [
    'Understanding your requirements with Gemini',
    'Resolving workplaces via OneMap Geocoding',
    'Checking property market & URA benchmarks',
    'Analysing LTA transport connectivity',
    'Checking nearby schools, parks & amenities',
    'Calculating commute times and route matrix',
    'Applying hard constraints and deterministic scoring',
    'Preparing evidence-backed recommendations'
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 450);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="my-12 max-w-lg mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-base">Analyzing Singapore Datasets</h3>
          <p className="text-xs text-slate-500">Querying official government APIs in real-time...</p>
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const isPending = idx > currentStepIndex;

          return (
            <div
              key={step}
              className={`flex items-center gap-3 text-xs sm:text-sm transition-all duration-300 ${
                isDone
                  ? 'text-slate-800 font-medium'
                  : isCurrent
                  ? 'text-emerald-700 font-semibold'
                  : 'text-slate-400'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-emerald-600 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-200 shrink-0"></div>
              )}
              <span>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
