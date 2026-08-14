import React, { useEffect, useState } from 'react';
import { MessageSquare, RefreshCw, ExternalLink } from 'lucide-react';

declare global {
  interface Window {
    DISQUS?: {
      reset: (options: { reload: boolean; config?: () => void }) => void;
    };
    disqus_config?: () => void;
  }
}

export const DisqusComments: React.FC = () => {
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    // Current page URL and identifier for Disqus configuration
    const currentUrl = typeof window !== 'undefined' 
      ? window.location.href.split('?')[0].split('#')[0] 
      : 'https://wheresg.ai/';
    const pageIdentifier = 'wheresg-landing-discussion';

    const configureDisqus = function (this: { page: { url?: string; identifier?: string; title?: string } }) {
      this.page.url = currentUrl;
      this.page.identifier = pageIdentifier;
      this.page.title = 'WhereSG AI - Singapore Home Location Intelligence Discussion';
    };

    // Set globally on window for the initial embed.js execution
    window.disqus_config = configureDisqus;

    // Function to reload or inject
    const loadDisqus = () => {
      try {
        if (window.DISQUS) {
          window.DISQUS.reset({
            reload: true,
            config: configureDisqus,
          });
        } else {
          // Check if the script element already exists
          const existingScript = document.getElementById('disqus-embed-script');
          if (existingScript) {
            existingScript.remove();
          }

          const d = document;
          const s = d.createElement('script');
          s.id = 'disqus-embed-script';
          s.src = 'https://theochan.disqus.com/embed.js';
          s.setAttribute('data-timestamp', String(+new Date()));
          s.async = true;
          s.onerror = () => {
            console.warn('Disqus embed script failed to load (possibly blocked by ad blocker).');
            setLoadError(true);
          };
          (d.head || d.body).appendChild(s);
        }

        // Add count script if not present
        if (!document.getElementById('dsq-count-scr')) {
          const countScript = document.createElement('script');
          countScript.id = 'dsq-count-scr';
          countScript.src = 'https://theochan.disqus.com/count.js';
          countScript.async = true;
          (document.head || document.body).appendChild(countScript);
        }
      } catch (err) {
        console.error('Error initializing Disqus:', err);
        setLoadError(true);
      }
    };

    loadDisqus();
  }, []);

  const handleManualReload = () => {
    setLoadError(false);
    if (window.DISQUS) {
      window.DISQUS.reset({ reload: true });
    } else {
      const existing = document.getElementById('disqus-embed-script');
      if (existing) existing.remove();
      const s = document.createElement('script');
      s.id = 'disqus-embed-script';
      s.src = 'https://theochan.disqus.com/embed.js';
      s.setAttribute('data-timestamp', String(+new Date()));
      s.async = true;
      (document.head || document.body).appendChild(s);
    }
  };

  return (
    <section id="disqus-section" className="w-full max-w-4xl mx-auto mt-14 pt-8 border-t border-slate-200/80">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2.5 text-slate-800">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight text-slate-900">Community Discussion & Feedback</h3>
            <p className="text-xs text-slate-500">Ask questions, share neighbourhood tips, or provide feedback on WhereSG</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleManualReload}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-sm transition-colors"
          title="Reload comments thread"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span>Reload Thread</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/70 shadow-sm" style={{ color: '#0f172a', backgroundColor: '#ffffff' }}>
        {/* Official Disqus embed container */}
        <div id="disqus_thread" className="min-h-[220px]" style={{ color: '#0f172a', backgroundColor: '#ffffff' }}></div>

        {loadError && (
          <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="font-semibold mb-0.5">Disqus comments could not be loaded directly.</p>
              <p className="text-amber-800/90">
                This often occurs if an ad blocker or browser privacy extension is active, or if third-party cookies are restricted.
              </p>
            </div>
            <a
              href="https://disqus.com/home/forums/theochan/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-amber-900 hover:text-amber-950 underline shrink-0"
            >
              Open on Disqus <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        <noscript>
          Please enable JavaScript to view the{' '}
          <a
            href="https://disqus.com/?ref_noscript"
            rel="noreferrer"
            className="text-emerald-600 hover:underline"
          >
            comments powered by Disqus.
          </a>
        </noscript>
      </div>
    </section>
  );
};

