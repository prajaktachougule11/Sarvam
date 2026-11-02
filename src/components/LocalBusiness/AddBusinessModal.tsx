import React, { useState } from 'react';
import { Store, PlusCircle, CheckCircle2, MapPin, Tag } from 'lucide-react';
import { LocalBusiness, BusinessCategory } from '../../types';

interface AddBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBusiness: (newBiz: LocalBusiness) => void;
}

export const AddBusinessModal: React.FC<AddBusinessModalProps> = ({
  isOpen,
  onClose,
  onAddBusiness
}) => {
  const [name, setName] = useState('');
  const [marathiName, setMarathiName] = useState('');
  const [category, setCategory] = useState<BusinessCategory>('artisan');
  const [neighborhood, setNeighborhood] = useState('Kasba Peth');
  const [address, setAddress] = useState('');
  const [story, setStory] = useState('');
  const [mustTry, setMustTry] = useState('');
  const [offer, setOffer] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newBiz: LocalBusiness = {
      id: `local-biz-${Date.now()}`,
      name: name.trim(),
      marathiName: marathiName.trim() || undefined,
      category,
      neighborhood: neighborhood.trim(),
      address: address.trim() || `${neighborhood}, Pune`,
      lat: 18.5204 + (Math.random() - 0.5) * 0.03, // placed in central Pune area
      lng: 73.8567 + (Math.random() - 0.5) * 0.03,
      foundedYear: new Date().getFullYear(),
      story: story.trim() || 'A cherished local Pune business serving authentic products to residents and tourists.',
      mustTryOrBuy: mustTry.split(',').map((s) => s.trim()).filter(Boolean),
      priceRange: '₹₹',
      specialOfferForTourists: offer.trim() || '10% discount for Explore AI visitors',
      promoCode: `PUNE-${Math.floor(1000 + Math.random() * 9000)}`,
      contactNumber: contactNumber.trim() || undefined,
      whatsapp: whatsapp.replace(/\D/g, '') || undefined,
      imageUrl: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80',
      verifiedLocal: true,
      isArtisanOwned: category === 'artisan' || category === 'handicraft'
    };

    onAddBusiness(newBiz);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-emerald-100 max-h-[90vh] overflow-y-auto space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              🏪
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                List Your Pune Local Business
              </h3>
              <p className="text-xs text-slate-500">Free platform to reach tourists exploring Pune</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold p-1 text-sm"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-slate-900">Business Listed Successfully!</h4>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Your business is now live on Explore AI Pune and will be recommended in smart itineraries!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Business / Shop Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kasba Tambat Workshop, Laxmi Sweets..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Name in Marathi (Optional)
                </label>
                <input
                  type="text"
                  value={marathiName}
                  onChange={(e) => setMarathiName(e.target.value)}
                  placeholder="उदा. तांबट कार्यशाळा"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as BusinessCategory)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="artisan">Artisan / Coppersmith</option>
                  <option value="heritage-bakery">Heritage Bakery</option>
                  <option value="sweets-savouries">Puneri Sweets & Bakarwadi</option>
                  <option value="street-food">Street Food & Misal</option>
                  <option value="traditional-wear">Paithani Silks & Turbans</option>
                  <option value="handicraft">Brassware & Handicrafts</option>
                  <option value="cafe">Historic Cafe</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Neighborhood / Area in Pune *
                </label>
                <input
                  type="text"
                  required
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="e.g. Kasba Peth, FC Road, Sadashiv Peth..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  WhatsApp Number (with country code)
                </label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="e.g. 919822000000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Full Address / Landmark
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Shop number, Lane, Near Landmark, Pune"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Must Try / Speciality Products (comma separated)
              </label>
              <input
                type="text"
                value={mustTry}
                onChange={(e) => setMustTry(e.target.value)}
                placeholder="e.g. Hand-beaten copper bottle, Mango Barfi, Shrewsbury cookies"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Special Offer or Discount for Tourists
              </label>
              <input
                type="text"
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                placeholder="e.g. 10% off for tourists, Free sample box with ₹300 purchase"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Short Story or Heritage of your shop
              </label>
              <textarea
                rows={2}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Tell tourists how long you have been serving Pune and why your craftsmanship or food is special..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-md"
              >
                Submit Listing to Explore AI Pune
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
