/**
 * Singapore Transit & Distance Computation Utilities
 */

// Earth radius in km
const EARTH_RADIUS_KM = 6371;

/**
 * Calculates Haversine distance between two GPS coordinates in meters
 */
export function calculateDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(EARTH_RADIUS_KM * c * 1000);
}

/**
 * Estimates realistic public transport commute time in Singapore between two coordinates in minutes
 * Accounts for first-mile/last-mile walk (5-8 mins), train transfer penalties (4 mins), and average MRT speed (35 km/h).
 */
export function estimateSingaporeCommuteMinutes(
  originLat: number,
  originLng: number,
  destLat: number,
  destLng: number
): number {
  const distMeters = calculateDistanceMeters(originLat, originLng, destLat, destLng);
  const distKm = distMeters / 1000;

  if (distKm < 0.8) {
    // Walking distance
    return Math.max(5, Math.round((distKm / 4.5) * 60));
  }

  // Base walk + platform wait time: 7 minutes
  const baseOverhead = 7;
  // MRT travel time ~ 1.8 minutes per km straight-line equivalent
  const travelTime = distKm * 1.8;
  // Transfer penalty if distance > 8km (likely requires MRT line interchange)
  const transferPenalties = distKm > 15 ? 8 : distKm > 8 ? 4 : 0;

  return Math.round(baseOverhead + travelTime + transferPenalties);
}
