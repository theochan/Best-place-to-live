import React, { useState, useEffect } from 'react';
import { SearchResponse, RankedNeighbourhood } from './types';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { SearchInput } from './components/SearchInput';
import { FeaturesSection } from './components/FeaturesSection';
import { DataSourcesBar } from './components/DataSourcesBar';
import { DataSourcesPage } from './components/DataSourcesPage';
import { ResultsView } from './components/ResultsView';
import { CompareModal } from './components/CompareModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { ExportReportModal } from './components/ExportReportModal';
import { SavedDrawer } from './components/SavedDrawer';
import { LoadingSteps } from './components/LoadingSteps';
import { Footer } from './components/Footer';
import { DisqusComments } from './components/DisqusComments';
import { orchestrateSearch } from './lib/engine/orchestrator';

const LOCAL_STORAGE_SAVED_KEY = 'wheresg_saved_neighbourhoods_v1';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'results' | 'data-sources'>('landing');
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<number>(1);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Saved / Bookmarks
  const [savedNeighbourhoods, setSavedNeighbourhoods] = useState<RankedNeighbourhood[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_SAVED_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Comparison items
  const [compareList, setCompareList] = useState<RankedNeighbourhood[]>([]);

  // Modals & Drawers
  const [showHowItWorks, setShowHowItWorks] = useState<boolean>(false);
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);
  const [showSavedDrawer, setShowSavedDrawer] = useState<boolean>(false);
  const [selectedForReport, setSelectedForReport] = useState<RankedNeighbourhood | null>(null);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_SAVED_KEY, JSON.stringify(savedNeighbourhoods));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [savedNeighbourhoods]);

  // Handle Search Execution
  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setCurrentQuery(query);
    setIsLoading(true);
    setErrorMsg(null);
    setLoadingStep(1);

    // Step animation cadence
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < 5 ? prev + 1 : prev));
    }, 900);

    try {
      // 1. Try server-side API first
      let resultData: SearchResponse | null = null;
      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query })
        });

        if (response.ok) {
          resultData = await response.json();
        }
      } catch {
        console.warn('Backend API fetch failed, falling back to in-memory orchestration engine.');
      }

      // 2. Fallback to client-side orchestration if backend was unavailable
      if (!resultData) {
        resultData = await orchestrateSearch(query);
      }

      clearInterval(stepInterval);
      setLoadingStep(5);

      // Brief delay so user sees final checkmark
      setTimeout(() => {
        setSearchResponse(resultData);
        setCurrentView('results');
        setIsLoading(false);
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 400);

    } catch (err) {
      clearInterval(stepInterval);
      setIsLoading(false);
      console.error('Search execution error:', err);
      setErrorMsg('An error occurred while evaluating Singapore datasets. Please try again.');
    }
  };

  // Toggle Save / Bookmark
  const handleToggleSaveNeighbourhood = (neighbourhood: RankedNeighbourhood) => {
    setSavedNeighbourhoods((prev) => {
      const exists = prev.some((item) => item.id === neighbourhood.id);
      if (exists) {
        return prev.filter((item) => item.id !== neighbourhood.id);
      } else {
        return [...prev, neighbourhood];
      }
    });
  };

  // Add to Compare
  const handleOpenCompareWith = (neighbourhood: RankedNeighbourhood) => {
    setCompareList((prev) => {
      const exists = prev.some((item) => item.id === neighbourhood.id);
      if (exists) {
        return prev;
      }
      if (prev.length >= 3) {
        // Keep latest 2 and add new
        return [...prev.slice(1), neighbourhood];
      }
      return [...prev, neighbourhood];
    });
    setShowCompareModal(true);
  };

  const handleRemoveFromCompare = (id: string) => {
    setCompareList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOpenExportReport = (neighbourhood: RankedNeighbourhood) => {
    setSelectedForReport(neighbourhood);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onOpenHowItWorks={() => setShowHowItWorks(true)}
        onOpenCompare={() => setShowCompareModal(true)}
        onOpenSaved={() => setShowSavedDrawer(true)}
        savedCount={savedNeighbourhoods.length}
        hasResults={!!searchResponse}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Loading Overlay */}
        {isLoading && <LoadingSteps currentStep={loadingStep} />}

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center justify-between">
            <span>{errorMsg}</span>
            <button
              onClick={() => setErrorMsg(null)}
              className="text-xs font-semibold px-2 py-1 bg-rose-100 hover:bg-rose-200 rounded-md transition-colors"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* 1. Landing View */}
        {currentView === 'landing' && (
          <div className="space-y-12">
            <LandingHero />

            <div className="max-w-4xl mx-auto">
              <SearchInput
                initialValue={currentQuery}
                onSearch={handleSearch}
                isLoading={isLoading}
              />
            </div>

            <DataSourcesBar onOpenDataSources={() => setCurrentView('data-sources')} />

            <FeaturesSection />

            <DisqusComments />
          </div>
        )}

        {/* 2. Results View */}
        {currentView === 'results' && searchResponse && (
          <ResultsView
            data={searchResponse}
            onEditSearch={() => {
              setCurrentView('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenDataSources={() => setCurrentView('data-sources')}
            onOpenExportReport={handleOpenExportReport}
            onToggleSaveNeighbourhood={handleToggleSaveNeighbourhood}
            savedNeighbourhoodIds={savedNeighbourhoods.map((n) => n.id)}
            onOpenCompareWith={handleOpenCompareWith}
          />
        )}

        {/* 3. Data Sources Status Page */}
        {currentView === 'data-sources' && (
          <DataSourcesPage onBackToSearch={() => setCurrentView(searchResponse ? 'results' : 'landing')} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenDataSources={() => setCurrentView('data-sources')}
        onOpenHowItWorks={() => setShowHowItWorks(true)}
      />

      {/* Modals & Drawers */}
      <HowItWorksModal
        isOpen={showHowItWorks}
        onClose={() => setShowHowItWorks(false)}
      />

      <CompareModal
        isOpen={showCompareModal}
        onClose={() => setShowCompareModal(false)}
        neighbourhoods={
          compareList.length > 0
            ? compareList
            : searchResponse?.results.slice(0, 3) || []
        }
        onRemoveNeighbourhood={handleRemoveFromCompare}
      />

      <SavedDrawer
        isOpen={showSavedDrawer}
        onClose={() => setShowSavedDrawer(false)}
        savedNeighbourhoods={savedNeighbourhoods}
        onRemove={(id) => setSavedNeighbourhoods((prev) => prev.filter((n) => n.id !== id))}
        onSelect={(neighbourhood) => {
          setShowSavedDrawer(false);
          if (searchResponse) {
            setCurrentView('results');
          }
        }}
        onCompare={() => {
          setShowSavedDrawer(false);
          setCompareList(savedNeighbourhoods.slice(0, 3));
          setShowCompareModal(true);
        }}
      />

      {selectedForReport && (
        <ExportReportModal
          neighbourhood={selectedForReport}
          isOpen={!!selectedForReport}
          onClose={() => setSelectedForReport(null)}
        />
      )}
    </div>
  );
}
