import React, { useState } from 'react';
import { X, User, Building2, ShieldCheck, ArrowRight, Lock, Mail, Phone } from 'lucide-react';




export const AuthModal = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialRole = 'customer',
}) => {
  const [role, setRole] = useState(initialRole);
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    const displayName = name || (role === 'owner' ? 'Malik Hamza (Ground Owner)' : 'Player Account');
    onLoginSuccess({ name: displayName, role, email });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative animate-fadeIn">
        
        {/* Header */}
        <div className="bg-[#0B1B3D] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="ArenaSlot" className="h-8 w-auto object-contain bg-white/10 p-1 rounded-md" />
            <span className="text-xs font-black text-[#76C000] uppercase tracking-wider">
              {role === 'owner' ? 'Ground Partner Portal' : 'Player Marketplace'}
            </span>
          </div>
          
          <h3 className="text-xl font-black mt-2">
            {isSignup ? (role === 'owner' ? 'Register Your Ground' : 'Create Player Account') : 'Welcome Back'}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {role === 'owner'
              ? 'List your sports ground, set advance payment rules, & manage walk-in counter POS.'
              : 'Book sports courts & split match costs instantly online.'}
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`flex-1 py-3 text-center flex items-center justify-center space-x-2 border-b-2 transition-all ${
              role === 'customer'
                ? 'border-[#0B1B3D] text-[#0B1B3D] bg-white font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Player / Team</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('owner')}
            className={`flex-1 py-3 text-center flex items-center justify-center space-x-2 border-b-2 transition-all ${
              role === 'owner'
                ? 'border-[#76C000] text-[#0B1B3D] bg-white font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-[#76C000]" />
            <span>Register Ground / Owner</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {isSignup && (
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                {role === 'owner' ? 'Owner / Ground Manager Name' : 'Player Full Name'}
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Malik Hamza"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-900 focus:outline-none focus:border-[#0B1B3D]"
              />
            </div>
          )}

          <div>
            <label className="block text-slate-700 font-bold mb-1">Email Address</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-900 focus:outline-none focus:border-[#0B1B3D]"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Password</label>
            <input
              required
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-900 focus:outline-none focus:border-[#0B1B3D]"
            />
          </div>

          {isSignup && (
            <div>
              <label className="block text-slate-700 font-bold mb-1">Mobile WhatsApp Number</label>
              <input
                required
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0300-1234567"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-mono font-bold text-slate-900 focus:outline-none focus:border-[#0B1B3D]"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#0B1B3D] hover:bg-[#061229] text-white py-3.5 rounded-xl font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <span>{isSignup ? (role === 'owner' ? 'Register Ground & Open Dashboard' : 'Create Player Account') : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4 text-[#76C000]" />
          </button>

          <div className="text-center pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="text-slate-600 hover:text-[#0B1B3D] font-bold text-xs"
            >
              {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Register Now"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
