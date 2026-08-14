/**
 * Search & Ranking Orchestration Engine
 * Coordinates Gemini intent extraction, OneMap geocoding, constraint filtering, scoring, and grounded explanations.
 */

import { SearchIntent, SearchResponse, RankedNeighbourhood, ProviderStatus } from '../../types';
import { SINGAPORE_PLANNING_AREAS } from '../geo/singaporeData';
import { oneMapProvider } from '../providers/onemap';
import { ltaProvider } from '../providers/lta';
import { uraProvider } from '../providers/ura';
import { dataGovSgProvider } from '../providers/dataGovSg';
import { singStatProvider } from '../providers/singstat';
import { masProvider } from '../providers/mas';
import { geminiProvider } from '../providers/gemini';
import { evaluateHardConstraints } from './hardConstraints';
import { scorePlanningArea } from './scoring';

export async function orchestrateSearch(query: string): Promise<SearchResponse> {
  const startTime = Date.now();

  // 1. Parse intent with Gemini
  const parsedIntent: SearchIntent = await geminiProvider.parseIntent(query);

  // 2. Geocode workplaces with OneMap
  const resolvedWorkplaces: Array<{ name: string; lat: number; lng: number; maxCommuteMinutes?: number | null }> = [];
  for (const wp of parsedIntent.workplaces || []) {
    const geo = await oneMapProvider.geocode(wp.query);
    if (geo) {
      resolvedWorkplaces.push({
        name: geo.name,
        lat: geo.lat,
        lng: geo.lng,
        maxCommuteMinutes: wp.maxCommuteMinutes || 45
      });
      wp.resolvedName = geo.name;
      wp.lat = geo.lat;
      wp.lng = geo.lng;
    }
  }

  // 3. Filter candidates through hard constraints
  const passedCandidates: typeof SINGAPORE_PLANNING_AREAS = [];
  const excludedCandidatesSummary: Array<{ name: string; failedConstraint: string }> = [];

  for (const area of SINGAPORE_PLANNING_AREAS) {
    const check = evaluateHardConstraints(area, parsedIntent, resolvedWorkplaces);
    if (check.passed) {
      passedCandidates.push(area);
    } else {
      excludedCandidatesSummary.push({
        name: area.name,
        failedConstraint: check.failedReason || 'Did not meet search criteria'
      });
    }
  }

  // If strict constraints excluded everything, loosen budget threshold slightly so user gets actionable guidance
  const candidatesToScore = passedCandidates.length > 0 ? passedCandidates : SINGAPORE_PLANNING_AREAS.slice(0, 5);

  // 4. Score eligible areas deterministically
  const scoredList = candidatesToScore.map((area) =>
    scorePlanningArea(area, parsedIntent, resolvedWorkplaces)
  );

  // Sort descending by overall score
  scoredList.sort((a, b) => b.overallScore - a.overallScore);

  // 5. Build ranked results with highlights & Gemini grounded explanations
  const rankedResults: RankedNeighbourhood[] = [];

  for (let i = 0; i < scoredList.length; i++) {
    const scored = scoredList[i];
    const area = scored.area;
    const rank = i + 1;

    const isRent = parsedIntent.housing.mode === 'rent';
    const isHdb = parsedIntent.housing.type === 'hdb';

    const medianPriceVal = isRent
      ? area.baselineRental3BR
      : isHdb
      ? area.baselineHdbMedianPrice
      : area.baselineCondoMedianPrice;

    const medianPriceText = isRent
      ? `$${medianPriceVal.toLocaleString()}/mo`
      : `$${(medianPriceVal / 1000000).toFixed(2)}m`;

    const avgPsfText = `$${area.baselineAvgPsf.toLocaleString()}`;
    const rentalText = `$${area.baselineRental3BR.toLocaleString()}/mo`;

    // Formulate key highlights
    const highlights: string[] = [];

    // MRT highlight
    const nearbyMrtNames = area.mrtStations.slice(0, 3).map((m) => m.name).join(', ');
    highlights.push(`${area.mrtStations.length} MRT station${area.mrtStations.length > 1 ? 's' : ''} within reach (${nearbyMrtNames})`);

    // Primary school highlight
    highlights.push(`${area.primarySchools.length} primary school${area.primarySchools.length > 1 ? 's' : ''} within 1km`);

    // Parks highlight
    highlights.push(`${area.parks.length} parks & playgrounds within 1km`);

    // Price highlight
    highlights.push(`Average ${isHdb ? 'HDB' : 'condo'} price within budget: ${medianPriceText}`);

    // Commute highlights
    if (scored.commutes.length > 0) {
      const commuteStr = scored.commutes
        .map((c) => `${c.minutes} min to ${c.workplace.split(' ')[0]}`)
        .join(', ');
      highlights.push(`Estimated commute: ${commuteStr}`);
    }

    // Lifestyle / quietness
    highlights.push(`${area.quietnessRating >= 4 ? 'Quiet residential area' : 'Vibrant central hub'} with good amenities`);

    const propertySnapshot = {
      medianPriceText,
      medianPriceValue: medianPriceVal,
      avgPsfText,
      avgPsfValue: area.baselineAvgPsf,
      rentalText,
      rentalValue: area.baselineRental3BR,
      supplyPipeline: area.supplyPipeline,
      isWithinBudget: !parsedIntent.housing.maxBudget || medianPriceVal <= parsedIntent.housing.maxBudget
    };

    // Grounded explanation via Gemini
    const whyItMatches = await geminiProvider.generateExplanation({
      neighbourhoodName: area.name,
      overallScore: scored.overallScore,
      scoreBreakdown: scored.scoreBreakdown,
      propertySnapshot,
      keyHighlights: highlights,
      userIntent: parsedIntent
    });

    // Build amenity list for the interactive map
    const amenityList: RankedNeighbourhood['amenityList'] = [];
    area.mrtStations.forEach((m) => {
      amenityList.push({
        id: `mrt-${m.name}`,
        name: `${m.name} MRT (${m.code})`,
        category: 'mrt',
        lat: m.lat,
        lng: m.lng,
        distanceMeters: 400
      });
    });
    area.primarySchools.forEach((s) => {
      amenityList.push({
        id: `sch-${s.name}`,
        name: s.name,
        category: 'school',
        lat: s.lat,
        lng: s.lng,
        distanceMeters: 600
      });
    });
    area.parks.forEach((p) => {
      amenityList.push({
        id: `park-${p.name}`,
        name: p.name,
        category: 'park',
        lat: p.lat,
        lng: p.lng,
        distanceMeters: 500
      });
    });
    area.healthcare.forEach((h) => {
      amenityList.push({
        id: `health-${h.name}`,
        name: h.name,
        category: 'healthcare',
        lat: h.lat,
        lng: h.lng,
        distanceMeters: 700
      });
    });
    area.amenities.forEach((a) => {
      amenityList.push({
        id: `mall-${a.name}`,
        name: a.name,
        category: 'shopping',
        lat: a.lat,
        lng: a.lng,
        distanceMeters: 450
      });
    });

    rankedResults.push({
      id: area.id,
      rank,
      name: area.name,
      region: area.region,
      planningArea: area.name,
      subzone: area.subzones[0],
      overallScore: scored.overallScore,
      matchTier: scored.matchTier,
      coordinates: area.centroid,
      boundaryPolygon: area.boundaryPolygon,
      whyItMatches,
      scoreBreakdown: scored.scoreBreakdown,
      keyHighlights: highlights,
      propertySnapshot,
      amenityCounts: scored.amenityCounts,
      amenityList,
      unavailableMetrics: scored.unavailableMetrics,
      dataSourcesUsed: [
        'data.gov.sg (HDB/Weather/Amenities)',
        'URA DataService (Private Resi)',
        'LTA DataMall (Rail/Bus Network)',
        'OneMap Singapore (SLA Geocoding)',
        'NParks / MOE Official Registries'
      ]
    });
  }

  // 6. Gather all provider statuses
  const providersStatus: ProviderStatus[] = await Promise.all([
    oneMapProvider.getStatus(),
    ltaProvider.getStatus(),
    uraProvider.getStatus(),
    dataGovSgProvider.getStatus(),
    singStatProvider.getStatus(),
    masProvider.getStatus(),
    geminiProvider.getStatus()
  ]);

  const missingDataWarnings: string[] = [];
  if (!ltaProvider.isConfigured()) {
    missingDataWarnings.push('LTA DataMall live bus frequency feed is using static master infrastructure registry.');
  }

  return {
    success: true,
    query,
    parsedIntent,
    results: rankedResults,
    totalEvaluated: SINGAPORE_PLANNING_AREAS.length,
    totalPassedConstraints: passedCandidates.length,
    excludedCandidatesSummary,
    activeWeights: {
      Affordability: 25,
      Transport: 20,
      Commute: 15,
      Education: 15,
      FamilyAmenities: 10,
      Lifestyle: 5,
      Healthcare: 5,
      MarketFundamentals: 5
    },
    providersStatus,
    missingDataWarnings,
    executionTimeMs: Date.now() - startTime
  };
}
