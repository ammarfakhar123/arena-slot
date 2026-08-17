import React from 'react';
import { Calendar, Search, CheckCircle2, ShieldCheck, Zap, Users, ArrowRight, Building2, Phone } from 'lucide-react';



export const HowItWorksSection = ({ onOpenSaaSPlans, setActiveTab }) => {
  return (
    <div className="bg-[#0B1B3D] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1 rounded-full text-xs font-black text-[#76C000]">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Fast & Simple Match Reservations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            How Booking Works on ArenaSlot
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium">
            Reserve your favorite cricket net, futsal turf, glass padel court, or badminton arena in 3 simple steps.
          </p>
        </div>

        {/* 3-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Step 1 */}
          <div className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-[#76C000]/50 transition-all relative">
            <div className="w-12 h-12 bg-[#76C000] text-[#0B1B3D] rounded-2xl font-black text-xl flex items-center justify-center shadow-lg">
              1
            </div>
            <h3 className="text-lg font-black text-white">Find Nearby Courts</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Filter grounds by city (Rawalpindi, Islamabad, Lahore, Karachi), location radius under 5 km, ratings, and starting hourly price.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-[#76C000]/50 transition-all relative">
            <div className="w-12 h-12 bg-[#76C000] text-[#0B1B3D] rounded-2xl font-black text-xl flex items-center justify-center shadow-lg">
              2
            </div>
            <h3 className="text-lg font-black text-white">Pick Date & Time Slot</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Browse the 30-day interactive month calendar. Select your match date and pick from available peak or off-peak hourly slots.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-[#76C000]/50 transition-all relative">
            <div className="w-12 h-12 bg-[#76C000] text-[#0B1B3D] rounded-2xl font-black text-xl flex items-center justify-center shadow-lg">
              3
            </div>
            <h3 className="text-lg font-black text-white">Instant Confirmation & Split</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Lock your slot with online deposit, receive printable receipt, and share WhatsApp group cost-split links with your teammates.
            </p>
          </div>

        </div>

        {/* Venue Owner Registration Banner Box */}
        <div className="bg-gradient-to-r from-[#132854] via-[#0B1B3D] to-[#132854] p-8 sm:p-10 rounded-3xl border border-[#76C000]/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-black uppercase text-[#76C000] tracking-wider">For Ground Owners & Managers</span>
            <h3 className="text-xl sm:text-2xl font-black text-white">Do You Own a Sports Facility or Court?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-medium">
              List your ground on ArenaSlot to automate walk-in cash registers, 1-month slot calendars, and direct player deposit collection.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={onOpenSaaSPlans}
              className="bg-[#76C000] hover:bg-[#68A800] text-[#0B1B3D] px-6 py-3.5 rounded-2xl text-xs font-black shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <Building2 className="w-4 h-4" />
              <span>List Your Ground Now</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
