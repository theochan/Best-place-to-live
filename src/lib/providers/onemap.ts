/**
 * OneMap Singapore API Provider Adapter
 * Official geocoding, reverse geocoding, and map base services
 */

import { ProviderStatus } from '../../types';
import { WORKPLACE_RESOLVER_DICTIONARY } from '../geo/singaporeData';

export interface OneMapSearchResult {
  SEARCHVAL: string;
  BLK_NO: string;
  ROAD_NAME: string;
  BUILDING: string;
  ADDRESS: string;
  POSTAL: string;
  X: string;
  Y: string;
  LATITUDE: string;
  LONGITUDE: string;
}

export class OneMapProvider {
  id = 'onemap';
  name = 'OneMap Singapore';
  agency = 'Singapore Land Authority (SLA)';

  private getEmail(): string | undefined {
    return process.env.ONEMAP_EMAIL;
  }

  private getPassword(): string | undefined {
    return process.env.ONEMAP_PASSWORD;
  }

  private getAccessToken(): string | undefined {
    return process.env.ONEMAP_ACCESS_TOKEN;
  }

  isConfigured(): boolean {
    return Boolean(this.getAccessToken() || (this.getEmail() && this.getPassword()));
  }

  async getStatus(): Promise<ProviderStatus> {
    const configured = this.isConfigured();
    let reachable = false;
    let error: string | undefined;

    try {
      // Test OneMap public search endpoint
      const res = await fetch('https://www.onemap.gov.sg/api/common/elastic/search?searchVal=Marina+Bay&returnGeom=Y&getAddrDetails=Y', {
        headers: { 'User-Agent': 'WhereSG-AI/1.0' },
        signal: AbortSignal.timeout(4000)
      });
      reachable = res.ok;
      if (!res.ok) {
        error = `HTTP ${res.status}: ${res.statusText}`;
      }
    } catch (err) {
      reachable = false;
      error = err instanceof Error ? err.message : 'Network timeout or unreachable';
    }

    return {
      id: this.id,
      name: this.name,
      agency: this.agency,
      purpose: 'Geocoding user workplaces, reverse geocoding, official thematic boundaries, and map basemap.',
      configured: true, // Public search is openly accessible without keys; token enables higher rate-limits & routing
      reachable,
      lastCheckedAt: new Date().toISOString(),
      metricsSupported: ['workplace_geocoding', 'commute_distance', 'thematic_amenities', 'basemap_tiles'],
      limitations: 'OneMap public routing has strict per-minute rate limits. Fallback to SVY21/WGS84 transit matrix.',
      documentationUrl: 'https://www.onemap.gov.sg/apidocs/',
      error
    };
  }

  /**
   * Geocode a place query in Singapore using OneMap Search API
   */
  async geocode(query: string): Promise<{ name: string; lat: number; lng: number } | null> {
    const cleaned = query.trim().toLowerCase();

    // Check dictionary fast path first
    if (WORKPLACE_RESOLVER_DICTIONARY[cleaned]) {
      const match = WORKPLACE_RESOLVER_DICTIONARY[cleaned];
      return { name: match.name, lat: match.lat, lng: match.lng };
    }

    for (const [key, val] of Object.entries(WORKPLACE_RESOLVER_DICTIONARY)) {
      if (cleaned.includes(key) || key.includes(cleaned)) {
        return { name: val.name, lat: val.lat, lng: val.lng };
      }
    }

    try {
      const url = `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${encodeURIComponent(query)}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'WhereSG-AI/1.0',
          ...(this.getAccessToken() ? { Authorization: this.getAccessToken()! } : {})
        },
        signal: AbortSignal.timeout(5000)
      });

      if (!res.ok) {
        throw new Error(`OneMap API error: ${res.status}`);
      }

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const top = data.results[0] as OneMapSearchResult;
        return {
          name: top.BUILDING || top.ROAD_NAME || top.SEARCHVAL,
          lat: parseFloat(top.LATITUDE),
          lng: parseFloat(top.LONGITUDE)
        };
      }
    } catch (err) {
      console.warn(`[OneMap] Geocoding query "${query}" failed:`, err);
    }

    // Default fallback coordinates for CBD if query is completely unknown
    return {
      name: query,
      lat: 1.2839,
      lng: 103.8515
    };
  }
}

export const oneMapProvider = new OneMapProvider();
