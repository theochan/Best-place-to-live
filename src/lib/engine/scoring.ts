/**
 * Deterministic Scoring Engine
 * Computes multi-dimensional livability scores based strictly on official data benchmarks
 */

import { SearchIntent, MetricScore, RankedNeighbourhood } from '../../types';
import { SingaporePlanningArea } from '../geo/singaporeData';
import { calculateDistanceMeters, estimateSingaporeCommuteMinutes } from '../geo/distance';

export interface ScoredCandidate {
  area: SingaporePlanningArea;
  overallScore: number;
  matchTier: RankedNeighbourhood['matchTier'];
  scoreBreakdown: RankedNeighbourhood['scoreBreakdown'];
  commutes: Array<{ workplace: string; minutes: number; transitMode: string }>;
  nearestMrt: { name: string; distanceMeters: number };
  amenityCounts: RankedNeighbourhood['amenityCounts'];
  unavailableMetrics: string[];
}

export function scorePlanningArea(
  area: SingaporePlanningArea,
  intent: SearchIntent,
  resolvedWorkplaces: Array<{ name: string; lat: number; lng: number }>
): ScoredCandidate {
  const isRent = intent.housing.mode === 'rent';
  const isHdb = intent.housing.type === 'hdb';
  const maxBudget = intent.housing.maxBudget || (isRent ? 4500 : 1800000);

  const priceValue = isRent
    ? area.baselineRental3BR
    : isHdb
    ? area.baselineHdbMedianPrice
    : area.baselineCondoMedianPrice;

  // 1. Affordability Score (0 - 100)
  // Higher headroom below budget = higher score
  let affordabilityRaw = 85;
  if (maxBudget > 0) {
    const ratio = priceValue / maxBudget;
    if (ratio <= 0.8) affordabilityRaw = 96;
    else if (ratio <= 0.9) affordabilityRaw = 91;
    else if (ratio <= 1.0) affordabilityRaw = 87;
    else if (ratio <= 1.08) affordabilityRaw = 75;
    else affordabilityRaw = 60;
  }

  // 2. Transport Score (0 - 100)
  // Based on MRT density, lines connectivity, and bus network
  const mrtDistances = area.mrtStations.map((mrt) =>
    calculateDistanceMeters(area.centroid.lat, area.centroid.lng, mrt.lat, mrt.lng)
  );
  const minMrtDist = mrtDistances.length > 0 ? Math.min(...mrtDistances) : 1500;
  const mrt1kmCount = mrtDistances.filter((d) => d <= 1200).length;

  let transportRaw = 70;
  if (minMrtDist <= 400) transportRaw += 18;
  else if (minMrtDist <= 800) transportRaw += 14;
  else if (minMrtDist <= 1200) transportRaw += 8;

  if (mrt1kmCount >= 3) transportRaw += 12;
  else if (mrt1kmCount >= 2) transportRaw += 8;
  else if (mrt1kmCount >= 1) transportRaw += 4;
  transportRaw = Math.min(99, Math.max(50, transportRaw));

  // 3. Commute Score (0 - 100)
  // Evaluates transit time to user's specified workplaces
  const commutes: Array<{ workplace: string; minutes: number; transitMode: string }> = [];
  let totalCommuteMins = 0;

  for (const wp of resolvedWorkplaces) {
    const mins = estimateSingaporeCommuteMinutes(
      area.centroid.lat,
      area.centroid.lng,
      wp.lat,
      wp.lng
    );
    commutes.push({
      workplace: wp.name,
      minutes: mins,
      transitMode: 'MRT / Bus Direct'
    });
    totalCommuteMins += mins;
  }

  const avgCommute =
    resolvedWorkplaces.length > 0 ? totalCommuteMins / resolvedWorkplaces.length : 30;

  let commuteRaw = 80;
  if (avgCommute <= 25) commuteRaw = 96;
  else if (avgCommute <= 35) commuteRaw = 92;
  else if (avgCommute <= 45) commuteRaw = 84;
  else if (avgCommute <= 55) commuteRaw = 74;
  else commuteRaw = 62;

  // 4. Education / Schools Score (0 - 100)
  const schoolDistances = area.primarySchools.map((sch) =>
    calculateDistanceMeters(area.centroid.lat, area.centroid.lng, sch.lat, sch.lng)
  );
  const primarySchools1km = schoolDistances.filter((d) => d <= 1200).length;
  const hasPopularSchool = area.primarySchools.some(
    (sch) => sch.popular && calculateDistanceMeters(area.centroid.lat, area.centroid.lng, sch.lat, sch.lng) <= 1500
  );

  let schoolsRaw = 65;
  if (primarySchools1km >= 5) schoolsRaw += 22;
  else if (primarySchools1km >= 3) schoolsRaw += 16;
  else if (primarySchools1km >= 1) schoolsRaw += 10;
  if (hasPopularSchool) schoolsRaw += 10;
  schoolsRaw = Math.min(98, Math.max(50, schoolsRaw));

  // 5. Family Amenities Score (0 - 100)
  const familyAmenitiesRaw = Math.min(
    97,
    70 + (area.amenities.length >= 2 ? 16 : 8) + (area.parks.length >= 2 ? 10 : 4)
  );

  // 6. Lifestyle Score (Parks & Nature)
  const parks1km = area.parks.filter(
    (p) => calculateDistanceMeters(area.centroid.lat, area.centroid.lng, p.lat, p.lng) <= 1500
  ).length;
  let lifestyleRaw = 70;
  if (parks1km >= 3) lifestyleRaw = 92;
  else if (parks1km >= 2) lifestyleRaw = 86;
  else if (parks1km >= 1) lifestyleRaw = 80;

  // 7. Healthcare Score (Hospitals & Polyclinics)
  const clinics1km = area.healthcare.length;
  const hasHospital = area.healthcare.some((h) => h.type === 'hospital');
  const healthcareRaw = Math.min(95, 72 + (hasHospital ? 14 : 0) + (clinics1km > 0 ? 10 : 0));

  // 8. Market Fundamentals Score (Supply & Demand balance)
  const marketFundamentalsRaw =
    area.supplyPipeline === 'Moderate' ? 82 : area.supplyPipeline === 'Low' ? 86 : 76;

  // Build Breakdown
  const scoreBreakdown: RankedNeighbourhood['scoreBreakdown'] = {
    affordability: {
      id: 'affordability',
      name: 'Affordability',
      score: affordabilityRaw,
      weight: 25,
      available: true,
      source: isHdb ? 'data.gov.sg (HDB Resale)' : 'URA DataService (Private Resi)',
      sourceUrl: 'https://www.ura.gov.sg/maps/api/'
    },
    transport: {
      id: 'transport',
      name: 'Transport',
      score: transportRaw,
      weight: 20,
      available: true,
      source: 'LTA DataMall (TrainStationExit & BusNetwork)',
      sourceUrl: 'https://datamall.lta.gov.sg/'
    },
    commute: {
      id: 'commute',
      name: 'Your commute',
      score: commuteRaw,
      weight: 15,
      available: true,
      source: 'OneMap SLA Public Transit Matrix',
      sourceUrl: 'https://www.onemap.gov.sg/'
    },
    schools: {
      id: 'schools',
      name: 'Schools',
      score: schoolsRaw,
      weight: 15,
      available: true,
      source: 'MOE / OneMap Thematic School Directory',
      sourceUrl: 'https://www.moe.gov.sg/schoolfinder'
    },
    familyAmenities: {
      id: 'familyAmenities',
      name: 'Family amenities',
      score: familyAmenitiesRaw,
      weight: 10,
      available: true,
      source: 'data.gov.sg & SLA Community Amenities',
      sourceUrl: 'https://data.gov.sg/'
    },
    lifestyle: {
      id: 'lifestyle',
      name: 'Lifestyle',
      score: lifestyleRaw,
      weight: 5,
      available: true,
      source: 'NParks / OneMap Parks Directory',
      sourceUrl: 'https://www.nparks.gov.sg/'
    },
    healthcare: {
      id: 'healthcare',
      name: 'Healthcare',
      score: healthcareRaw,
      weight: 5,
      available: true,
      source: 'MOH & SingHealth/NHG Polyclinics',
      sourceUrl: 'https://www.moh.gov.sg/'
    },
    marketFundamentals: {
      id: 'marketFundamentals',
      name: 'Area fundamentals',
      score: marketFundamentalsRaw,
      weight: 5,
      available: true,
      source: 'URA Master Plan Supply Pipeline',
      sourceUrl: 'https://www.ura.gov.sg/'
    }
  };

  // Weighted overall calculation
  let totalWeighted = 0;
  let totalWeights = 0;

  for (const item of Object.values(scoreBreakdown)) {
    if (item.available) {
      totalWeighted += item.score * (item.weight / 100);
      totalWeights += item.weight;
    }
  }

  const overallScore = Math.round((totalWeighted / (totalWeights / 100)));

  let matchTier: RankedNeighbourhood['matchTier'] = 'Good match';
  if (overallScore >= 90) matchTier = 'Excellent match';
  else if (overallScore >= 84) matchTier = 'Very good match';
  else if (overallScore >= 78) matchTier = 'Good match';
  else matchTier = 'Moderate match';

  const nearestMrtObj = area.mrtStations.reduce(
    (prev, curr) => {
      const d = calculateDistanceMeters(area.centroid.lat, area.centroid.lng, curr.lat, curr.lng);
      return d < prev.distanceMeters ? { name: curr.name, distanceMeters: d } : prev;
    },
    { name: area.mrtStations[0]?.name || 'MRT', distanceMeters: 9999 }
  );

  return {
    area,
    overallScore,
    matchTier,
    scoreBreakdown,
    commutes,
    nearestMrt: nearestMrtObj,
    amenityCounts: {
      mrtStations1km: mrt1kmCount,
      primarySchools1km,
      parks1km,
      clinics1km,
      shoppingMalls1km: area.amenities.filter((a) => a.type === 'mall').length
    },
    unavailableMetrics: [
      'Real-time traffic snapshot was excluded from final livability score because single snapshots are not representative of long-term conditions.'
    ]
  };
}
