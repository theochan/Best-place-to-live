import React from 'react';
import { X, Shield, Cpu, Calculator, CheckCircle2 } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-900">How WhereSG AI Works</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 leading-relaxed">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600" />
              1. Deterministic Multi-Factor Scoring
            </h3>
            <p>
              Unlike generative black-boxes, WhereSG AI uses deterministic mathematical models. Every neighbourhood is evaluated against 8 baseline weighted dimensions:
            </p>
            <div className="grid grid-cols-2 gap-2 mt-3 text-[11px]">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <strong>Affordability (25%)</strong>: Derived from official URA median private transactions and data.gov.sg HDB resale benchmarks.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <strong>Transport (20%)</strong>: LTA DataMall MRT density, rail connectivity lines, and bus infrastructure.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <strong>Your Commute (15%)</strong>: OneMap transit matrix calculation to your specified workplace destinations.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <strong>Schools (15%)</strong>: MOE primary school directory with 1km and 2km priority admission boundaries.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <strong>Family Amenities (10%)</strong>: Community clubs, hawker centres, and supermarkets.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <strong>Lifestyle & Parks (5%)</strong>: NParks park connectors and green spaces.
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-blue-600" />
              2. Strict Grounding with Gemini
            </h3>
            <p>
              Gemini AI is strictly constrained to synthesize explanations based ONLY on computed mathematical values. If an official data point is unavailable, the weight is normalized across available categories, and the system transparently indicates the source.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
