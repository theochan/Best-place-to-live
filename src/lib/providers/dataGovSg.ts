/**
 * data.gov.sg Open Data API Provider Adapter
 * Official Singapore Open Data platform for HDB resale, weather, PSI, and amenities
 */

import { ProviderStatus } from '../../types';

export class DataGovSgProvider {
  id = 'datagovsg';
  name = 'data.gov.sg';
  agency = 'Open Government Products (OGP) / GovTech';

  async getStatus(): Promise<ProviderStatus> {
    let reachable = false;
    let error: string | undefined;

    try {
      // Test real data.gov.sg public weather or PSI endpoint
      const res = await fetch('https://api-open.data.gov.sg/v2/real-time/api/twenty-four-hr-forecast', {
        headers: { 'User-Agent': 'WhereSG-AI/1.0' },
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

    return {
      id: this.id,
      name: this.name,
      agency: this.agency,
      purpose: 'HDB resale transaction dataset, 24-hour weather forecast, air quality (PSI), and municipal datasets.',
      configured: true, // Open public API
      reachable,
      lastCheckedAt: new Date().toISOString(),
      metricsSupported: ['hdb_median_price', 'hdb_resale_volume', 'weather_environment', 'psi_air_quality'],
      limitations: 'Real-time traffic snapshots are excluded from long-term livability scores as required by scoring rules.',
      documentationUrl: 'https://data.gov.sg/developer',
      error
    };
  }
}

export const dataGovSgProvider = new DataGovSgProvider();
