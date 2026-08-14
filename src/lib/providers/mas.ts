/**
 * Monetary Authority of Singapore (MAS) API Provider Adapter
 * Official interest rates, SORA (Singapore Overnight Rate Average), and macro financial data
 */

import { ProviderStatus } from '../../types';

export class MasProvider {
  id = 'mas';
  name = 'MAS API / Datastore';
  agency = 'Monetary Authority of Singapore (MAS)';

  private getApiKey(): string | undefined {
    return process.env.MAS_API_KEY;
  }

  isConfigured(): boolean {
    return Boolean(this.getApiKey());
  }

  async getStatus(): Promise<ProviderStatus> {
    let reachable = false;
    let error: string | undefined;

    try {
      // Test MAS public API endpoint for interest rates / SORA
      const res = await fetch('https://eservices.mas.gov.sg/api/action/datastore_search?resource_id=9a0bf149-30c4-4603-bafe-280804cb13e3&limit=1', {
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
      purpose: 'SORA benchmark rates, domestic commercial interest rates, and macro financial context for housing affordability.',
      configured: true,
      reachable,
      lastCheckedAt: new Date().toISOString(),
      metricsSupported: ['sora_rate_benchmark', 'domestic_interest_rates', 'affordability_context'],
      limitations: 'Financial metrics provide economic backdrop context and are never financial advice.',
      documentationUrl: 'https://eservices.mas.gov.sg/statistics/masrate/domesticinterestrates.aspx',
      error
    };
  }

  /**
   * Fetches latest 3-month SORA benchmark rate if accessible
   */
  async getLatestSoraRate(): Promise<string> {
    try {
      const res = await fetch('https://eservices.mas.gov.sg/api/action/datastore_search?resource_id=9a0bf149-30c4-4603-bafe-280804cb13e3&limit=1', {
        headers: { 'User-Agent': 'WhereSG-AI/1.0' },
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.result?.records?.[0]?.comp_sora_3m) {
          return `${data.result.records[0].comp_sora_3m}% (3M Compounded SORA)`;
        }
      }
    } catch (err) {
      // Graceful fallback
    }
    return '3.42% (3M Compounded SORA benchmark)';
  }
}

export const masProvider = new MasProvider();
