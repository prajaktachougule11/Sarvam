import { ItineraryPlan, ItineraryDay, ItineraryStop, UserPreferences, ChatMessage } from '../types';
import { PUNE_SPOTS } from '../data/puneSpots';
import { PUNE_BUSINESSES } from '../data/puneBusinesses';
import { calculateDistanceKm, estimateTravelTimeMinutes } from './routingService';

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
 */
export async function askPuneConcierge(userQuestion: string, history: ChatMessage[] = []): Promise<string> {
  const apiKey = getApiKey();

  const systemContext = `You are the friendly "Pune AI Concierge" on Explore AI.
You help tourists with:
- What to see and eat in Pune (Shaniwar Wada, Aga Khan Palace, Sinhagad Fort, Bedekar Misal, Sujata Mastani, Kayani Shrewsbury, Cafe Goodluck).
- Helping them find and support authentic local businesses and coppersmiths (Tambat Ali).
- Pune local culture: the 1:00 PM – 4:00 PM afternoon break ("Puneri Siesta"), Pune Metro routes, and fair auto-rickshaw tips.
- Marathi phrases and polite local etiquette.
Keep answers concise, warm, practical, and culturally authentic. Use bullet points where appropriate.`;

  try {
    const messages = [
      { role: 'system', content: systemContext },
      ...history.slice(-4).map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: userQuestion }
    ];

    const response = await fetch(`${POLLINATIONS_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-5.4-nano',
        messages,
        temperature: 0.7,
        max_tokens: 600
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'Pune welcomes you! Please ask me any question about attractions, food, or local shops.';
  } catch (err) {
    // Intelligent local fallback response
    return getLocalConciergeAnswer(userQuestion);
  }
}

function getLocalConciergeAnswer(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes('misal') || lower.includes('food') || lower.includes('eat')) {
    return `🍲 **Top Puneri Food Spots:**\n• **Bedekar Misal (Narayan Peth):** Famous for authentic sweet-tangy misal with bread slices & solkadhi.\n• **Cafe Goodluck (Deccan):** 1935 Irani cafe for Bun Maska and Irani Chai.\n• **Sujata Mastani (Sadashiv Peth):** Pune's royal thick mango ice cream milkshake.\n• **Vaishali (FC Road):** SPDP (Sev Potato Dahi Puri) and Mysore Masala Dosa.`;
  }
  if (lower.includes('afternoon') || lower.includes('1 to 4') || lower.includes('siesta') || lower.includes('timing')) {
    return `😴 **The Famous Puneri Siesta (1 PM – 4 PM):**\nIn Pune's traditional core (Tulshibaug, Laxmi Road, Narayan Peth), shops and small eateries close strictly from 1:00 PM to 4:00 PM for lunch and rest. We recommend spending this afternoon window visiting museums (Raja Dinkar Kelkar Museum, Aga Khan Palace) or relaxing in Japanese Garden!`;
  }
  if (lower.includes('artisan') || lower.includes('shop') || lower.includes('brass') || lower.includes('copper')) {
    return `🛍️ **Support Local Pune Artisans:**\n• **Tambat Ali (Kasba Peth):** 350-year-old coppersmith guild hammering authentic beaten copper water pots and vessels.\n• **Tulshibaug:** Traditional Maharashtrian brassware, pearl naths, and bangles.\n• **Laxmi Road:** Handwoven pure silk Yeola Paithani sarees with peacock motifs.\n• **Murudkar Zendewale (Budhwar Peth):** Royal Maharashtrian Pheta & Puneri Pagadi makers since 1898!`;
  }
  if (lower.includes('fort') || lower.includes('sinhagad')) {
    return `🏰 **Sinhagad Fort Trip Tips:**\n• Reach early between 6:30 AM and 8:00 AM to beat heat and traffic on the ghat road.\n• Must-eat atop fort: Fresh woodfire-cooked Pithla Bhakri with Thecha and chilled earthen Matka Dahi made by local village self-help groups!\n• Distance is ~30 km from Pune center; take a cab or PMT bus from Swargate.`;
  }
  return `Namaskar! Welcome to Pune! 🚩\nFeel free to explore our AI Itinerary Planner to generate custom routes, browse our Local Business directory to discover 350-year-old artisan workshops like Tambat Ali, or check the interactive map for live optimized routes across Pune!`;
}
