/**
 * Urban Redevelopment Authority (URA) API Provider Adapter
 * Official private residential property transactions, rentals, and master plan supply data
 */

import { ProviderStatus } from '../../types';

export class UraProvider {
  id = 'ura';
  name = 'URA DataService';
  agency = 'Urban Redevelopment Authority (URA)';

  private getAccessKey(): string | undefined {
    return process.env.URA_ACCESS_KEY;
  }

  private getToken(): string | undefined {
    return process.env.URA_TOKEN;
  }

  isConfigured(): boolean {
    return Boolean(this.getAccessKey() || this.getToken());
  }

  async getStatus(): Promise<ProviderStatus> {
    const configured = this.isConfigured();
    let reachable = false;
    let error: string | undefined;

    if (configured) {
      try {
        const res = await fetch('https://www.ura.gov.sg/uraDataService/invokeUraDS?service=PMI_Resi_Rental', {
          headers: {
            AccessKey: this.getAccessKey() || '',
            Token: this.getToken() || '',
            'User-Agent': 'WhereSG-AI/1.0'
          },
          signal: AbortSignal.timeout(4000)
        });
        reachable = res.ok;
        if (!res.ok) {
          error = `HTTP ${res.status}: ${res.statusText}`;
        }
      } catch (err) {
        reachable = false;
        error = err instanceof Error ? err.message : 'Network error';
      }
    } else {
      error = 'URA_ACCESS_KEY / URA_TOKEN not set. Private condo transaction benchmarks use official URA quarterly median tables.';
    }

    return {
      id: this.id,
      name: this.name,
      agency: this.agency,
      purpose: 'Private residential property transactions, median PSF by planning area, rental contract indices, and developer supply pipeline.',
      configured,
      reachable,
      lastCheckedAt: new Date().toISOString(),
      metricsSupported: ['condo_median_price', 'condo_psf', 'rental_index', 'supply_pipeline'],
      limitations: 'Live daily stream requires active URA subscription; quarterly official URA indices are updated periodically.',
      documentationUrl: 'https://www.ura.gov.sg/maps/api/',
      error
    };
  }
}

export const uraProvider = new UraProvider();
