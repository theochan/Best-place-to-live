/**
 * SingStat (Singapore Department of Statistics) API Provider Adapter
 * Official demographics, population, and age distribution datasets
 */

import { ProviderStatus } from '../../types';

export class SingStatProvider {
  id = 'singstat';
  name = 'SingStat Table Builder';
  agency = 'Singapore Department of Statistics (SingStat)';

  async getStatus(): Promise<ProviderStatus> {
    let reachable = false;
    let error: string | undefined;

    try {
      const res = await fetch('https://tablebuilder.singstat.gov.sg/api/table/resourceid?keyword=population&offset=0&limit=1', {
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
      purpose: 'Planning area population demographics, elderly/children population ratios, and household sizes.',
      configured: true, // SingStat Table Builder is openly accessible
      reachable,
      lastCheckedAt: new Date().toISOString(),
      metricsSupported: ['demographic_population', 'age_distribution', 'household_density'],
      limitations: 'Demographic statistics are aggregated at the planning area level and updated annually.',
      documentationUrl: 'https://www.singstat.gov.sg/find-data/search-by-theme/population/population-and-population-structure/latest-data',
      error
    };
  }
}

export const singStatProvider = new SingStatProvider();
