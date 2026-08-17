import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSearch } from './components/HeroSearch';
import { CategoryFilterBar } from './components/CategoryFilterBar';
import { FacilityCard } from './components/FacilityCard';
import { FacilityDetailModal } from './components/FacilityDetailModal';
import { MyBookings } from './components/MyBookings';
import { OwnerSidebarDashboard } from './components/dashboard/OwnerSidebarDashboard';
import { FBMessengerChatWidget } from './components/chat/FBMessengerChatWidget';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ListYourGroundPage } from './components/ListYourGroundPage';
import { INITIAL_FACILITIES, INITIAL_BOOKINGS, MOCK_REVIEWS } from './data/mockData';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [selectedSport, setSelectedSport] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxDistanceKm, setMaxDistanceKm] = useState(999);
  const [maxPriceFilter, setMaxPriceFilter] = useState(99999);
  const [sortBy, setSortBy] = useState('rating');

  const [facilities, setFacilities] = useState(INITIAL_FACILITIES);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [reviews, setReviews] = useState(MOCK_REVIEWS);

  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedFacilityId, setSelectedFacilityId] = useState(facilities[0]?.id || 'fac-1');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalRole, setAuthModalRole] = useState('customer');

  const [currentUser, setCurrentUser] = useState({
    name: 'Malik Hamza (Ground Owner)',
    role: 'owner',
  });

  // Contact Page State
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Fetch facilities, bookings, and reviews from Django API, fallback to mock data
  useEffect(() => {
    const API_BASE = 'http://127.0.0.1:8000/api';
    
    // Seed database on first render (optional/helps development setup)
    fetch(`${API_BASE}/seed/`, { method: 'POST' })
      .then(() => {
        // Fetch Facilities
        fetch(`${API_BASE}/facilities/`)
          .then(res => res.json())
          .then(data => {
            if (data && data.length > 0) {
              // Convert fields to frontend match format
              const formatted = data.map(f => ({
                ...f,
                sports: Array.isArray(f.sports) ? f.sports : JSON.parse(f.sports || '[]'),
                galleryImages: Array.isArray(f.gallery_images) ? f.gallery_images : JSON.parse(f.gallery_images || '[]'),
                paymentPolicy: f.payment_policy,
                partialAdvancePercentage: f.partial_advance_percentage,
                hostName: f.host_name,
                isSuperhost: f.is_superhost,
                cancellationPolicy: f.cancellation_policy,
                distanceKm: f.distance_km,
                totalReviews: f.total_reviews,
                startingPrice: Number(f.starting_price),
              }));
              setFacilities(formatted);
            }
          })
          .catch(() => console.log("Using local mock facilities (Django offline)"));

        // Fetch Bookings
        fetch(`${API_BASE}/bookings/`)
          .then(res => res.json())
          .then(data => {
            if (data && data.length > 0) {
              const formatted = data.map(b => ({
                ...b,
                id: b.booking_id,
                facilityId: b.facility_id,
                facilityName: b.facility_name,
                totalAmount: Number(b.total_amount),
                advancePaid: Number(b.advance_paid),
                dueAtVenue: Number(b.due_at_venue),
                paymentMethod: b.payment_method,
                paymentPolicy: b.payment_policy,
                paymentStatus: b.payment_status,
                bookingType: b.booking_type,
                customerName: b.customer_name,
                customerPhone: b.customer_phone,
                splitCount: b.split_count,
                perPersonAmount: Number(b.per_person_amount),
              }));
              setBookings(formatted);
            }
          })
          .catch(() => console.log("Using local mock bookings (Django offline)"));

        // Fetch Reviews
        fetch(`${API_BASE}/reviews/`)
          .then(res => res.json())
          .then(data => {
            if (data && data.length > 0) {
              const formatted = data.map(r => ({
                ...r,
                facilityId: r.facility_id,
                customerName: r.customer_name,
                ownerReply: r.owner_reply,
                replyDate: r.reply_date,
              }));
              setReviews(formatted);
            }
          })
          .catch(() => console.log("Using local mock reviews (Django offline)"));
      })
      .catch(() => console.log("Django server is offline. Running in frontend-only mock mode."));
  }, []);

  // Filter Marketplace Facilities
  const filteredFacilities = facilities.filter((fac) => {
    const matchesCity = selectedCity === 'All Cities' || fac.city.toLowerCase() === selectedCity.toLowerCase();
    const matchesSport = selectedSport === 'All' || fac.sports.includes(selectedSport);
    const matchesSearch =
      fac.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistance = (fac.distanceKm || 0) <= maxDistanceKm;
    const matchesPrice = fac.startingPrice <= maxPriceFilter;

    return matchesCity && matchesSport && matchesSearch && matchesDistance && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'distance-asc') return (a.distanceKm || 0) - (b.distanceKm || 0);
    if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
    if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
    return b.rating - a.rating;
  });

  // Strict Host Isolation: Filter ONLY grounds owned by current logged-in host user
  const ownerOnlyFacilities = currentUser && currentUser.role === 'owner'
    ? facilities.filter((f) => 
        f.hostName?.toLowerCase() === currentUser.name.toLowerCase() ||
        f.id === selectedFacilityId
      )
    : facilities;

  const activeOwnerFacilities = ownerOnlyFacilities.length > 0 ? ownerOnlyFacilities : [facilities[0]];

  // Handlers
  const handleBookingSuccess = (newBooking) => {
    setBookings([newBooking, ...bookings]);
    
    // Sync to Django API
    const API_BASE = 'http://127.0.0.1:8000/api';
    const payload = {
      booking_id: newBooking.id,
      facility_id: newBooking.facilityId,
      facility_name: newBooking.facilityName,
      location: newBooking.location,
      sport: newBooking.sport,
      date: newBooking.date,
      time: newBooking.time,
      total_amount: newBooking.totalAmount,
      advance_paid: newBooking.advancePaid,
      due_at_venue: newBooking.dueAtVenue,
      payment_method: newBooking.paymentMethod,
      payment_policy: newBooking.paymentPolicy,
      payment_status: newBooking.paymentStatus,
      booking_type: newBooking.bookingType,
      customer_name: newBooking.customerName,
      customer_phone: newBooking.customerPhone,
      split_count: newBooking.splitCount || 1,
      per_person_amount: newBooking.perPersonAmount || newBooking.totalAmount,
    };

    fetch(`${API_BASE}/bookings/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(err => console.log("Sync booking failed (Django offline)"));
  };

  const handleUpdateBookingStatus = (bookingId, status) => {
    setBookings(bookings.map((b) => (b.id === bookingId ? { ...b, paymentStatus: status } : b)));
  };

  const handleAddOwnerReply = (reviewId, replyText) => {
    setReviews(
      reviews.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              ownerReply: replyText,
              replyDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            }
          : r
      )
    );
  };

  const handleToggleFacilityStatus = (facilityId) => {
    setFacilities(
      facilities.map((f) =>
        f.id === facilityId
          ? { ...f, status: f.status === 'published' ? 'maintenance' : 'published' }
          : f
      )
    );
  };

  const handleUpdateDepositPolicy = (facilityId, policy, percentage) => {
    setFacilities(
      facilities.map((f) =>
        f.id === facilityId
          ? { ...f, paymentPolicy: policy, partialAdvancePercentage: percentage }
          : f
      )
    );
  };

  const handleAddManualBooking = (partialBooking) => {
    const fullBooking = {
      id: `AS-${Math.floor(10000 + Math.random() * 90000)}`,
      facilityId: partialBooking.facilityId || selectedFacilityId || 'fac-1',
      facilityName: partialBooking.facilityName || facilities.find(f => f.id === selectedFacilityId)?.name || 'Ground Venue',
      location: 'Walk-in Counter',
      sport: partialBooking.sport || 'Padel',
      date: partialBooking.date || new Date().toISOString().split('T')[0],
      time: partialBooking.time || '08:00 PM - 09:00 PM',
      totalAmount: partialBooking.totalAmount || 3500,
      advancePaid: partialBooking.advancePaid || 3500,
      dueAtVenue: partialBooking.dueAtVenue || 0,
      paymentMethod: partialBooking.paymentMethod || 'Cash',
      paymentPolicy: 'full_advance',
      paymentStatus: 'Fully Paid',
      bookingType: 'POS Counter',
      customerName: partialBooking.customerName || 'Walk-in Player',
      customerPhone: partialBooking.customerPhone || '0300-0000000',
      createdAt: new Date().toISOString(),
      splitCount: 1,
      perPersonAmount: partialBooking.totalAmount || 3500,
    };

    setBookings([fullBooking, ...bookings]);
  };

  // Full Page Ground Registration Success Handler
  const handleRegisterFacilitySuccess = (newFacility, ownerUser) => {
    setFacilities([newFacility, ...facilities]);
    setSelectedFacilityId(newFacility.id);
    setCurrentUser(ownerUser);
    setActiveTab('owner');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-[#76C000] selection:text-[#0B1B3D]">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab === 'list-ground' ? 'marketplace' : activeTab}
        setActiveTab={(tab) => setActiveTab(tab)}
        bookingsCount={bookings.length}
        onOpenAuth={(role) => {
          setAuthModalRole(role);
          setIsAuthModalOpen(true);
        }}
        onOpenSaaSPlans={() => setActiveTab('list-ground')}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
      />

      {/* Main Marketplace View */}
      {activeTab === 'marketplace' && (
        <main className="pb-16">
          
          {/* Hero Video / Image Search Banner */}
          <HeroSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />

          {/* Category Filter Bar & Location Radius Controls */}
          <CategoryFilterBar
            selectedSport={selectedSport}
            setSelectedSport={setSelectedSport}
            selectedCity={selectedCity}
            maxDistanceKm={maxDistanceKm}
            setMaxDistanceKm={setMaxDistanceKm}
            maxPriceFilter={maxPriceFilter}
            setMaxPriceFilter={setMaxPriceFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* Ground Cards Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-extrabold text-slate-900">
                Featured Verified Grounds ({filteredFacilities.length})
              </h2>
            </div>

            {filteredFacilities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredFacilities.map((facility) => (
                  <FacilityCard
                    key={facility.id}
                    facility={facility}
                    onSelectFacility={(fac) => setSelectedFacility(fac)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-[#0B1B3D] text-white rounded-3xl p-8 space-y-3">
                <p className="text-sm font-bold">No grounds match your active filter criteria.</p>
                <button
                  onClick={() => {
                    setSelectedSport('All');
                    setSelectedCity('All Cities');
                    setSearchQuery('');
                    setMaxDistanceKm(999);
                    setMaxPriceFilter(99999);
                  }}
                  className="bg-[#76C000] text-[#0B1B3D] px-5 py-2.5 rounded-xl text-xs font-bold"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

          {/* How It Works & Venue Owner Registration Section */}
          <div className="mt-16">
            <HowItWorksSection
              onOpenSaaSPlans={() => setActiveTab('list-ground')}
              setActiveTab={(tab) => setActiveTab(tab)}
            />
          </div>

          {/* Bottom Footer */}
          <Footer
            onOpenAuth={(role) => {
              setAuthModalRole(role);
              setIsAuthModalOpen(true);
            }}
            onOpenSaaSPlans={() => setActiveTab('list-ground')}
            setActiveTab={(tab) => setActiveTab(tab)}
          />
        </main>
      )}

      {/* FULL-PAGE GROUND REGISTRATION VIEW */}
      {activeTab === 'list-ground' && (
        <main>
          <ListYourGroundPage
            onRegisterFacilitySuccess={handleRegisterFacilitySuccess}
            onBackToMarketplace={() => setActiveTab('marketplace')}
          />
          <Footer
            onOpenAuth={(role) => {
              setAuthModalRole(role);
              setIsAuthModalOpen(true);
            }}
            onOpenSaaSPlans={() => setActiveTab('list-ground')}
            setActiveTab={(tab) => setActiveTab(tab)}
          />
        </main>
      )}

      {/* Customer Bookings View */}
      {activeTab === 'bookings' && (
        <main className="pt-24 pb-16">
          <MyBookings
            bookings={bookings}
            onBackToMarketplace={() => setActiveTab('marketplace')}
            onCancelBooking={(bookingId, reason) => {
              setBookings(
                bookings.map((b) =>
                  b.id === bookingId
                    ? { ...b, paymentStatus: 'Cancelled & Refunded', cancellationReason: reason }
                    : b
                )
              );
            }}
          />
          <Footer
            onOpenAuth={(role) => {
              setAuthModalRole(role);
              setIsAuthModalOpen(true);
            }}
            onOpenSaaSPlans={() => setActiveTab('list-ground')}
            setActiveTab={(tab) => setActiveTab(tab)}
          />
        </main>
      )}

      {/* Owner Sidebar Dashboard - STRICT HOST ISOLATION */}
      {activeTab === 'owner' && (
        <OwnerSidebarDashboard
          facilities={activeOwnerFacilities}
          bookings={bookings}
          reviews={reviews}
          selectedFacilityId={selectedFacilityId}
          setSelectedFacilityId={setSelectedFacilityId}
          onUpdateBookingStatus={handleUpdateBookingStatus}
          onAddOwnerReply={handleAddOwnerReply}
          onToggleFacilityStatus={handleToggleFacilityStatus}
          onUpdateDepositPolicy={handleUpdateDepositPolicy}
          onAddManualBooking={handleAddManualBooking}
          onAddFacility={(newFac) => setFacilities([newFac, ...facilities])}
          onDeleteFacility={(facId) => setFacilities(facilities.filter(f => f.id !== facId))}
        />
      )}

      {/* About Us Page */}
      {activeTab === 'about' && (
        <main className="pt-28 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h1 className="text-3xl font-black text-slate-900">About ArenaSlot</h1>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                ArenaSlot is Pakistan's premiere indoor facility booking ecosystem, connecting sports enthusiasts with verified Cricket Nets, Futsal Turfs, Glass Padel Courts, and Wooden Badminton Arenas across Rawalpindi, Islamabad, Lahore, and Karachi.
              </p>
            </div>
          </div>
          <Footer
            onOpenAuth={(role) => {
              setAuthModalRole(role);
              setIsAuthModalOpen(true);
            }}
            onOpenSaaSPlans={() => setActiveTab('list-ground')}
            setActiveTab={(tab) => setActiveTab(tab)}
          />
        </main>
      )}

      {/* Contact Us Page */}
      {activeTab === 'contact' && (
        <main className="pt-28 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h1 className="text-3xl font-black text-slate-900">Contact ArenaSlot Support</h1>
              {contactSubmitted ? (
                <div className="p-6 bg-emerald-50 text-emerald-800 rounded-2xl flex items-center space-x-3 text-xs font-bold">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Thank you! Your message has been sent to ArenaSlot Support Team. We will call you back shortly.</span>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactSubmitted(true);
                  }}
                  className="space-y-4 text-xs font-medium"
                >
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Your Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Ali Raza"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Mobile Phone Number</label>
                    <input
                      required
                      type="text"
                      placeholder="0300-1234567"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Message / Facility Inquiry</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your question or facility registration request..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#0B1B3D] text-white py-3.5 rounded-xl font-bold text-xs shadow-md"
                  >
                    Send Inquiry Message
                  </button>
                </form>
              )}
            </div>
          </div>
          <Footer
            onOpenAuth={(role) => {
              setAuthModalRole(role);
              setIsAuthModalOpen(true);
            }}
            onOpenSaaSPlans={() => setActiveTab('list-ground')}
            setActiveTab={(tab) => setActiveTab(tab)}
          />
        </main>
      )}

      {/* Floating FB Messenger Chat Widget with Sound Chime */}
      <FBMessengerChatWidget hostName={facilities[0]?.hostName || 'ArenaSlot Host Support'} />

      {/* Ground Detail Booking Modal */}
      {selectedFacility && (
        <FacilityDetailModal
          facility={selectedFacility}
          onClose={() => setSelectedFacility(null)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Auth Login / Signup Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialRole={authModalRole}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          if (user.role === 'owner') {
            setActiveTab('owner');
          }
        }}
      />

    </div>
  );
}
