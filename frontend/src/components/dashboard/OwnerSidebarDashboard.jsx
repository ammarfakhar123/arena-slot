import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CreditCard, 
  MessageSquare, 
  PlusCircle, 
  ShieldCheck, 
  Sliders, 
  TrendingUp, 
  Users, 
  Zap, 
  Grid, 
  ShoppingBag,
  Star,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Sparkles,
  Building,
  DollarSign,
  Trash2,
  Edit3,
  Plus,
  X,
  Save,
  Send,
  User,
  Search
} from 'lucide-react';

import { OwnerFullPOS } from '../pos/OwnerFullPOS';
import { FullMonthCalendarView } from '../calendar/FullMonthCalendarView';
import { CalendlyBookingView } from '../calendar/CalendlyBookingView';
import { HostPaymentSettings } from './HostPaymentSettings';
import { playChatNotificationSound } from '../../utils/sound';





export const OwnerSidebarDashboard = ({
  facilities: initialFacilities,
  bookings,
  reviews,
  selectedFacilityId,
  setSelectedFacilityId,
  onUpdateBookingStatus,
  onAddOwnerReply,
  onToggleFacilityStatus,
  onUpdateDepositPolicy,
  onAddManualBooking,
  onAddFacility,
  onUpdateFacilityPrice,
  onDeleteFacility,
}) => {
  const [activeTab, setActiveTab] = useState('calendar-month');
  const [facilities, setFacilities] = useState(initialFacilities);

  // Add Ground Modal State
  const [isAddGroundModalOpen, setIsAddGroundModalOpen] = useState(false);
  const [newGroundName, setNewGroundName] = useState('');
  const [newGroundCity, setNewGroundCity] = useState('Rawalpindi');
  const [newGroundAddress, setNewGroundAddress] = useState('');
  const [newGroundSport, setNewGroundSport] = useState('Cricket');
  const [newGroundPrice, setNewGroundPrice] = useState(2500);

  // Edit Price Modal State
  const [editingPriceFacilityId, setEditingPriceFacilityId] = useState(null);
  const [editingPriceValue, setEditingPriceValue] = useState(2500);

  const [replyTextMap, setReplyTextMap] = useState({});

  const currentFacility = facilities.find((f) => f.id === selectedFacilityId) || facilities[0];
  const facilityBookings = bookings.filter((b) => b.facilityId === selectedFacilityId || !selectedFacilityId);
  const facilityReviews = reviews.filter((r) => r.facilityId === selectedFacilityId);

  // Mock Conversations List for Owner Chat Inbox
  const [conversations, setConversations] = useState([
    {
      id: 'conv-1',
      customerName: 'Shahzaib Ahmed',
      customerPhone: '0300-5551234',
      facilityId: 'fac-1',
      facilityName: 'Rawalpindi Padel & Badminton Arena',
      lastMessage: 'Is the 8 PM glass padel court available for tonight?',
      timestamp: '10 mins ago',
      unreadCount: 1,
      messages: [
        { id: 'm1', facilityId: 'fac-1', facilityName: 'Rawalpindi Padel Arena', senderRole: 'customer', senderName: 'Shahzaib Ahmed', text: 'Assalam-o-Alaikum! Is the 8 PM glass padel court available for tonight?', timestamp: '10 mins ago' },
        { id: 'm2', facilityId: 'fac-1', facilityName: 'Rawalpindi Padel Arena', senderRole: 'owner', senderName: 'Malik Hamza (Owner)', text: 'Walaikum Assalam! Yes, slot is open. You can lock deposit online.', timestamp: '8 mins ago' }
      ]
    },
    {
      id: 'conv-2',
      customerName: 'Ali Raza (Team Skipper)',
      customerPhone: '0321-9876543',
      facilityId: 'fac-2',
      facilityName: 'Islamabad Velocity Indoor Cricket Nets',
      lastMessage: 'Can we request 145 km/h bowling machine speed setting?',
      timestamp: '1 hour ago',
      unreadCount: 0,
      messages: [
        { id: 'm3', facilityId: 'fac-2', facilityName: 'Islamabad Velocity Nets', senderRole: 'customer', senderName: 'Ali Raza', text: 'Can we request 145 km/h bowling machine speed setting?', timestamp: '1 hour ago' },
        { id: 'm4', facilityId: 'fac-2', facilityName: 'Islamabad Velocity Nets', senderRole: 'owner', senderName: 'Captain Usman', text: 'Absolutely! Machine operator will configure radar speed for your team.', timestamp: '45 mins ago' }
      ]
    }
  ]);

  const [activeConvId, setActiveConvId] = useState(conversations[0]?.id || 'conv-1');
  const [chatReplyInput, setChatReplyInput] = useState('');

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendOwnerReply = (e) => {
    e.preventDefault();
    if (!chatReplyInput.trim() || !activeConv) return;

    const newMsg = {
      id: `m-${Date.now()}`,
      facilityId: activeConv.facilityId,
      facilityName: activeConv.facilityName,
      senderRole: 'owner',
      senderName: currentFacility?.hostName || 'Malik Hamza (Owner)',
      text: chatReplyInput.trim(),
      timestamp: 'Just now',
    };

    const updatedConvs = conversations.map((c) =>
      c.id === activeConv.id
        ? {
            ...c,
            lastMessage: chatReplyInput.trim(),
            timestamp: 'Just now',
            messages: [...c.messages, newMsg],
          }
        : c
    );

    setConversations(updatedConvs);
    setChatReplyInput('');
    playChatNotificationSound();
  };

  // Revenue Stats
  const totalRevenue = facilityBookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalAdvanceCollected = facilityBookings.reduce((sum, b) => sum + b.advancePaid, 0);
  const totalPendingAtVenue = facilityBookings.reduce((sum, b) => sum + b.dueAtVenue, 0);

  // Add Ground Handler
  const handleCreateGround = (e) => {
    e.preventDefault();
    if (!newGroundName) return;

    const newFac = {
      id: `fac-${Date.now()}`,
      name: newGroundName,
      city: newGroundCity,
      location: newGroundAddress || `${newGroundCity} Sports Hub`,
      address: newGroundAddress || `Main Road, ${newGroundCity}`,
      sports: [newGroundSport],
      rating: 5.0,
      totalReviews: 1,
      startingPrice: newGroundPrice,
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
      description: `New high-grade ${newGroundSport} facility in ${newGroundCity}.`,
      amenities: ['Floodlights', 'Parking', 'Locker Room'],
      rates: [{ sport: newGroundSport, offPeakRate: newGroundPrice, peakRate: newGroundPrice * 1.3, durationMinutes: 60 }],
      availableSlotsCount: 14,
      paymentPolicy: 'partial_advance',
      partialAdvancePercentage: 30,
      hostName: 'Malik Hamza (Ground Owner)',
      status: 'published',
      distanceKm: 2.5,
    };

    setFacilities([...facilities, newFac]);
    if (onAddFacility) onAddFacility(newFac);
    setIsAddGroundModalOpen(false);
    setNewGroundName('');
    setNewGroundAddress('');
  };

  // Update Price Handler
  const handleSavePrice = (facilityId) => {
    setFacilities(
      facilities.map((f) =>
        f.id === facilityId ? { ...f, startingPrice: editingPriceValue } : f
      )
    );
    if (onUpdateFacilityPrice) onUpdateFacilityPrice(facilityId, editingPriceValue);
    setEditingPriceFacilityId(null);
  };

  // Delete Ground Handler
  const handleDeleteGround = (facilityId) => {
    if (facilities.length <= 1) {
      alert('You must have at least one active ground listed!');
      return;
    }
    if (confirm('Are you sure you want to remove this ground from your listing?')) {
      const updated = facilities.filter((f) => f.id !== facilityId);
      setFacilities(updated);
      if (onDeleteFacility) onDeleteFacility(facilityId);
      if (selectedFacilityId === facilityId) {
        setSelectedFacilityId(updated[0].id);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row pt-16 sm:pt-20">
      
      {/* Left Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0B1B3D] text-slate-300 flex-shrink-0 flex flex-col justify-between p-4 space-y-6">
        
        <div className="space-y-6">
          {/* Facility Selector Header */}
          <div className="bg-[#132854] p-3 rounded-2xl border border-slate-700/50">
            <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1">
              Select Venue:
            </label>
            <select
              value={selectedFacilityId}
              onChange={(e) => setSelectedFacilityId(e.target.value)}
              className="w-full bg-transparent font-bold text-xs text-white focus:outline-none cursor-pointer truncate"
            >
              {facilities.map((fac) => (
                <option key={fac.id} value={fac.id} className="bg-[#0B1B3D] text-white">
                  {fac.name} ({fac.city})
                </option>
              ))}
            </select>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1.5 text-xs font-extrabold">
            
            <button
              onClick={() => setActiveTab('calendar-month')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'calendar-month'
                  ? 'bg-[#76C000] text-[#0B1B3D] font-black shadow-md'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <Calendar className="w-4 h-4 shrink-0" />
                <span className="truncate">1-Month Calendar</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
            </button>

            <button
              onClick={() => setActiveTab('pos')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'pos'
                  ? 'bg-[#76C000] text-[#0B1B3D] font-black shadow-md'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span className="truncate">Cash Register</span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-extrabold shrink-0">
                Walk-in
              </span>
            </button>

            <button
              onClick={() => setActiveTab('facilities')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'facilities'
                  ? 'bg-[#76C000] text-[#0B1B3D] font-black shadow-md'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <Building className="w-4 h-4 shrink-0" />
                <span className="truncate">Grounds & Rates</span>
              </div>
              <span className="bg-[#76C000]/20 text-[#76C000] text-[10px] px-2 py-0.5 rounded-full font-extrabold shrink-0">
                {facilities.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('payment-settings')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'payment-settings'
                  ? 'bg-[#76C000] text-[#0B1B3D] font-black shadow-md'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <CreditCard className="w-4 h-4 shrink-0" />
                <span className="truncate">Bank Accounts</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('calendly')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'calendly'
                  ? 'bg-[#76C000] text-[#0B1B3D] font-black shadow-md'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <Clock className="w-4 h-4 shrink-0" />
                <span className="truncate">Slot Schedule</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'chat'
                  ? 'bg-[#76C000] text-[#0B1B3D] font-black shadow-md'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span className="truncate">Owner Live Chat</span>
              </div>
              <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full shrink-0">
                🔔 Live
              </span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'bookings'
                  ? 'bg-[#76C000] text-[#0B1B3D] font-black shadow-md'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <Grid className="w-4 h-4 shrink-0" />
                <span className="truncate">Reservations</span>
              </div>
              <span className="bg-slate-700 text-slate-200 text-[10px] px-2 py-0.5 rounded-full shrink-0">
                {facilityBookings.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'bg-[#76C000] text-[#0B1B3D] font-black shadow-md'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <Star className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">Reviews</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('deposit-rules')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'deposit-rules'
                  ? 'bg-[#76C000] text-[#0B1B3D] font-black shadow-md'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <Sliders className="w-4 h-4 shrink-0" />
                <span className="truncate">Deposit Rules</span>
              </div>
            </button>

          </nav>
        </div>

        {/* Revenue Summary Box */}
        <div className="bg-[#132854] p-4 rounded-2xl border border-slate-700/60 text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 font-bold">
            <span>Total Earnings</span>
            <span className="text-emerald-400 font-extrabold">PKR {totalRevenue.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>Online Deposits:</span>
            <span className="text-slate-200 font-bold">PKR {totalAdvanceCollected.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>Counter Payments:</span>
            <span className="text-amber-300 font-bold">PKR {totalPendingAtVenue.toLocaleString()}</span>
          </div>
        </div>

      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        
        {/* Full 1-Month Calendar */}
        {activeTab === 'calendar-month' && (
          <FullMonthCalendarView
            facility={currentFacility}
            bookings={facilityBookings}
            onSelectDate={(date) => setActiveTab('calendly')}
          />
        )}

        {/* Counter Cash Register */}
        {activeTab === 'pos' && (
          <OwnerFullPOS
            facilities={facilities}
            onAddBooking={onAddManualBooking}
          />
        )}

        {/* Host Payment Account Settings */}
        {activeTab === 'payment-settings' && (
          <HostPaymentSettings />
        )}

        {/* FULL OWNER LIVE CUSTOMER CHAT INBOX PANEL */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row h-[600px]">
            
            {/* Conversations List (Left 4 cols) */}
            <div className="w-full md:w-80 border-r border-slate-200 flex flex-col bg-slate-50">
              <div className="p-4 border-b border-slate-200 space-y-2">
                <h2 className="text-sm font-black text-[#0B1B3D] flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#76C000]" />
                  <span>Customer Inquiries ({conversations.length})</span>
                </h2>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search player or phone..."
                    className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                {conversations.map((conv) => {
                  const isActive = conv.id === activeConvId;
                  return (
                    <button
                      key={conv.id}
                      onClick={() => setActiveConvId(conv.id)}
                      className={`w-full text-left p-4 flex items-start space-x-3 transition-colors ${
                        isActive ? 'bg-white border-l-4 border-[#76C000] shadow-sm' : 'hover:bg-slate-100'
                      }`}
                    >
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-[#0B1B3D] text-[#76C000] font-black text-xs flex items-center justify-center">
                          {conv.customerName.charAt(0)}
                        </div>
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white absolute bottom-0 right-0" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{conv.customerName}</h4>
                          <span className="text-[10px] text-slate-400 font-medium">{conv.timestamp}</span>
                        </div>
                        <p className="text-[11px] font-bold text-[#76C000] truncate mt-0.5">{conv.facilityName}</p>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">{conv.lastMessage}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Thread Window (Right) */}
            {activeConv ? (
              <div className="flex-1 flex flex-col bg-white">
                {/* Chat Header */}
                <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#0B1B3D] text-[#76C000] font-black text-xs flex items-center justify-center">
                      {activeConv.customerName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-slate-900">{activeConv.customerName} ({activeConv.customerPhone})</h3>
                      <p className="text-[11px] font-bold text-[#76C000]">Inquiring for: {activeConv.facilityName}</p>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
                    🟢 Live Customer
                  </span>
                </div>

                {/* Messages Body */}
                <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50 text-xs">
                  {activeConv.messages.map((m) => {
                    const isOwner = m.senderRole === 'owner';
                    return (
                      <div key={m.id} className={`flex flex-col ${isOwner ? 'items-end' : 'items-start'}`}>
                        <span className="text-[10px] text-slate-400 mb-1 px-1 font-semibold">{m.senderName} • {m.timestamp}</span>
                        <div
                          className={`max-w-[75%] p-3.5 rounded-2xl font-semibold leading-relaxed shadow-sm ${
                            isOwner
                              ? 'bg-[#0B1B3D] text-white rounded-br-none'
                              : 'bg-white text-slate-900 border border-slate-200 rounded-bl-none'
                          }`}
                        >
                          {m.text}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Reply Form */}
                <form onSubmit={handleSendOwnerReply} className="p-4 border-t border-slate-200 bg-white flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder={`Reply directly to ${activeConv.customerName}...`}
                    value={chatReplyInput}
                    onChange={(e) => setChatReplyInput(e.target.value)}
                    className="flex-1 bg-slate-100 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0B1B3D]"
                  />
                  <button
                    type="submit"
                    className="bg-[#76C000] hover:bg-[#68A800] text-[#0B1B3D] px-6 py-3 rounded-2xl text-xs font-black shadow-md flex items-center space-x-1.5"
                  >
                    <span>Send Reply</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8 text-slate-400 text-xs font-bold">
                Select a customer conversation from the left to start chatting.
              </div>
            )}

          </div>
        )}

        {/* My Grounds Listing, Add New Ground, Price Update & Delete */}
        {activeTab === 'facilities' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">My Grounds & Hourly Rates</h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Add new sports courts, update hourly prices, or toggle active status.
                </p>
              </div>
              <button
                onClick={() => setIsAddGroundModalOpen(true)}
                className="bg-[#76C000] hover:bg-[#68A800] text-[#0B1B3D] px-5 py-2.5 rounded-2xl text-xs font-black shadow-md flex items-center space-x-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add New Ground</span>
              </button>
            </div>

            {/* Grounds List Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {facilities.map((fac) => (
                <div key={fac.id} className="p-5 border border-slate-200 rounded-3xl space-y-4 bg-slate-50 hover:bg-white transition-all shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{fac.city}</span>
                      <h3 className="font-extrabold text-base text-slate-900 mt-0.5">{fac.name}</h3>
                      <p className="text-xs text-slate-500 font-medium">{fac.location}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      fac.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {fac.status === 'published' ? '🟢 Live' : '🛠️ Maintenance'}
                    </span>
                  </div>

                  {/* Sports Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {fac.sports.map((s) => (
                      <span key={s} className="bg-slate-200 text-slate-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Hourly Price Box */}
                  <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-200">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">Starting Hourly Rate:</span>
                      {editingPriceFacilityId === fac.id ? (
                        <div className="flex items-center space-x-2 mt-1">
                          <input
                            type="number"
                            value={editingPriceValue}
                            onChange={(e) => setEditingPriceValue(parseFloat(e.target.value) || 0)}
                            className="w-28 bg-slate-100 border border-slate-300 rounded-lg px-2 py-1 text-xs font-black text-slate-900"
                          />
                          <button
                            onClick={() => handleSavePrice(fac.id)}
                            className="bg-emerald-600 text-white px-3 py-1 rounded-lg text-xs font-bold"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <span className="text-base font-black text-[#0B1B3D]">PKR {fac.startingPrice.toLocaleString()} / hr</span>
                      )}
                    </div>

                    {editingPriceFacilityId !== fac.id && (
                      <button
                        onClick={() => {
                          setEditingPriceFacilityId(fac.id);
                          setEditingPriceValue(fac.startingPrice);
                        }}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Price</span>
                      </button>
                    )}
                  </div>

                  {/* Action Controls */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs font-bold">
                    <button
                      onClick={() => onToggleFacilityStatus(fac.id)}
                      className="text-slate-700 hover:text-slate-900 underline"
                    >
                      {fac.status === 'published' ? 'Set Maintenance' : 'Set Live'}
                    </button>

                    <button
                      onClick={() => handleDeleteGround(fac.id)}
                      className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Ground</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add New Ground Modal */}
        {isAddGroundModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl border border-slate-200 overflow-hidden space-y-4 p-6 sm:p-8 animate-fadeIn">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-lg font-black text-slate-900">List a New Sports Ground</h3>
                <button onClick={() => setIsAddGroundModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateGround} className="space-y-4 text-xs font-medium">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Ground / Venue Name *</label>
                  <input
                    required
                    type="text"
                    value={newGroundName}
                    onChange={(e) => setNewGroundName(e.target.value)}
                    placeholder="e.g. Islamabad Champions Futsal Turf"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">City</label>
                    <select
                      value={newGroundCity}
                      onChange={(e) => setNewGroundCity(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold text-slate-900"
                    >
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Primary Sport</label>
                    <select
                      value={newGroundSport}
                      onChange={(e) => setNewGroundSport(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold text-slate-900"
                    >
                      <option value="Cricket">Cricket Nets</option>
                      <option value="Futsal">Futsal Turf</option>
                      <option value="Padel">Glass Padel</option>
                      <option value="Badminton">Badminton</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Address / Location Area</label>
                  <input
                    type="text"
                    value={newGroundAddress}
                    onChange={(e) => setNewGroundAddress(e.target.value)}
                    placeholder="e.g. Sector F-8 Markaz, Islamabad"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Starting Hourly Rate (PKR)</label>
                  <input
                    required
                    type="number"
                    value={newGroundPrice}
                    onChange={(e) => setNewGroundPrice(parseFloat(e.target.value) || 0)}
                    placeholder="2500"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:outline-none"
                  />
                </div>

                <div className="pt-3 flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-[#0B1B3D] text-white py-3 rounded-xl font-bold text-xs shadow-md"
                  >
                    Publish Ground Listing
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddGroundModalOpen(false)}
                    className="px-4 bg-slate-200 text-slate-800 rounded-xl font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Slot Timing Schedule */}
        {activeTab === 'calendly' && (
          <CalendlyBookingView
            facility={currentFacility}
            onSelectSlot={(slot, date) => alert(`Selected slot ${slot.time} for ${date}`)}
          />
        )}

        {/* Bookings Log & Cancellations */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Reservations & Walk-in Records</h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Manage online deposits, walk-in counter bookings, and player cancellation requests.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('pos')}
                className="bg-[#76C000] text-[#0B1B3D] px-4 py-2 rounded-xl text-xs font-bold shadow-sm"
              >
                + New Walk-in Entry
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                    <th className="py-3 px-4">Booking Ref</th>
                    <th className="py-3 px-4">Customer Name</th>
                    <th className="py-3 px-4">Sport & Time</th>
                    <th className="py-3 px-4">Total Amount</th>
                    <th className="py-3 px-4">Advance Paid</th>
                    <th className="py-3 px-4">Due at Venue</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {facilityBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#0B1B3D]">{b.id}</td>
                      <td className="py-3 px-4 font-semibold text-slate-900">{b.customerName}</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-800">{b.sport}</div>
                        <div className="text-[11px] text-slate-500">{b.date} • {b.time}</div>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">PKR {b.totalAmount.toLocaleString()}</td>
                      <td className="py-3 px-4 text-emerald-600 font-bold">PKR {b.advancePaid.toLocaleString()}</td>
                      <td className="py-3 px-4 text-amber-600 font-bold">PKR {b.dueAtVenue.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          b.paymentStatus === 'Fully Paid' ? 'bg-emerald-100 text-emerald-800' :
                          b.paymentStatus === 'Deposit Paid' ? 'bg-blue-100 text-blue-800' :
                          b.paymentStatus === 'Cancelled & Refunded' ? 'bg-red-100 text-red-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {b.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 space-x-2">
                        {b.paymentStatus !== 'Fully Paid' && (
                          <button
                            onClick={() => onUpdateBookingStatus(b.id, 'Fully Paid')}
                            className="bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold hover:bg-emerald-700"
                          >
                            Mark Paid
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Customer Reviews & Owner Replies */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Player Reviews & Responses</h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Respond to player feedback to build ground trust.
              </p>
            </div>

            <div className="space-y-4">
              {facilityReviews.map((rev) => (
                <div key={rev.id} className="p-5 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-slate-900">{rev.customerName}</span>
                      <span className="text-[10px] text-slate-400">• {rev.date}</span>
                    </div>
                    <div className="flex items-center text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current mr-1" />
                      <span>{rev.rating}.0</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 font-medium">{rev.comment}</p>

                  {/* Existing Reply */}
                  {rev.ownerReply ? (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                      <span className="font-extrabold text-[#0B1B3D] block">Host Response:</span>
                      <p className="text-slate-600 font-medium">{rev.ownerReply}</p>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="text"
                        placeholder="Write response to player..."
                        value={replyTextMap[rev.id] || ''}
                        onChange={(e) => setReplyTextMap({ ...replyTextMap, [rev.id]: e.target.value })}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          if (replyTextMap[rev.id]) {
                            onAddOwnerReply(rev.id, replyTextMap[rev.id]);
                            setReplyTextMap({ ...replyTextMap, [rev.id]: '' });
                          }
                        }}
                        className="bg-[#0B1B3D] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm"
                      >
                        Publish
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deposit Policy Rules */}
        {activeTab === 'deposit-rules' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Advance Payment Rules</h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Configure advance deposit rules to prevent last-minute no-shows.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <button
                onClick={() => onUpdateDepositPolicy(currentFacility.id, 'no_advance', 0)}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  currentFacility.paymentPolicy === 'no_advance'
                    ? 'border-[#76C000] bg-lime-50/50 ring-2 ring-[#76C000]'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-extrabold text-xs text-slate-900 mb-1">0% Pay at Venue</div>
                <p className="text-xs text-slate-500">Players pay 100% cash or card upon arrival at ground desk.</p>
              </button>

              <button
                onClick={() => onUpdateDepositPolicy(currentFacility.id, 'partial_advance', 30)}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  currentFacility.paymentPolicy === 'partial_advance'
                    ? 'border-[#76C000] bg-lime-50/50 ring-2 ring-[#76C000]'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-extrabold text-xs text-slate-900 mb-1">30% Partial Advance</div>
                <p className="text-xs text-slate-500">Player pays 30% online deposit to lock slot; 70% paid at ground.</p>
              </button>

              <button
                onClick={() => onUpdateDepositPolicy(currentFacility.id, 'full_advance', 100)}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  currentFacility.paymentPolicy === 'full_advance'
                    ? 'border-[#76C000] bg-lime-50/50 ring-2 ring-[#76C000]'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-extrabold text-xs text-slate-900 mb-1">100% Full Online Advance</div>
                <p className="text-xs text-slate-500">Full payment required online to confirm slot.</p>
              </button>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};
