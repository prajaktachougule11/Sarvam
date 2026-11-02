import React, { useState } from 'react';
import { 
  Store, 
  Search, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Tag, 
  Award, 
  Sparkles, 
  ExternalLink,
  PlusCircle,
  Clock,
  HeartHandshake
} from 'lucide-react';
import { LocalBusiness, BusinessCategory } from '../../types';
import { PUNE_BUSINESSES } from '../../data/puneBusinesses';

interface BusinessDirectoryProps {
  onOpenAddBusinessModal: () => void;
  businessesList?: LocalBusiness[];
}

export const BusinessDirectory: React.FC<BusinessDirectoryProps> = ({
  onOpenAddBusinessModal,
  businessesList = PUNE_BUSINESSES
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCouponModal, setActiveCouponModal] = useState<LocalBusiness | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const categories = [
    { id: 'all', label: 'All Businesses (13)' },
    { id: 'artisan', label: 'Artisans & Coppersmiths 🔨' },
    { id: 'heritage-bakery', label: 'Heritage Bakeries 🥐' },
    { id: 'sweets-savouries', label: 'Puneri Sweets & Bakarwadi 🍬' },
    { id: 'street-food', label: 'Misal & Street Food 🍲' },
    { id: 'traditional-wear', label: 'Paithani Silks & Turbans 👘' },
    { id: 'handicraft', label: 'Brassware & Bazaars 🛍️' },
    { id: 'cafe', label: 'Historic Cafes ☕' }
  ];

  const filteredBusinesses = businessesList.filter((biz) => {
    const matchesCategory = selectedCategory === 'all' || biz.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery.trim() ||
      biz.name.toLowerCase().includes(q) ||
      biz.neighborhood.toLowerCase().includes(q) ||
      biz.story.toLowerCase().includes(q) ||
      biz.mustTryOrBuy.some((item) => item.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner highlighting Mission */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-2xl"></div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs font-bold">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
            <span>Direct Support to Pune MSMEs & Artisans</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Discover Pune’s Generational Small Businesses
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            By shopping with these authentic family enterprises, 350-year-old coppersmiths in Tambat Ali, and women-led food cooperatives, your tourism rupees directly sustain Maharashtra's rich living heritage.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenAddBusinessModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Your Local Shop on Explore AI</span>
            </button>
            <span className="text-xs text-emerald-300">
              Free listing for authentic Pune local vendors & craftsmen
            </span>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white rounded-3xl border border-orange-100 p-4 sm:p-6 shadow-sm space-y-4">
        <div className="relative max-w-lg">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by business name, Bakarwadi, copper pots, neighborhood..."
            className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Business Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBusinesses.map((biz) => (
          <div
            key={biz.id}
            className="bg-white rounded-3xl border border-slate-200/80 hover:border-emerald-300 shadow-sm hover:shadow-lg transition-all flex flex-col overflow-hidden group"
          >
            {/* Image Header with Badge */}
            <div className="relative h-44 overflow-hidden bg-slate-100">
              <img
                src={biz.imageUrl}
                alt={biz.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/90 text-white text-[10px] font-extrabold tracking-wide uppercase backdrop-blur-xs">
                  {biz.category.replace('-', ' ')}
                </span>
                {biz.isArtisanOwned && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/90 text-white text-[10px] font-extrabold tracking-wide backdrop-blur-xs">
                    Artisan Guild
                  </span>
                )}
              </div>

              {biz.foundedYear && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-bold">
                  Est. {biz.foundedYear}
                </div>
              )}

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="text-base font-extrabold leading-tight drop-shadow-xs">
                  {biz.name}
                </h3>
                {biz.marathiName && (
                  <p className="text-xs text-amber-300 font-semibold drop-shadow-xs mt-0.5">
                    {biz.marathiName}
                  </p>
                )}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  <span className="truncate">{biz.address}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {biz.story}
                </p>

                {/* Must Try List */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    🌟 Must Try or Buy:
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {biz.mustTryOrBuy.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tourist Perk / Special Offer Box */}
              {biz.specialOfferForTourists && (
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-900 font-bold mb-0.5">
                    <Tag className="w-3.5 h-3.5 text-amber-600" />
                    <span>Tourist Perk:</span>
                  </div>
                  <p className="text-amber-800 text-[11px] leading-tight">
                    {biz.specialOfferForTourists}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                {biz.promoCode ? (
                  <button
                    onClick={() => setActiveCouponModal(biz)}
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Get Tourist Pass</span>
                  </button>
                ) : (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${biz.lat},${biz.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Locate</span>
                  </a>
                )}

                {biz.whatsapp && (
                  <a
                    href={`https://wa.me/${biz.whatsapp}?text=Hi%2C%20I%20found%20you%20on%20Explore%20AI%20Pune.%20I%20am%20a%20tourist%20visiting%20Pune!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                    title="Direct WhatsApp to shop owner"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                )}

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${biz.lat},${biz.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Open in Google Maps"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tourist Perk Coupon Modal */}
      {activeCouponModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-orange-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎁</span>
                <h3 className="text-base font-bold text-slate-900">
                  Explore AI Tourist Voucher
                </h3>
              </div>
              <button
                onClick={() => setActiveCouponModal(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="text-center space-y-2 py-2">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 flex items-center justify-center text-3xl">
                🛍️
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                {activeCouponModal.name}
              </h4>
              <p className="text-xs text-slate-500">{activeCouponModal.neighborhood}</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-1">
              <span className="text-xs font-medium text-amber-800">Your Exclusive Tourist Offer:</span>
              <p className="text-sm font-extrabold text-amber-950">
                {activeCouponModal.specialOfferForTourists}
              </p>
            </div>

            {activeCouponModal.promoCode && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 border border-slate-200">
                <span className="font-mono text-sm font-extrabold text-slate-800 tracking-wider">
                  {activeCouponModal.promoCode}
                </span>
                <button
                  onClick={() => handleCopyCode(activeCouponModal.promoCode!)}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                >
                  {copiedCode ? 'Copied! ✓' : 'Copy Code'}
                </button>
              </div>
            )}

            <p className="text-[11px] text-center text-slate-400">
              Simply show this screen or coupon code at the counter during your visit.
            </p>

            <button
              onClick={() => setActiveCouponModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Done / Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
