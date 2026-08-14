import React, { useEffect, useState } from 'react';
import { ProviderStatus } from '../types';
import {
  Database,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Shield,
  Layers,
  ArrowLeft,
  RefreshCw
} from 'lucide-react';

interface DataSourcesPageProps {
  onBack: () => void;
}

export const DataSourcesPage: React.FC<DataSourcesPageProps> = ({ onBack }) => {
  const [providers, setProviders] = useState<ProviderStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProviders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/providers');
      const data = await res.json();
      if (data.providers) {
        setProviders(data.providers);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Official Data Sources & Transparency
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Live status and coverage of Singapore Government statutory data integrations
            </p>
          </div>
        </div>

        <button
          onClick={fetchProviders}
          disabled={isLoading}
          className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Philosophy Statement */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 mb-8 flex items-start gap-3 text-xs text-emerald-900">
        <Shield className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-emerald-900 text-sm mb-1">
            Deterministic Grounding & Zero-Hallucination Policy
          </h3>
          <p className="leading-relaxed">
            All livability scores, commute durations, and school proximity radiuses in WhereSG AI are computed deterministically using official government datasets. Gemini AI is used solely for natural-language intent parsing and synthesizing human explanations grounded strictly in the verified metrics.
          </p>
        </div>
      </div>

      {/* Provider Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {providers.map((p) => {
          const isOk = p.configured;

          return (
            <div
              key={p.name}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-base">{p.name}</h3>
                      {isOk ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Live
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          <AlertCircle className="w-3 h-3" /> Baseline Fallback
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{p.purpose}</p>
                    <span className="text-[11px] font-medium text-slate-400">{p.agency}</span>
                  </div>
                </div>

                <div className="mt-3 space-y-2 text-xs">
                  <div>
                    <span className="font-semibold text-slate-700 block text-[11px] uppercase tracking-wider mb-1">
                      Supported Metrics:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {p.metricsSupported?.map((m, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {p.limitations && (
                    <div className="pt-2">
                      <span className="font-semibold text-slate-600 block text-[11px] uppercase tracking-wider mb-1">
                        Limitations / Scope:
                      </span>
                      <p className="text-slate-500 text-[11px] leading-relaxed">
                        {p.limitations}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {p.documentationUrl && (
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Official Documentation</span>
                  <a
                    href={p.documentationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                  >
                    View Portal
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
