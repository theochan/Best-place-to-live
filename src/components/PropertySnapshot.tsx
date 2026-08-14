import React from 'react';
import { RankedNeighbourhood } from '../types';
import { Building2, ExternalLink, TrendingUp } from 'lucide-react';

interface PropertySnapshotProps {
  neighbourhood: RankedNeighbourhood;
}

export const PropertySnapshot: React.FC<PropertySnapshotProps> = ({ neighbourhood }) => {
  const snap = neighbourhood.propertySnapshot;

  const handleSearchPropertyPortals = () => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(
      `Singapore ${neighbourhood.name} condo 3 bedroom for sale URA transaction`
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-slate-900 text-sm tracking-tight flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-slate-500" />
            Property snapshot
          </h4>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
            URA Index
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Median price (3BR+ condo)</span>
            <span className="font-bold text-slate-900">{snap.medianPriceText}</span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Avg PSF (3BR+ condo)</span>
            <span className="font-bold text-slate-900">{snap.avgPsfText}</span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Rental (3BR+ condo)</span>
            <span className="font-bold text-slate-900">{snap.rentalText}</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-500">Supply pipeline</span>
            <span className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
              snap.supplyPipeline === 'Moderate'
                ? 'bg-blue-50 text-blue-700'
                : snap.supplyPipeline === 'Low'
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-amber-50 text-amber-700'
            }`}>
              {snap.supplyPipeline}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={handleSearchPropertyPortals}
          className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>View properties in {neighbourhood.name}</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>
    </div>
  );
};
