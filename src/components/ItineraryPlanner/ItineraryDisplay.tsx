import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Store, 
  Navigation, 
  ExternalLink, 
  Share2, 
  Printer, 
  Sparkles, 
  IndianRupee, 
  CheckCircle2, 
  Tag, 
  Lightbulb, 
  ArrowRight,
  Bookmark,
  Share
} from 'lucide-react';
import { ItineraryPlan, ItineraryStop } from '../../types';
import { CostSummary } from './CostSummary';
import { generateGoogleMapsRouteUrl } from '../../services/routingService';

interface ItineraryDisplayProps {
  plan: ItineraryPlan;
  onOpenMapWithStops: (stops: ItineraryStop[]) => void;
  onSelectBusiness: (businessId: string) => void;
}

export const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({
  plan,
  onOpenMapWithStops,
  onSelectBusiness
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [savedLocally, setSavedLocally] = useState(false);

  const currentDay = plan.days[selectedDayIndex] || plan.days[0];

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = `🚩 Check out my AI-optimized Pune travel itinerary on Explore AI:\n*${plan.title}*\n${plan.subtitle}\n\nTop stops: ${currentDay.stops.map(s => s.title).join(' ➔ ')}\nTotal Budget: ₹${plan.totalEstimatedCostINR}/person`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSaveItinerary = () => {
    const existing = JSON.parse(localStorage.getItem('explore_ai_saved_plans') || '[]');
    existing.unshift(plan);
    localStorage.setItem('explore_ai_saved_plans', JSON.stringify(existing.slice(0, 10)));
    setSavedLocally(true);
    setTimeout(() => setSavedLocally(false), 3000);
  };

  const googleMapsUrl = generateGoogleMapsRouteUrl(currentDay.stops);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-orange-100 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-orange-100 text-orange-800">
                AI Generated Itinerary
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">Generated on {plan.generatedAt}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {plan.title}
            </h2>
            <p className="text-sm text-slate-600 mt-1">{plan.subtitle}</p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onOpenMapWithStops(currentDay.stops)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-sm transition-all"
            >
              <MapPin className="w-4 h-4" />
              <span>View Route on Map</span>
            </button>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Google Maps Link</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={handleSaveItinerary}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
            >
              <Bookmark className={`w-3.5 h-3.5 ${savedLocally ? 'text-emerald-600 fill-emerald-600' : ''}`} />
              <span>{savedLocally ? 'Saved!' : 'Save'}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all"
              title="Print Itinerary"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Pune Vibe Summary */}
        <div className="mt-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs sm:text-sm text-amber-950 leading-relaxed flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Puneri Vibe & Cultural Advice: </strong>
            <span>{plan.puneVibeSummary}</span>
          </div>
        </div>

        {/* Multi-Day Tabs */}
        {plan.days.length > 1 && (
          <div className="mt-6 flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
            {plan.days.map((day, idx) => (
              <button
                key={day.dayNumber}
                onClick={() => setSelectedDayIndex(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedDayIndex === idx
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Day {day.dayNumber}: {day.theme}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Expense Summary Widget */}
      <CostSummary plan={plan} />

      {/* Day Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <span>Day {currentDay.dayNumber}: {currentDay.title}</span>
            <span className="text-xs font-medium text-slate-500">
              ({currentDay.stops.length} stops • ~{currentDay.totalDistanceKm} km)
            </span>
          </h3>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-orange-200 space-y-6">
          {currentDay.stops.map((stop, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline pin */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-orange-500 flex items-center justify-center text-[11px] font-extrabold text-orange-600 shadow-sm">
                {idx + 1}
              </div>

              {/* Stop Card */}
              <div className="bg-white rounded-3xl border border-slate-200/90 hover:border-orange-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-md">
                        <Clock className="w-3 h-3" />
                        {stop.timeSlot}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {stop.neighborhood}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 mt-1">
                      {stop.title}
                    </h4>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl">
                      Est. ₹{stop.costINR}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {stop.description}
                </p>

                {/* Insider Pro Tip */}
                {stop.insiderTip && (
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-slate-900">Puneri Insider Tip: </strong>
                      <span>{stop.insiderTip}</span>
                    </div>
                  </div>
                )}

                {/* Local Business Partner Pairing */}
                {stop.localBusinessRecommendation && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50/70 via-teal-50/40 to-white border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Store className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-200/60 px-1.5 py-0.2 rounded">
                            Support Local Partner
                          </span>
                        </div>
                        <h5 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                          {stop.localBusinessRecommendation.businessName}
                        </h5>
                        <p className="text-xs text-slate-600">
                          <span className="font-medium text-emerald-900">Must Try/Buy: </span>
                          {stop.localBusinessRecommendation.whatToTryOrBuy}
                        </p>
                      </div>
                    </div>

                    {stop.localBusinessRecommendation.touristPerk && (
                      <div className="sm:text-right shrink-0">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100/90 border border-amber-300 px-2 py-1 rounded-lg">
                          <Tag className="w-3 h-3 text-amber-700" />
                          <span>{stop.localBusinessRecommendation.touristPerk}</span>
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Route guidance to next stop */}
                {stop.travelToNext && (
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-blue-500" />
                      <span>{stop.travelToNext.guidance}</span>
                    </div>
                    <span className="font-semibold text-slate-700">
                      ~{stop.travelToNext.durationMinutes} mins ({stop.travelToNext.distanceKm} km)
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
