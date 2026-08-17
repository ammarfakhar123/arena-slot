import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Star, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

import { generateDailySlots } from '../../data/mockData';



export const CalendlyBookingView = ({
  facility,
  onSelectSlotToBook,
}) => {
  const [selectedSport, setSelectedSport] = useState(facility.sports[0]);
  const [selectedDate, setSelectedDate] = useState('2026-08-17');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const currentRate = facility.rates.find((r) => r.sport === selectedSport) || facility.rates[0];
  const multiplier = durationMinutes / 60;

  const baseOffPeak = Math.round(currentRate.offPeakRate * multiplier);
  const basePeak = Math.round(currentRate.peakRate * multiplier);

  const slots = generateDailySlots(selectedSport, baseOffPeak, basePeak);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-3">
      
      {/* Left Column: Calendly Style Facility & Date Picker Info */}
      <div className="p-6 sm:p-8 bg-slate-50 border-r border-slate-200 space-y-6">
        <div>
          <span className="text-[11px] font-black text-[#76C000] uppercase tracking-wider">
            Calendly Style Instant Scheduling
          </span>
          <h3 className="text-xl font-black text-[#0B1B3D] mt-1">{facility.name}</h3>
          <p className="text-xs text-slate-500 flex items-center mt-1">
            <MapPin className="w-3.5 h-3.5 text-[#76C000] mr-1 shrink-0" />
            <span>{facility.location} ({facility.city})</span>
          </p>
        </div>

        {/* Duration Picker */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">Select Match Duration:</label>
          <div className="grid grid-cols-3 gap-1.5">
            {[60, 90, 120].map((mins) => (
              <button
                key={mins}
                onClick={() => {
                  setDurationMinutes(mins);
                  setSelectedSlot(null);
                }}
                className={`py-2 rounded-xl text-xs font-extrabold border transition-all ${
                  durationMinutes === mins
                    ? 'bg-[#0B1B3D] text-white border-[#0B1B3D] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {mins} Mins
              </button>
            ))}
          </div>
        </div>

        {/* Date Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">Select Date:</label>
          <div className="space-y-1.5">
            {[
              { label: 'Today - Sunday, Aug 16', date: '2026-08-16' },
              { label: 'Tomorrow - Monday, Aug 17', date: '2026-08-17' },
              { label: 'Tuesday, Aug 18', date: '2026-08-18' },
              { label: 'Wednesday, Aug 19', date: '2026-08-19' },
            ].map((d) => (
              <button
                key={d.date}
                onClick={() => {
                  setSelectedDate(d.date);
                  setSelectedSlot(null);
                }}
                className={`w-full text-left p-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                  selectedDate === d.date
                    ? 'bg-[#0B1B3D] text-white border-[#0B1B3D]'
                    : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="flex items-center">
                  <CalendarIcon className="w-3.5 h-3.5 mr-2 text-[#76C000]" />
                  {d.label}
                </span>
                {selectedDate === d.date && <span className="w-2 h-2 rounded-full bg-[#76C000]" />}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Right Column: Calendly Style Time Slots Column */}
      <div className="lg:col-span-2 p-6 sm:p-8 space-y-6">
        
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h4 className="text-base font-black text-[#0B1B3D]">Select Match Time ({selectedDate})</h4>
            <p className="text-xs text-slate-500">Duration: {durationMinutes} Minutes • Sport: {selectedSport}</p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl">
            {facility.sports.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSelectedSport(s);
                  setSelectedSlot(null);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all ${
                  selectedSport === s ? 'bg-[#0B1B3D] text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Calendly Vertical / Grid Slots List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
          {slots.map((slot) => {
            const isSelected = selectedSlot?.id === slot.id;
            const isAvailable = slot.status === 'available';

            return (
              <button
                key={slot.id}
                disabled={!isAvailable}
                onClick={() => setSelectedSlot(slot)}
                className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#0B1B3D] text-white border-[#0B1B3D] ring-2 ring-[#76C000] shadow-md scale-102'
                    : !isAvailable
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
                    : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="text-xs font-black">{slot.time}</div>
                  <div className="text-[11px] opacity-75 mt-0.5">
                    {slot.isPeak ? 'Peak Hour Rate' : 'Standard Rate'}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-black">PKR {slot.price.toLocaleString()}</div>
                  <div className={`text-[10px] font-bold ${isSelected ? 'text-[#76C000]' : 'text-emerald-700'}`}>
                    {isAvailable ? 'Confirm →' : 'Booked'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selection Trigger Bar */}
        {selectedSlot && (
          <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-300">Selected {selectedDate} ({selectedSlot.time})</div>
              <div className="text-sm font-black text-[#76C000]">Total Fee: PKR {selectedSlot.price.toLocaleString()}</div>
            </div>
            <button
              onClick={() => onSelectSlotToBook(selectedSport, selectedDate, selectedSlot, durationMinutes)}
              className="bg-[#76C000] hover:bg-[#68A800] text-[#0B1B3D] px-6 py-2.5 rounded-xl text-xs font-black shadow-md flex items-center space-x-1.5"
            >
              <span>Next: Confirm Booking</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
