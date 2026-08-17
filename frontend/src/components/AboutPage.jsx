import React from 'react';
import { Building2, ShieldCheck, Zap, Globe, Trophy, Users, ArrowRight } from 'lucide-react';




export const AboutPage = ({ onOpenSaaSModal, onBackToMarketplace }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 bg-white">
      
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="bg-slate-100 text-[#0B1B3D] text-xs font-black px-3.5 py-1 rounded-full uppercase border">
          About ArenaSlot
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0B1B3D]">
          Building Pakistan's #1 Sports Facility <span className="text-[#76C000]">Marketplace & SaaS.</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          ArenaSlot bridges the gap between indoor sports facility owners (cricket nets, futsal fields, padel courts, badminton arenas) and sports players across Pakistan.
        </p>
      </div>

      {/* Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl space-y-2">
          <div className="w-10 h-10 bg-[#0B1B3D] text-[#76C000] rounded-xl flex items-center justify-center font-black">
            ⚡
          </div>
          <h3 className="text-lg font-black text-[#0B1B3D]">Zero Double Bookings</h3>
          <p className="text-xs text-slate-600">
            Real-time live calendar synchronization for both online web reservations and manual phone walk-in bookings.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl space-y-2">
          <div className="w-10 h-10 bg-[#0B1B3D] text-[#76C000] rounded-xl flex items-center justify-center font-black">
            🎯
          </div>
          <h3 className="text-lg font-black text-[#0B1B3D]">Sport-Specific SaaS</h3>
          <p className="text-xs text-slate-600">
            Dynamic pricing rules for cricket speed nets, FIFA synthetic turfs, and panoramic glass padel courts.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl space-y-2">
          <div className="w-10 h-10 bg-[#0B1B3D] text-[#76C000] rounded-xl flex items-center justify-center font-black">
            💬
          </div>
          <h3 className="text-lg font-black text-[#0B1B3D]">Host Live Chat & Audio Alerts</h3>
          <p className="text-xs text-slate-600">
            Direct communication drawer between players and venue managers with instant chime notifications.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-[#0B1B3D] text-white rounded-3xl p-8 sm:p-12 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black">Are You a Ground Partner?</h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          Start with our 1-Month Free Trial or subscribe to our Pro plan to manage your multi-sport venue.
        </p>
        <div className="pt-2 flex justify-center space-x-3">
          <button
            onClick={onOpenSaaSModal}
            className="bg-[#76C000] text-[#0B1B3D] font-black text-xs px-6 py-3 rounded-xl shadow-md hover:bg-[#68A800]"
          >
            View SaaS Plans & Register Ground
          </button>
          <button
            onClick={onBackToMarketplace}
            className="bg-white/10 text-white font-bold text-xs px-6 py-3 rounded-xl hover:bg-white/20"
          >
            Explore Marketplace
          </button>
        </div>
      </div>

    </div>
  );
};
