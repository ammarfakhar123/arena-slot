import React, { useState } from 'react';
import { SlidersHorizontal, ArrowUpDown, Star, DollarSign, RotateCcw, Filter, Check } from 'lucide-react';



export const MarketplaceFilterBar = ({
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  sortBy,
  setSortBy,
  selectedAmenities,
  toggleAmenity,
  onResetAll,
  totalResultsCount,
}) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const availableAmenities = [
    'Floodlights',
    'Parking',
    'Air Conditioned Lounge',
    'Changing Rooms',
    'Automated Bowling Machines',
    'FIFA Synthetic Grass',
  ];

  return (
    <div className="bg-white border-b border-slate-200 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Toolbar Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3">
            {/* Filter Toggle Button */}
            <button
              onClick={() => setIsOpenDrawer(!isOpenDrawer)}
              className={`px-4 py-2 rounded-xl text-xs font-black border transition-all flex items-center space-x-2 ${
                isOpenDrawer || selectedAmenities.length > 0 || maxPrice < 10000 || minRating > 0
                  ? 'bg-[#0B1B3D] text-white border-[#0B1B3D]'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 text-[#76C000]" />
              <span>Filters {selectedAmenities.length > 0 ? `(${selectedAmenities.length})` : ''}</span>
            </button>

            {/* Quick Star Rating Pill Badges */}
            <div className="hidden sm:flex items-center space-x-1.5 border-l border-slate-200 pl-3">
              {[0, 4.8, 4.5, 4.0].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    minRating === r
                      ? 'bg-[#0B1B3D] text-white border-[#0B1B3D]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {r === 0 ? 'All Ratings' : `${r}+ ★`}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Sort Dropdown & Results Badge */}
          <div className="flex items-center space-x-3">
            <span className="text-xs text-slate-500 font-bold hidden sm:inline">
              Showing {totalResultsCount} Verified Venues
            </span>

            <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 p-1 rounded-xl">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 ml-2" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-extrabold text-[#0B1B3D] p-1.5 focus:outline-none cursor-pointer"
              >
                <option value="rating-desc">Sort by: Top Rated (★)</option>
                <option value="reviews-desc">Sort by: Most Reviews</option>
                <option value="price-asc">Sort by: Price (Low to High)</option>
                <option value="price-desc">Sort by: Price (High to Low)</option>
              </select>
            </div>
          </div>

        </div>

        {/* Expandable Advanced Multi-Filter Drawer */}
        {isOpenDrawer && (
          <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-5 rounded-2xl animate-fadeIn">
            
            {/* Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-black text-[#0B1B3D]">
                <span>Max Price Per Hour:</span>
                <span className="text-[#76C000]">PKR {maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#76C000] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>PKR 1,000</span>
                <span>PKR 10,000+</span>
              </div>
            </div>

            {/* Amenities Multi-Check */}
            <div className="space-y-2">
              <span className="text-xs font-black text-[#0B1B3D] block">Amenities & Facilities:</span>
              <div className="grid grid-cols-2 gap-1.5">
                {availableAmenities.map((amenity) => {
                  const isChecked = selectedAmenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-left truncate transition-all border ${
                        isChecked
                          ? 'bg-[#0B1B3D] text-white border-[#0B1B3D]'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '}{amenity}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reset Controls */}
            <div className="flex flex-col justify-end space-y-2">
              <button
                onClick={onResetAll}
                className="w-full bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
