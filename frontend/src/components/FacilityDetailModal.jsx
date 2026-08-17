import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Users, CheckCircle2, ShieldCheck, Star, Image, Zap, ArrowRight, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

import { generateDailySlots } from '../data/mockData';



export const FacilityDetailModal = ({
  facility,
  onClose,
  onBookingSuccess,
  onConfirmBooking,
  onOpenChatWithHost,
}) => {
  const [selectedSport, setSelectedSport] = useState(facility.sports[0]);

  // Generate 30 Days (1 Month) Date Array starting from today
  const generateMonthDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const isoDate = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      const dayNum = d.getDate();
      dates.push({ isoDate, dayName, monthName, dayNum, fullLabel: `${monthName} ${dayNum}` });
    }
    return dates;
  };

  const monthDates = generateMonthDates();
  const [selectedDate, setSelectedDate] = useState(monthDates[0].isoDate);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [splitPlayersCount, setSplitPlayersCount] = useState(4);
  const [paymentMethod, setPaymentMethod] = useState('JazzCash');
  
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [step, setStep] = useState('select');
  const [confirmedBookingId, setConfirmedBookingId] = useState('');
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const gallery = facility.galleryImages && facility.galleryImages.length > 0
    ? facility.galleryImages
    : [facility.image];

  const currentSportRate = facility.rates.find((r) => r.sport === selectedSport) || facility.rates[0];

  const slots = generateDailySlots(
    selectedSport,
    currentSportRate?.offPeakRate || facility.startingPrice,
    currentSportRate?.peakRate || facility.startingPrice * 1.4
  );

  const totalSlotPrice = selectedSlot ? selectedSlot.price : 0;
  
  let advanceAmount = 0;
  let dueAtVenue = totalSlotPrice;

  if (facility.paymentPolicy === 'no_advance') {
    advanceAmount = 0;
    dueAtVenue = totalSlotPrice;
  } else if (facility.paymentPolicy === 'partial_advance') {
    advanceAmount = Math.round(totalSlotPrice * (facility.partialAdvancePercentage / 100));
    dueAtVenue = totalSlotPrice - advanceAmount;
  } else if (facility.paymentPolicy === 'full_advance') {
    advanceAmount = totalSlotPrice;
    dueAtVenue = 0;
  }

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !selectedSlot) return;

    const newBookingId = `AS-${Math.floor(10000 + Math.random() * 90000)}`;
    setConfirmedBookingId(newBookingId);

    const perPerson = Math.round(totalSlotPrice / (splitPlayersCount || 1));

    const newBooking = {
      id: newBookingId,
      facilityId: facility.id,
      facilityName: facility.name,
      location: facility.location,
      sport: selectedSport,
      date: selectedDate,
      time: selectedSlot.time,
      totalAmount: totalSlotPrice,
      advancePaid: advanceAmount,
      dueAtVenue: dueAtVenue,
      paymentMethod,
      paymentPolicy: facility.paymentPolicy,
      paymentStatus: advanceAmount > 0 ? (advanceAmount === totalSlotPrice ? 'Fully Paid' : 'Deposit Paid') : 'Pay at Venue',
      bookingType: 'Online',
      customerName,
      customerPhone,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      splitCount: splitPlayersCount,
      perPersonAmount: perPerson,
    };

    if (onBookingSuccess) onBookingSuccess(newBooking);
    if (onConfirmBooking) onConfirmBooking(newBooking);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-[#76C000] text-[#0B1B3D] text-[10px] font-black px-2.5 py-0.5 rounded-full">
                VERIFIED VENUE
              </span>
              <span className="text-xs text-slate-500 font-bold">• {facility.city}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">{facility.name}</h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {step === 'select' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Photos, Host Info & 1-Month Calendar */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Photo Gallery */}
                <div className="relative rounded-3xl overflow-hidden bg-slate-100 aspect-video shadow-sm">
                  <img
                    src={gallery[activePhotoIdx]}
                    alt={facility.name}
                    className="w-full h-full object-cover"
                  />
                  {gallery.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex space-x-2">
                      {gallery.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActivePhotoIdx(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            activePhotoIdx === idx ? 'bg-[#76C000] w-4' : 'bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Ground Owner / Host Direct Contact Box */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#0B1B3D] text-[#76C000] font-black text-sm flex items-center justify-center">
                      {facility.hostName ? facility.hostName.charAt(0) : 'H'}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Ground Owner</span>
                      <h4 className="text-xs font-extrabold text-slate-900">{facility.hostName || 'Malik Hamza (Owner)'}</h4>
                    </div>
                  </div>

                  {onOpenChatWithHost && (
                    <button
                      onClick={() => onOpenChatWithHost(facility)}
                      className="bg-[#0B1B3D] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 hover:bg-[#061229]"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#76C000]" />
                      <span>Chat with Owner</span>
                    </button>
                  )}
                </div>

                {/* STEP 1: 1-MONTH INTERACTIVE DATE CALENDAR (30 DAYS) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black uppercase text-slate-900 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#76C000]" />
                      <span>1. Select Match Date (30 Days Month View)</span>
                    </label>
                    <span className="text-xs font-extrabold text-[#0B1B3D]">
                      Selected: {monthDates.find((d) => d.isoDate === selectedDate)?.fullLabel}
                    </span>
                  </div>

                  {/* Horizontal Scrollable 30-Day Calendar Strip */}
                  <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin">
                    {monthDates.map((item) => {
                      const isSelected = selectedDate === item.isoDate;
                      return (
                        <button
                          key={item.isoDate}
                          onClick={() => {
                            setSelectedDate(item.isoDate);
                            setSelectedSlot(null);
                          }}
                          className={`flex-shrink-0 w-16 p-3 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-[#0B1B3D] text-white border-[#0B1B3D] shadow-md scale-105 ring-2 ring-[#76C000]'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <span className={`text-[10px] font-bold uppercase ${isSelected ? 'text-[#76C000]' : 'text-slate-400'}`}>
                            {item.dayName}
                          </span>
                          <span className="text-lg font-black my-0.5">{item.dayNum}</span>
                          <span className="text-[9px] font-semibold opacity-80">{item.monthName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 2: AVAILABLE TIME SLOTS FOR SELECTED DATE */}
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#76C000]" />
                    <span>2. Select Time Slot ({selectedDate})</span>
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
                    {slots.map((slot) => {
                      const isSelected = selectedSlot?.id === slot.id;
                      const isBooked = slot.status === 'booked';

                      return (
                        <button
                          key={slot.id}
                          disabled={isBooked}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                            isBooked
                              ? 'bg-slate-100 border-slate-200 opacity-50 cursor-not-allowed text-slate-400'
                              : isSelected
                              ? 'bg-[#0B1B3D] border-[#0B1B3D] text-white shadow-md scale-105'
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                          }`}
                        >
                          <span className="text-[11px] font-extrabold">{slot.time}</span>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100/30">
                            <span className={`text-[10px] font-bold ${isSelected ? 'text-[#76C000]' : 'text-emerald-700'}`}>
                              PKR {slot.price}
                            </span>
                            {slot.isPeak && (
                              <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.5 rounded">
                                PEAK
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Column: Split Match Calculator & Checkout Panel */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Court Price Summary & Split Match Box */}
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
                  <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-200 pb-2">
                    Match Summary & Cost Split
                  </h3>

                  <div className="space-y-2 text-xs font-semibold">
                    <div className="flex justify-between text-slate-600">
                      <span>Court Slot Price:</span>
                      <span className="font-bold text-slate-900">PKR {totalSlotPrice.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between text-slate-600">
                      <span>Online Deposit Due:</span>
                      <span className="font-bold text-emerald-700">PKR {advanceAmount.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between text-slate-600">
                      <span>Due at Venue:</span>
                      <span className="font-bold text-amber-700">PKR {dueAtVenue.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Split Match Per-Player Calculator */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3 pt-3">
                    <label className="block text-xs font-bold text-slate-800">Split Cost Between Players</label>
                    <div className="flex items-center space-x-3">
                      <Users className="w-4 h-4 text-[#76C000]" />
                      <select
                        value={splitPlayersCount}
                        onChange={(e) => setSplitPlayersCount(parseInt(e.target.value))}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900"
                      >
                        {[2, 4, 6, 8, 10, 12, 14, 16].map((num) => (
                          <option key={num} value={num}>{num} Players</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-500 font-medium">Each Player Pays:</span>
                      <span className="text-sm font-black text-[#0B1B3D]">
                        PKR {selectedSlot ? Math.round(totalSlotPrice / splitPlayersCount) : 0} / player
                      </span>
                    </div>
                  </div>
                </div>

                {/* Continue Checkout Button */}
                <button
                  onClick={() => setStep('checkout')}
                  disabled={!selectedSlot}
                  className={`w-full py-4 rounded-2xl text-xs font-black shadow-lg transition-all flex items-center justify-center space-x-2 ${
                    selectedSlot
                      ? 'bg-[#76C000] hover:bg-[#68A800] text-[#0B1B3D]'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <span>Proceed to Slot Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>

            </div>
          )}

          {/* Step 2: Customer Checkout Form */}
          {step === 'checkout' && (
            <form onSubmit={handleFinalSubmit} className="max-w-xl mx-auto space-y-6">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900 border-b pb-2">Player Information</h3>
                
                <div className="space-y-3 text-xs font-medium">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Your Full Name *</label>
                    <input
                      required
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Shahzaib Ahmed"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 font-bold text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">WhatsApp Phone Number *</label>
                    <input
                      required
                      type="text"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0300-1234567"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 font-mono font-bold text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep('select')}
                  className="px-6 py-3.5 bg-slate-200 text-slate-800 rounded-2xl text-xs font-bold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#0B1B3D] text-white py-3.5 rounded-2xl text-xs font-black shadow-lg"
                >
                  Confirm & Lock Slot Reservation
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Success Screen */}
          {step === 'success' && (
            <div className="max-w-md mx-auto text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">Booking Confirmed!</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Your reservation ID is <span className="font-mono font-bold text-[#0B1B3D]">{confirmedBookingId}</span>
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-[#0B1B3D] text-white py-3.5 rounded-2xl text-xs font-bold shadow-md"
              >
                Close & View My Bookings
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
