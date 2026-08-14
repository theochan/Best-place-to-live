import React, { useState } from 'react';
import { RankedNeighbourhood } from '../types';
import { X, FileDown, Copy, Check, Printer } from 'lucide-react';

interface ExportReportModalProps {
  neighbourhood: RankedNeighbourhood;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  neighbourhood,
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const reportText = `WhereSG AI - Neighbourhood Intelligence Report
==================================================
Target Area: ${neighbourhood.name}, Singapore (${neighbourhood.region} Region)
Overall Livability Score: ${neighbourhood.overallScore}/100 (${neighbourhood.matchTier})
Generated: ${new Date().toLocaleDateString('en-SG')}

1. Executive Summary & Why It Matches:
--------------------------------------
${neighbourhood.whyItMatches}

2. Deterministic Score Breakdown:
---------------------------------
- Affordability: ${neighbourhood.scoreBreakdown.affordability?.score}/100 (Weight: 25%)
- Transport Connectivity: ${neighbourhood.scoreBreakdown.transport?.score}/100 (Weight: 20%)
- Commute Duration: ${neighbourhood.scoreBreakdown.commute?.score}/100 (Weight: 15%)
- Primary Schools: ${neighbourhood.scoreBreakdown.schools?.score}/100 (Weight: 15%)
- Family Amenities: ${neighbourhood.scoreBreakdown.familyAmenities?.score}/100 (Weight: 10%)
- Lifestyle & Nature: ${neighbourhood.scoreBreakdown.lifestyle?.score}/100 (Weight: 5%)
- Healthcare Facilities: ${neighbourhood.scoreBreakdown.healthcare?.score}/100 (Weight: 5%)
- Market Fundamentals: ${neighbourhood.scoreBreakdown.marketFundamentals?.score}/100 (Weight: 5%)

3. Property Market Snapshot (URA Official Data):
------------------------------------------------
- Benchmark Median Price: ${neighbourhood.propertySnapshot.medianPriceText}
- Average Benchmark PSF: ${neighbourhood.propertySnapshot.avgPsfText}
- Estimated Rental: ${neighbourhood.propertySnapshot.rentalText}
- Supply Pipeline: ${neighbourhood.propertySnapshot.supplyPipeline}

4. Verified Infrastructure Counts:
----------------------------------
- MRT Stations: ${neighbourhood.amenityCounts.mrtStations1km}
- Primary Schools within 1km: ${neighbourhood.amenityCounts.primarySchools1km}
- Parks & Greenery within 1km: ${neighbourhood.amenityCounts.parks1km}
- Shopping Malls & Hubs: ${neighbourhood.amenityCounts.shoppingMalls1km}

Data Sources: URA DataService, LTA DataMall, OneMap SLA, data.gov.sg, SingStat, MAS.
Disclaimer: Scores calculated deterministically for reference purposes only.
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Location Intelligence Report: {neighbourhood.name}
            </h2>
            <p className="text-xs text-slate-500">Official data summary and livability breakdown</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <pre className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-[11px] text-slate-800 font-mono whitespace-pre-wrap leading-relaxed select-all">
            {reportText}
          </pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-white text-xs font-semibold text-slate-700 flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            Print
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Report Text
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
