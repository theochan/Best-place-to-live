import React from 'react';
import { RankedNeighbourhood } from '../types';
import { ExternalLink, Info } from 'lucide-react';

interface ScoreBreakdownProps {
  neighbourhood: RankedNeighbourhood;
}

export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ neighbourhood }) => {
  const breakdown = neighbourhood.scoreBreakdown;

  const items = [
    breakdown.affordability,
    breakdown.transport,
    breakdown.commute,
    breakdown.schools,
    breakdown.familyAmenities,
    breakdown.lifestyle,
    breakdown.healthcare,
    breakdown.marketFundamentals
  ].filter(Boolean);

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-slate-900 text-sm tracking-tight">
          Score breakdown
        </h4>
        <span className="text-[11px] font-medium text-slate-400">
          Max: 100
        </span>
      </div>

      <div className="space-y-3.5">
        {items.map((item) => {
          // Color coding by score threshold
          const score = item.score;
          const barColor =
            score >= 90
              ? 'bg-blue-600'
              : score >= 80
              ? 'bg-blue-500'
              : score >= 70
              ? 'bg-sky-500'
              : 'bg-amber-500';

          return (
            <div key={item.id} className="text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-medium text-slate-700">{item.name}</span>
                <span className="font-bold text-slate-900">{score}</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                  style={{ width: `${score}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                <span className="truncate max-w-[200px]">Source: {item.source}</span>
                <span>Weight: {item.weight}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
