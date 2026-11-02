import React from 'react';
import { Sparkles, MapPin, Store, ArrowRight, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';

interface HeroProps {
  onStartPlanning: () => void;
  onExploreMap: () => void;
  onDiscoverBusinesses: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartPlanning,
  onExploreMap,
  onDiscoverBusinesses
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-amber-50/40 to-white pt-8 pb-12 border-b border-orange-100/60">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-orange-200/40 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 -ml-24 w-80 h-80 rounded-full bg-amber-200/30 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Mission pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-200/80 text-orange-900 text-xs font-bold shadow-xs mb-5">
          <HeartHandshake className="w-4 h-4 text-orange-600" />
          <span>Our Mission: Empower Tourists & Boost Pune's Local Economy</span>
        </div>

        {/* Main Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-red-600">Pune</span> Smarter.{' '}
              <span className="block text-slate-800 text-2xl sm:text-4xl mt-1 font-serif italic font-normal">
                Support Local Businesses.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Generate personalized travel itineraries matching your <strong className="text-slate-800 font-semibold">budget</strong>,{' '}
              <strong className="text-slate-800 font-semibold">interests</strong>, and <strong className="text-slate-800 font-semibold">time</strong>.
              Discover Maratha forts, historic wadas, authentic misal hubs, and 350-year-old artisan workshops—with smart maps and optimized routes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartPlanning}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Personal Itinerary</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={onExploreMap}
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-sm hover:shadow transition-all"
              >
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>Interactive Map & Routes</span>
              </button>

              <button
                onClick={onDiscoverBusinesses}
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-sm border border-emerald-200 transition-all"
              >
                <Store className="w-4 h-4 text-emerald-600" />
                <span>Discover Local Artisans</span>
              </button>
            </div>

            {/* Mini trust checklist */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 pt-2 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Pollinations AI Powered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-orange-600" />
                <span>Optimized Travel Routes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-amber-600" />
                <span>100% Direct MSME Promotion</span>
              </div>
            </div>
          </div>

          {/* Right Visual Highlight Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-6 bg-gradient-to-br from-white via-orange-50/50 to-amber-100/40 border border-orange-200/80 shadow-xl shadow-orange-950/5">
              <div className="flex items-center justify-between pb-4 border-b border-orange-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="text-xs font-bold text-slate-700 ml-1">Explore AI Smart Engine</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                  Live in Pune
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="p-3.5 rounded-2xl bg-white/90 border border-orange-100/80 shadow-xs flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold shrink-0 text-sm">
                    🏛️
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Iconic Heritage & Forts</h4>
                    <p className="text-[11px] text-slate-500">Shaniwar Wada, Aga Khan Palace, Sinhagad summit with scenic Sahyadri routes.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/90 border border-orange-100/80 shadow-xs flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold shrink-0 text-sm">
                    🔨
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">350-Year Coppersmiths (Tambat Ali)</h4>
                    <p className="text-[11px] text-slate-500">Directly visit artisanal guilds, learn beaten-copper craft, and get tourist discounts.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/90 border border-orange-100/80 shadow-xs flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center text-red-600 font-bold shrink-0 text-sm">
                    🍲
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Puneri Misal & Bakery Treasures</h4>
                    <p className="text-[11px] text-slate-500">Bedekar Misal, Sujata Mango Mastani, Kayani Shrewsbury, & Cafe Goodluck.</p>
                  </div>
                </div>
              </div>

              {/* Stat footer */}
              <div className="mt-4 pt-3 border-t border-orange-100 grid grid-cols-3 text-center">
                <div>
                  <div className="text-base font-extrabold text-orange-600">30+</div>
                  <div className="text-[10px] text-slate-500">Curated Spots</div>
                </div>
                <div>
                  <div className="text-base font-extrabold text-slate-900">100%</div>
                  <div className="text-[10px] text-slate-500">Pune Native</div>
                </div>
                <div>
                  <div className="text-base font-extrabold text-emerald-600">₹0</div>
                  <div className="text-[10px] text-slate-500">Commission Free</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
