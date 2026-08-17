import React, { useState } from 'react';
import { CreditCard, Building, Smartphone, Zap, CheckCircle2, ShieldCheck, Save, AlertCircle } from 'lucide-react';

export 

const DEFAULT_PAYMENT_DETAILS = {
  bankName: 'Meezan Bank',
  bankAccountTitle: 'ArenaSlot Ground Management Ltd',
  bankIban: 'PK36MEZN0001020304050607',
  jazzCashTitle: 'Malik Hamza (Ground Owner)',
  jazzCashNumber: '0300-5551234',
  easyPaisaTitle: 'Malik Hamza',
  easyPaisaNumber: '0345-9876543',
  raastId: '03005551234',
  acceptDirectPlayerDeposits: true,
};

export const HostPaymentSettings = () => {
  const [details, setDetails] = useState(DEFAULT_PAYMENT_DETAILS);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Direct Payouts & Player Advance Receiving</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Payment Account & Receiving Gateway Settings
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Configure your Bank Account, JazzCash, EasyPaisa, and Raast details for player match deposits.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-[#0B1B3D] hover:bg-[#061229] text-white px-6 py-3 rounded-2xl text-xs font-bold shadow-md transition-all flex items-center space-x-2 shrink-0"
        >
          <Save className="w-4 h-4 text-[#76C000]" />
          <span>Save Payment Gateway</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center space-x-3 text-emerald-800 text-xs font-bold animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Payment accounts updated successfully! Your venue is ready to receive player deposits.</span>
        </div>
      )}

      {/* Form Settings */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Toggle Direct Player Deposits */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#76C000]" />
              <span>Enable Direct Player Advance Deposits</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Players will transfer 30% or 100% booking deposits directly to your configured JazzCash / EasyPaisa / Bank accounts.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={details.acceptDirectPlayerDeposits}
              onChange={(e) => setDetails({ ...details, acceptDirectPlayerDeposits: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#76C000]" />
          </label>
        </div>

        {/* Bank Payout Account */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <div className="p-2.5 bg-slate-100 text-slate-800 rounded-xl">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Bank Transfer Details (IBAN)</h3>
              <p className="text-xs text-slate-500">Official commercial bank account for payouts & online transfers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium">
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">Bank Name</label>
              <select
                value={details.bankName}
                onChange={(e) => setDetails({ ...details, bankName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:outline-none focus:border-[#0B1B3D]"
              >
                <option value="Meezan Bank">Meezan Bank</option>
                <option value="Habib Bank Limited (HBL)">Habib Bank Limited (HBL)</option>
                <option value="Bank Alfalah">Bank Alfalah</option>
                <option value="Faysal Bank">Faysal Bank</option>
                <option value="Askari Bank">Askari Bank</option>
                <option value="MCB Bank">MCB Bank</option>
                <option value="Standard Chartered">Standard Chartered</option>
                <option value="United Bank Limited (UBL)">United Bank Limited (UBL)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">Account Title</label>
              <input
                type="text"
                value={details.bankAccountTitle}
                onChange={(e) => setDetails({ ...details, bankAccountTitle: e.target.value })}
                placeholder="e.g. Rawalpindi Padel Arena"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-900 focus:outline-none focus:border-[#0B1B3D]"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">IBAN / Account Number</label>
              <input
                type="text"
                value={details.bankIban}
                onChange={(e) => setDetails({ ...details, bankIban: e.target.value })}
                placeholder="e.g. PK36MEZN0001020304050607"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-mono font-bold text-slate-900 focus:outline-none focus:border-[#0B1B3D]"
              />
            </div>
          </div>
        </div>

        {/* Mobile Wallets: JazzCash & EasyPaisa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* JazzCash Merchant / Mobile Account */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center font-black text-sm">
                JC
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">JazzCash Account</h3>
                <p className="text-xs text-slate-500">Mobile Wallet deposit receiver</p>
              </div>
            </div>

            <div className="space-y-3 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">JazzCash Account Title</label>
                <input
                  type="text"
                  value={details.jazzCashTitle}
                  onChange={(e) => setDetails({ ...details, jazzCashTitle: e.target.value })}
                  placeholder="e.g. Malik Hamza"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-900 focus:outline-none focus:border-[#0B1B3D]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">JazzCash Mobile Number</label>
                <input
                  type="text"
                  value={details.jazzCashNumber}
                  onChange={(e) => setDetails({ ...details, jazzCashNumber: e.target.value })}
                  placeholder="0300-1234567"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-mono font-bold text-slate-900 focus:outline-none focus:border-[#0B1B3D]"
                />
              </div>
            </div>
          </div>

          {/* EasyPaisa Merchant / Mobile Account */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-black text-sm">
                EP
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">EasyPaisa Account</h3>
                <p className="text-xs text-slate-500">Mobile Wallet deposit receiver</p>
              </div>
            </div>

            <div className="space-y-3 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">EasyPaisa Account Title</label>
                <input
                  type="text"
                  value={details.easyPaisaTitle}
                  onChange={(e) => setDetails({ ...details, easyPaisaTitle: e.target.value })}
                  placeholder="e.g. Malik Hamza"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-900 focus:outline-none focus:border-[#0B1B3D]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">EasyPaisa Mobile Number</label>
                <input
                  type="text"
                  value={details.easyPaisaNumber}
                  onChange={(e) => setDetails({ ...details, easyPaisaNumber: e.target.value })}
                  placeholder="0345-1234567"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-mono font-bold text-slate-900 focus:outline-none focus:border-[#0B1B3D]"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Raast Instant Payment Handle */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Raast Instant Payment ID</h3>
              <p className="text-xs text-slate-500">State Bank of Pakistan Raast instant transfer handle</p>
            </div>
          </div>

          <div className="max-w-md text-xs font-medium">
            <label className="block text-slate-700 font-semibold mb-1.5">Raast ID / Registered Mobile Number</label>
            <input
              type="text"
              value={details.raastId}
              onChange={(e) => setDetails({ ...details, raastId: e.target.value })}
              placeholder="e.g. 03005551234"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-mono font-bold text-slate-900 focus:outline-none focus:border-[#0B1B3D]"
            />
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-[#0B1B3D] hover:bg-[#061229] text-white px-8 py-3.5 rounded-2xl text-xs font-bold shadow-lg transition-all flex items-center space-x-2"
          >
            <Save className="w-4 h-4 text-[#76C000]" />
            <span>Save Payout & Receiving Accounts</span>
          </button>
        </div>

      </form>

    </div>
  );
};
