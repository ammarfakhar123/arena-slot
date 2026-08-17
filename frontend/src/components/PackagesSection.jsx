import React from 'react';
import { Ticket, Zap, ShieldCheck, ArrowRight, Check } from 'lucide-react';


export const PackagesSection = () => {
  const passes = [
    {
      id: 'pass-1',
      title: 'Monthly Cricket Nets Pass',
      sport: 'Cricket',
      hoursCount: 10,
      price: 14999,
      originalPrice: 20000,
      validityDays: 30,
      tag: 'Save 25%',
    },
    {
      id: 'pass-2',
      title: 'Futsal Night League Pass',
      sport: 'Futsal',
      hoursCount: 6,
      price: 19999,
      originalPrice: 27000,
      validityDays: 45,
      tag: 'Best Seller',
    },
    {
      id: 'pass-3',
      title: 'Pro Padel Glass Court Bundle',
      sport: 'Padel',
      hoursCount: 4,
      price: 13500,
      originalPrice: 18000,
      validityDays: 30,
      tag: 'Popular',
    },
  ];

  return (
    <div className="bg-white border-y border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#76C000] uppercase tracking-wider">
            Monthly Passes & Membership Bundles
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1B3D]">
            Multi-Match Player Passes
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Lock in discounted hourly rates across top courts in your city with ArenaSlot Multi-Match passes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {passes.map((pass) => (
            <div
              key={pass.id}
              className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-[#76C000] text-[#0B1B3D] text-[10px] font-black px-2.5 py-1 rounded-md">
                {pass.tag}
              </div>

              <div className="space-y-2">
                <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">{pass.sport} Bundle</div>
                <h3 className="text-lg font-black text-[#0B1B3D]">{pass.title}</h3>
                
                <div className="flex items-baseline space-x-2 pt-2">
                  <span className="text-2xl font-black text-[#0B1B3D]">PKR {pass.price.toLocaleString()}</span>
                  <span className="text-xs text-slate-400 line-through">PKR {pass.originalPrice.toLocaleString()}</span>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-slate-600 border-t pt-4 border-slate-200">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#76C000]" />
                  <span><b>{pass.hoursCount} Total Hours</b> of Court Time</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#76C000]" />
                  <span>Valid for <b>{pass.validityDays} Days</b> after activation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#76C000]" />
                  <span>Priority Peak Slot Reservation</span>
                </li>
              </ul>

              <button
                onClick={() => alert(`Selected ${pass.title}! Contact venue for pass activation.`)}
                className="w-full bg-[#0B1B3D] hover:bg-[#061229] text-white py-3 rounded-xl text-xs font-black shadow-sm transition-all flex items-center justify-center space-x-2"
              >
                <span>Get Membership Pass</span>
                <ArrowRight className="w-4 h-4 text-[#76C000]" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
