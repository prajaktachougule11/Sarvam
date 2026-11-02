import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Filter, 
  MapPin, 
  Layers, 
  Navigation, 
  Compass, 
  Search, 
  Sparkles, 
  Store,
  ExternalLink,
  Info
} from 'lucide-react';
import { TouristSpot, LocalBusiness, SpotCategory, ItineraryStop } from '../../types';
import { PUNE_SPOTS } from '../../data/puneSpots';
import { PUNE_BUSINESSES } from '../../data/puneBusinesses';

interface InteractiveMapProps {
  highlightedStops?: ItineraryStop[];
  onSelectSpot?: (spot: TouristSpot) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  highlightedStops,
  onSelectSpot
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpotDetails, setSelectedSpotDetails] = useState<TouristSpot | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Centered at central Pune (Shaniwar Wada / Deccan area)
    const map = L.map(mapContainerRef.current, {
      center: [18.5204, 73.8567],
      zoom: 13,
      zoomControl: true
    });

    // Clean, crisp OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers & Polylines whenever category or highlighted stops change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    // Clean up previous polyline
    if (routePolylineRef.current) {
      routePolylineRef.current.remove();
      routePolylineRef.current = null;
    }

    // Determine which spots to show
    let spotsToShow = PUNE_SPOTS;
    if (activeCategory !== 'all') {
      spotsToShow = PUNE_SPOTS.filter((s) => s.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      spotsToShow = spotsToShow.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.neighborhood.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Add Spot Markers
    spotsToShow.forEach((spot) => {
      const isHighlighted = highlightedStops?.some(
        (hs) => Math.abs(hs.lat - spot.lat) < 0.001 && Math.abs(hs.lng - spot.lng) < 0.001
      );

      const categoryColors: Record<string, string> = {
        heritage: '#ea580c', // orange-600
        food: '#e11d48', // rose-600
        nature: '#16a34a', // green-600
        museum: '#9333ea', // purple-600
        spiritual: '#d97706', // amber-600
        shopping: '#0d9488', // teal-600
        'hidden-gem': '#2563eb' // blue-600
      };

      const color = categoryColors[spot.category] || '#ea580c';

      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="
            background: ${isHighlighted ? '#1e1b4b' : color};
            color: white;
            width: ${isHighlighted ? '38px' : '30px'};
            height: ${isHighlighted ? '38px' : '30px'};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: ${isHighlighted ? '15px' : '12px'};
            font-weight: bold;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            border: 2px solid white;
            transform: translate(-50%, -50%);
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            ${isHighlighted ? '⭐' : spot.category === 'heritage' ? '🏛️' : spot.category === 'food' ? '🍲' : spot.category === 'nature' ? '🌿' : '📍'}
          </div>
        `,
        iconSize: [30, 30]
      });

      const marker = L.marker([spot.lat, spot.lng], { icon: customIcon });

      const pairedBiz = PUNE_BUSINESSES.find((b) => b.id === spot.pairedBusinessId);

      const popupHtml = `
        <div style="font-family: inherit; width: 250px; padding: 12px;">
          <div style="position: relative; height: 110px; border-radius: 8px; overflow: hidden; margin-bottom: 8px;">
            <img src="${spot.imageUrl}" alt="${spot.name}" style="width: 100%; height: 100%; object-fit: cover;" />
            <span style="position: absolute; bottom: 6px; left: 6px; background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold;">
              ${spot.neighborhood}
            </span>
          </div>
          <h4 style="margin: 0; font-size: 14px; font-weight: bold; color: #0f172a;">${spot.name}</h4>
          ${spot.marathiName ? `<p style="margin: 2px 0 6px; font-size: 11px; color: #ea580c; font-weight: 600;">${spot.marathiName}</p>` : ''}
          <p style="margin: 4px 0; font-size: 11px; color: #475569; line-height: 1.3;">${spot.description.slice(0, 100)}...</p>
          
          <div style="margin: 8px 0; padding: 6px; background: #fff7ed; border: 1px solid #fed7aa; border-radius: 6px; font-size: 10px; color: #9a3412;">
            <strong>💡 Pro Tip:</strong> ${spot.proTip.slice(0, 85)}...
          </div>

          ${
            pairedBiz
              ? `
            <div style="margin-top: 6px; padding: 6px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; font-size: 10px; color: #065f46;">
              <strong>🛍️ Local Partner:</strong> ${pairedBiz.name}
              <div style="font-size: 9px; color: #047857;">Try: ${pairedBiz.mustTryOrBuy[0]}</div>
            </div>
          `
              : ''
          }

          <div style="margin-top: 10px; display: flex; gap: 6px;">
            <a href="https://www.google.com/maps/search/?api=1&query=${spot.lat},${spot.lng}" target="_blank" rel="noopener noreferrer" style="flex: 1; text-align: center; background: #ea580c; color: white; padding: 5px; border-radius: 6px; font-size: 10px; font-weight: bold; text-decoration: none;">
              Directions ➔
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, { className: 'custom-popup' });
      marker.on('click', () => {
        setSelectedSpotDetails(spot);
        if (onSelectSpot) onSelectSpot(spot);
      });

      marker.addTo(markersLayer);
    });

    // Also plot Local Businesses on map with distinct teal badge
    PUNE_BUSINESSES.forEach((biz) => {
      const bizIcon = L.divIcon({
        className: 'custom-biz-marker',
        html: `
          <div style="
            background: #059669;
            color: white;
            width: 26px;
            height: 26px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: bold;
            box-shadow: 0 3px 8px rgba(0,0,0,0.25);
            border: 2px solid white;
            transform: translate(-50%, -50%);
            cursor: pointer;
          ">
            🏪
          </div>
        `,
        iconSize: [26, 26]
      });

      const bizMarker = L.marker([biz.lat, biz.lng], { icon: bizIcon });

      const bizPopup = `
        <div style="font-family: inherit; width: 240px; padding: 12px;">
          <span style="background: #d1fae5; color: #065f46; font-size: 9px; font-weight: bold; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">
            ${biz.category.replace('-', ' ')}
          </span>
          <h4 style="margin: 6px 0 2px; font-size: 13px; font-weight: bold; color: #0f172a;">${biz.name}</h4>
          <p style="margin: 0; font-size: 10px; color: #059669; font-weight: 600;">Est. ${biz.foundedYear || 'Heritage'}</p>
          <p style="margin: 6px 0; font-size: 11px; color: #475569; line-height: 1.3;">${biz.story.slice(0, 110)}...</p>

          ${
            biz.specialOfferForTourists
              ? `
            <div style="margin: 6px 0; padding: 6px; background: #fef3c7; border: 1px solid #fde68a; border-radius: 6px; font-size: 10px; color: #92400e;">
              <strong>🎁 Tourist Perk:</strong> ${biz.specialOfferForTourists}
            </div>
          `
              : ''
          }

          <div style="margin-top: 8px; display: flex; gap: 6px;">
            <a href="https://www.google.com/maps/search/?api=1&query=${biz.lat},${biz.lng}" target="_blank" rel="noopener noreferrer" style="flex: 1; text-align: center; background: #059669; color: white; padding: 5px; border-radius: 6px; font-size: 10px; font-weight: bold; text-decoration: none;">
              Locate Shop ➔
            </a>
          </div>
        </div>
      `;

      bizMarker.bindPopup(bizPopup, { className: 'custom-popup' });
      bizMarker.addTo(markersLayer);
    });

    // Draw Route Polyline if highlighted stops are provided
    if (highlightedStops && highlightedStops.length > 1) {
      const latlngs: L.LatLngExpression[] = highlightedStops.map((s) => [s.lat, s.lng]);
      const polyline = L.polyline(latlngs, {
        color: '#f97316',
        weight: 4,
        opacity: 0.85,
        dashArray: '8, 8',
        lineCap: 'round'
      }).addTo(map);

      routePolylineRef.current = polyline;
      map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
    }
  }, [activeCategory, searchQuery, highlightedStops]);

  const categories = [
    { id: 'all', label: 'All Places' },
    { id: 'heritage', label: 'Heritage 🏛️' },
    { id: 'food', label: 'Food & Sweets 🍲' },
    { id: 'nature', label: 'Tekdis & Hills 🌿' },
    { id: 'museum', label: 'Museums 🎨' },
    { id: 'spiritual', label: 'Temples 🛕' },
    { id: 'shopping', label: 'Bazaars 🛍️' },
    { id: 'hidden-gem', label: 'Hidden Gems 💎' }
  ];

  return (
    <div className="bg-white rounded-3xl border border-orange-100 p-4 sm:p-6 shadow-xl space-y-4">
      {/* Map Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Pune spots (e.g., Shaniwar Wada, Misal, Camp)..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Legend pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-100 text-orange-800">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            Attractions (30)
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Local Shops & Artisans (13)
          </span>
          {highlightedStops && highlightedStops.length > 0 && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-900 border border-indigo-200">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
              Active Itinerary Route ({highlightedStops.length} stops)
            </span>
          )}
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === c.id
                ? 'bg-orange-500 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Map Leaflet Canvas */}
      <div className="relative w-full h-[540px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Floating Pune Quick Center Button */}
        <button
          onClick={() => {
            mapInstanceRef.current?.setView([18.5204, 73.8567], 13);
          }}
          className="absolute bottom-4 right-4 z-[400] bg-white/95 hover:bg-white text-slate-800 p-2.5 rounded-xl border border-slate-200 shadow-md text-xs font-bold flex items-center gap-1.5 backdrop-blur-xs transition-all"
          title="Reset to Central Pune"
        >
          <Compass className="w-4 h-4 text-orange-600" />
          <span>Center Pune</span>
        </button>
      </div>

      {/* Helpful Map Footer Note */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-orange-500 shrink-0" />
          <span>Click any marker to view entry hours, pro tips, and paired local Pune businesses.</span>
        </div>
        <span className="text-[11px] font-medium text-slate-400 hidden sm:inline">
          Powered by OpenStreetMap & Pune Geographic Hub
        </span>
      </div>
    </div>
  );
};
