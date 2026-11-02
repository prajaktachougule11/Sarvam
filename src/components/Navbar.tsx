import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Store, 
  Sparkles, 
  MessageSquare, 
  BookOpen, 
  Menu, 
  X, 
  Key, 
  PlusCircle,
  Heart
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenApiKeyModal: () => void;
  onOpenAddBusinessModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenApiKeyModal,
  onOpenAddBusinessModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'planner', label: 'AI Planner', icon: Sparkles, badge: 'Smart' },
    { id: 'map', label: 'Interactive Map', icon: MapPin },
    { id: 'businesses', label: 'Support Local', icon: Store, badge: 'Pune MSME' },
    { id: 'trails', label: 'Curated Trails', icon: Compass },
    { id: 'concierge', label: 'AI Concierge', icon: MessageSquare },
    { id: 'guide', label: 'Pune Guide', icon: BookOpen }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-2">
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('planner')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform">
              <span className="text-xl font-bold">🚩</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
                  Explore <span className="text-orange-600">AI</span>
                </span>
                <span className="bg-orange-100 text-orange-800 text-[11px] font-bold px-2 py-0.5 rounded-full border border-orange-200">
                  PUNE
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                Smart Tourism & Local Business Discovery
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                      isActive 
                        ? 'bg-orange-700 text-white' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: Add Business & API Key status */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onOpenAddBusinessModal}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors shadow-xs"
              title="Promote a Pune local business or artisan workshop"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>List Local Shop</span>
            </button>

            <button
              onClick={onOpenApiKeyModal}
              className="flex items-center gap-1.5 px-2.5 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 transition-colors"
              title="Manage Pollinations AI API Key"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <Key className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden xl:inline">AI Active</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-orange-100 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col gap-2 border-t border-slate-100">
            <button
              onClick={() => {
                onOpenAddBusinessModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-emerald-800 bg-emerald-50 rounded-xl border border-emerald-200"
            >
              <PlusCircle className="w-4 h-4 text-emerald-600" />
              <span>List Your Local Shop or Workshop</span>
            </button>
            <button
              onClick={() => {
                onOpenApiKeyModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-xl border border-slate-200"
            >
              <Key className="w-4 h-4 text-slate-500" />
              <span>Configure AI Key & Model</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
