import React, { useState } from 'react';
import { Building2, ShieldCheck, ArrowRight, CheckCircle2, DollarSign, MapPin, Phone, CreditCard, Sparkles, Image, Zap, Check } from 'lucide-react';




export const ListYourGroundPage = ({
  onRegisterFacilitySuccess,
  onBackToMarketplace,
}) => {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('Pro Plan');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form State
  const [groundName, setGroundName] = useState('');
  const [city, setCity] = useState('Rawalpindi');
  const [address, setAddress] = useState('');
  const [primarySport, setPrimarySport] = useState('Cricket');
  const [startingPrice, setStartingPrice] = useState(3000);
  const [depositPolicy, setDepositPolicy] = useState('partial_advance');
  const [depositPercentage, setDepositPercentage] = useState(30);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800');

  // Owner Payout details
  const [hostName, setHostName] = useState('');
  const [hostPhone, setHostPhone] = useState('');
  const [bankName, setBankName] = useState('Meezan Bank');
  const [bankIban, setBankIban] = useState('');
  const [jazzCashNumber, setJazzCashNumber] = useState('');

  const plans = [
    {
      name: 'Starter Trial',
      price: 'PKR 0',
      period: '1 Month Free Trial',
      badge: 'Free Trial',
      description: 'Ideal for single court owners trying online slot management.',
      features: [
        '1 Sports Ground Listing',
        '30-Day Interactive Month Calendar',
        'Desk Walk-in Cash Register',
        '0%, 30%, 100% Deposit Rules',
        'Standard Email Support',
      ],
      recommended: false,
    },
    {
      name: 'Pro Plan',
      price: 'PKR 2,000',
      period: 'per month',
      badge: 'Most Popular',
      description: 'Full feature suite for active multi-sport turf & arena hosts.',
      features: [
        'Up to 3 Sports Ground Listings',
        'Real-time WhatsApp Group Split Links',
        'Desk Walk-in Counter Cash Register',
        'Instant Thermal Receipt Printer Support',
        'Direct Player Deposit Accounts (Bank/JazzCash)',
        'Priority Host Support',
      ],
      recommended: true,
    },
    {
      name: 'Enterprise Unlimited',
      price: 'PKR 7,000',
      period: 'per month',
      badge: 'Unlimited Courts',
      description: 'For large sports complexes, franchises & multi-city venues.',
      features: [
        'Unlimited Sports Grounds & Net Courts',
        'Multi-Staff Manager POS Login Access',
        'Customized Advance Deposit Policies',
        'Dedicated Account Manager (Call & WhatsApp)',
        'Featured Top Search Placement on ArenaSlot',
      ],
      recommended: false,
    },
  ];

  const handleSubmitRegistration = (e) => {
    e.preventDefault();
    if (!groundName || !hostName || !hostPhone) {
      alert('Please fill in Ground Name, Host Name, and WhatsApp Phone Number!');
      return;
    }

    const newFac = {
      id: `fac-reg-${Date.now()}`,
      name: groundName,
      city,
      location: address || `${city} Sports Hub`,
      address: address || `Main Road, ${city}`,
      sports: [primarySport],
      rating: 5.0,
      totalReviews: 1,
      startingPrice,
      image: imageUrl,
      description: `Newly registered premier ${primarySport} facility under ${selectedPlan} membership.`,
      amenities: ['Floodlights', 'Parking', 'Seating Pavilion', 'Locker Room'],
      rates: [{ sport: primarySport, offPeakRate: startingPrice, peakRate: startingPrice * 1.3, durationMinutes: 60 }],
      availableSlotsCount: 16,
      paymentPolicy: depositPolicy,
      partialAdvancePercentage: depositPercentage,
      hostName,
      status: 'published',
      distanceKm: 1.8,
    };

    const ownerUser = {
      name: hostName,
      role: 'owner',
    };

    setSubmittedSuccess(true);
    setTimeout(() => {
      onRegisterFacilitySuccess(newFac, ownerUser);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Title Banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-[#76C000]/20 text-[#0B1B3D] px-4 py-1.5 rounded-full text-xs font-black">
            <Building2 className="w-4 h-4 text-[#76C000]" />
            <span>Official Ground Partner Registration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0B1B3D]">
            List Your Ground on ArenaSlot
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto">
            Choose your membership plan first, fill in your venue details, and activate your Counter Cash Register & 1-Month Slot Calendar.
          </p>
        </div>

        {/* Stepper Indicator */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-around text-xs font-extrabold text-slate-600">
          <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-[#0B1B3D]' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
              step >= 1 ? 'bg-[#76C000] text-[#0B1B3D]' : 'bg-slate-200 text-slate-500'
            }`}>1</span>
            <span>Choose Plan</span>
          </div>

          <div className="h-0.5 w-8 bg-slate-200 hidden sm:block" />

          <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-[#0B1B3D]' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
              step >= 2 ? 'bg-[#76C000] text-[#0B1B3D]' : 'bg-slate-200 text-slate-500'
            }`}>2</span>
            <span>Venue Details</span>
          </div>

          <div className="h-0.5 w-8 bg-slate-200 hidden sm:block" />

          <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-[#0B1B3D]' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
              step >= 3 ? 'bg-[#76C000] text-[#0B1B3D]' : 'bg-slate-200 text-slate-500'
            }`}>3</span>
            <span>Pricing & Deposit</span>
          </div>

          <div className="h-0.5 w-8 bg-slate-200 hidden sm:block" />

          <div className={`flex items-center space-x-2 ${step >= 4 ? 'text-[#0B1B3D]' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
              step >= 4 ? 'bg-[#76C000] text-[#0B1B3D]' : 'bg-slate-200 text-slate-500'
            }`}>4</span>
            <span>Payout Account</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-lg">
          
          {submittedSuccess ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-[#0B1B3D]">Ground Registration Complete!</h2>
              <p className="text-xs text-slate-500 font-bold">
                Activated under <span className="text-[#76C000] font-black">{selectedPlan}</span>. Opening your Owner Dashboard & Counter Cash Register...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitRegistration} className="space-y-6">
              
              {/* STEP 1: CHOOSE PLAN FIRST */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#76C000]" />
                        <span>Step 1: Choose Your Ground Partner Membership Plan</span>
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Select a membership plan to list your venue on ArenaSlot.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((p) => {
                      const isSelected = selectedPlan === p.name;
                      return (
                        <div
                          key={p.name}
                          onClick={() => setSelectedPlan(p.name)}
                          className={`p-6 rounded-3xl border text-left flex flex-col justify-between space-y-4 cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-[#0B1B3D] text-white border-[#0B1B3D] shadow-xl scale-105 ring-4 ring-[#76C000]'
                              : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                                isSelected ? 'bg-[#76C000] text-[#0B1B3D]' : 'bg-slate-200 text-slate-700'
                              }`}>
                                {p.badge}
                              </span>
                              {isSelected && <Check className="w-5 h-5 text-[#76C000]" />}
                            </div>

                            <h4 className={`text-lg font-black ${isSelected ? 'text-white' : 'text-slate-900'}`}>{p.name}</h4>
                            <p className={`text-xs mt-1 font-medium ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>{p.description}</p>

                            <div className="mt-4 pt-3 border-t border-slate-200/30">
                              <span className={`text-2xl font-black ${isSelected ? 'text-[#76C000]' : 'text-[#0B1B3D]'}`}>{p.price}</span>
                              <span className={`text-xs ml-1 font-semibold ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>{p.period}</span>
                            </div>
                          </div>

                          <ul className={`space-y-2 text-xs font-semibold ${isSelected ? 'text-slate-200' : 'text-slate-600'}`}>
                            {p.features.map((f, idx) => (
                              <li key={idx} className="flex items-center space-x-2">
                                <Check className={`w-3.5 h-3.5 ${isSelected ? 'text-[#76C000]' : 'text-emerald-600'}`} />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedPlan(p.name);
                              setStep(2);
                            }}
                            className={`w-full py-3 rounded-xl text-xs font-black shadow-md transition-all ${
                              isSelected
                                ? 'bg-[#76C000] hover:bg-[#68A800] text-[#0B1B3D]'
                                : 'bg-[#0B1B3D] text-white hover:bg-[#061229]'
                            }`}
                          >
                            <span>Select {p.name} & Continue</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={onBackToMarketplace}
                      className="px-6 py-3 bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
                    >
                      Cancel & Return to Marketplace
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-[#76C000] text-[#0B1B3D] px-8 py-3 rounded-xl text-xs font-black shadow-md flex items-center space-x-2"
                    >
                      <span>Proceed to Venue Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: VENUE DETAILS */}
              {step === 2 && (
                <div className="space-y-5">
                  <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#76C000]" />
                    <span>Step 2: Ground Venue Information ({selectedPlan})</span>
                  </h3>

                  <div className="space-y-4 text-xs font-medium">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Ground / Arena Full Name *</label>
                      <input
                        required
                        type="text"
                        value={groundName}
                        onChange={(e) => setGroundName(e.target.value)}
                        placeholder="e.g. Rawalpindi Champions Glass Padel Arena"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-extrabold text-slate-900 focus:outline-none focus:border-[#0B1B3D]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">City Location *</label>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-extrabold text-slate-900 focus:outline-none"
                        >
                          <option value="Rawalpindi">Rawalpindi</option>
                          <option value="Islamabad">Islamabad</option>
                          <option value="Lahore">Lahore</option>
                          <option value="Karachi">Karachi</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Primary Sport Type *</label>
                        <select
                          value={primarySport}
                          onChange={(e) => setPrimarySport(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-extrabold text-slate-900 focus:outline-none"
                        >
                          <option value="Cricket">Cricket Nets</option>
                          <option value="Futsal">Futsal Turf Field</option>
                          <option value="Padel">Glass Padel Court</option>
                          <option value="Badminton">Badminton Arena</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Street Address & Landmark *</label>
                      <input
                        required
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. Commercial Market, Satellite Town, Rawalpindi"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Ground Photo Image URL</label>
                      <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Paste image link or use default demo turf image"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
                    >
                      Back to Plans
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!groundName) {
                          alert('Please enter your Ground Name!');
                          return;
                        }
                        setStep(3);
                      }}
                      className="bg-[#0B1B3D] text-white px-8 py-3 rounded-xl text-xs font-extrabold flex items-center space-x-2"
                    >
                      <span>Proceed to Step 3</span>
                      <ArrowRight className="w-4 h-4 text-[#76C000]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: PRICING & ADVANCE DEPOSIT */}
              {step === 3 && (
                <div className="space-y-5">
                  <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[#76C000]" />
                    <span>Step 3: Hourly Rate & Deposit Policy</span>
                  </h3>

                  <div className="space-y-4 text-xs font-medium">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Starting Hourly Rate (PKR / hr) *</label>
                      <input
                        required
                        type="number"
                        value={startingPrice}
                        onChange={(e) => setStartingPrice(parseFloat(e.target.value) || 0)}
                        placeholder="3000"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-mono font-black text-slate-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-2">Select Player Advance Payment Rule</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            setDepositPolicy('no_advance');
                            setDepositPercentage(0);
                          }}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            depositPolicy === 'no_advance'
                              ? 'border-[#76C000] bg-lime-50/50 ring-2 ring-[#76C000]'
                              : 'border-slate-200'
                          }`}
                        >
                          <div className="font-extrabold text-slate-900">0% Pay at Desk</div>
                          <p className="text-[11px] text-slate-500 mt-1">Player pays 100% cash upon arrival.</p>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setDepositPolicy('partial_advance');
                            setDepositPercentage(30);
                          }}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            depositPolicy === 'partial_advance'
                              ? 'border-[#76C000] bg-lime-50/50 ring-2 ring-[#76C000]'
                              : 'border-slate-200'
                          }`}
                        >
                          <div className="font-extrabold text-slate-900">30% Online Deposit</div>
                          <p className="text-[11px] text-slate-500 mt-1">30% paid online to lock slot, 70% at desk.</p>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setDepositPolicy('full_advance');
                            setDepositPercentage(100);
                          }}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            depositPolicy === 'full_advance'
                              ? 'border-[#76C000] bg-lime-50/50 ring-2 ring-[#76C000]'
                              : 'border-slate-200'
                          }`}
                        >
                          <div className="font-extrabold text-slate-900">100% Full Advance</div>
                          <p className="text-[11px] text-slate-500 mt-1">Full payment required to confirm slot.</p>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="bg-[#0B1B3D] text-white px-8 py-3 rounded-xl text-xs font-extrabold flex items-center space-x-2"
                    >
                      <span>Proceed to Step 4</span>
                      <ArrowRight className="w-4 h-4 text-[#76C000]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: HOST ACCOUNT & PAYOUT */}
              {step === 4 && (
                <div className="space-y-5">
                  <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#76C000]" />
                    <span>Step 4: Owner Credentials & Payout Account</span>
                  </h3>

                  <div className="space-y-4 text-xs font-medium">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Owner / Manager Full Name *</label>
                        <input
                          required
                          type="text"
                          value={hostName}
                          onChange={(e) => setHostName(e.target.value)}
                          placeholder="e.g. Malik Hamza"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Mobile WhatsApp Phone *</label>
                        <input
                          required
                          type="text"
                          value={hostPhone}
                          onChange={(e) => setHostPhone(e.target.value)}
                          placeholder="0300-1234567"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-mono font-bold text-slate-900 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Bank Name for Payouts</label>
                        <input
                          type="text"
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                          placeholder="e.g. Meezan Bank / HBL"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-900 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Bank IBAN / Account Number</label>
                        <input
                          type="text"
                          value={bankIban}
                          onChange={(e) => setBankIban(e.target.value)}
                          placeholder="PK36 MEZN 0001 0203 0405 0607"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-mono font-semibold text-slate-900 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">JazzCash / EasyPaisa Number</label>
                      <input
                        type="text"
                        value={jazzCashNumber}
                        onChange={(e) => setJazzCashNumber(e.target.value)}
                        placeholder="0300-1234567"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-mono text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-3 bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-[#76C000] hover:bg-[#68A800] text-[#0B1B3D] px-10 py-3.5 rounded-xl text-xs font-black shadow-lg flex items-center space-x-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Complete Ground Registration & Open Dashboard</span>
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
