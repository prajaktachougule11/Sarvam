import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PlannerForm } from './components/ItineraryPlanner/PlannerForm';
import { ItineraryDisplay } from './components/ItineraryPlanner/ItineraryDisplay';
import { InteractiveMap } from './components/Map/InteractiveMap';
import { BusinessDirectory } from './components/LocalBusiness/BusinessDirectory';
import { AddBusinessModal } from './components/LocalBusiness/AddBusinessModal';
import { CuratedTrailsView } from './components/CuratedTrails/CuratedTrailsView';
import { AiConcierge } from './components/Chat/AiConcierge';
import { PuneSurvivalGuide } from './components/Guide/PuneSurvivalGuide';
import { ApiKeyModal } from './components/ApiKeyModal';
import { Footer } from './components/Footer';

import { ItineraryPlan, ItineraryStop, UserPreferences, CuratedTrail, LocalBusiness, TouristSpot } from './types';
import { generateItineraryWithAI, generateCuratedFallbackItinerary } from './services/aiService';
import { PUNE_BUSINESSES } from './data/puneBusinesses';
import { PUNE_SPOTS } from './data/puneSpots';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('planner');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Default loaded initial plan
  const [currentPlan, setCurrentPlan] = useState<ItineraryPlan>(() => {
    return generateCuratedFallbackItinerary({
      duration: 'full-day',
      budget: 'moderate',
      interests: ['heritage', 'food', 'shopping'],
      travelPace: 'balanced',
      companions: 'solo',
      transportMode: 'metro-auto'
    });
  });

  // Highlighted stops on map
  const [mapStops, setMapStops] = useState<ItineraryStop[]>(() => currentPlan.days[0]?.stops || []);

  // Registered local businesses
  const [businesses, setBusinesses] = useState<LocalBusiness[]>(() => {
    const saved = localStorage.getItem('explore_ai_pune_custom_biz');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...parsed, ...PUNE_BUSINESSES];
      } catch (e) {
        return PUNE_BUSINESSES;
      }
    }
    return PUNE_BUSINESSES;
  });

  // Modals
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isAddBizModalOpen, setIsAddBizModalOpen] = useState(false);

  // Handle Itinerary generation
  const handleGenerateItinerary = async (prefs: UserPreferences) => {
    setIsGenerating(true);
    try {
      const plan = await generateItineraryWithAI(prefs);
      setCurrentPlan(plan);
      if (plan.days[0]?.stops) {
        setMapStops(plan.days[0].stops);
      }
      // Scroll smoothly down to the itinerary view
      window.scrollTo({ top: 500, behavior: 'smooth' });
    } catch (err) {
      console.error('Error generating itinerary:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle loading a curated trail
  const handleSelectCuratedTrail = (trail: CuratedTrail) => {
    const matchingSpots = PUNE_SPOTS.filter((s) => trail.spotIds.includes(s.id));
    const stops: ItineraryStop[] = matchingSpots.map((spot, idx) => ({
      timeSlot: idx === 0 ? '9:00 AM - 11:30 AM' : idx === 1 ? '12:00 PM - 2:00 PM' : '3:30 PM - 6:00 PM',
      spotId: spot.id,
      title: spot.name,
      category: spot.category,
      neighborhood: spot.neighborhood,
      lat: spot.lat,
      lng: spot.lng,
      durationMinutes: spot.recommendedDurationMinutes,
      costINR: spot.entryFee.indian + 150,
      description: spot.description,
      insiderTip: spot.proTip,
      localBusinessRecommendation: {
        businessName: PUNE_BUSINESSES[idx % PUNE_BUSINESSES.length].name,
        whatToTryOrBuy: PUNE_BUSINESSES[idx % PUNE_BUSINESSES.length].mustTryOrBuy[0],
        neighborhood: PUNE_BUSINESSES[idx % PUNE_BUSINESSES.length].neighborhood,
        touristPerk: PUNE_BUSINESSES[idx % PUNE_BUSINESSES.length].specialOfferForTourists
      }
    }));

    const plan: ItineraryPlan = {
      id: `trail-${trail.id}`,
      title: trail.title,
      subtitle: `${trail.tagline} (${trail.duration})`,
      generatedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      puneVibeSummary: `Curated signature Pune trail focusing on ${trail.bestFor}. Direct stops at heritage spots and historic artisan businesses.`,
      budgetCategory: 'balanced',
      totalEstimatedCostINR: 950,
      localEconomicImpactNote: `Directly patronizes ${trail.recommendedBusinesses.length} small enterprises and artisans.`,
      aiSuggestedBy: 'Explore AI Curated Editorial Engine',
      days: [
        {
          dayNumber: 1,
          title: trail.title,
          theme: trail.marathiTitle,
          stops,
          dayEstimatedBudgetINR: 950,
          totalDistanceKm: 14.2
        }
      ]
    };

    setCurrentPlan(plan);
    setMapStops(stops);
    setActiveTab('planner');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Handle viewing specific spots on map
  const handleViewSpotsOnMap = (spots: TouristSpot[]) => {
    const dummyStops: ItineraryStop[] = spots.map((spot, idx) => ({
      timeSlot: `Stop ${idx + 1}`,
      spotId: spot.id,
      title: spot.name,
      category: spot.category,
      neighborhood: spot.neighborhood,
      lat: spot.lat,
      lng: spot.lng,
      durationMinutes: 60,
      costINR: 100,
      description: spot.description,
      insiderTip: spot.proTip
    }));
    setMapStops(dummyStops);
    setActiveTab('map');
  };

  // Handle new business registration
  const handleAddNewBusiness = (newBiz: LocalBusiness) => {
    const updated = [newBiz, ...businesses];
    setBusinesses(updated);
    // Persist user-added business to localStorage
    const userOnly = updated.filter((b) => !PUNE_BUSINESSES.some((pb) => pb.id === b.id));
    localStorage.setItem('explore_ai_pune_custom_biz', JSON.stringify(userOnly));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onOpenAddBusinessModal={() => setIsAddBizModalOpen(true)}
      />

      {/* Hero Header */}
      <Hero
        onStartPlanning={() => {
          setActiveTab('planner');
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
        onExploreMap={() => setActiveTab('map')}
        onDiscoverBusinesses={() => setActiveTab('businesses')}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* TAB 1: AI ITINERARY PLANNER */}
        {activeTab === 'planner' && (
          <div className="space-y-10">
            <div>
              <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
                <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider">
                  Personalized AI Travel Engine
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Design Your Perfect Pune Itinerary
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Select your time, budget, and passions. Our AI algorithm crafts an optimized route pairing famous monuments with neighborhood artisans and generational eateries.
                </p>
              </div>

              {/* Wizard Form */}
              <PlannerForm onGenerate={handleGenerateItinerary} isLoading={isGenerating} />
            </div>

            {/* Generated / Loaded Itinerary View */}
            <div className="pt-4">
              <ItineraryDisplay
                plan={currentPlan}
                onOpenMapWithStops={(stops) => {
                  setMapStops(stops);
                  setActiveTab('map');
                }}
                onSelectBusiness={(bizId) => {
                  setActiveTab('businesses');
                }}
              />
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE MAP */}
        {activeTab === 'map' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Interactive Pune Discovery Map & Routes
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Explore geocoded attractions, heritage wadas, tekdis, and verified local businesses. The dashed orange route reflects your active itinerary.
              </p>
            </div>

            <InteractiveMap highlightedStops={mapStops} />
          </div>
        )}

        {/* TAB 3: LOCAL BUSINESS DIRECTORY */}
        {activeTab === 'businesses' && (
          <BusinessDirectory
            onOpenAddBusinessModal={() => setIsAddBizModalOpen(true)}
            businessesList={businesses}
          />
        )}

        {/* TAB 4: CURATED THEMATIC TRAILS */}
        {activeTab === 'trails' && (
          <CuratedTrailsView
            onSelectTrail={handleSelectCuratedTrail}
            onViewOnMap={handleViewSpotsOnMap}
          />
        )}

        {/* TAB 5: AI CONCIERGE CHAT */}
        {activeTab === 'concierge' && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Ask the Pune AI Concierge
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Powered by Pollinations AI. Ask about metro routes, afternoon siesta hours, authentic misal spots, or Marathi translations!
              </p>
            </div>
            <AiConcierge />
          </div>
        )}

        {/* TAB 6: PUNE SURVIVAL & TRAVELER GUIDE */}
        {activeTab === 'guide' && <PuneSurvivalGuide />}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAddBusiness={() => setIsAddBizModalOpen(true)}
      />

      {/* Modals */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
      />

      <AddBusinessModal
        isOpen={isAddBizModalOpen}
        onClose={() => setIsAddBizModalOpen(false)}
        onAddBusiness={handleAddNewBusiness}
      />
    </div>
  );
};
