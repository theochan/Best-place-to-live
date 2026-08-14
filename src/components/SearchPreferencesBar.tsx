import React from 'react';
import { SearchIntent } from '../types';
import {
  Edit3,
  DollarSign,
  BedDouble,
  Clock,
  Train,
  GraduationCap,
  Volume2
} from 'lucide-react';

interface SearchPreferencesBarProps {
  query: string;
  intent: SearchIntent;
  onEditSearch: () => void;
}

export const SearchPreferencesBar: React.FC<SearchPreferencesBarProps> = ({
  query,
  intent,
  onEditSearch
}) => {
  const budgetFormatted = intent.housing.maxBudget
    ? intent.housing.mode === 'rent'
      ? `≤ $${intent.housing.maxBudget.toLocaleString()}/mo`
      : `≤ $${(intent.housing.maxBudget / 1000000).toFixed(1)}m`
    : 'Flexible';

  const bedroomsFormatted = intent.housing.bedrooms
    ? `≥ ${intent.housing.bedrooms}`
    : 'Any';

  const commuteFormatted = intent.workplaces?.[0]?.maxCommuteMinutes
    ? `≤ ${intent.workplaces[0].maxCommuteMinutes} min`
    : '≤ 45 min';

  const mrtPriorityFormatted = intent.transport.mrtImportance >= 4 ? 'High priority' : 'Normal';
  const schoolFormatted = intent.education.primarySchoolWithinMeters
    ? `within ${intent.education.primarySchoolWithinMeters / 1000}km`
    : intent.education.importance >= 4
    ? 'High priority'
    : 'Standard';

  const quietFormatted = intent.lifestyle.quietnessImportance >= 4 ? 'Preferred' : 'Neutral';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Your Search */}
        <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-200 pb-4 lg:pb-0 lg:pr-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Your search</h3>
            <button
              onClick={onEditSearch}
              id="btn-edit-search"
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit
            </button>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed italic line-clamp-3">
            "{query}"
          </p>
        </div>

        {/* Right Column: Key Preferences */}
        <div className="lg:col-span-7">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Key preferences
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs">
            {/* Budget */}
            <div className="flex items-center gap-2 text-slate-700">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="text-slate-500">Budget:</span>
              <span className="font-bold text-slate-900">{budgetFormatted}</span>
            </div>

            {/* Bedrooms */}
            <div className="flex items-center gap-2 text-slate-700">
              <BedDouble className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="text-slate-500">Bedrooms:</span>
              <span className="font-bold text-slate-900">{bedroomsFormatted}</span>
            </div>

            {/* Commute */}
            <div className="flex items-center gap-2 text-slate-700">
              <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="text-slate-500">Commute:</span>
              <span className="font-bold text-slate-900">{commuteFormatted}</span>
            </div>

            {/* MRT */}
            <div className="flex items-center gap-2 text-slate-700">
              <Train className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="text-slate-500">MRT:</span>
              <span className="font-bold text-slate-900">{mrtPriorityFormatted}</span>
            </div>

            {/* Primary school */}
            <div className="flex items-center gap-2 text-slate-700">
              <GraduationCap className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span className="text-slate-500">Primary school:</span>
              <span className="font-bold text-slate-900">{schoolFormatted}</span>
            </div>

            {/* Quiet area */}
            <div className="flex items-center gap-2 text-slate-700">
              <Volume2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="text-slate-500">Quiet area:</span>
              <span className="font-bold text-slate-900">{quietFormatted}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
