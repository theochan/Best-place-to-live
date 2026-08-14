/**
 * LTA DataMall API Provider Adapter
 * Land Transport Authority official transport datasets
 */

import { ProviderStatus } from '../../types';

export class LtaProvider {
  id = 'lta';
  name = 'LTA DataMall';
  agency = 'Land Transport Authority (LTA)';

  private getAccountKey(): string | undefined {
    return process.env.LTA_ACCOUNT_KEY;
  }

  isConfigured(): boolean {
    return Boolean(this.getAccountKey());
  }

  async getStatus(): Promise<ProviderStatus> {
    const configured = this.isConfigured();
    let reachable = false;
    let error: string | undefined;

    if (configured) {
      try {
        const res = await fetch('http://datamall2.mytransport.sg/ltaodataservice/TrainStationExit', {
          headers: {
            AccountKey: this.getAccountKey()!,
            accept: 'application/json'
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
      error = 'LTA_ACCOUNT_KEY environment variable is not configured. Using official master transit network registry.';
    }

    return {
      id: this.id,
      name: this.name,
      agency: this.agency,
      purpose: 'MRT/LRT stations, bus stops, transit infrastructure density, and live traffic volume feeds.',
      configured,
      reachable,
      lastCheckedAt: new Date().toISOString(),
      metricsSupported: ['mrt_station_density', 'bus_stops_400m', 'transit_connectivity_index', 'passenger_volume'],
      limitations: 'Dynamic LTA DataMall API requires API key; static infrastructure topology is validated from official LTA master rail map.',
      documentationUrl: 'https://datamall.lta.gov.sg/content/datamall/en/dynamic-data.html',
      error
    };
  }
}

export const ltaProvider = new LtaProvider();
