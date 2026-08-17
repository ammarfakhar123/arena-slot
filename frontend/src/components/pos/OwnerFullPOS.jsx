import React, { useState } from 'react';
import { Calculator, Printer, CheckCircle2, User, Phone, DollarSign, Calendar, Clock, RefreshCw, CreditCard, ShieldCheck, Building } from 'lucide-react';

import { generateDailySlots } from '../../data/mockData';



export const OwnerFullPOS = ({
  facilities = [],
  facility: propFacility,
  bookings = [],
  onAddBooking,
  onAddManualBooking,
}) => {
  const [selectedFacilityId, setSelectedFacilityId] = useState(
    propFacility?.id || (facilities.length > 0 ? facilities[0].id : 'fac-1')
  );

  const activeFacility = propFacility || facilities.find((f) => f.id === selectedFacilityId) || facilities[0] || {
    id: 'fac-1',
    name: 'Rawalpindi Padel & Badminton Arena',
    city: 'Rawalpindi',
    location: 'Satellite Town',
    sports: ['Padel', 'Badminton'],
    startingPrice: 3500,
    rates: [
      { sport: 'Padel', offPeakRate: 3500, peakRate: 4500, durationMinutes: 60 },
      { sport: 'Badminton', offPeakRate: 1800, peakRate: 2400, durationMinutes: 60 },
    ],
    paymentPolicy: 'partial_advance',
  };

  const [selectedSport, setSelectedSport] = useState(activeFacility.sports[0] || 'Padel');
  const [selectedDate, setSelectedDate] = useState('2026-08-17');
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Walk-in Customer Form
  const [captainName, setCaptainName] = useState('');
  const [captainPhone, setCaptainPhone] = useState('');
  const [teamName, setTeamName] = useState('');
  const [posPaymentMethod, setPosPaymentMethod] = useState('Cash');
  const [cashTendered, setCashTendered] = useState('');
  const [printedBooking, setPrintedBooking] = useState(null);

  const currentRate = activeFacility.rates?.find((r) => r.sport === selectedSport) || activeFacility.rates?.[0] || {
    offPeakRate: activeFacility.startingPrice,
    peakRate: activeFacility.startingPrice * 1.3,
  };

  const slots = generateDailySlots(
    selectedSport,
    currentRate?.offPeakRate || activeFacility.startingPrice,
    currentRate?.peakRate || activeFacility.startingPrice * 1.3
  );

  const totalAmount = selectedSlot ? selectedSlot.price : 0;
  const cashNum = parseFloat(cashTendered) || 0;
  const changeDue = Math.max(0, cashNum - totalAmount);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!captainName || !captainPhone || !selectedSlot) {
      alert('Please enter Captain Name, Phone Number, and select a Time Slot!');
      return;
    }

    const newBooking = {
      id: `REG-${Math.floor(10000 + Math.random() * 90000)}`,
      facilityId: activeFacility.id,
      facilityName: activeFacility.name,
      location: activeFacility.location,
      sport: selectedSport,
      date: selectedDate,
      time: selectedSlot.time,
      totalAmount,
      advancePaid: totalAmount,
      dueAtVenue: 0,
      paymentMethod: posPaymentMethod === 'Cash' ? 'Cash' : posPaymentMethod === 'Card' ? 'Card' : posPaymentMethod,
      paymentPolicy: activeFacility.paymentPolicy || 'full_advance',
      paymentStatus: 'Fully Paid',
      bookingType: 'Walk-in Counter',
      customerName: `${captainName} ${teamName ? `(${teamName})` : ''}`,
      customerPhone: captainPhone,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      posCounterCashReceived: posPaymentMethod === 'Cash' ? cashNum : totalAmount,
      posCounterChangeDue: posPaymentMethod === 'Cash' ? changeDue : 0,
    };

    if (onAddBooking) {
      onAddBooking(newBooking);
    } else if (onAddManualBooking) {
      onAddManualBooking(newBooking);
    }

    setPrintedBooking(newBooking);
    setCaptainName('');
    setCaptainPhone('');
    setTeamName('');
    setCashTendered('');
    setSelectedSlot(null);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-[#76C000]/20 text-[#0B1B3D] px-3 py-1 rounded-full text-xs font-black mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Counter Cash Register</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Desk Walk-in Booking Counter
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Register walk-in players, calculate cash change return, and print paper receipts.
          </p>
        </div>

        {/* Facility Dropdown Selector if multiple facilities */}
        {facilities.length > 1 && (
          <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded-2xl border border-slate-200">
            <Building className="w-4 h-4 text-[#76C000]" />
            <select
              value={selectedFacilityId}
              onChange={(e) => {
                setSelectedFacilityId(e.target.value);
                const fac = facilities.find((f) => f.id === e.target.value);
                if (fac && fac.sports[0]) setSelectedSport(fac.sports[0]);
              }}
              className="bg-transparent text-xs font-extrabold text-[#0B1B3D] focus:outline-none cursor-pointer"
            >
              {facilities.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.city})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Slot Selection & Date */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Sport Selector Tabs */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase text-slate-500">1. Select Sport Court</label>
            <div className="flex flex-wrap gap-2">
              {activeFacility.sports.map((sport) => (
                <button
                  key={sport}
                  onClick={() => {
                    setSelectedSport(sport);
                    setSelectedSlot(null);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                    selectedSport === sport
                      ? 'bg-[#0B1B3D] text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase text-slate-500">2. Select Match Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedSlot(null);
              }}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-extrabold text-slate-900 focus:outline-none"
            />
          </div>

          {/* Slots Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase text-slate-500">3. Select Time Slot</label>
              <span className="text-[11px] text-slate-400 font-medium">Off-Peak vs Peak Hours</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[300px] overflow-y-auto p-1">
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

        {/* Right Column: Customer Details & Cash Calculator */}
        <div className="lg:col-span-5 bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-6">
          <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-[#76C000]" />
            <span>4. Walk-in Customer & Cash Return</span>
          </h3>

          <form onSubmit={handleCheckout} className="space-y-4 text-xs font-medium">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Captain Full Name *</label>
              <input
                required
                type="text"
                value={captainName}
                onChange={(e) => setCaptainName(e.target.value)}
                placeholder="e.g. Shahzaib Ahmed"
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Mobile WhatsApp Number *</label>
              <input
                required
                type="text"
                value={captainPhone}
                onChange={(e) => setCaptainPhone(e.target.value)}
                placeholder="0300-1234567"
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-mono font-bold text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Team / Group Name (Optional)</label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. Rawalpindi Strikers"
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-900 focus:outline-none"
              />
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">Payment Method</label>
              <div className="grid grid-cols-4 gap-2">
                {(['Cash', 'Card', 'JazzCash', 'EasyPaisa']).map((m) => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => setPosPaymentMethod(m)}
                    className={`py-2 text-[11px] font-extrabold rounded-xl border transition-all ${
                      posPaymentMethod === m
                        ? 'bg-[#0B1B3D] text-white border-[#0B1B3D]'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Cash Calculator Box */}
            {posPaymentMethod === 'Cash' && (
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Slot Total Amount:</span>
                  <span className="text-[#0B1B3D] font-black text-sm">PKR {totalAmount.toLocaleString()}</span>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Cash Received from Player (PKR)</label>
                  <input
                    type="number"
                    value={cashTendered}
                    onChange={(e) => setCashTendered(e.target.value)}
                    placeholder="Enter cash received e.g. 5000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-black text-slate-900 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-slate-100">
                  <span>Change Due to Return:</span>
                  <span className="text-emerald-600 font-black text-base">PKR {changeDue.toLocaleString()}</span>
                </div>
              </div>
            )}

            {/* Checkout Action Button */}
            <button
              type="submit"
              disabled={!selectedSlot || !captainName || !captainPhone}
              className={`w-full py-3.5 rounded-2xl text-xs font-black shadow-md transition-all flex items-center justify-center space-x-2 ${
                selectedSlot && captainName && captainPhone
                  ? 'bg-[#76C000] hover:bg-[#68A800] text-[#0B1B3D]'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Walk-in & Generate Receipt</span>
            </button>
          </form>

        </div>

      </div>

      {/* Printed Receipt Modal Preview */}
      {printedBooking && (
        <div className="bg-slate-900/90 fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl max-w-md w-full space-y-4 font-mono text-xs text-slate-900 border border-slate-200">
            <div className="text-center border-b pb-3 space-y-1">
              <h4 className="font-black text-base text-[#0B1B3D] uppercase">{printedBooking.facilityName}</h4>
              <p className="text-[10px] text-slate-500">{printedBooking.location} • Counter Thermal Receipt</p>
              <p className="text-[10px] font-bold text-emerald-700">REF: {printedBooking.id}</p>
            </div>

            <div className="space-y-1.5 py-2">
              <div className="flex justify-between"><span>Customer:</span><span className="font-bold">{printedBooking.customerName}</span></div>
              <div className="flex justify-between"><span>Phone:</span><span className="font-bold">{printedBooking.customerPhone}</span></div>
              <div className="flex justify-between"><span>Sport:</span><span className="font-bold">{printedBooking.sport}</span></div>
              <div className="flex justify-between"><span>Date:</span><span className="font-bold">{printedBooking.date}</span></div>
              <div className="flex justify-between"><span>Time Slot:</span><span className="font-bold">{printedBooking.time}</span></div>
              <div className="flex justify-between border-t pt-2 mt-2 font-black text-sm">
                <span>Total Paid:</span>
                <span className="text-emerald-700">PKR {printedBooking.totalAmount.toLocaleString()}</span>
              </div>
              {printedBooking.posCounterCashReceived && (
                <>
                  <div className="flex justify-between text-slate-600"><span>Cash Received:</span><span>PKR {printedBooking.posCounterCashReceived}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Change Returned:</span><span>PKR {printedBooking.posCounterChangeDue}</span></div>
                </>
              )}
            </div>

            <div className="flex gap-3 pt-3 border-t">
              <button
                onClick={handlePrintReceipt}
                className="flex-1 bg-[#0B1B3D] text-white py-2.5 rounded-xl font-sans font-bold flex items-center justify-center space-x-2"
              >
                <Printer className="w-4 h-4 text-[#76C000]" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={() => setPrintedBooking(null)}
                className="px-4 bg-slate-200 text-slate-800 rounded-xl font-sans font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
