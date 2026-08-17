import React, { useState, useEffect } from 'react';
import { Calendar, User, Menu, X, Building2, LogOut } from 'lucide-react';




export const Header = ({
  activeTab,
  setActiveTab,
  bookingsCount,
  onOpenAuth,
  onOpenSaaSPlans,
  currentUser,
  onLogout,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Transparent overlay strictly applies ONLY to the top of the Marketplace hero section
  const isHeroOverlay = activeTab === 'marketplace' && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isHeroOverlay
          ? 'bg-gradient-to-b from-black/80 via-black/30 to-transparent text-white border-none shadow-none'
          : 'bg-white text-slate-900 border-b border-slate-200 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo (Left) */}
          <button 
            onClick={() => setActiveTab('marketplace')}
            className="flex items-center focus:outline-none group ml-1 sm:ml-2"
          >
            <img 
              src={isHeroOverlay ? '/logo-white.png' : '/logo.png'} 
              alt="ArenaSlot" 
              className="h-10 sm:h-12 w-auto object-contain transition-all duration-200"
            />
          </button>

          {/* ABSOLUTE PERFECT 50% MATHEMATICAL CENTER NAVIGATION LINKS */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center space-x-8">
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`text-xs sm:text-[13px] font-semibold tracking-wide transition-colors ${
                activeTab === 'marketplace'
                  ? isHeroOverlay ? 'text-white border-b-2 border-[#76C000] pb-1 font-bold' : 'text-[#0B1B3D] border-b-2 border-[#76C000] pb-1 font-bold'
                  : isHeroOverlay ? 'text-slate-200 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Explore Grounds
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`relative text-xs sm:text-[13px] font-semibold tracking-wide transition-colors flex items-center ${
                activeTab === 'bookings'
                  ? isHeroOverlay ? 'text-white border-b-2 border-[#76C000] pb-1 font-bold' : 'text-[#0B1B3D] border-b-2 border-[#76C000] pb-1 font-bold'
                  : isHeroOverlay ? 'text-slate-200 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#76C000]" />
              My Bookings
              {bookingsCount > 0 && (
                <span className="ml-1.5 bg-[#76C000] text-[#0B1B3D] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {bookingsCount}
                </span>
              )}
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-4 mr-2 sm:mr-4">
            {currentUser?.role === 'owner' ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setActiveTab('owner')}
                  className="bg-[#76C000] hover:bg-[#68A800] text-[#0B1B3D] px-5 py-2.5 rounded-xl text-xs font-black shadow-md flex items-center space-x-2 transition-all hover:scale-105"
                >
                  <Building2 className="w-4 h-4 text-[#0B1B3D]" />
                  <span>Daftar Portal (Dashboard)</span>
                </button>
                <button
                  onClick={onLogout}
                  className={`p-2.5 rounded-xl text-xs font-medium ${
                    isHeroOverlay ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={onOpenSaaSPlans}
                  className={`text-xs font-semibold transition-colors ${
                    isHeroOverlay ? 'text-slate-200 hover:text-white' : 'text-slate-700 hover:text-[#0B1B3D]'
                  }`}
                >
                  List Your Ground
                </button>

                <button
                  onClick={() => onOpenAuth('customer')}
                  className={`text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all flex items-center space-x-2 ${
                    isHeroOverlay
                      ? 'bg-[#76C000] text-[#0B1B3D] hover:bg-[#68A800]'
                      : 'bg-[#0B1B3D] text-white hover:bg-[#061229]'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Log In</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2 mr-1">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl focus:outline-none ${
                isHeroOverlay ? 'text-white hover:bg-white/10' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-4 pb-6 space-y-3 shadow-xl text-xs font-medium text-slate-800">
          <button
            onClick={() => {
              setActiveTab('marketplace');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 bg-slate-50 rounded-xl font-bold"
          >
            Explore Grounds
          </button>

          <button
            onClick={() => {
              setActiveTab('bookings');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-xl font-bold"
          >
            <span>My Bookings</span>
            {bookingsCount > 0 && (
              <span className="bg-[#76C000] text-[#0B1B3D] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                {bookingsCount}
              </span>
            )}
          </button>

          {currentUser?.role === 'owner' ? (
            <button
              onClick={() => {
                setActiveTab('owner');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-[#0B1B3D] bg-[#76C000] rounded-xl font-bold"
            >
              Daftar Portal (Dashboard)
            </button>
          ) : (
            <button
              onClick={() => {
                onOpenAuth('customer');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-white bg-[#0B1B3D] rounded-xl font-bold"
            >
              Log In / Sign Up
            </button>
          )}
        </div>
      )}
    </header>
  );
};
