import React from 'react';
import { Star, MapPin, ShieldCheck, Heart, Clock, Zap, Navigation } from 'lucide-react';




export const FacilityCard = ({ facility, onSelectFacility }) => {
  let policyTag = 'Pay at Venue (0% Deposit)';
  let policyBg = 'bg-slate-100 text-slate-700';

  if (facility.paymentPolicy === 'partial_advance') {
    policyTag = `${facility.partialAdvancePercentage}% Advance Deposit`;
    policyBg = 'bg-amber-50 text-amber-900 border border-amber-200';
  } else if (facility.paymentPolicy === 'full_advance') {
    policyTag = '100% Online Advance';
    policyBg = 'bg-emerald-50 text-emerald-900 border border-emerald-200';
  }

  return (
    <div 
      onClick={() => onSelectFacility(facility)}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Photo Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <img
            src={facility.image}
            alt={facility.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Superhost / City Badge */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            <span className="bg-[#0B1B3D]/90 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {facility.city}
            </span>
            {facility.isSuperhost && (
              <span className="bg-[#76C000] text-[#0B1B3D] text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Superhost
              </span>
            )}
          </div>

          {/* Distance Badge */}
          {facility.distanceKm && (
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-[#0B1B3D] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
              <Navigation className="w-3 h-3 text-[#76C000]" />
              <span>{facility.distanceKm} km away</span>
            </div>
          )}

          {/* Favorite Heart Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-700 hover:text-red-500 transition-colors shadow-sm"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-2">
          
          {/* Title & Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-black text-[#0B1B3D] group-hover:text-[#76C000] transition-colors line-clamp-1">
              {facility.name}
            </h3>
            <div className="flex items-center space-x-1 shrink-0 bg-amber-50 px-2 py-0.5 rounded-md">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-black text-slate-900">{facility.rating}</span>
            </div>
          </div>

          {/* Location */}
          <p className="text-xs text-slate-500 flex items-center truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
            <span className="truncate">{facility.location}</span>
          </p>

          {/* Sports Tags */}
          <div className="flex flex-wrap gap-1 pt-1">
            {facility.sports.map((s) => (
              <span key={s} className="bg-slate-100 text-slate-700 text-[10px] font-extrabold px-2 py-0.5 rounded">
                {s}
              </span>
            ))}
          </div>

          {/* Payment Policy Tag */}
          <div className="pt-1">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${policyBg}`}>
              {policyTag}
            </span>
          </div>

        </div>
      </div>

      {/* Footer Price Row */}
      <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Starting Rate</span>
          <span className="text-sm font-black text-[#0B1B3D]">
            PKR {facility.startingPrice.toLocaleString()} <span className="text-xs font-medium text-slate-500">/ hr</span>
          </span>
        </div>

        <button className="bg-[#0B1B3D] text-white text-xs font-black px-3.5 py-2 rounded-xl group-hover:bg-[#76C000] group-hover:text-[#0B1B3D] transition-colors">
          View Slots
        </button>
      </div>

    </div>
  );
};
