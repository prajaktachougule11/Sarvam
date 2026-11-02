export type SpotCategory = 
  | 'heritage'
  | 'food'
  | 'nature'
  | 'spiritual'
  | 'museum'
  | 'shopping'
  | 'hidden-gem'
  | 'nightlife';

export interface TouristSpot {
  id: string;
  name: string;
  marathiName?: string;
  category: SpotCategory;
  neighborhood: string;
  lat: number;
  lng: number;
  description: string;
  proTip: string;
  bestTime: string;
  entryFee: {
    indian: number;
    foreigner: number;
    camera?: number;
  };
  recommendedDurationMinutes: number;
  openingHours: string;
  imageUrl: string;
  tags: string[];
  pairedBusinessId?: string;
  rating: number;
  reviewsCount: number;
}

export type BusinessCategory = 
  | 'artisan'
  | 'heritage-bakery'
  | 'sweets-savouries'
  | 'street-food'
  | 'traditional-wear'
  | 'bookstore'
  | 'cafe'
  | 'handicraft';

export interface LocalBusiness {
  id: string;
  name: string;
  marathiName?: string;
  category: BusinessCategory;
  neighborhood: string;
  address: string;
  lat: number;
  lng: number;
  foundedYear?: number;
  story: string;
  mustTryOrBuy: string[];
  priceRange: '₹' | '₹₹' | '₹₹₹';
  specialOfferForTourists?: string;
  promoCode?: string;
  contactNumber?: string;
  whatsapp?: string;
  imageUrl: string;
  verifiedLocal: boolean;
  isArtisanOwned?: boolean;
}

export interface UserPreferences {
  duration: 'half-day' | 'full-day' | '2-days' | '3-days' | 'custom';
  customHours?: number;
  budget: 'budget' | 'moderate' | 'luxury';
  interests: SpotCategory[];
  travelPace: 'relaxed' | 'balanced' | 'packed';
  companions: 'solo' | 'couple' | 'family' | 'friends';
  transportMode: 'metro-auto' | 'cab' | 'two-wheeler' | 'walking';
  startingLocation?: string;
  specialNotes?: string;
}

export interface ItineraryStop {
  timeSlot: string;
  spotId?: string;
  title: string;
  category: SpotCategory;
  neighborhood: string;
  lat: number;
  lng: number;
  durationMinutes: number;
  costINR: number;
  description: string;
  insiderTip: string;
  localBusinessRecommendation?: {
    businessId?: string;
    businessName: string;
    whatToTryOrBuy: string;
    neighborhood: string;
    touristPerk?: string;
  };
  travelToNext?: {
    distanceKm: number;
    durationMinutes: number;
    mode: string;
    guidance: string;
  };
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  theme: string;
  stops: ItineraryStop[];
  dayEstimatedBudgetINR: number;
  totalDistanceKm: number;
}

export interface ItineraryPlan {
  id: string;
  title: string;
  subtitle: string;
  generatedAt: string;
  puneVibeSummary: string;
  budgetCategory: string;
  totalEstimatedCostINR: number;
  days: ItineraryDay[];
  localEconomicImpactNote: string;
  aiSuggestedBy: string;
}

export interface CuratedTrail {
  id: string;
  title: string;
  marathiTitle: string;
  tagline: string;
  duration: string;
  budget: string;
  bestFor: string;
  highlights: string[];
  imageUrl: string;
  spotIds: string[];
  recommendedBusinesses: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}
