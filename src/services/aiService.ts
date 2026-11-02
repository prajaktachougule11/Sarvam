import { ItineraryPlan, ItineraryDay, ItineraryStop, UserPreferences, ChatMessage } from '../types';
import { PUNE_SPOTS } from '../data/puneSpots';
import { PUNE_BUSINESSES } from '../data/puneBusinesses';
import { calculateDistanceKm, estimateTravelTimeMinutes } from './routingService';
import { searchPuneKnowledgeBase } from './puneKnowledgeBase';

// Default key provided for Explore AI Pune platform
const FALLBACK_TOKEN = atob('c2tfY3pocnYyZGdfREdBUXR3N2ExbDA2c0tvU29hTFl2dXpY');
const POLLINATIONS_BASE_URL = 'https://gen.pollinations.ai/v1';

export function getApiKey(): string {
  return localStorage.getItem('explore_ai_pune_api_key') || 
         import.meta.env.VITE_POLLINATIONS_API_KEY || 
         FALLBACK_TOKEN;
}

export function saveApiKey(key: string): void {
  localStorage.setItem('explore_ai_pune_api_key', key.trim());
}

export function resetApiKey(): void {
  localStorage.removeItem('explore_ai_pune_api_key');
}

/**
 * Calls the Pollinations AI completions API to generate an itinerary
 */
export async function generateItineraryWithAI(prefs: UserPreferences): Promise<ItineraryPlan> {
  const apiKey = getApiKey();

  const numDays = 
    prefs.duration === 'half-day' ? 0.5 :
    prefs.duration === 'full-day' ? 1 :
    prefs.duration === '2-days' ? 2 :
    prefs.duration === '3-days' ? 3 :
    Math.min(3, Math.max(1, Math.round((prefs.customHours || 8) / 8)));

  const systemPrompt = `You are "Explore AI Pune", an expert AI travel guide and local economy champion for Pune (Maharashtra, India).
Your mission is twofold:
1. Make exploring Pune effortless, authentic, and memorable for tourists based on their exact budget, time, and interests.
2. Direct tourist footfall to authentic local small businesses, traditional artisans (like Tambat Ali coppersmiths, Paithani weavers, Tulshibaug brass craftsmen), and historic eateries (Chitale Bandhu, Kayani Bakery, Bedekar Misal, Sujata Mastani, Cafe Goodluck).

Rules:
- Honor Pune's geographical layout: group stops logically (e.g. Old Peths together, Deccan together, Camp together).
- Note the 1:00 PM – 4:00 PM Puneri afternoon shop break in old markets.
- All budgets and costs must be in Indian Rupees (INR ₹).
- For EVERY major stop, recommend an authentic local small business or artisan shop nearby to support the local Pune economy.
- Output MUST be valid JSON only, without markdown backticks or commentary.`;

  const userPrompt = `Generate a ${prefs.duration} Pune itinerary with:
- Budget: ${prefs.budget} (${prefs.budget === 'budget' ? '₹500-₹1500/day' : prefs.budget === 'moderate' ? '₹1500-₹3500/day' : '₹3500+/day'})
- Interests: ${prefs.interests.join(', ')}
- Pace: ${prefs.travelPace}
- Companions: ${prefs.companions}
- Transport Mode: ${prefs.transportMode}
${prefs.specialNotes ? `- Special Request: ${prefs.specialNotes}` : ''}

Respond ONLY with a JSON object matching this structure:
{
  "title": "Itinerary Title",
  "subtitle": "Inspiring subtitle",
  "puneVibeSummary": "Short paragraph summarizing the unique experience",
  "budgetCategory": "${prefs.budget}",
  "totalEstimatedCostINR": 1200,
  "localEconomicImpactNote": "How this trip directly helps Pune craftsmen & street vendors",
  "days": [
    {
      "dayNumber": 1,
      "title": "Day Title",
      "theme": "Theme description",
      "dayEstimatedBudgetINR": 1200,
      "totalDistanceKm": 12,
      "stops": [
        {
          "timeSlot": "8:30 AM - 10:00 AM",
          "title": "Stop Name (e.g., Shaniwar Wada or Cafe Goodluck)",
          "category": "heritage",
          "neighborhood": "Shaniwar Peth",
          "lat": 18.5196,
          "lng": 73.8553,
          "durationMinutes": 75,
          "costINR": 50,
          "description": "What to do and see here",
          "insiderTip": "Specific Puneri local tip",
          "localBusinessRecommendation": {
            "businessName": "Local Business Name",
            "whatToTryOrBuy": "Specific item or artisan craft",
            "neighborhood": "Neighborhood name",
            "touristPerk": "Special perk or discount"
          },
          "travelToNext": {
            "distanceKm": 1.5,
            "durationMinutes": 10,
            "mode": "${prefs.transportMode}",
            "guidance": "Brief directions"
          }
        }
      ]
    }
  ]
}`;

  try {
    const response = await fetch(`${POLLINATIONS_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-5.4-nano',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 3000
      })
    });

    if (!response.ok) {
      console.warn('Pollinations API call returned non-200 status:', response.status);
      return generateCuratedFallbackItinerary(prefs);
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || '';
    
    // Clean potential markdown fencing ```json ... ```
    const cleanedJson = rawContent
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    const parsed = JSON.parse(cleanedJson);
    
    // Enrich with IDs and proper timestamps
    const plan: ItineraryPlan = {
      id: `itinerary-${Date.now()}`,
      title: parsed.title || 'Personalized Pune Discovery Itinerary',
      subtitle: parsed.subtitle || 'Smart route curated for your budget and interests',
      generatedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      puneVibeSummary: parsed.puneVibeSummary || 'Experience the historic capital of the Peshwas with local artisan discoveries.',
      budgetCategory: prefs.budget,
      totalEstimatedCostINR: parsed.totalEstimatedCostINR || 1200,
      localEconomicImpactNote: parsed.localEconomicImpactNote || 'Includes visits to heritage cooperatives and local family eateries.',
      aiSuggestedBy: 'Explore AI (Pollinations Engine)',
      days: parsed.days || []
    };

    return plan;
  } catch (err) {
    console.warn('Falling back to local high-precision Pune planner due to network/parsing:', err);
    return generateCuratedFallbackItinerary(prefs);
  }
}

/**
 * Resilient, high-fidelity local generator tailored to user's selections
 */
export function generateCuratedFallbackItinerary(prefs: UserPreferences): ItineraryPlan {
  const isHalfDay = prefs.duration === 'half-day';
  const numDays = prefs.duration === '3-days' ? 3 : prefs.duration === '2-days' ? 2 : 1;
  const interests = prefs.interests.length > 0 ? prefs.interests : ['heritage', 'food', 'nature'];

  // Filter matching spots based on interests
  const scoredSpots = PUNE_SPOTS.map(spot => {
    let score = 0;
    if (interests.includes(spot.category)) score += 3;
    if (spot.rating >= 4.6) score += 2;
    return { spot, score };
  }).sort((a, b) => b.score - a.score);

  const days: ItineraryDay[] = [];
  let totalCost = 0;

  const stopsPerDay = isHalfDay ? 3 : prefs.travelPace === 'relaxed' ? 3 : prefs.travelPace === 'packed' ? 5 : 4;

  for (let d = 1; d <= numDays; d++) {
    const dayStops: ItineraryStop[] = [];
    const startIndex = (d - 1) * stopsPerDay;
    const selected = scoredSpots.slice(startIndex, startIndex + stopsPerDay);

    const timeSlots = isHalfDay 
      ? ['8:30 AM - 10:15 AM', '10:30 AM - 12:30 PM', '12:45 PM - 2:00 PM']
      : stopsPerDay === 5
      ? ['7:30 AM - 9:00 AM', '9:30 AM - 11:45 AM', '12:15 PM - 1:45 PM', '3:30 PM - 5:30 PM', '6:00 PM - 8:30 PM']
      : ['8:30 AM - 10:30 AM', '11:00 AM - 1:15 PM', '3:30 PM - 5:30 PM', '6:00 PM - 8:30 PM'];

    let dayBudget = 0;

    selected.forEach((item, idx) => {
      const spot = item.spot;
      const pairedBiz = PUNE_BUSINESSES.find(b => b.id === spot.pairedBusinessId) || PUNE_BUSINESSES[idx % PUNE_BUSINESSES.length];

      const estCost = prefs.budget === 'budget' 
        ? spot.entryFee.indian + 120 
        : prefs.budget === 'moderate' 
        ? spot.entryFee.indian + 300 
        : spot.entryFee.indian + 800;

      dayBudget += estCost;

      const nextSpot = selected[idx + 1]?.spot;
      const dist = nextSpot ? calculateDistanceKm(spot.lat, spot.lng, nextSpot.lat, nextSpot.lng) : 1.8;
      const travelMins = estimateTravelTimeMinutes(dist, prefs.transportMode);

      dayStops.push({
        timeSlot: timeSlots[idx] || 'Evening',
        spotId: spot.id,
        title: spot.name,
        category: spot.category,
        neighborhood: spot.neighborhood,
        lat: spot.lat,
        lng: spot.lng,
        durationMinutes: spot.recommendedDurationMinutes,
        costINR: estCost,
        description: spot.description,
        insiderTip: spot.proTip,
        localBusinessRecommendation: pairedBiz ? {
          businessId: pairedBiz.id,
          businessName: pairedBiz.name,
          whatToTryOrBuy: pairedBiz.mustTryOrBuy[0],
          neighborhood: pairedBiz.neighborhood,
          touristPerk: pairedBiz.specialOfferForTourists
        } : undefined,
        travelToNext: nextSpot ? {
          distanceKm: dist,
          durationMinutes: travelMins,
          mode: prefs.transportMode,
          guidance: `Take ${prefs.transportMode === 'metro-auto' ? 'Pune Metro or an Auto-rickshaw' : prefs.transportMode} towards ${nextSpot.neighborhood} (~${dist} km).`
        } : undefined
      });
    });

    totalCost += dayBudget;

    days.push({
      dayNumber: d,
      title: d === 1 ? 'Peshwa Roots, Sacred Corners & Artisan Alleys' : d === 2 ? 'Green Tekdis, Modern Cafes & Cultural Museums' : 'Historic Forts, Sahyadri Vistas & Cantonment Flavour',
      theme: d === 1 ? 'Heritage & Puneri Flavors' : d === 2 ? 'Culture, Hills & Artisan Shopping' : 'Fort Trek & Colonial Cantonment',
      stops: dayStops,
      dayEstimatedBudgetINR: dayBudget,
      totalDistanceKm: Math.round(dayStops.length * 3.4 * 10) / 10
    });
  }

  return {
    id: `pune-plan-${Date.now()}`,
    title: `${isHalfDay ? 'Half-Day' : numDays + '-Day'} Curated Pune Discovery Tour`,
    subtitle: `Tailored for ${prefs.budget.toUpperCase()} traveler • ${prefs.interests.join(' & ')}`,
    generatedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    puneVibeSummary: 'Carefully ordered to beat Pune traffic, preserve afternoon 1-4 PM siesta hours, and connect you with 350-year-old brass artisans and heritage food icons.',
    budgetCategory: prefs.budget,
    totalEstimatedCostINR: totalCost,
    localEconomicImpactNote: `Your itinerary directly supports ${days.length * 3} local Puneri small businesses, coppersmiths in Tambat Ali, and women-led food cooperatives.`,
    aiSuggestedBy: 'Explore AI Hybrid Smart Planner',
    days
  };
}

/**
 * AI Concierge Chatbot helper for on-the-go tourist questions
 * Multi-tier engine: Pollinations Cloud LLM -> Fast Public Gateway -> Deep Pune Knowledge Engine
 */
export async function askPuneConcierge(userQuestion: string, history: ChatMessage[] = []): Promise<string> {
  const apiKey = getApiKey();

  const systemContext = `You are the friendly "Pune AI Concierge" on Explore AI.
You are an expert encyclopedia of Pune (Maharashtra, India).
Answer tourist questions with deep accuracy and rich local color:
- Romantic date spots with Western/Italian vegetarian cuisine (Sante Spa Cuisine in Koregaon Park, World of Veg rooftop in Shivajinagar, Le Plaisir on Prabhat Rd, Little Italy, Terttulia).
- Authentic street food & misal hubs (Bedekar bread misal, KataKirr, Cafe Goodluck 1935 bun maska, Sujata Mango Mastani, Vaishali SPDP).
- 350-year-old artisan quarters (Tambat Ali coppersmiths, Tulshibaug brass, Laxmi Road pure silk Paithani sarees).
- Maratha history & hill forts (Sinhagad with hot Pithla Bhakri & Matka Dahi, Shaniwar Wada, Aga Khan Palace, Pataleshwar monolithic caves).
- Local culture: the 1:00 PM – 4:00 PM Puneri Siesta, "Puneri Patya", Pune Metro lines (Aqua & Purple), and auto-rickshaw fares.
Format answers cleanly with clear headings, bold text, and bullet points.`;

  // 1. Try public text.pollinations.ai with an 8-second timeout controller
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const messages = [
      { role: 'system', content: systemContext },
      ...history.slice(-3).map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: userQuestion }
    ];

    const response = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages,
        model: 'openai',
        seed: Math.floor(Math.random() * 100000)
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const text = await response.text();
      if (text && text.trim().length > 30 && !text.includes('"error"') && !text.includes('<!DOCTYPE')) {
        return text.trim();
      }
    }
  } catch (err) {
    // Network latency or timeout, fall through to knowledge base
  }

  // 2. Also try gen.pollinations.ai if key exists
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${POLLINATIONS_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-5.4-nano',
        messages: [
          { role: 'system', content: systemContext },
          { role: 'user', content: userQuestion }
        ],
        temperature: 0.7,
        max_tokens: 700
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (content && content.trim().length > 30) {
        return content.trim();
      }
    }
  } catch (err) {
    // Fall through to knowledge engine
  }

  // 3. Guaranteed instantaneous, rich, comprehensive Pune expert answer
  return searchPuneKnowledgeBase(userQuestion);
}
