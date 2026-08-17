import React, { useState, useEffect } from 'react';
import { Search, MapPin, Trophy, ShieldCheck, Zap, Star, ArrowRight } from 'lucide-react';



export const HeroSearch = ({
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
}) => {
  // Animated Changing Action Phrases
  const animatedPhrases = [
    'Book an Indoor Cricket Ground 🏏',
    'Reserve a Futsal Turf Field ⚽',
    'Book a Glass Padel Court 🎾',
    'Book a Badminton Arena 🏸',
    'Reserve Your Match Slot 🏆',
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [fadeState, setFadeState] = useState('in');

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('out');
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % animatedPhrases.length);
        setFadeState('in');
      }, 350);
    }, 2800);

    return () => clearInterval(interval);
  }, [animatedPhrases.length]);

  return (
    <div className="relative w-full min-h-[540px] sm:min-h-[600px] flex items-center justify-center overflow-hidden bg-[#040C1A] pt-24 pb-14">
      
      {/* Uploaded High-Definition Indoor Arena Background Image */}
      <img
        src="/hero-arena.jpg"
        alt="Indoor Sports Arena"
        className="absolute inset-0 w-full h-full object-cover filter brightness-85 scale-105 transition-all duration-1000 pointer-events-none"
      />

      {/* Richer & Darker Overlay for High Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#0B1B3D]/70 to-[#040C1A]/95 z-10" />
      <div className="absolute inset-0 bg-radial-at-c from-[#76C000]/20 via-transparent to-black/85 z-10 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 py-8">
        
        {/* Tagline Badge */}
        <div className="inline-flex items-center gap-2.5 bg-[#0B1B3D]/80 backdrop-blur-md border border-white/20 px-6 py-2.5 my-1 rounded-full text-xs sm:text-sm font-extrabold text-white shadow-2xl hover:border-[#76C000]/50 transition-all">
          <span className="w-2.5 h-2.5 rounded-full bg-[#76C000] animate-ping shrink-0" />
          <span className="tracking-wide">Pakistan's #1 Multi-Sport Indoor Facility Platform</span>
        </div>

        {/* Dynamic Rotating Headline Prompt */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-2xl">
            Want to Play Today?
          </h1>
          
          <div className="h-16 sm:h-20 flex items-center justify-center">
            <span
              className={`inline-block text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#76C000] via-lime-300 to-emerald-400 drop-shadow-[0_4px_25px_rgba(118,192,0,0.45)] transition-all duration-500 transform ${
                fadeState === 'in' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'
              }`}
            >
              {animatedPhrases[currentIdx]}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-base text-slate-200 max-w-2xl mx-auto font-bold drop-shadow-md leading-relaxed">
          Instantly discover and reserve sports slots in Rawalpindi, Islamabad, Lahore & Karachi in under 60 seconds.
        </p>

        {/* Floating Search & City Bar */}
        <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-xl p-3 rounded-3xl shadow-2xl border border-white/40 flex flex-col sm:flex-row items-center gap-2.5 mt-4 hover:shadow-[#76C000]/10 transition-all">
          
          {/* City Dropdown */}
          <div className="w-full sm:w-52 flex items-center space-x-2 px-3.5 py-2.5 bg-slate-50 rounded-2xl border border-slate-200">
            <MapPin className="w-4 h-4 text-[#76C000] shrink-0" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-transparent font-extrabold text-xs sm:text-sm text-[#0B1B3D] focus:outline-none cursor-pointer"
            >
              <option value="All Cities">All Cities (Pakistan)</option>
              <option value="Rawalpindi">Rawalpindi</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Lahore">Lahore</option>
              <option value="Karachi">Karachi</option>
            </select>
          </div>

          {/* Search Query Input */}
          <div className="flex-1 w-full flex items-center space-x-2 px-3.5 py-2.5 bg-slate-50 rounded-2xl border border-slate-200">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search area e.g. Satellite Town, F-8, Gulberg..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none"
            />
          </div>

          {/* Search Action Button */}
          <button className="w-full sm:w-auto bg-[#0B1B3D] hover:bg-[#061229] text-white px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-black shadow-lg transition-all whitespace-nowrap flex items-center justify-center space-x-2 group">
            <span>Find Slots</span>
            <ArrowRight className="w-4 h-4 text-[#76C000] group-hover:translate-x-1 transition-transform" />
          </button>

        </div>

        {/* Quick Stats Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-bold drop-shadow-md">
          <span className="flex items-center gap-1.5"><Trophy className="w-4 h-4 text-[#76C000]" /> 50+ Verified Venues</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#76C000]" /> 100% Instant Confirmation</span>
          <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 4.9/5 Player Rating</span>
        </div>

      </div>

    </div>
  );
};
