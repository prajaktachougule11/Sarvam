import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  Wallet, 
  Heart, 
  Footprints, 
  Users, 
  Car, 
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { UserPreferences, SpotCategory } from '../../types';

interface PlannerFormProps {
  onGenerate: (prefs: UserPreferences) => void;
  isLoading: boolean;
}

export const PlannerForm: React.FC<PlannerFormProps> = ({ onGenerate, isLoading }) => {
  const [duration, setDuration] = useState<UserPreferences['duration']>('full-day');
  const [budget, setBudget] = useState<UserPreferences['budget']>('moderate');
  const [selectedInterests, setSelectedInterests] = useState<SpotCategory[]>([
    'heritage',
    'food',
    'shopping'
  ]);
  const [travelPace, setTravelPace] = useState<UserPreferences['travelPace']>('balanced');
  const [companions, setCompanions] = useState<UserPreferences['companions']>('solo');
  const [transportMode, setTransportMode] = useState<UserPreferences['transportMode']>('metro-auto');
  const [startingLocation, setStartingLocation] = useState('Deccan / Pune Station');
  const [specialNotes, setSpecialNotes] = useState('');

  const toggleInterest = (category: SpotCategory) => {
    if (selectedInterests.includes(category)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter((c) => c !== category));
      }
    } else {
      setSelectedInterests([...selectedInterests, category]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      duration,
      budget,
      interests: selectedInterests,
      travelPace,
      companions,
      transportMode,
      startingLocation,
      specialNotes: specialNotes.trim()
    });
  };

  const interestOptions: { id: SpotCategory; label: string; icon: string; desc: string }[] = [
    { id: 'heritage', label: 'Maratha Heritage', icon: '🏛️', desc: 'Shaniwar Wada, Lal Mahal, Sinhagad' },
    { id: 'food', label: 'Puneri Food & Sweets', icon: '🍲', desc: 'Bedekar Misal, Sujata Mastani, SPDP' },
    { id: 'shopping', label: 'Artisans & Bazaars', icon: '🛍️', desc: 'Tambat Ali, Paithani silk, Tulshibaug' },
    { id: 'nature', label: 'Tekdis & Lake Sunsets', icon: '🌿', desc: 'Vetal Tekdi, Khadakwasla, Zen Park' },
    { id: 'museum', label: 'Museums & Miniatures', icon: '🎨', desc: 'Kelkar Museum, Miniature Railway' },
    { id: 'spiritual', label: 'Historic Temples', icon: '🛕', desc: 'Dagdusheth Ganpati, Pataleshwar' },
    { id: 'hidden-gem', label: 'Hidden Gems', icon: '💎', desc: 'Tribal Art, Blades of Glory, Bamboo Zen' }
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-orange-100 shadow-xl p-6 sm:p-8 space-y-8">
      {/* Step 1: Duration & Available Time */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-orange-600" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            1. Available Time in Pune
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'half-day', label: 'Half Day', sub: '4 – 5 Hours' },
            { id: 'full-day', label: 'Full Day', sub: '8 – 10 Hours' },
            { id: '2-days', label: '2 Days', sub: 'Weekend Gateway' },
            { id: '3-days', label: '3 Days', sub: 'Deep Discovery' }
          ].map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setDuration(item.id as UserPreferences['duration'])}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                duration === item.id
                  ? 'border-orange-500 bg-orange-50/70 text-orange-950 ring-2 ring-orange-500/20'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <div className="text-sm font-bold">{item.label}</div>
              <div className="text-xs text-slate-500 mt-0.5">{item.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Budget */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Wallet className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            2. Travel Budget (Per Person / Day)
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              id: 'budget',
              title: 'Budget / Backpacker',
              cost: '₹500 – ₹1,500',
              desc: 'Street eats, public metro/bus, free & low-fee heritage spots'
            },
            {
              id: 'moderate',
              title: 'Moderate / Balanced',
              cost: '₹1,500 – ₹3,500',
              desc: 'Iconic cafes (Goodluck, Vaishali), auto/cabs, all museums & shopping'
            },
            {
              id: 'luxury',
              title: 'Comfort / Premium',
              cost: '₹3,500+',
              desc: 'Premium dining, private AC cab, artisanal handloom & brass shopping'
            }
          ].map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setBudget(item.id as UserPreferences['budget'])}
              className={`p-4 rounded-2xl border text-left transition-all ${
                budget === item.id
                  ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-500/20'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">{item.title}</span>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  {item.cost}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-snug">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Step 3: Interests & Passions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              3. Interests & Puneri Experiences
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            {selectedInterests.length} selected
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {interestOptions.map((opt) => {
            const isSelected = selectedInterests.includes(opt.id);
            return (
              <button
                type="button"
                key={opt.id}
                onClick={() => toggleInterest(opt.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50/70 text-orange-950 ring-2 ring-orange-500/20'
                    : 'border-slate-200 bg-slate-50/40 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span className="text-2xl shrink-0 mt-0.5">{opt.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold flex items-center justify-between">
                    <span>{opt.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-orange-600 shrink-0" />}
                  </div>
                  <div className="text-xs text-slate-500 truncate mt-0.5">{opt.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 4: Pace, Companions & Transit */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
            <Footprints className="w-4 h-4 text-slate-500" />
            <span>Travel Pace</span>
          </label>
          <select
            value={travelPace}
            onChange={(e) => setTravelPace(e.target.value as any)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            <option value="relaxed">Relaxed (fewer stops, slow chai)</option>
            <option value="balanced">Balanced (best sightseeing mix)</option>
            <option value="packed">Packed (cover everything fast)</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
            <Users className="w-4 h-4 text-slate-500" />
            <span>Who is traveling?</span>
          </label>
          <select
            value={companions}
            onChange={(e) => setCompanions(e.target.value as any)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            <option value="solo">Solo Explorer</option>
            <option value="couple">Couple / Partners</option>
            <option value="family">Family with Kids / Elders</option>
            <option value="friends">Group of Friends</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
            <Car className="w-4 h-4 text-slate-500" />
            <span>Transit Preference</span>
          </label>
          <select
            value={transportMode}
            onChange={(e) => setTransportMode(e.target.value as any)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            <option value="metro-auto">Pune Metro + Auto (Eco & Fast)</option>
            <option value="cab">Cab / Ola / Uber (AC Comfort)</option>
            <option value="two-wheeler">Two-Wheeler / Bike (Local way)</option>
            <option value="walking">Walking & Peth Strolls</option>
          </select>
        </div>
      </div>

      {/* Special Requests */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-500" />
          <span>Special Preferences or Notes (Optional)</span>
        </label>
        <input
          type="text"
          value={specialNotes}
          onChange={(e) => setSpecialNotes(e.target.value)}
          placeholder="e.g. Vegetarian only, traveling with parents, want to see live copper smithing..."
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-base shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-3 disabled:opacity-75 disabled:cursor-wait"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Crafting Personalized Pune Itinerary with AI...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Generate Smart Itinerary & Local Route</span>
            </>
          )}
        </button>
        <p className="text-center text-xs text-slate-500 mt-2 font-medium">
          Uses your active Pollinations AI key • Pairs each attraction with a verified Pune artisan or small business
        </p>
      </div>
    </form>
  );
};
