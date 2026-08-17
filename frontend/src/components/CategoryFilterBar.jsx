import React from 'react';
import { MapPin, Navigation, ArrowUpDown, DollarSign } from 'lucide-react';



export const CategoryFilterBar = ({
  selectedSport,
  setSelectedSport,
  selectedCity,
  maxDistanceKm,
  setMaxDistanceKm,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
}) => {
  const sports = [
    { name: 'All Sports', icon: '⚡' },
    { name: 'Cricket', icon: '🏏' },
    { name: 'Football', icon: '⚽' },
    { name: 'Futsal', icon: '🥅' },
    { name: 'Badminton', icon: '🏸' },
    { name: 'Padel', icon: '🎾' },
  ];

  return (
    <div className="bg-white border-b border-slate-200 sticky top-20 sm:top-22 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
        
        {/* Top Location Radius Banner */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 border-b border-slate-100 pb-2.5">
          <div className="flex items-center space-x-2 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#76C000]" />
            <span>Target Area: <strong className="text-[#0B1B3D]">{selectedCity === 'All Cities' ? 'Pakistan (Islamabad, Rawalpindi, Lahore, Karachi)' : selectedCity}</strong></span>
          </div>

          {/* Distance Radius Range Selector */}
          <div className="flex items-center space-x-2">
            <Navigation className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-500">Distance Radius:</span>
            <div className="flex items-center space-x-1">
              {[
                { label: 'All Distances', km: 50 },
                { label: '< 5 km', km: 5 },
                { label: '< 10 km', km: 10 },
                { label: '< 25 km', km: 25 },
              ].map((d) => (
                <button
                  key={d.km}
                  onClick={() => setMaxDistanceKm(d.km)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border ${
                    maxDistanceKm === d.km
                      ? 'bg-[#0B1B3D] text-white border-[#0B1B3D]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Bar: Sports Tabs (Left) + Right Price & Sort Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Sports Tabs (Fixed clean labels without duplicate "All") */}
          <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar py-1">
            {sports.map((sport) => {
              const isSelected = selectedSport === sport.name;
              return (
                <button
                  key={sport.name}
                  onClick={() => setSelectedSport(sport.name)}
                  className={`relative pb-1.5 text-xs sm:text-[13px] font-medium transition-colors flex items-center space-x-1.5 whitespace-nowrap focus:outline-none ${
                    isSelected
                      ? 'text-[#0B1B3D] font-bold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <span className="text-sm">{sport.icon}</span>
                  <span>{sport.name}</span>
                  {isSelected && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#76C000] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Controls: Price Dropdown & Sort */}
          <div className="flex items-center space-x-2.5 shrink-0">
            {/* Price Filter Dropdown */}
            <div className="flex items-center space-x-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-xl text-xs">
              <DollarSign className="w-3.5 h-3.5 text-[#76C000]" />
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="bg-transparent font-bold text-[#0B1B3D] focus:outline-none cursor-pointer"
              >
                <option value={10000}>Max Price: Any</option>
                <option value={2500}>Max: PKR 2,500/hr</option>
                <option value={4000}>Max: PKR 4,000/hr</option>
                <option value={6000}>Max: PKR 6,000/hr</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-xl text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-[#0B1B3D] focus:outline-none cursor-pointer"
              >
                <option value="rating-desc">Sort: Top Rated ★</option>
                <option value="distance-asc">Sort: Nearest First (km)</option>
                <option value="price-asc">Sort: Price (Low to High)</option>
                <option value="price-desc">Sort: Price (High to Low)</option>
              </select>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
