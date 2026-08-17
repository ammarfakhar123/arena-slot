import React, { useState } from 'react';
import { X, Check, ShieldCheck, Zap, Building2, Tag, ArrowRight, Sparkles, Gift } from 'lucide-react';




export const SaaSPlansModal = ({
  isOpen,
  onClose,
  onSelectPlanAndRegister,
}) => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [billingMonths, setBillingMonths] = useState(12); // Default to 1 Year (12 months)
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  const [groundName, setGroundName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');

  if (!isOpen) return null;

  // Base monthly rates
  const baseMonthlyRates = {
    free: 0,
    pro: 2000,
    unlimited: 7000,
  };

  // Discount percentage per billing cycle
  const cycleDiscounts: Record<number, number> = {
    1: 0,
    3: 10,
    6: 15,
    8: 20,
    12: 25, // 25% discount for 1 year (24,000 -> 18,000 PKR for Pro!)
  };

  const monthlyBase = baseMonthlyRates[selectedPlan];
  const cycleDiscountPct = cycleDiscounts[billingMonths] || 0;

  // Standard total before discounts
  const grossTotal = monthlyBase * billingMonths;
  
  // Amount after duration discount
  const afterCycleDiscount = grossTotal * (1 - cycleDiscountPct / 100);

  // Extra Promo code discount if applied
  const promoDiscountPct = appliedPromo ? appliedPromo.discountPercent : 0;
  const finalPrice = selectedPlan === 'free' ? 0 : Math.round(afterCycleDiscount * (1 - promoDiscountPct / 100));

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'LAUNCH2026') {
      setAppliedPromo({ code, discountPercent: 15 });
      alert('Promo Code LAUNCH2026 Applied! Extra 15% OFF applied.');
    } else if (code === 'ARENAFREE') {
      setAppliedPromo({ code, discountPercent: 100 });
      alert('Promo Code ARENAFREE Applied! 100% OFF first billing cycle.');
    } else {
      alert('Invalid Promo Code. Try LAUNCH2026 for extra 15% off!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ownerEmail || !ownerPhone) return;
    onSelectPlanAndRegister(
      selectedPlan.toUpperCase(),
      billingMonths,
      finalPrice,
      appliedPromo ? appliedPromo.code : 'NONE'
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#0B1B3D] text-white p-6 relative flex items-center justify-between">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-[#76C000] text-[#0B1B3D] text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase">
              <Sparkles className="w-3 h-3 fill-current" />
              <span>SaaS Ground Partner Onboarding</span>
            </div>
            <h2 className="text-2xl font-black mt-1">Select SaaS Subscription Plan</h2>
            <p className="text-xs text-slate-300">Digitize your cricket nets, futsal turf, or padel court with ArenaSlot SaaS.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8FAFC]">

          {/* 1. Plan Tier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Free Trial */}
            <div
              onClick={() => setSelectedPlan('free')}
              className={`bg-white p-5 rounded-2xl border text-left cursor-pointer transition-all ${
                selectedPlan === 'free'
                  ? 'border-[#0B1B3D] ring-2 ring-[#76C000] shadow-md'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-xs font-bold text-slate-400 uppercase">Starter Trial</div>
              <div className="text-xl font-black text-[#0B1B3D] mt-1">Free 1st Month</div>
              <div className="text-[11px] text-slate-500 mt-1">Ideal for testing slot management</div>

              <ul className="mt-4 space-y-2 text-xs text-slate-600 border-t pt-3">
                <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#76C000] mr-1.5" /> Manage <b>1 Ground</b></li>
                <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#76C000] mr-1.5" /> Basic Live Calendar</li>
                <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#76C000] mr-1.5" /> Manual Phone Slot Block</li>
              </ul>
            </div>

            {/* Pro Partner (Recommended) */}
            <div
              onClick={() => setSelectedPlan('pro')}
              className={`bg-white p-5 rounded-2xl border text-left cursor-pointer transition-all relative ${
                selectedPlan === 'pro'
                  ? 'border-[#0B1B3D] ring-2 ring-[#76C000] shadow-md scale-102'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="absolute top-3 right-3 bg-[#76C000] text-[#0B1B3D] text-[10px] font-black px-2 py-0.5 rounded">
                POPULAR (3 GROUNDS)
              </span>
              <div className="text-xs font-bold text-slate-400 uppercase">Pro Partner</div>
              <div className="text-2xl font-black text-[#0B1B3D] mt-1">PKR 2,000 <span className="text-xs font-medium text-slate-500">/ mo</span></div>
              <div className="text-[11px] text-slate-500 mt-1">Manage up to 3 sports courts</div>

              <ul className="mt-4 space-y-2 text-xs text-slate-600 border-t pt-3">
                <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#76C000] mr-1.5" /> Manage <b>Up to 3 Grounds</b></li>
                <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#76C000] mr-1.5" /> Custom Advance Deposit Rules</li>
                <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#76C000] mr-1.5" /> WhatsApp Notifications</li>
                <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#76C000] mr-1.5" /> Live Customer Chat Inbox</li>
              </ul>
            </div>

            {/* Enterprise Unlimited */}
            <div
              onClick={() => setSelectedPlan('unlimited')}
              className={`bg-white p-5 rounded-2xl border text-left cursor-pointer transition-all ${
                selectedPlan === 'unlimited'
                  ? 'border-[#0B1B3D] ring-2 ring-[#76C000] shadow-md'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-xs font-bold text-slate-400 uppercase">Enterprise</div>
              <div className="text-2xl font-black text-[#0B1B3D] mt-1">PKR 7,000 <span className="text-xs font-medium text-slate-500">/ mo</span></div>
              <div className="text-[11px] text-slate-500 mt-1">Manage Unlimited Grounds & Venues</div>

              <ul className="mt-4 space-y-2 text-xs text-slate-600 border-t pt-3">
                <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#76C000] mr-1.5" /> <b>Unlimited Grounds</b></li>
                <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#76C000] mr-1.5" /> Multi-City Ground Chains</li>
                <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#76C000] mr-1.5" /> Dedicated Account Manager</li>
              </ul>
            </div>

          </div>

          {/* 2. Billing Cycle Duration Selector with Tiered Discounts */}
          {selectedPlan !== 'free' && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider">Select Billing Duration (Longer = Bigger Discount)</h4>
                <span className="text-xs font-bold text-[#76C000]">Up to 25% Off Yearly</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { months: 1, label: '1 Month', discount: '0%' },
                  { months: 3, label: '3 Months', discount: '10% Off' },
                  { months: 6, label: '6 Months', discount: '15% Off' },
                  { months: 8, label: '8 Months', discount: '20% Off' },
                  { months: 12, label: '1 Year (12 Mo)', discount: '25% Off 🎉' },
                ].map((c) => (
                  <button
                    type="button"
                    key={c.months}
                    onClick={() => setBillingMonths(c.months)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      billingMonths === c.months
                        ? 'bg-[#0B1B3D] text-white border-[#0B1B3D] ring-2 ring-[#76C000]'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-extrabold text-xs">{c.label}</div>
                    <div className={`text-[10px] mt-0.5 font-bold ${billingMonths === c.months ? 'text-[#76C000]' : 'text-slate-500'}`}>
                      {c.discount}
                    </div>
                  </button>
                ))}
              </div>

              {/* Price Calculation Explanation */}
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
                <div>
                  <span className="font-bold">Duration Savings Breakdown:</span>
                  <span className="ml-2">
                    {billingMonths === 12
                      ? `Standard 1 Year (24,000 PKR) reduced to PKR ${afterCycleDiscount.toLocaleString()} (PKR 1,500/mo)!`
                      : `${billingMonths} Months at ${cycleDiscountPct}% duration discount.`}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 3. Promo Code Input */}
          {selectedPlan !== 'free' && (
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#0B1B3D]">
                <Tag className="w-4 h-4 text-[#76C000]" />
                <span>Have a Promo Code? (Try)</span>
              </div>

              <form onSubmit={handleApplyPromo} className="flex items-center space-x-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="e.g. LAUNCH2026"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  className="px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#76C000] font-mono font-bold"
                />
                <button
                  type="submit"
                  className="bg-[#0B1B3D] text-white px-4 py-2 rounded-xl text-xs font-bold shrink-0"
                >
                  Apply Code
                </button>
              </form>
            </div>
          )}

          {/* 4. Final Checkout Summary & Registration Form */}
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider">Ground Owner Information</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                required
                placeholder="Ground / Venue Name *"
                value={groundName}
                onChange={(e) => setGroundName(e.target.value)}
                className="p-3 text-xs border border-slate-300 rounded-xl"
              />
              <input
                type="email"
                required
                placeholder="Owner Email Address *"
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
                className="p-3 text-xs border border-slate-300 rounded-xl"
              />
              <input
                type="tel"
                required
                placeholder="WhatsApp Number *"
                value={ownerPhone}
                onChange={(e) => setOwnerPhone(e.target.value)}
                className="p-3 text-xs border border-slate-300 rounded-xl"
              />
            </div>

            {/* Total Payable Summary Bar */}
            <div className="bg-[#0B1B3D] text-white p-4 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-300">Plan Selected: <span className="font-bold text-white">{selectedPlan.toUpperCase()} ({billingMonths} Months)</span></div>
                {appliedPromo && <div className="text-[10px] text-[#76C000]">Promo Code {appliedPromo.code} Applied!</div>}
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-300 uppercase font-bold">Total Subscription Price</div>
                <div className="text-2xl font-black text-[#76C000]">
                  PKR {finalPrice.toLocaleString()}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#76C000] hover:bg-[#68A800] text-[#0B1B3D] py-3.5 rounded-xl text-xs font-black shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>Confirm & Activate SaaS Partner Access</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
