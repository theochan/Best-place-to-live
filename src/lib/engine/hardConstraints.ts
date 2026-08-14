/**
 * Hard Constraints Evaluation Engine
 * Filters out neighbourhoods that fail non-negotiable user requirements
 */

import { SearchIntent } from '../../types';
import { SingaporePlanningArea } from '../geo/singaporeData';
import { calculateDistanceMeters, estimateSingaporeCommuteMinutes } from '../geo/distance';

export interface ConstraintCheckResult {
  passed: boolean;
  failedReason?: string;
}

export function evaluateHardConstraints(
  area: SingaporePlanningArea,
  intent: SearchIntent,
  resolvedWorkplaces: Array<{ name: string; lat: number; lng: number; maxCommuteMinutes?: number | null }>
): ConstraintCheckResult {
  // 1. Region & Geographic Location Constraint (Strict hard check)
  const regionHardConstraints = intent.hardConstraints?.filter(
    (c) => c.field === 'region' || c.field === 'location'
  ) || [];
  const preferredRegions = intent.preferences?.preferredRegions || [];

  if (regionHardConstraints.length > 0) {
    const requiredRegions = regionHardConstraints.map((c) => String(c.value).toLowerCase());
    const isMatch = requiredRegions.some(
      (r) => area.region.toLowerCase().includes(r) || r.includes(area.region.toLowerCase())
    );
    if (!isMatch) {
      return {
        passed: false,
        failedReason: `Not located in requested region (${area.region} instead of ${regionHardConstraints.map((c) => c.value).join(', ')})`
      };
    }
  } else if (preferredRegions.length > 0) {
    const isMatch = preferredRegions.some(
      (r) => area.region.toLowerCase().includes(r.toLowerCase()) || r.toLowerCase().includes(area.region.toLowerCase())
    );
    if (!isMatch) {
      return {
        passed: false,
        failedReason: `Not located in requested region (${area.region} instead of ${preferredRegions.join(', ')})`
      };
    }
  }

  // 2. Budget Constraint
  const maxBudget = intent.housing.maxBudget;
  if (maxBudget) {
    const isRent = intent.housing.mode === 'rent';
    const isHdb = intent.housing.type === 'hdb';
    const benchmarkPrice = isRent
      ? area.baselineRental3BR
      : isHdb
      ? area.baselineHdbMedianPrice
      : area.baselineCondoMedianPrice;

    // We allow a modest 10% stretch headroom for boundary filtering
    if (benchmarkPrice > maxBudget * 1.15) {
      const formattedBenchmark = isRent
        ? `$${benchmarkPrice.toLocaleString()}/mo`
        : `$${(benchmarkPrice / 1000000).toFixed(2)}M`;
      const formattedBudget = isRent
        ? `$${maxBudget.toLocaleString()}/mo`
        : `$${(maxBudget / 1000000).toFixed(2)}M`;
      return {
        passed: false,
        failedReason: `Exceeds budget ceiling (${formattedBenchmark} vs max ${formattedBudget})`
      };
    }
  }

  // 3. Maximum Commute Time Constraint
  if (resolvedWorkplaces.length > 0) {
    for (const wp of resolvedWorkplaces) {
      const commuteMinutes = estimateSingaporeCommuteMinutes(
        area.centroid.lat,
        area.centroid.lng,
        wp.lat,
        wp.lng
      );
      const threshold = wp.maxCommuteMinutes || 60;
      if (commuteMinutes > threshold + 10) {
        return {
          passed: false,
          failedReason: `Commute to ${wp.name} is ${commuteMinutes} min (exceeds max ${threshold} min)`
        };
      }
    }
  }

  // 4. MRT Proximity Constraint
  if (intent.transport.maxMrtDistanceMeters) {
    const nearestMrtDist = Math.min(
      ...area.mrtStations.map((mrt) =>
        calculateDistanceMeters(area.centroid.lat, area.centroid.lng, mrt.lat, mrt.lng)
      )
    );
    if (nearestMrtDist > intent.transport.maxMrtDistanceMeters * 1.3) {
      return {
        passed: false,
        failedReason: `Nearest MRT is ${nearestMrtDist}m away (exceeds ${intent.transport.maxMrtDistanceMeters}m limit)`
      };
    }
  }

  // 5. Primary School Radius Constraint
  if (intent.education.primarySchoolWithinMeters && intent.education.importance >= 4) {
    const nearestSchoolDist = Math.min(
      ...area.primarySchools.map((sch) =>
        calculateDistanceMeters(area.centroid.lat, area.centroid.lng, sch.lat, sch.lng)
      )
    );
    if (nearestSchoolDist > intent.education.primarySchoolWithinMeters * 1.4) {
      return {
        passed: false,
        failedReason: `No primary schools within ${intent.education.primarySchoolWithinMeters}m`
      };
    }
  }

  return { passed: true };
}
