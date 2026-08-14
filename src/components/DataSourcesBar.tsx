import React from 'react';
import { Database, ExternalLink } from 'lucide-react';

interface DataSourcesBarProps {
  onOpenDataSources?: () => void;
}

export const DataSourcesBar: React.FC<DataSourcesBarProps> = ({ onOpenDataSources }) => {
  const sources = [
    {
      name: 'data.gov.sg',
      agency: 'Open Government Products',
      tag: 'HDB & Open Data'
    },
    {
      name: 'SingStat',
      agency: 'Dept of Statistics',
      tag: 'Demographics & Census'
    },
    {
      name: 'LTA DataMall',
      agency: 'Land Transport Authority',
      tag: 'MRT & Bus Transit'
    },
    {
      name: 'OneMap',
      agency: 'Singapore Land Authority',
      tag: 'Geocoding & Basemaps'
    },
    {
      name: 'MAS',
      agency: 'Monetary Authority of SG',
      tag: 'SORA & Interest Rates'
    },
    {
      name: 'URA',
      agency: 'Urban Redevelopment Authority',
      tag: 'Private Resi & Master Plan'
    }
  ];

  return (
    <div className="my-10 pt-6 pb-4 border-t border-slate-200/80">
      <div className="flex flex-col items-center justify-center text-center mb-6">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
          <Database className="w-3.5 h-3.5 text-slate-400" />
          Trusted Official Singapore Data Sources
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {sources.map((src) => (
          <div
            key={src.name}
            onClick={onOpenDataSources}
            className="p-3 bg-slate-50/80 hover:bg-slate-100/80 rounded-xl border border-slate-200/80 text-center transition-colors cursor-pointer group"
          >
            <div className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-slate-900">
              {src.name}
            </div>
            <div className="text-[11px] font-medium text-slate-500 line-clamp-1 mt-0.5">
              {src.agency}
            </div>
            <div className="mt-1.5 inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
              {src.tag}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
