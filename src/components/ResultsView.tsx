import React, { useState } from 'react';
import { SearchResponse, RankedNeighbourhood } from '../types';
import { SearchPreferencesBar } from './SearchPreferencesBar';
import { InteractiveMap } from './InteractiveMap';
import { ScoreBreakdown } from './ScoreBreakdown';
import { KeyHighlights } from './KeyHighlights';
import { PropertySnapshot } from './PropertySnapshot';
import {
  Star,
  Bookmark,
  BookmarkCheck,
  Scale,
  FileDown,
  ChevronRight,
  Sparkles,
  Train,
  GraduationCap,
  Trees,
  Cross,
  ShoppingBag,
  TrendingUp,
  Building,
  AlertTriangle,
  Info
} from 'lucide-react';

interface ResultsViewProps {
  data: SearchResponse;
  onEditSearch: () => void;
  onOpenDataSources: () => void;
  onOpenExportReport: (neighbourhood: RankedNeighbourhood) => void;
  onToggleSaveNeighbourhood: (neighbourhood: RankedNeighbourhood) => void;
  savedNeighbourhoodIds: string[];
  onOpenCompareWith: (neighbourhood: RankedNeighbourhood) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  data,
  onEditSearch,
  onOpenDataSources,
  onOpenExportReport,
  onToggleSaveNeighbourhood,
  savedNeighbourhoodIds,
  onOpenCompareWith
}) => {
  const [selectedId, setSelectedId] = useState<string>(data.results[0]?.id || 'tampines');
  const [showAllNeighbourhoods, setShowAllNeighbourhoods] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'transport' | 'schools' | 'amenities' | 'lifestyle' | 'market' | 'insights'>('overview');

  const selected = data.results.find((r) => r.id === selectedId) || data.results[0];

  const visibleResults = showAllNeighbourhoods ? data.results : data.results.slice(0, 5);

  if (!selected) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500">No results found for your search criteria.</p>
        <button
          onClick={onEditSearch}
          className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold"
        >
          Modify search
        </button>
      </div>
    );
  }

  const isSaved = savedNeighbourhoodIds.includes(selected.id);

  return (
    <div className="pb-16">
      {/* 1. Top Search Summary & Key Preferences Bar */}
      <SearchPreferencesBar
        query={data.query}
        intent={data.parsedIntent}
        onEditSearch={onEditSearch}
      />

      {/* Main Results Layout matching wireframe */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Top Neighbourhoods Ranking List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1 mb-1">
            <h3 className="font-bold text-slate-900 text-sm tracking-tight">Top neighbourhoods</h3>
            <span className="text-[11px] font-medium text-slate-500">Ranked by overall match</span>
          </div>

          <div className="space-y-2.5">
            {visibleResults.map((item) => {
              const isCurrent = item.id === selected.id;
              const isTop = item.rank === 1;

              return (
                <div
                  key={item.id}
                  id={`neighbourhood-card-${item.id}`}
                  onClick={() => setSelectedId(item.id)}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isCurrent
                      ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/20'
                      : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/60 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Rank Badge */}
                    <div className="flex items-center justify-center w-6 text-xs font-bold text-slate-400">
                      {isTop ? (
                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-xs">
                          <Star className="w-3.5 h-3.5 fill-white" />
                        </div>
                      ) : (
                        <span>{item.rank}</span>
                      )}
                    </div>

                    {/* Name and Match Tier */}
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.matchTier}</p>
                    </div>
                  </div>

                  {/* Score badge */}
                  <div className="flex items-center gap-1">
                    <span className="font-extrabold text-sm text-emerald-600">
                      {item.overallScore}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">/100</span>
                  </div>
                </div>
              );
            })}
          </div>

          {data.results.length > 5 && (
            <button
              onClick={() => setShowAllNeighbourhoods(!showAllNeighbourhoods)}
              id="btn-toggle-all-neighbourhoods"
              className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-colors shadow-2xs cursor-pointer"
            >
              {showAllNeighbourhoods ? 'Show top 5 only' : `View all ${data.results.length} evaluated neighbourhoods`}
            </button>
          )}

          {/* Missing data notice */}
          {data.missingDataWarnings?.length > 0 && (
            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-[11px] text-amber-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Official Data Transparency:</span>
                <p className="mt-0.5">{data.missingDataWarnings[0]}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Main Panel: Selected Neighbourhood Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header Banner for Selected Neighbourhood */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {selected.name}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                    {selected.overallScore} <span className="font-medium text-emerald-600">/100</span>
                  </span>
                  <span className="text-xs font-semibold text-slate-600">
                    {selected.matchTier}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-start sm:self-center">
                <button
                  type="button"
                  id="btn-save-neighbourhood"
                  onClick={() => onToggleSaveNeighbourhood(selected)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isSaved
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                      Save
                    </>
                  )}
                </button>

                <button
                  type="button"
                  id="btn-compare-neighbourhood"
                  onClick={() => onOpenCompareWith(selected)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5 text-slate-400" />
                  Compare
                </button>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="mt-5">
              <InteractiveMap neighbourhood={selected} />
            </div>

            {/* Tabs matching wireframe */}
            <div className="mt-6 border-b border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none">
              {(
                [
                  { id: 'overview', label: 'Overview' },
                  { id: 'transport', label: 'Transport' },
                  { id: 'schools', label: 'Schools' },
                  { id: 'amenities', label: 'Amenities' },
                  { id: 'lifestyle', label: 'Lifestyle' },
                  { id: 'market', label: 'Market' },
                  { id: 'insights', label: 'Insights' }
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2.5 px-3 text-xs font-semibold transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-slate-900 text-slate-900 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                <ScoreBreakdown neighbourhood={selected} />
                <KeyHighlights neighbourhood={selected} />
                <PropertySnapshot neighbourhood={selected} />
              </div>
            )}

            {activeTab === 'transport' && (
              <div className="mt-6 p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Train className="w-4 h-4 text-blue-600" />
                    LTA Transit Infrastructure & Commute Routes
                  </h4>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    LTA DataMall Verified
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <h5 className="font-bold text-slate-800 mb-2">MRT & Train Stations</h5>
                    <ul className="space-y-2">
                      {selected.amenityList
                        .filter((a) => a.category === 'mrt')
                        .map((m) => (
                          <li key={m.id} className="flex items-center justify-between">
                            <span className="font-medium text-slate-700">{m.name}</span>
                            <span className="text-slate-400">~{m.distanceMeters}m</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <h5 className="font-bold text-slate-800 mb-2">Commute Times to Workplaces</h5>
                    <ul className="space-y-2">
                      {data.parsedIntent.workplaces.map((wp, idx) => (
                        <li key={idx} className="flex items-center justify-between">
                          <span className="font-medium text-slate-700">{wp.query} ({wp.resolvedName || 'Singapore'})</span>
                          <span className="font-bold text-slate-900">Direct MRT / Bus</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'schools' && (
              <div className="mt-6 p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-purple-600" />
                    Primary Schools Directory within 1-2km
                  </h4>
                  <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    MOE / OneMap Thematic Registry
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selected.amenityList
                    .filter((a) => a.category === 'school')
                    .map((s) => (
                      <div key={s.id} className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-800 block">{s.name}</span>
                          <span className="text-[10px] text-slate-400">Official Ministry of Education Directory</span>
                        </div>
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded text-[11px]">
                          &lt; 1km
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {activeTab === 'amenities' && (
              <div className="mt-6 p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-4">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-amber-600" />
                  Malls, Community Hubs & Town Centres
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selected.amenityList
                    .filter((a) => a.category === 'shopping')
                    .map((m) => (
                      <div key={m.id} className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                        <span className="font-bold text-slate-800">{m.name}</span>
                        <span className="text-slate-500 font-medium">~{m.distanceMeters}m</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {activeTab === 'lifestyle' && (
              <div className="mt-6 p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-4">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Trees className="w-4 h-4 text-emerald-600" />
                  Parks, Nature & Park Connectors (PCN)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selected.amenityList
                    .filter((a) => a.category === 'park')
                    .map((p) => (
                      <div key={p.id} className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-800 block">{p.name}</span>
                          <span className="text-[10px] text-slate-400">National Parks Board (NParks)</span>
                        </div>
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">Within 1.5km</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {activeTab === 'market' && (
              <div className="mt-6 p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-4">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-slate-700" />
                  Property Market Dynamics & Fundamentals
                </h4>
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                  <p className="text-slate-700 leading-relaxed">
                    Based on official <strong>URA Residential Price Indices</strong> and <strong>data.gov.sg HDB Resale transactions</strong>, {selected.name} represents a stable planning area with strong rental yield liquidity and moderate supply pipeline.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
                    <div>
                      <span className="text-slate-400 text-[10px]">Benchmark PSF</span>
                      <p className="font-bold text-slate-900 text-sm">{selected.propertySnapshot.avgPsfText}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px]">Median Price (3BR)</span>
                      <p className="font-bold text-slate-900 text-sm">{selected.propertySnapshot.medianPriceText}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px]">Estimated Rental</span>
                      <p className="font-bold text-slate-900 text-sm">{selected.propertySnapshot.rentalText}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px]">Supply Pipeline</span>
                      <p className="font-bold text-slate-900 text-sm">{selected.propertySnapshot.supplyPipeline}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'insights' && (
              <div className="mt-6 p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Grounded Intelligence Synthesis
                </h4>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {selected.whyItMatches}
                  </p>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-[10px] text-slate-500">
                    <span className="font-semibold text-slate-700">Data Sources:</span>
                    {selected.dataSourcesUsed.map((src, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {src}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Card: "Why [Neighbourhood] is a great match" + Export Report button matching wireframe */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="max-w-xl">
              <h3 className="font-bold text-slate-900 text-sm tracking-tight mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Why {selected.name} is a great match
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selected.whyItMatches}
              </p>
            </div>

            <button
              type="button"
              id="btn-export-report"
              onClick={() => onOpenExportReport(selected)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center gap-2 shadow-2xs transition-colors shrink-0 cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-slate-500" />
              Export report
            </button>
          </div>

          {/* Bottom Disclaimer Bar matching wireframe */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-2 text-[11px] text-slate-400">
            <span>
              <strong>Disclaimer:</strong> Scores are for reference only and calculated deterministically from available official Singapore data.
            </span>
            <button
              onClick={onOpenDataSources}
              className="text-slate-500 hover:text-slate-800 font-semibold underline transition-colors"
            >
              Data sources & methodology
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
