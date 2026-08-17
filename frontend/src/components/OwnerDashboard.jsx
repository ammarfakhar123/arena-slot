import React, { useState } from 'react';
import { LayoutDashboard, Calendar, DollarSign, Users, PlusCircle, Settings, ShieldCheck, CheckCircle2, Phone, AlertCircle, Clock, Zap, Building2, CreditCard, Eye, EyeOff, Wrench, Star, Plus, XCircle, BarChart3, MessageSquare, Send, Calculator } from 'lucide-react';

import { OwnerPOSCalendar } from './OwnerPOSCalendar';
import { MOCK_REVIEWS } from '../data/mockData';
import { playChatNotificationSound } from '../utils/sound';



export const OwnerDashboard = ({
  facilities,
  bookings,
  messages,
  onAddManualBooking,
  onCancelBooking,
  onUpdateRates,
  onUpdatePaymentPolicy,
  onUpdateFacilityStatus,
  onAddFacility,
  onSendMessage,
}) => {
  const [selectedFacilityId, setSelectedFacilityId] = useState(facilities[0]?.id || '');
  const [activeSubTab, setActiveSubTab] = useState('pos');

  const currentFacility = facilities.find((f) => f.id === selectedFacilityId) || facilities[0];

  // Reviews state with owner replies
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [starFilter, setStarFilter] = useState(0);
  const [replyingReviewId, setReplyingReviewId] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Owner Chat Inbox State
  const [ownerChatText, setOwnerChatText] = useState('');

  // New Ground Form Modal State
  const [isAddGroundOpen, setIsAddGroundOpen] = useState(false);
  const [newGroundName, setNewGroundName] = useState('');
  const [newGroundCity, setNewGroundCity] = useState('Islamabad');
  const [newGroundLocation, setNewGroundLocation] = useState('');
  const [newGroundAddress, setNewGroundAddress] = useState('');
  const [newGroundSport, setNewGroundSport] = useState('Cricket');
  const [newGroundPrice, setNewGroundPrice] = useState('2000');

  // SaaS Payment Policy Settings State
  const [policyType, setPolicyType] = useState(currentFacility?.paymentPolicy || 'partial_advance');
  const [advancePercent, setAdvancePercent] = useState(currentFacility?.partialAdvancePercentage || 30);

  const facilityBookings = bookings.filter((b) => b.facilityId === selectedFacilityId);
  const activeBookings = facilityBookings.filter((b) => b.paymentStatus !== 'Cancelled');
  const totalRevenue = activeBookings.reduce((sum, b) => sum + b.totalAmount, 0);

  const facilityMessages = messages.filter((m) => m.facilityId === selectedFacilityId);

  const handleAddOwnerReply = (reviewId) => {
    if (!replyText.trim()) return;
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              ownerReply: replyText.trim(),
              replyDate: 'Just now',
            }
          : r
      )
    );
    setReplyingReviewId(null);
    setReplyText('');
    alert('Your reply has been posted to the review!');
  };

  const handleSendOwnerMessage = (e) => {
    e.preventDefault();
    if (!ownerChatText.trim()) return;

    if (onSendMessage) {
      onSendMessage(
        currentFacility.id,
        currentFacility.name,
        ownerChatText.trim(),
        'owner',
        currentFacility.hostName
      );
      playChatNotificationSound();
    }
    setOwnerChatText('');
  };

  const handleOwnerCancelBooking = (bookingId) => {
    const reason = prompt('Enter cancellation reason for customer:', 'Owner maintenance / court conflict');
    if (reason !== null) {
      onCancelBooking(bookingId, reason);
      alert(`Booking ${bookingId} has been cancelled.`);
    }
  };

  const handleStatusToggle = (newStatus) => {
    if (onUpdateFacilityStatus) {
      onUpdateFacilityStatus(selectedFacilityId, newStatus);
    }
    alert(`Facility status updated to ${newStatus.toUpperCase()}!`);
  };

  const handleCreateNewGround = (e) => {
    e.preventDefault();
    if (!newGroundName || !newGroundLocation) return;

    const newFac = {
      id: `fac-${Math.floor(100 + Math.random() * 900)}`,
      name: newGroundName,
      city: newGroundCity,
      location: newGroundLocation,
      address: newGroundAddress || newGroundLocation,
      sports: [newGroundSport],
      rating: 5.0,
      totalReviews: 1,
      startingPrice: parseFloat(newGroundPrice) || 2000,
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
      galleryImages: [
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
      ],
      description: `Brand new indoor ${newGroundSport} facility listed on ArenaSlot SaaS platform.`,
      amenities: ['Indoor Lighting', 'Parking', 'Changing Rooms'],
      rates: [
        { sport: newGroundSport, offPeakRate: parseFloat(newGroundPrice) || 2000, peakRate: (parseFloat(newGroundPrice) || 2000) * 1.3, durationMinutes: 60 },
      ],
      availableSlotsCount: 12,
      paymentPolicy: 'partial_advance',
      partialAdvancePercentage: 30,
      hostName: 'Verified Partner',
      isSuperhost: true,
      cancellationPolicy: 'Standard 4 hour cancellation',
      status: 'published',
    };

    if (onAddFacility) {
      onAddFacility(newFac);
    }
    setIsAddGroundOpen(false);
    setSelectedFacilityId(newFac.id);
    alert('New Sports Ground listed successfully!');
  };

  const handleSavePolicy = (e) => {
    e.preventDefault();
    if (onUpdatePaymentPolicy) {
      onUpdatePaymentPolicy(selectedFacilityId, policyType, advancePercent);
    }
    alert(`SaaS Booking Payment Policy updated for ${currentFacility.name}!`);
  };

  const filteredReviews = starFilter > 0 ? reviews.filter((r) => r.rating === starFilter) : reviews;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* SaaS Dashboard Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-extrabold text-[#0B1B3D] uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-[#76C000]" />
            <span>SaaS Ground Partner Control Panel</span>
          </div>
          <div className="flex items-center space-x-3 mt-1">
            <h1 className="text-2xl font-black text-[#0B1B3D]">{currentFacility.name}</h1>
            <span className={`px-2.5 py-0.5 rounded text-[11px] font-black ${
              currentFacility.status === 'published'
                ? 'bg-emerald-100 text-emerald-800'
                : currentFacility.status === 'maintenance'
                ? 'bg-amber-100 text-amber-900'
                : 'bg-slate-200 text-slate-700'
            }`}>
              {currentFacility.status.toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Live POS terminal counter checkout, interactive calendar, live customer chat, and deposit rules.</p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Ground Switcher */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-1.5 flex items-center space-x-2">
            <select
              value={selectedFacilityId}
              onChange={(e) => setSelectedFacilityId(e.target.value)}
              className="bg-white border border-slate-300 font-bold text-slate-900 rounded-lg px-3 py-1 text-xs focus:outline-none"
            >
              {facilities.map((f) => (
                <option key={f.id} value={f.id}>{f.name} ({f.city})</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsAddGroundOpen(true)}
            className="bg-[#0B1B3D] text-white px-4 py-2 rounded-xl text-xs font-black flex items-center space-x-1.5 shadow-sm hover:bg-[#061229]"
          >
            <Plus className="w-4 h-4 text-[#76C000]" />
            <span>+ List New Ground</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs Navigation */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar border-b border-slate-200 pb-1">
        {[
          { id: 'pos', label: 'Counter POS Terminal & Calendar', icon },
          { id: 'overview', label: 'Live Bookings Log & Cancel', icon },
          { id: 'chat', label: 'Customer Live Chat Inbox 🔔', icon },
          { id: 'reviews', label: 'Reviews & Owner Replies', icon },
          { id: 'analytics', label: 'Revenue Analytics', icon },
          { id: 'status', label: 'Ground Status & Maintenance', icon },
          { id: 'policy', label: 'SaaS Deposit Rules', icon },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                activeSubTab === tab.id
                  ? 'bg-[#0B1B3D] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4 text-[#76C000]" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: POS TERMINAL & INTERACTIVE CALENDAR */}
      {activeSubTab === 'pos' && (
        <OwnerPOSCalendar
          facility={currentFacility}
          bookings={bookings}
          onAddManualBooking={onAddManualBooking}
        />
      )}

      {/* TAB 2: OVERVIEW LOG WITH CANCEL OPTION */}
      {activeSubTab === 'overview' && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-sm font-black text-[#0B1B3D]">Live Court Reservations</h3>
            <span className="text-xs text-slate-500">{facilityBookings.length} Bookings</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b">
                <tr>
                  <th className="px-6 py-3">Booking Code</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Sport & Date</th>
                  <th className="px-6 py-3">Total Amount</th>
                  <th className="px-6 py-3">Advance Deposit</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {facilityBookings.map((b) => {
                  const isCancelled = b.paymentStatus === 'Cancelled';
                  return (
                    <tr key={b.id} className={`hover:bg-slate-50 ${isCancelled ? 'bg-red-50/20 opacity-75' : ''}`}>
                      <td className="px-6 py-4 font-mono font-bold text-[#0B1B3D]">{b.id}</td>
                      <td className="px-6 py-4 font-medium">
                        <div>{b.customerName}</div>
                        <div className="text-[10px] text-slate-400">{b.customerPhone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold">{b.sport}</div>
                        <div className="text-[11px] text-slate-500">{b.date} ({b.time})</div>
                      </td>
                      <td className="px-6 py-4 font-black text-[#0B1B3D]">PKR {b.totalAmount.toLocaleString()}</td>
                      <td className="px-6 py-4 font-bold text-[#76C000]">PKR {(b.advancePaid || 0).toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          isCancelled ? 'bg-red-100 text-red-800' : 'bg-emerald-50 text-emerald-800'
                        }`}>
                          {b.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {!isCancelled ? (
                          <button
                            onClick={() => handleOwnerCancelBooking(b.id)}
                            className="px-2.5 py-1 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded font-bold text-[10px]"
                          >
                            Cancel Reservation
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">Cancelled</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: LIVE CUSTOMER CHAT INBOX */}
      {activeSubTab === 'chat' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 max-w-3xl">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="text-lg font-black text-[#0B1B3D]">Customer Live Chat Inbox</h3>
              <p className="text-xs text-slate-500">Reply to player questions in real-time. Sound chime plays on message arrival.</p>
            </div>
            <button
              onClick={() => playChatNotificationSound()}
              className="text-xs font-bold text-[#0B1B3D] bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200"
            >
              🔊 Test Sound Chime
            </button>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 h-80 overflow-y-auto space-y-3 text-xs">
            {facilityMessages.length === 0 ? (
              <div className="text-center text-slate-400 py-12">
                <MessageSquare className="w-8 h-8 mx-auto text-slate-300 mb-1" />
                No messages yet from players for {currentFacility.name}.
              </div>
            ) : (
              facilityMessages.map((msg) => {
                const isOwner = msg.senderRole === 'owner';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isOwner ? 'items-end' : 'items-start'}`}
                  >
                    <div className="text-[10px] text-slate-400 mb-0.5 px-1 font-semibold">
                      {msg.senderName} ({msg.senderRole}) • {msg.timestamp}
                    </div>
                    <div
                      className={`p-3 rounded-2xl max-w-[80%] shadow-xs ${
                        isOwner
                          ? 'bg-[#0B1B3D] text-white rounded-br-none'
                          : 'bg-white text-slate-900 border border-slate-200 rounded-bl-none font-medium'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <form onSubmit={handleSendOwnerMessage} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type reply to customer..."
              value={ownerChatText}
              onChange={(e) => setOwnerChatText(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-white text-slate-900 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#76C000]"
            />
            <button
              type="submit"
              disabled={!ownerChatText.trim()}
              className="bg-[#0B1B3D] disabled:opacity-40 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1"
            >
              <Send className="w-3.5 h-3.5 text-[#76C000]" />
              <span>Send</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: REVIEWS & REPLIES */}
      {activeSubTab === 'reviews' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex justify-between border-b pb-4">
            <h3 className="text-lg font-black text-[#0B1B3D]">Customer Reviews & Owner Replies</h3>
          </div>

          <div className="space-y-4">
            {filteredReviews.map((rev) => (
              <div key={rev.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-xs text-[#0B1B3D]">{rev.customerName}</span>
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-1.5 py-0.5 rounded">
                      {rev.rating} ★ ({rev.sport})
                    </span>
                  </div>
                  {!rev.ownerReply && (
                    <button
                      onClick={() => setReplyingReviewId(rev.id)}
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-[#0B1B3D] text-white"
                    >
                      Reply
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-700">{rev.comment}</p>

                {rev.ownerReply && (
                  <div className="bg-slate-50 border-l-4 border-[#76C000] p-3 rounded-r-xl text-xs">
                    <div className="font-bold text-[#0B1B3D]">Host Response ({currentFacility.hostName})</div>
                    <p className="text-slate-600 italic mt-1">"{rev.ownerReply}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: ANALYTICS */}
      {activeSubTab === 'analytics' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <h3 className="text-lg font-black text-[#0B1B3D]">Revenue Analytics</h3>
          <div className="text-2xl font-black text-[#0B1B3D]">Gross Income: PKR {totalRevenue.toLocaleString()}</div>
        </div>
      )}

      {/* TAB 6: STATUS */}
      {activeSubTab === 'status' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs max-w-2xl space-y-4">
          <h3 className="text-lg font-black text-[#0B1B3D]">Ground Status Controls</h3>
          <div className="flex gap-3">
            <button onClick={() => handleStatusToggle('published')} className="px-4 py-2 border rounded-xl font-bold">
              Published & Live
            </button>
            <button onClick={() => handleStatusToggle('maintenance')} className="px-4 py-2 border rounded-xl font-bold bg-amber-50 text-amber-900">
              Maintenance Mode
            </button>
          </div>
        </div>
      )}

      {/* TAB 7: DEPOSIT RULES */}
      {activeSubTab === 'policy' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs max-w-2xl">
          <form onSubmit={handleSavePolicy} className="space-y-4 text-xs">
            <button type="submit" className="bg-[#76C000] text-[#0B1B3D] px-6 py-2.5 rounded-xl font-black">
              Save Policy
            </button>
          </form>
        </div>
      )}

      {/* LIST NEW GROUND MODAL */}
      {isAddGroundOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-[#0B1B3D]">List a New Sports Ground</h3>
            <form onSubmit={handleCreateNewGround} className="space-y-3 text-xs">
              <input
                type="text"
                required
                placeholder="Ground Name"
                value={newGroundName}
                onChange={(e) => setNewGroundName(e.target.value)}
                className="w-full p-2.5 border rounded-xl"
              />
              <button
                type="submit"
                className="w-full bg-[#0B1B3D] text-white py-2.5 rounded-xl font-black"
              >
                List Ground
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
