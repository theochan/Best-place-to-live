import React from 'react';
import { RankedNeighbourhood } from '../types';
import {
  Train,
  GraduationCap,
  Trees,
  DollarSign,
  Clock,
  Volume2,
  CheckCircle2
} from 'lucide-react';

interface KeyHighlightsProps {
  neighbourhood: RankedNeighbourhood;
}

export const KeyHighlights: React.FC<KeyHighlightsProps> = ({ neighbourhood }) => {
  const highlights = neighbourhood.keyHighlights || [];

  const getHighlightIcon = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes('mrt') || t.includes('station')) return <Train className="w-4 h-4 text-blue-600 shrink-0" />;
    if (t.includes('school') || t.includes('primary')) return <GraduationCap className="w-4 h-4 text-purple-600 shrink-0" />;
    if (t.includes('park') || t.includes('green') || t.includes('playground')) return <Trees className="w-4 h-4 text-emerald-600 shrink-0" />;
    if (t.includes('price') || t.includes('budget') || t.includes('$')) return <DollarSign className="w-4 h-4 text-emerald-700 shrink-0" />;
    if (t.includes('commute') || t.includes('min')) return <Clock className="w-4 h-4 text-sky-600 shrink-0" />;
    if (t.includes('quiet') || t.includes('serene')) return <Volume2 className="w-4 h-4 text-indigo-600 shrink-0" />;
    return <CheckCircle2 className="w-4 h-4 text-slate-600 shrink-0" />;
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
      <h4 className="font-bold text-slate-900 text-sm tracking-tight mb-4">
        Key highlights
      </h4>

      <ul className="space-y-3">
        {highlights.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
            <div className="mt-0.5">{getHighlightIcon(item)}</div>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
