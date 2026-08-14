/**
 * Urban Redevelopment Authority (URA) & Private Residential Data Provider
 * Utilizes official URA REALIS & Master Plan quarterly median benchmarks and indices
 */

import { ProviderStatus } from '../../types';

export class UraProvider {
  id = 'ura';
  name = 'URA REALIS Benchmarks';
  agency = 'Urban Redevelopment Authority (URA)';

  isConfigured(): boolean {
    // Open benchmark data pre-compiled from official URA REALIS quarterly releases
    return true;
  }

  async getStatus(): Promise<ProviderStatus> {
    return {
      id: this.id,
      name: this.name,
      agency: this.agency,
      purpose: 'Private residential property median PSF, transaction benchmarks by planning area, rental contract indices, and Master Plan zoning.',
      configured: true,
      reachable: true,
      lastCheckedAt: new Date().toISOString(),
      metricsSupported: ['condo_median_price', 'condo_psf', 'rental_index', 'supply_pipeline'],
      limitations: 'Direct live token query dropped; utilizes compiled official URA REALIS planning area benchmark tables.',
      documentationUrl: 'https://www.ura.gov.sg/Corporate/Property/Property-Data'
    };
  }
}

export const uraProvider = new UraProvider();

