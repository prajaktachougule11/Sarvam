import React from 'react';
import { Heart, HeartHandshake, Compass, MapPin, Store, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenAddBusiness: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAddBusiness }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white text-lg font-bold shadow-md">
                🚩
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Explore <span className="text-orange-500">AI</span> Pune
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Smart Tourism and Local Business Discovery Platform for Pune, Maharashtra. Built to help visitors explore heritage wadas, tekdis, and iconic misal while boosting footfall for 350-year-old artisan workshops and small family enterprises.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-orange-400 font-semibold">
              <HeartHandshake className="w-4 h-4" />
              <span>Supporting Local Pune MSMEs & Artisans</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Explore Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('planner')}
                  className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                  <span>AI Itinerary Planner</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('map')}
                  className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                  <span>Interactive Map & Routes</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('businesses')}
                  className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <Store className="w-3.5 h-3.5 text-orange-500" />
                  <span>Local Businesses & Artisans</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('trails')}
                  className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-orange-500" />
                  <span>Curated Thematic Trails</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Business Community */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              For Pune Shopkeepers & Artisans
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Are you a local craftsman, traditional bakery, or neighborhood food stall owner in Pune? Join Explore AI to connect with incoming tourists.
            </p>
            <button
              onClick={onOpenAddBusiness}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors shadow-sm inline-block"
            >
              Register Your Business (Free)
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Explore AI – Pune Smart Tourism Platform.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for the cultural capital of Maharashtra.
          </p>
        </div>
      </div>
    </footer>
  );
};
