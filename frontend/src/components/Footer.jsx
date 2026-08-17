import React from 'react';
import { Building2, MapPin, Mail, Phone, ShieldCheck } from 'lucide-react';




export const Footer = ({ onOpenAuth, onOpenSaaSPlans, setActiveTab }) => {
  return (
    <footer className="bg-white text-slate-800 border-t border-slate-200 pt-16 pb-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <img src="/logo.png" alt="ArenaSlot" className="h-12 w-auto object-contain" />
            <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
              ArenaSlot is Pakistan's premier multi-sport indoor facility booking platform and partner dashboard for ground owners. Connecting players with cricket nets, futsal fields, padel courts, and badminton arenas.
            </p>
            <div className="flex items-center space-x-2 text-xs font-extrabold text-[#0B1B3D]">
              <ShieldCheck className="w-4 h-4 text-[#76C000]" />
              <span>Verified Grounds & Instant Slot Reservations</span>
            </div>
          </div>

          {/* Col 2: Marketplace Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-[#0B1B3D] tracking-wider">Explore Platform</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-semibold">
              <li>
                <button onClick={() => setActiveTab('marketplace')} className="hover:text-[#0B1B3D] transition-colors">
                  Find Sports Grounds
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-[#0B1B3D] transition-colors">
                  About ArenaSlot
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-[#0B1B3D] transition-colors">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('bookings')} className="hover:text-[#0B1B3D] transition-colors">
                  My Match Bookings
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Venue Owners */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-[#0B1B3D] tracking-wider">Venue Partner Portal</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-semibold">
              <li>
                <button onClick={onOpenSaaSPlans} className="font-bold text-[#0B1B3D] hover:text-[#76C000] flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#76C000]" />
                  Register Ground & Partner Plans
                </button>
              </li>
              <li><span>Free 1-Month Trial</span></li>
              <li><span>Pro Plan (PKR 2,000 / mo)</span></li>
              <li><span>Enterprise Unlimited (PKR 7,000 / mo)</span></li>
            </ul>
          </div>

          {/* Col 4: Top Sports & Cities */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-[#0B1B3D] tracking-wider">Sports & Cities</h4>
            <div className="text-xs text-slate-600 space-y-1">
              <div><b>Sports:</b> Cricket, Futsal, Football, Badminton, Padel</div>
              <div className="pt-2"><b>Cities:</b> Rawalpindi, Islamabad, Lahore, Karachi</div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>© 2026 ArenaSlot Platform. All rights reserved.</div>
          <div className="flex space-x-6 text-slate-500">
            <button onClick={() => setActiveTab('about')} className="hover:text-slate-900">About Us</button>
            <button onClick={() => setActiveTab('contact')} className="hover:text-slate-900">Contact</button>
            <span className="hover:text-slate-900 cursor-pointer">Privacy Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
