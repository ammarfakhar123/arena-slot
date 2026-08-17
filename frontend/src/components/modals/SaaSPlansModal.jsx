import React, { useState } from 'react';
import { X, Check, ShieldCheck, Zap, Sparkles, Building, ChevronRight } from 'lucide-react';



export const SaaSPlansModal = ({
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [billingMonths, setBillingMonths] = useState(12);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoSuccessMsg, setPromoSuccessMsg] = useState('');

  if (!isOpen) return null;

  // Base Monthly Pricing (PKR)
  const basePrices = {
    free: 0,
    pro: 2000,
    unlimited: 7000,
  };

  // Duration Discount Engine
  const durationDiscounts: Record<number, number> = {
    1: 0,
    3: 10,
    6: 15,
    8: 20,
    12: 25, // 1 year = 25% off (2,000 x 12 = 24,000 -> 18,000 PKR)
  };

  const currentDurationDiscount = durationDiscounts[billingMonths] || 0;
  const baseMonthlyPrice = basePrices[selectedPlan];
  const grossTotal = baseMonthlyPrice * billingMonths;
  
  // Combined discount: Duration Discount + Promo Code Discount
  const totalDiscountPercent = Math.min(100, currentDurationDiscount + discountPercent);
  const finalTotalPrice = Math.round(grossTotal * (1 - totalDiscountPercent / 100));

  const handleApplyPromo = () => {
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'LAUNCH2026') {
      setDiscountPercent(15);
      setPromoSuccessMsg('Promo Code "LAUNCH2026" applied! Extra 15% discount granted.');
    } else if (cleanCode === 'ARENAFREE') {
      setDiscountPercent(100);
      setPromoSuccessMsg('Special Code "ARENAFREE" applied! 100% free first billing cycle.');
    } else {
      alert('Invalid Promo Code. Try "LAUNCH2026" for 15% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-fadeIn">
        
        {/* Modal Top Header */}
        <div className="bg-[#0B1B3D] text-white p-6 sm:p-8 flex items-center justify-between relative">
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#76C000] text-[#0B1B3D] px-3.5 py-1 rounded-full text-xs font-black mb-3">
              <Building className="w-3.5 h-3.5" />
              <span>Ground Partner Membership Plans</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              List & Manage Your Sports Facility
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-medium mt-1">
              Choose your partner plan to unlock POS Counter, Full 1-Month Calendar & WhatsApp match link sharing.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Plan Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Free Trial Plan */}
            <div
              onClick={() => setSelectedPlan('free')}
              className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                selectedPlan === 'free'
                  ? 'border-[#76C000] bg-lime-50/40 ring-2 ring-[#76C000]'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Starter</span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">1-Month Free Trial</h3>
                <div className="mt-3 text-2xl font-black text-[#0B1B3D]">
                  PKR 0 <span className="text-xs font-semibold text-slate-500">/ first month</span>
                </div>
                <p className="text-xs text-slate-600 mt-2 font-medium">
                  Try all features for 30 days. Single ground listing with Counter POS & Live Chat.
                </p>
              </div>

              <ul className="space-y-2 text-xs font-semibold text-slate-700 border-t border-slate-100 pt-4">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#76C000]" />
                  <span>1 Ground Listing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#76C000]" />
                  <span>Counter POS Terminal</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#76C000]" />
                  <span>Full Month Calendar</span>
                </li>
              </ul>
            </div>

            {/* Pro Partner (Recommended) */}
            <div
              onClick={() => setSelectedPlan('pro')}
              className={`relative p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                selectedPlan === 'pro'
                  ? 'border-[#76C000] bg-lime-50/50 ring-4 ring-[#76C000]/30 shadow-xl'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#76C000] text-[#0B1B3D] text-[11px] font-black px-4 py-1 rounded-full shadow-md">
                RECOMMENDED (3 GROUNDS)
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pro Partner</span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">Pro Facility Hub</h3>
                <div className="mt-3 text-3xl font-black text-[#0B1B3D]">
                  PKR 2,000 <span className="text-xs font-semibold text-slate-500">/ month</span>
                </div>
                <p className="text-xs text-slate-600 mt-2 font-medium">
                  Manage up to 3 grounds (Cricket, Futsal, Padel) with automated WhatsApp split links.
                </p>
              </div>

              <ul className="space-y-2 text-xs font-semibold text-slate-700 border-t border-slate-100 pt-4">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#76C000]" />
                  <span>Up to 3 Ground Listings</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#76C000]" />
                  <span>WhatsApp Split Match Link</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#76C000]" />
                  <span>Thermal POS Receipts</span>
                </li>
              </ul>
            </div>

            {/* Unlimited Partner */}
            <div
              onClick={() => setSelectedPlan('unlimited')}
              className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                selectedPlan === 'unlimited'
                  ? 'border-[#76C000] bg-lime-50/40 ring-2 ring-[#76C000]'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Enterprise</span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">Unlimited Complex</h3>
                <div className="mt-3 text-3xl font-black text-[#0B1B3D]">
                  PKR 7,000 <span className="text-xs font-semibold text-slate-500">/ month</span>
                </div>
                <p className="text-xs text-slate-600 mt-2 font-medium">
                  Unlimited ground listings across multiple cities with priority support & custom domain.
                </p>
              </div>

              <ul className="space-y-2 text-xs font-semibold text-slate-700 border-t border-slate-100 pt-4">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#76C000]" />
                  <span>Unlimited Grounds</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#76C000]" />
                  <span>Multi-City Dashboard</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#76C000]" />
                  <span>Priority 24/7 Support</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Duration Selector with Discount Badges */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#76C000]" />
              <span>Select Billing Duration (Save Up to 25% Off)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-bold">
              {[
                { months: 1, label: '1 Month', discount: '0%' },
                { months: 3, label: '3 Months', discount: '10% OFF' },
                { months: 6, label: '6 Months', discount: '15% OFF' },
                { months: 8, label: '8 Months', discount: '20% OFF' },
                { months: 12, label: '1 Year (12 Mo)', discount: '25% OFF 🔥' },
              ].map((item) => (
                <button
                  key={item.months}
                  onClick={() => setBillingMonths(item.months)}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                    billingMonths === item.months
                      ? 'bg-[#0B1B3D] text-white border-[#0B1B3D] shadow-md scale-105'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="font-extrabold">{item.label}</span>
                  {item.discount !== '0%' && (
                    <span className="text-[10px] text-[#76C000] font-black mt-1">
                      {item.discount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Promo Code & Final Checkout Summary */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Promo Code Input */}
              <div className="w-full sm:w-80 flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Enter Promo Code (e.g. LAUNCH2026)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold uppercase text-slate-900 focus:outline-none"
                />
                <button
                  onClick={handleApplyPromo}
                  className="bg-[#0B1B3D] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#061229]"
                >
                  Apply
                </button>
              </div>

              {/* Total Calculation */}
              <div className="text-right">
                <div className="text-xs text-slate-500 font-bold">Total Subscription Price:</div>
                <div className="text-2xl font-black text-[#0B1B3D]">
                  PKR {finalTotalPrice.toLocaleString()}{' '}
                  {totalDiscountPercent > 0 && (
                    <span className="text-xs text-emerald-600 font-bold">
                      ({totalDiscountPercent}% total discount)
                    </span>
                  )}
                </div>
              </div>
            </div>

            {promoSuccessMsg && (
              <p className="text-xs text-emerald-600 font-bold">{promoSuccessMsg}</p>
            )}
          </div>

          {/* Modal Action CTA */}
          <button
            onClick={() => onSelectPlan(selectedPlan, billingMonths, finalTotalPrice)}
            className="w-full bg-[#76C000] hover:bg-[#68A800] text-[#0B1B3D] py-4 rounded-2xl text-sm font-black shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            <span>Confirm & Activate Ground Partner Membership</span>
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>
      </div>
    </div>
  );
};
