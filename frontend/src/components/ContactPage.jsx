import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck } from 'lucide-react';

export const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 bg-white">
      
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black text-[#0B1B3D]">Contact ArenaSlot Team</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Have a question about ground bookings, venue partnership SaaS, or payment policies? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-black text-[#0B1B3D] uppercase">Headquarters Office</h3>
            <div className="space-y-3 text-xs text-slate-700 font-semibold">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#76C000] shrink-0" />
                <span>Sector F-8 Markaz / Satellite Town, Islamabad & Rawalpindi, Pakistan</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#76C000] shrink-0" />
                <span>+92 300 5551234 (Support & WhatsApp)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#76C000] shrink-0" />
                <span>support@arenaslot.pk</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0B1B3D] text-white p-6 rounded-3xl space-y-2">
            <div className="flex items-center space-x-2 text-[#76C000] text-xs font-black">
              <MessageSquare className="w-4 h-4" />
              <span>Ground Partner SaaS Onboarding</span>
            </div>
            <p className="text-xs text-slate-300">
              For ground owners needing custom setup, WhatsApp integration, or multi-venue management.
            </p>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-2 bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-3xl">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-[#76C000] rounded-full flex items-center justify-center mx-auto font-black text-xl">
                ✓
              </div>
              <h3 className="text-xl font-black text-[#0B1B3D]">Message Sent Successfully!</h3>
              <p className="text-xs text-slate-600">
                Our support team will get back to you at <b>{email}</b> shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-[#0B1B3D] text-white text-xs font-bold px-6 py-2.5 rounded-xl"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="text-base font-black text-[#0B1B3D]">Send Us an Inquiry</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ammar Khan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-xl bg-white font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-xl bg-white font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Venue Partnership / Booking Inquiry"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl bg-white font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl bg-white font-semibold"
                />
              </div>

              <button
                type="submit"
                className="bg-[#0B1B3D] text-white px-8 py-3 rounded-xl font-black shadow-md flex items-center space-x-2"
              >
                <Send className="w-4 h-4 text-[#76C000]" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
