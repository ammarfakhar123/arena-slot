import React, { useState } from 'react';
import { Calendar, MapPin, CheckCircle2, Clock, Users, ArrowLeft, Download, ShieldCheck, XCircle, Share2, Copy, AlertTriangle } from 'lucide-react';




export const MyBookings = ({
  bookings,
  onBackToMarketplace,
  onCancelBooking,
}) => {
  const [cancellingBookingId, setCancellingBookingId] = useState(null);
  const [cancellationReason, setCancellationReason] = useState('Match rescheduled by team');
  const [copiedId, setCopiedId] = useState(null);
  const [invoiceModalBooking, setInvoiceModalBooking] = useState(null);

  const handleConfirmCancel = () => {
    if (!cancellingBookingId) return;
    onCancelBooking(cancellingBookingId, cancellationReason);
    setCancellingBookingId(null);
    alert('Reservation has been cancelled. Any eligible deposit refund will be processed to your payment method.');
  };

  const handleCopyLink = (booking) => {
    const link = `https://arenaslot.pk/match/${booking.id}?split=${booking.splitCount || 4}`;
    navigator.clipboard.writeText(link);
    setCopiedId(booking.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#0B1B3D]">My Reserved Matches & Slots</h1>
          <p className="text-xs text-slate-500 mt-1">Manage active match reservations, cancel bookings, share group cost links, and print receipts.</p>
        </div>
        <button
          onClick={onBackToMarketplace}
          className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3.5 py-2 rounded-xl hover:bg-slate-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Arenas</span>
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4 shadow-sm">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-[#0B1B3D]">No Bookings Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You haven't reserved any indoor grounds or nets yet. Explore sports facilities around your city and book your first slot.
          </p>
          <button
            onClick={onBackToMarketplace}
            className="bg-[#0B1B3D] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow"
          >
            Find Grounds & Book
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const isCancelled = booking.paymentStatus === 'Cancelled';
            return (
              <div
                key={booking.id}
                className={`bg-white border rounded-2xl p-5 shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isCancelled ? 'border-red-200 bg-red-50/20 opacity-75' : 'border-slate-200 hover:shadow-md'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="bg-[#76C000] text-[#0B1B3D] text-xs font-black px-2.5 py-0.5 rounded">
                      {booking.sport}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#0B1B3D] bg-slate-100 px-2 py-0.5 rounded">
                      ID: {booking.id}
                    </span>
                    <span className="text-xs text-slate-400">• Reserved {booking.createdAt}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-[#0B1B3D]">{booking.facilityName}</h3>

                  <div className="flex flex-wrap gap-4 text-xs text-slate-600">
                    <span className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-[#76C000]" />
                      {booking.location}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-[#76C000]" />
                      {booking.date}
                    </span>
                    <span className="flex items-center font-bold text-slate-800">
                      <Clock className="w-3.5 h-3.5 mr-1 text-[#76C000]" />
                      {booking.time}
                    </span>
                  </div>

                  {booking.splitCount && booking.perPersonAmount ? (
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <div className="inline-flex items-center space-x-2 text-[11px] bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                        <Users className="w-3.5 h-3.5 text-[#76C000]" />
                        <span>Split among {booking.splitCount} players:</span>
                        <span className="font-extrabold text-[#0B1B3D]">PKR {booking.perPersonAmount} / player</span>
                      </div>

                      <button
                        onClick={() => handleCopyLink(booking)}
                        className="inline-flex items-center space-x-1 text-[11px] font-bold text-[#0B1B3D] bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        <Share2 className="w-3 h-3 text-[#76C000]" />
                        <span>{copiedId === booking.id ? 'Copied Match Link!' : 'Share WhatsApp Link'}</span>
                      </button>
                    </div>
                  ) : null}

                  {isCancelled && booking.cancellationReason && (
                    <div className="text-xs text-red-600 bg-red-100/60 p-2 rounded-lg font-medium">
                      Cancellation Reason: {booking.cancellationReason}
                    </div>
                  )}
                </div>

                <div className="md:text-right space-y-3 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 flex flex-col items-start md:items-end justify-between">
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Match Fee</div>
                    <div className="text-xl font-black text-[#0B1B3D]">
                      PKR {booking.totalAmount.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-1 rounded text-xs font-extrabold flex items-center gap-1 ${
                      isCancelled
                        ? 'bg-red-100 text-red-800'
                        : booking.paymentStatus === 'Fully Paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-900'
                    }`}>
                      {isCancelled ? (
                        <XCircle className="w-3.5 h-3.5 text-red-600" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#76C000]" />
                      )}
                      {booking.paymentStatus} ({booking.paymentMethod})
                    </span>

                    {!isCancelled && (
                      <>
                        <button
                          onClick={() => setInvoiceModalBooking(booking)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                          title="Download Receipt PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setCancellingBookingId(booking.id)}
                          className="px-3 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs border border-red-200 transition-colors"
                        >
                          Cancel Reservation
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CANCEL CONFIRMATION MODAL */}
      {cancellingBookingId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center space-x-3 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-black text-[#0B1B3D]">Cancel Slot Reservation?</h3>
            </div>
            
            <p className="text-xs text-slate-600">
              Are you sure you want to cancel booking <span className="font-bold">{cancellingBookingId}</span>? Any advance deposit paid will be reviewed according to the ground cancellation policy.
            </p>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Reason for Cancellation:</label>
              <select
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold border rounded-xl bg-slate-50 focus:outline-none"
              >
                <option value="Match rescheduled by team">Match rescheduled by team</option>
                <option value="Weather / Personal reason">Weather / Personal reason</option>
                <option value="Booked wrong time slot">Booked wrong time slot</option>
                <option value="Player unavailable">Player unavailable</option>
              </select>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => setCancellingBookingId(null)}
                className="w-1/2 py-2.5 text-xs font-bold border rounded-xl"
              >
                Keep Reservation
              </button>
              <button
                onClick={handleConfirmCancel}
                className="w-1/2 py-2.5 text-xs font-black bg-red-600 text-white rounded-xl shadow-sm hover:bg-red-700"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INVOICE RECEIPT MODAL */}
      {invoiceModalBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setInvoiceModalBooking(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900"
            >
              ✕
            </button>

            <div className="flex items-center justify-between border-b pb-3">
              <img src="/logo.png" alt="ArenaSlot" className="h-8 w-auto object-contain" />
              <span className="text-xs font-mono font-bold bg-slate-100 px-2 py-1 rounded">
                RECEIPT #{invoiceModalBooking.id}
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="font-bold">Venue:</span>
                <span>{invoiceModalBooking.facilityName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Sport & Date:</span>
                <span>{invoiceModalBooking.sport} ({invoiceModalBooking.date})</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Time Slot:</span>
                <span>{invoiceModalBooking.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Customer Name:</span>
                <span>{invoiceModalBooking.customerName} ({invoiceModalBooking.customerPhone})</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-black text-sm">
                <span>Total Amount:</span>
                <span className="text-[#0B1B3D]">PKR {invoiceModalBooking.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Advance Paid:</span>
                <span>PKR {invoiceModalBooking.advancePaid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Due at Venue:</span>
                <span>PKR {invoiceModalBooking.dueAtVenue.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => {
                window.print();
              }}
              className="w-full bg-[#0B1B3D] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4 text-[#76C000]" />
              <span>Print / Download PDF Receipt</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
