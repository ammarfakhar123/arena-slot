import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Zap, CheckCircle2 } from 'lucide-react';

import { generateDailySlots } from '../../data/mockData';



export const FullMonthCalendarView = ({
  facility,
  bookings,
  onSelectSlotToBook,
}) => {
  const [currentMonth, setCurrentMonth] = useState('August 2026');
  const [selectedSport, setSelectedSport] = useState(facility.sports[0]);
  const [selectedDay, setSelectedDay] = useState(17); // Aug 17 default
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Generate 31 days for August 2026
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calculate formatted date string for selected day e.g. "2026-08-17"
  const formattedDayStr = selectedDay < 10 ? `0${selectedDay}` : `${selectedDay}`;
  const selectedDateStr = `2026-08-${formattedDayStr}`;

  const currentRate = facility.rates.find((r) => r.sport === selectedSport) || facility.rates[0];
  const slots = generateDailySlots(
    selectedSport,
    currentRate?.offPeakRate || facility.startingPrice,
    currentRate?.peakRate || facility.startingPrice * 1.4
  );

  // Count bookings per day
  const getDayBookingCount = (dayNum) => {
    const dayStr = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
    const dateQuery = `2026-08-${dayStr}`;
    return bookings.filter((b) => b.facilityId === facility.id && b.date === dateQuery).length;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div>
          <span className="text-xs font-black text-[#76C000] uppercase tracking-wider">
            Full 1-Month Facility Calendar
          </span>
          <h3 className="text-2xl font-black text-[#0B1B3D] mt-0.5">{facility.name} — {currentMonth}</h3>
        </div>

        <div className="flex items-center space-x-3">
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

          <div className="flex items-center space-x-1 border rounded-xl p-1">
            <button className="p-1 text-slate-600 hover:text-black">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold px-2">{currentMonth}</span>
            <button className="p-1 text-slate-600 hover:text-black">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2-Column Grid: Full Month Calendar Grid (Left) + Selected Day Time Slots (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: 1-Month Visual Grid (31 Days) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Select Day of Month:</span>
            <div className="flex items-center space-x-3 text-[11px] font-normal">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-1" /> Open Slots</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#0B1B3D] mr-1" /> High Demand</span>
            </div>
          </div>

          {/* Weekday Titles */}
          <div className="grid grid-cols-7 text-center text-xs font-black text-slate-400 py-2 border-b">
            {weekDays.map((w) => (
              <div key={w}>{w}</div>
            ))}
          </div>

          {/* 31 Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty offset for Aug 1 2026 (Starts Saturday = 6 offset) */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={`empty-${i}`} className="h-16 rounded-2xl bg-slate-50 opacity-30" />
            ))}

            {daysInMonth.map((day) => {
              const isSelected = selectedDay === day;
              const bookingCount = getDayBookingCount(day);
              const isHighDemand = bookingCount > 2;

              return (
                <button
                  key={day}
                  onClick={() => {
                    setSelectedDay(day);
                    setSelectedSlot(null);
                  }}
                  className={`h-16 p-2 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#0B1B3D] text-white border-[#0B1B3D] ring-2 ring-[#76C000] shadow-md scale-105 z-10'
                      : isHighDemand
                      ? 'bg-amber-50 border-amber-300 text-slate-900 hover:bg-amber-100'
                      : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xs font-black">{day}</span>
                  
                  <div className="flex items-center justify-between text-[10px]">
                    <span className={`px-1.5 py-0.5 rounded font-bold ${
                      isSelected ? 'bg-[#76C000] text-[#0B1B3D]' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {bookingCount} Booked
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Time Slots for Selected Date */}
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl space-y-4">
          <div>
            <div className="text-xs font-black text-[#0B1B3D] uppercase">Selected Date:</div>
            <h4 className="text-xl font-black text-[#0B1B3D]">August {selectedDay}, 2026</h4>
            <p className="text-xs text-slate-500">{selectedSport} Court Slots</p>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {slots.map((slot) => {
              const isSelected = selectedSlot?.id === slot.id;
              return (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#0B1B3D] text-white border-[#0B1B3D] ring-2 ring-[#76C000]'
                      : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <div className="text-xs font-black">{slot.time}</div>
                    <div className="text-[10px] text-slate-500">{slot.isPeak ? 'Peak Rate' : 'Standard Rate'}</div>
                  </div>
                  <div className="text-xs font-black">PKR {slot.price}</div>
                </button>
              );
            })}
          </div>

          {selectedSlot && (
            <button
              onClick={() => onSelectSlotToBook(selectedSport, selectedDateStr, selectedSlot)}
              className="w-full bg-[#76C000] hover:bg-[#68A800] text-[#0B1B3D] font-black py-3 rounded-2xl text-xs shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Book Slot for Aug {selectedDay}</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
