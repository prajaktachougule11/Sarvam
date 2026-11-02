import React from 'react';
import { 
  Compass, 
  Clock, 
  IndianRupee, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Store, 
  CheckCircle2 
} from 'lucide-react';
import { CuratedTrail, TouristSpot } from '../../types';
import { CURATED_TRAILS } from '../../data/curatedTrails';
import { PUNE_SPOTS } from '../../data/puneSpots';
import { PUNE_BUSINESSES } from '../../data/puneBusinesses';

interface CuratedTrailsViewProps {
  onSelectTrail: (trail: CuratedTrail) => void;
  onViewOnMap: (spots: TouristSpot[]) => void;
}

export const CuratedTrailsView: React.FC<CuratedTrailsViewProps> = ({
  onSelectTrail,
  onViewOnMap
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-extrabold uppercase tracking-wider backdrop-blur-xs">
            Signature Pune Experiences
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Curated Thematic Pune Trails
          </h2>
          <p className="text-xs sm:text-sm text-orange-100 leading-relaxed">
            Hand-crafted itineraries engineered by local Punekars. Each trail balances historical depth, authentic food stops, and direct patronage to neighborhood artisans.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {CURATED_TRAILS.map((trail) => {
          const matchedSpots = PUNE_SPOTS.filter((s) => trail.spotIds.includes(s.id));
          const matchedBiz = PUNE_BUSINESSES.filter((b) => trail.recommendedBusinesses.includes(b.id));

          return (
            <div
              key={trail.id}
              className="bg-white rounded-3xl border border-slate-200/90 hover:border-orange-300 shadow-sm hover:shadow-lg transition-all flex flex-col overflow-hidden"
            >
              {/* Header Image */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={trail.imageUrl}
                  alt={trail.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-orange-500/90 text-white text-[10px] font-bold backdrop-blur-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {trail.duration}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-900/80 text-white text-[10px] font-bold backdrop-blur-xs">
                    {trail.budget}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-lg font-extrabold leading-snug">{trail.title}</h3>
                  <p className="text-xs text-amber-300 font-semibold">{trail.marathiTitle}</p>
                </div>
              </div>

              {/* Trail Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {trail.tagline}
                  </p>

                  {/* Highlights checklist */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Trail Highlights:
                    </div>
                    {trail.highlights.slice(0, 4).map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Supported Local Businesses Pill */}
                  {matchedBiz.length > 0 && (
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
                        <Store className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Supports Local Partners:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {matchedBiz.map((b) => (
                          <span
                            key={b.id}
                            className="bg-white px-2 py-0.5 rounded-md border border-emerald-200 text-[10px] font-semibold text-emerald-800"
                          >
                            {b.name.split('(')[0]}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onSelectTrail(trail)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Load Trail in Planner</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onViewOnMap(matchedSpots)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                    title="View trail stops on interactive map"
                  >
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    <span>Map</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
