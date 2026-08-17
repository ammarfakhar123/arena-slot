import React, { useState } from 'react';
import { Calendar, Clock, DollarSign, PlusCircle, Printer, CheckCircle2, User, Phone, Zap, CreditCard, Wallet, Calculator } from 'lucide-react';

import { generateDailySlots } from '../data/mockData';



export const OwnerPOSCalendar = ({
  facility,
  bookings,
  onAddManualBooking,
}) => {
  const [selectedSport, setSelectedSport] = useState(facility.sports[0]);
  const [selectedDate, setSelectedDate] = useState('2026-08-17');
  const [selectedSlot, setSelectedSlot] = useState(null);

  // POS Form State
  const [captainName, setCaptainName] = useState('');
  const [captainPhone, setCaptainPhone] = useState('');
  const [posPaymentMethod, setPosPaymentMethod] = useState('Cash');
  const [cashTendered, setCashTendered] = useState('');
  const [printedBooking, setPrintedBooking] = useState(null);

  const currentRate = facility.rates.find((r) => r.sport === selectedSport) || facility.rates[0];
  const slots = generateDailySlots(
    selectedSport,
    currentRate?.offPeakRate || facility.startingPrice,
    currentRate?.peakRate || facility.startingPrice * 1.4
  );

  // Filter bookings for this facility & date
  const facilityDayBookings = bookings.filter(
    (b) => b.facilityId === facility.id && b.date === selectedDate && b.sport === selectedSport
  );

  const totalAmount = selectedSlot ? selectedSlot.price : 0;
  const cashNum = parseFloat(cashTendered) || 0;
  const changeDue = Math.max(0, cashNum - totalAmount);

  const handleCreatePOSBooking = (e) => {
    e.preventDefault();
    if (!captainName || !captainPhone || !selectedSlot) return;

    const newBooking = {
      id: `POS-${Math.floor(10000 + Math.random() * 90000)}`,
      facilityId: facility.id,
      facilityName: facility.name,
      location: facility.location,
      sport: selectedSport,
      date: selectedDate,
      time: selectedSlot.time,
      totalAmount,
      advancePaid: totalAmount,
      dueAtVenue: 0,
      paymentMethod: posPaymentMethod === 'Cash' ? 'Cash' : 'Card',
      paymentPolicy: facility.paymentPolicy,
      paymentStatus: 'Fully Paid',
      bookingType: 'POS Counter',
      customerName: `${captainName} (Counter Walk-in)`,
      customerPhone: captainPhone,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      posCounterCashReceived: posPaymentMethod === 'Cash' ? cashNum : totalAmount,
      posCounterChangeDue: posPaymentMethod === 'Cash' ? changeDue : 0,
    };

    onAddManualBooking(newBooking);
    setPrintedBooking(newBooking);
    setCaptainName('');
    setCaptainPhone('');
    setCashTendered('');
    setSelectedSlot(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Controls */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-[#0B1B3D]">Live Court POS Terminal & Interactive Calendar</h3>
          <p className="text-xs text-slate-500">Record walk-in payments at ground counter & inspect live slot calendar.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Sport Selector */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {facility.sports.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSport(s)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedSport === s ? 'bg-[#0B1B3D] text-white shadow-xs' : 'text-slate-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Date Picker */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-1.5 border border-slate-300 font-bold text-xs rounded-xl focus:outline-none bg-white"
          />
        </div>
      </div>

      {/* Main 2-Column Grid: Left Visual Calendar Grid, Right Counter POS Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Visual Calendar Grid */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h4 className="text-sm font-black text-[#0B1B3D] uppercase tracking-wider">
              {selectedSport} Court Live Slot Grid ({selectedDate})
            </h4>

            <div className="flex items-center space-x-3 text-[11px] font-semibold text-slate-600">
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded bg-emerald-500 mr-1" /> Free</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded bg-[#0B1B3D] mr-1" /> Online Booked</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded bg-blue-600 mr-1" /> Counter POS</span>
            </div>
          </div>

          {/* Slots Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {slots.map((slot) => {
              const isSelected = selectedSlot?.id === slot.id;
              
              // Check if booked online or via POS
              const existingBooking = facilityDayBookings.find((b) => b.time === slot.time);
              const isBooked = !!existingBooking || slot.status === 'booked';
              const bookingType = existingBooking?.bookingType || (isBooked ? 'Online' : 'Free');

              return (
                <button
                  key={slot.id}
                  disabled={isBooked}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                    isSelected
                      ? 'bg-[#0B1B3D] text-white border-[#0B1B3D] ring-2 ring-[#76C000] shadow-md scale-105'
                      : isBooked
                      ? bookingType === 'POS Counter'
                        ? 'bg-blue-50 border-blue-200 text-blue-900 cursor-not-allowed'
                        : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-75'
                      : slot.isPeak
                      ? 'bg-amber-50 border-amber-300 text-slate-900 hover:bg-amber-100'
                      : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-extrabold">{slot.time}</div>
                  
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="font-black">
                      {isBooked ? (existingBooking?.customerName || 'Booked') : `PKR ${slot.price}`}
                    </span>
                    {slot.isPeak && !isBooked && (
                      <span className="bg-amber-200 text-amber-900 font-bold px-1 rounded text-[9px]">PEAK</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: POS Terminal Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 border-b pb-3 text-[#0B1B3D]">
            <Calculator className="w-5 h-5 text-[#76C000]" />
            <h4 className="text-sm font-black uppercase">Counter POS Checkout Terminal</h4>
          </div>

          {selectedSlot ? (
            <form onSubmit={handleCreatePOSBooking} className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <div className="flex justify-between font-bold text-[#0B1B3D]">
                  <span>Slot Selected:</span>
                  <span>{selectedSlot.time}</span>
                </div>
                <div className="flex justify-between font-black text-sm text-[#0B1B3D] border-t pt-1">
                  <span>Match Price:</span>
                  <span className="text-[#76C000]">PKR {totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Team Captain Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Captain Hamza"
                  value={captainName}
                  onChange={(e) => setCaptainName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#76C000]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="0300-1234567"
                  value={captainPhone}
                  onChange={(e) => setCaptainPhone(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#76C000]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">POS Payment Type</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['Cash', 'Card', 'JazzCash', 'EasyPaisa']).map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setPosPaymentMethod(m)}
                      className={`p-2 rounded-lg border font-bold text-[11px] ${
                        posPaymentMethod === m ? 'bg-[#0B1B3D] text-white' : 'bg-slate-50 text-slate-800'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {posPaymentMethod === 'Cash' && (
                <div className="bg-slate-50 p-3 rounded-xl border space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-slate-700">Cash Received (PKR):</label>
                    <input
                      type="number"
                      placeholder="e.g. 5000"
                      value={cashTendered}
                      onChange={(e) => setCashTendered(e.target.value)}
                      className="w-24 p-1.5 border border-slate-300 rounded-lg text-right font-black"
                    />
                  </div>
                  <div className="flex justify-between font-extrabold text-slate-800 text-xs border-t pt-1">
                    <span>Change to Return:</span>
                    <span className="text-[#76C000] font-black">PKR {changeDue.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#0B1B3D] hover:bg-[#061229] text-white py-3 rounded-xl text-xs font-black shadow-md flex items-center justify-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#76C000]" />
                <span>Confirm POS Booking & Print Receipt</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Clock className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-bold text-xs">Select an Available Slot on the Left Grid</p>
              <p className="text-[11px]">Click any green or free slot to start counter POS checkout.</p>
            </div>
          )}

        </div>

      </div>

      {/* POS COUNTER RECEIPT MODAL */}
      {printedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setPrintedBooking(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900"
            >
              ✕
            </button>

            <div className="text-center border-b pb-3 space-y-1">
              <img src="/logo.png" alt="ArenaSlot" className="h-8 w-auto object-contain mx-auto" />
              <div className="text-xs font-black text-[#0B1B3D]">{facility.name} POS Counter</div>
              <div className="text-[10px] font-mono text-slate-500">POS RECEIPT #{printedBooking.id}</div>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="font-bold">Customer:</span>
                <span>{printedBooking.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Sport & Slot:</span>
                <span>{printedBooking.sport} ({printedBooking.time})</span>
              </div>
              <div className="flex justify-between font-black border-t pt-2">
                <span>Total Charge:</span>
                <span>PKR {printedBooking.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Paid via:</span>
                <span className="font-bold">{printedBooking.paymentMethod}</span>
              </div>
              {printedBooking.posCounterCashReceived ? (
                <>
                  <div className="flex justify-between">
                    <span>Cash Tendered:</span>
                    <span>PKR {printedBooking.posCounterCashReceived.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-emerald-700">
                    <span>Change Returned:</span>
                    <span>PKR {(printedBooking.posCounterChangeDue || 0).toLocaleString()}</span>
                  </div>
                </>
              ) : null}
            </div>

            <button
              onClick={() => {
                window.print();
              }}
              className="w-full bg-[#0B1B3D] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2"
            >
              <Printer className="w-4 h-4 text-[#76C000]" />
              <span>Print Thermal POS Receipt</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
