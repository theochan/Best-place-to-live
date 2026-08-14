import React from 'react';
import { RankedNeighbourhood } from '../types';
import { X, Trash2, ArrowRight, Scale, Bookmark } from 'lucide-react';

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedNeighbourhoods: RankedNeighbourhood[];
  onRemove: (id: string) => void;
  onSelect: (neighbourhood: RankedNeighbourhood) => void;
  onCompare: () => void;
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  isOpen,
  onClose,
  savedNeighbourhoods,
  onRemove,
  onSelect,
  onCompare
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-slate-700" />
            <h2 className="text-lg font-bold text-slate-900">Saved Neighbourhoods</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {savedNeighbourhoods.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-xs">
              No saved neighbourhoods yet. Click the "Save" button on any recommendation card to bookmark it here.
            </div>
          ) : (
            savedNeighbourhoods.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex items-center justify-between shadow-2xs"
              >
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                  <p className="text-[11px] text-slate-500">{item.matchTier} • Score: {item.overallScore}/100</p>
                  <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">{item.propertySnapshot.medianPriceText}</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      onSelect(item);
                      onClose();
                    }}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                    title="View details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {savedNeighbourhoods.length > 0 && (
          <div className="p-6 border-t border-slate-200 bg-slate-50">
            <button
              onClick={() => {
                onCompare();
                onClose();
              }}
              disabled={savedNeighbourhoods.length < 2}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <Scale className="w-4 h-4" />
              Compare Saved Neighbourhoods ({savedNeighbourhoods.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
