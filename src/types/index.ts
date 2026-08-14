export type HousingMode = 'buy' | 'rent' | 'either';
export type PropertyType = 'hdb' | 'condo' | 'landed' | 'private' | 'any';

export interface SearchIntent {
  housing: {
    mode: HousingMode;
    type: PropertyType;
    maxBudget?: number | null;
    minBudget?: number | null;
    bedrooms?: number | null;
    minFloorAreaSqm?: number | null;
  };
  household: {
    adults?: number | null;
    children?: number | null;
    elderly?: number | null;
  };
  workplaces: Array<{
    query: string;
    resolvedName?: string;
    lat?: number;
    lng?: number;
    maxCommuteMinutes?: number | null;
    weight?: number | null;
  }>;
  transport: {
    mrtImportance: number; // 0-5
    busImportance: number; // 0-5
    drivingImportance: number; // 0-5
    maxMrtDistanceMeters?: number | null;
  };
  education: {
    importance: number; // 0-5
    primarySchoolWithinMeters?: number | null;
  };
  lifestyle: {
    parksImportance: number; // 0-5
    healthcareImportance: number; // 0-5
    quietnessImportance: number; // 0-5
    amenitiesImportance: number; // 0-5
  };
  preferences: {
    affordability: number;
    commute: number;
    transport: number;
    education: number;
    familyAmenities: number;
    lifestyle: number;
    healthcare: number;
    marketFundamentals: number;
    preferredRegions?: Array<'East' | 'West' | 'North' | 'North-East' | 'Central'>;
  };
  hardConstraints: Array<{
    field: string;
    operator: 'eq' | 'neq' | 'lt' | 'lte' | 'gt' | 'gte' | 'within' | 'exists' | 'in';
    value: unknown;
    description: string;
  }>;
  clarificationQuestions?: string[];
}

export interface MetricScore {
  id: string;
  name: string;
  score: number; // 0 - 100
  weight: number; // raw or normalized %
  available: boolean;
  source: string;
  sourceUrl?: string;
  reason?: string;
}

export interface NeighbourhoodMetricData {
  medianPriceCondo3BR?: number | null;
  medianPriceHDB4Room?: number | null;
  avgPsfCondo?: number | null;
  avgRental3BR?: number | null;
  supplyPipeline?: 'Low' | 'Moderate' | 'High' | null;
  mrtStationsCount1km: number;
  nearestMrtName: string;
  nearestMrtDistanceMeters: number;
  busStopsCount400m: number;
  primarySchoolsCount1km: number;
  parksCount1km: number;
  clinicsCount1km: number;
  supermarketsCount1km: number;
  commuteTimesToWorkplaces: Array<{
    workplace: string;
    minutes: number;
    transitMode: string;
  }>;
  overallAverageCommuteMinutes: number;
  demographics?: {
    totalPopulation?: number;
    medianAge?: number;
  };
  soraRateContext?: string;
}

export interface RankedNeighbourhood {
  id: string;
  rank: number;
  name: string;
  region: 'East' | 'North-East' | 'Central' | 'West' | 'North';
  planningArea: string;
  subzone?: string;
  overallScore: number; // 0 - 100
  matchTier: 'Excellent match' | 'Very good match' | 'Good match' | 'Moderate match';
  coordinates: {
    lat: number;
    lng: number;
  };
  boundaryPolygon?: [number, number][]; // [lat, lng] array
  whyItMatches: string;
  scoreBreakdown: {
    affordability: MetricScore;
    transport: MetricScore;
    commute: MetricScore;
    schools: MetricScore;
    familyAmenities: MetricScore;
    lifestyle: MetricScore;
    healthcare: MetricScore;
    marketFundamentals: MetricScore;
  };
  keyHighlights: string[];
  propertySnapshot: {
    medianPriceText: string;
    medianPriceValue?: number;
    avgPsfText: string;
    avgPsfValue?: number;
    rentalText: string;
    rentalValue?: number;
    supplyPipeline: 'Low' | 'Moderate' | 'High' | 'Data unavailable';
    isWithinBudget: boolean;
  };
  amenityCounts: {
    mrtStations1km: number;
    primarySchools1km: number;
    parks1km: number;
    clinics1km: number;
    shoppingMalls1km: number;
  };
  amenityList: Array<{
    id: string;
    name: string;
    category: 'mrt' | 'school' | 'park' | 'healthcare' | 'shopping' | 'bus';
    lat: number;
    lng: number;
    distanceMeters: number;
  }>;
  unavailableMetrics: string[];
  dataSourcesUsed: string[];
}

export interface ProviderStatus {
  id: string;
  name: string;
  agency: string;
  purpose: string;
  configured: boolean;
  reachable: boolean;
  lastCheckedAt: string;
  metricsSupported: string[];
  limitations: string;
  documentationUrl: string;
  error?: string;
}

export interface SearchResponse {
  success: boolean;
  query: string;
  parsedIntent: SearchIntent;
  results: RankedNeighbourhood[];
  totalEvaluated: number;
  totalPassedConstraints: number;
  excludedCandidatesSummary: Array<{
    name: string;
    failedConstraint: string;
  }>;
  activeWeights: Record<string, number>;
  providersStatus: ProviderStatus[];
  missingDataWarnings: string[];
  executionTimeMs: number;
}
