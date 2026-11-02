import { ItineraryStop } from '../types';

/**
 * Calculates distance in kilometers between two GPS coordinates using Haversine formula
 */
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Estimates travel duration in minutes based on distance and transportation mode in Pune traffic
 */
export function estimateTravelTimeMinutes(
  distanceKm: number,
  mode: 'metro-auto' | 'cab' | 'two-wheeler' | 'walking'
): number {
  switch (mode) {
    case 'walking':
      // Average walking speed 4.5 km/h
      return Math.max(5, Math.round((distanceKm / 4.5) * 60));
    case 'two-wheeler':
      // Best for navigating Pune alleys, avg 25 km/h + 3 min buffer
      return Math.max(5, Math.round((distanceKm / 25) * 60) + 3);
    case 'metro-auto':
      // Metro fast transit + first/last mile auto connection
      return Math.max(8, Math.round((distanceKm / 20) * 60) + 7);
    case 'cab':
    default:
      // Pune city traffic avg 18 km/h + 5 min signal delays
      return Math.max(10, Math.round((distanceKm / 18) * 60) + 5);
  }
}

/**
 * Optimizes the stop sequence using Nearest-Neighbor heuristic to minimize travel distance
 */
export function optimizeStopSequence(stops: ItineraryStop[]): ItineraryStop[] {
  if (stops.length <= 2) return stops;

  const result: ItineraryStop[] = [];
  const unvisited = [...stops];

  // Start with the first stop (usually breakfast or morning highlight)
  let current = unvisited.shift()!;
  result.push(current);

  while (unvisited.length > 0) {
    let nearestIndex = 0;
    let shortestDist = Infinity;

    for (let i = 0; i < unvisited.length; i++) {
      const dist = calculateDistanceKm(current.lat, current.lng, unvisited[i].lat, unvisited[i].lng);
      if (dist < shortestDist) {
        shortestDist = dist;
        nearestIndex = i;
      }
    }

    current = unvisited.splice(nearestIndex, 1)[0];
    result.push(current);
  }

  return result;
}

/**
 * Generates an actionable Google Maps directions URL for all stops
 */
export function generateGoogleMapsRouteUrl(stops: ItineraryStop[]): string {
  if (stops.length === 0) return 'https://www.google.com/maps';
  if (stops.length === 1) {
    return `https://www.google.com/maps/search/?api=1&query=${stops[0].lat},${stops[0].lng}`;
  }

  const origin = `${stops[0].lat},${stops[0].lng}`;
  const destination = `${stops[stops.length - 1].lat},${stops[stops.length - 1].lng}`;
  const waypoints = stops
    .slice(1, -1)
    .map((s) => `${s.lat},${s.lng}`)
    .join('|');

  let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
  if (waypoints) {
    url += `&waypoints=${encodeURIComponent(waypoints)}`;
  }
  return url;
}
