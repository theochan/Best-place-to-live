import React from 'react';
import { RankedNeighbourhood } from '../types';
import { X, Check, Star } from 'lucide-react';

interface CompareModalProps {
  neighbourhoods: RankedNeighbourhood[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveNeighbourhood: (id: string) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  neighbourhoods,
  isOpen,
  onClose,
  onRemoveNeighbourhood
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Compare Neighbourhoods</h2>
            <p className="text-xs text-slate-500">Side-by-side benchmark across key livability dimensions</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="p-6 overflow-x-auto">
          {neighbourhoods.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No neighbourhoods selected for comparison. Click "Compare" on any neighbourhood card to add.
            </div>
          ) : (
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 px-4 font-semibold text-slate-500 w-44">Metric</th>
                  {neighbourhoods.map((n) => (
                    <th key={n.id} className="py-3 px-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-slate-900 text-sm">{n.name}</span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-extrabold mt-1">
                          {n.overallScore}/100
                        </span>
                        <button
                          onClick={() => onRemoveNeighbourhood(n.id)}
                          className="text-[10px] text-slate-400 hover:text-rose-600 mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-700">Match Tier</td>
                  {neighbourhoods.map((n) => (
                    <td key={n.id} className="py-3 px-4 text-center font-semibold text-slate-800">
                      {n.matchTier}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-700">Affordability Score</td>
                  {neighbourhoods.map((n) => (
                    <td key={n.id} className="py-3 px-4 text-center font-bold text-slate-900">
                      {n.scoreBreakdown.affordability?.score}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-700">Transport Score</td>
                  {neighbourhoods.map((n) => (
                    <td key={n.id} className="py-3 px-4 text-center font-bold text-slate-900">
                      {n.scoreBreakdown.transport?.score}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-700">Commute Score</td>
                  {neighbourhoods.map((n) => (
                    <td key={n.id} className="py-3 px-4 text-center font-bold text-slate-900">
                      {n.scoreBreakdown.commute?.score}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-700">Schools Score</td>
                  {neighbourhoods.map((n) => (
                    <td key={n.id} className="py-3 px-4 text-center font-bold text-slate-900">
                      {n.scoreBreakdown.schools?.score}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-700">Median Price</td>
                  {neighbourhoods.map((n) => (
                    <td key={n.id} className="py-3 px-4 text-center font-semibold text-slate-900">
                      {n.propertySnapshot.medianPriceText}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-700">Average PSF</td>
                  {neighbourhoods.map((n) => (
                    <td key={n.id} className="py-3 px-4 text-center text-slate-700">
                      {n.propertySnapshot.avgPsfText}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-700">MRT Stations in Zone</td>
                  {neighbourhoods.map((n) => (
                    <td key={n.id} className="py-3 px-4 text-center text-slate-700">
                      {n.amenityCounts.mrtStations1km}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-700">Primary Schools (&lt;1km)</td>
                  {neighbourhoods.map((n) => (
                    <td key={n.id} className="py-3 px-4 text-center text-slate-700">
                      {n.amenityCounts.primarySchools1km}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
