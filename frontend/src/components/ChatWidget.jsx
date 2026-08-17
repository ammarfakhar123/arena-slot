import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Volume2, ShieldCheck, Building2, User } from 'lucide-react';

import { playChatNotificationSound } from '../utils/sound';



export const ChatWidget = ({
  facility,
  isOpen,
  onClose,
  messages,
  onSendMessage,
  currentUser,
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const facilityId = facility?.id || 'fac-1';
  const facilityName = facility?.name || 'Rawalpindi Padel Club';
  const hostName = facility?.hostName || 'Ground Manager';

  // Filter messages for current facility
  const currentChatMessages = messages.filter((m) => m.facilityId === facilityId);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, currentChatMessages]);

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const senderRole = currentUser?.role || 'customer';
    const senderName = currentUser?.name || (senderRole === 'customer' ? 'Player' : hostName);

    onSendMessage(facilityId, facilityName, inputText.trim(), senderRole, senderName);
    playChatNotificationSound();
    setInputText('');

    // If customer sent message, simulate host auto-reply after 1.5s with sound chime
    if (senderRole === 'customer') {
      setTimeout(() => {
        onSendMessage(
          facilityId,
          facilityName,
          `Hi! Thanks for reaching out to ${facilityName}. Our ground team has received your message.`,
          'owner',
          hostName
        );
        playChatNotificationSound();
      }, 1500);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[500px] animate-fadeIn">
      
      {/* Header */}
      <div className="bg-[#0B1B3D] text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#76C000] text-[#0B1B3D] font-black flex items-center justify-center text-xs">
            {facilityName.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="text-xs font-black text-white truncate max-w-[200px]">{facilityName}</div>
            <div className="text-[10px] text-slate-300 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#76C000] animate-pulse" />
              <span>Host Live Chat ({hostName})</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => playChatNotificationSound()}
            className="p-1.5 text-slate-300 hover:text-white rounded-full"
            title="Test Chime Sound"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 text-xs">
        
        <div className="text-center text-[10px] text-slate-400 my-1">
          <span>End-to-end Chat with Ground Host • Audio Alerts Enabled</span>
        </div>

        {currentChatMessages.length === 0 ? (
          <div className="text-center text-slate-400 py-8 space-y-2">
            <MessageSquare className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="font-semibold text-xs">Start a direct chat with {hostName}</p>
            <p className="text-[11px]">Ask about ground rules, parking, or custom match timings.</p>
          </div>
        ) : (
          currentChatMessages.map((msg) => {
            const isCustomer = msg.senderRole === 'customer';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isCustomer ? 'items-end' : 'items-start'}`}
              >
                <div className="text-[10px] text-slate-400 mb-0.5 px-1 font-semibold">
                  {msg.senderName} • {msg.timestamp}
                </div>
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed shadow-xs ${
                    isCustomer
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
        <div ref={messagesEndRef} />
      </div>

      {/* Footer Form */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type message to ground owner..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-3.5 py-2.5 bg-slate-100 text-slate-900 placeholder-slate-400 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-[#76C000] font-medium"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="bg-[#0B1B3D] disabled:opacity-40 hover:bg-[#061229] text-white p-2.5 rounded-xl transition-all shadow-xs shrink-0"
        >
          <Send className="w-4 h-4 text-[#76C000]" />
        </button>
      </form>

    </div>
  );
};
