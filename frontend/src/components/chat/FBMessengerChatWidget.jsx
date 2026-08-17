import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Volume2, Minus, Minimize2, Maximize2, ShieldCheck } from 'lucide-react';

import { playChatNotificationSound } from '../../utils/sound';



const DEFAULT_MESSAGES = [
  {
    id: 'msg-1',
    facilityId: 'fac-1',
    facilityName: 'Rawalpindi Padel Arena',
    senderRole: 'owner',
    senderName: 'Malik Hamza (Ground Host)',
    text: 'Assalam-o-Alaikum! Welcome to ArenaSlot. How can we help you reserve your match slot today?',
    timestamp: 'Just now',
  },
];

export const FBMessengerChatWidget = ({
  facility = null,
  isOpen: externalIsOpen = true,
  onClose,
  messages: externalMessages = DEFAULT_MESSAGES,
  onSendMessage,
  currentUser = null,
  hostName: externalHostName = 'ArenaSlot Host Support',
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState(externalMessages || DEFAULT_MESSAGES);
  const messagesEndRef = useRef(null);

  const facilityId = facility?.id || 'fac-1';
  const facilityName = facility?.name || 'Rawalpindi Padel Arena';
  const hostName = facility?.hostName || externalHostName;

  const currentChatMessages = (chatMessages || []).filter((m) => m.facilityId === facilityId || !m.facilityId);

  useEffect(() => {
    if (internalIsOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [internalIsOpen, isMinimized, currentChatMessages.length]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const text = inputText.trim();
    const senderRole = currentUser?.role || 'customer';
    const senderName = currentUser?.name || (senderRole === 'customer' ? 'Player' : hostName);

    const newMsg = {
      id: `msg-${Date.now()}`,
      facilityId,
      facilityName,
      senderRole,
      senderName,
      text,
      timestamp: 'Just now',
    };

    setChatMessages((prev) => [...prev, newMsg]);
    if (onSendMessage) {
      onSendMessage(facilityId, facilityName, text, senderRole, senderName);
    }
    playChatNotificationSound();
    setInputText('');

    if (senderRole === 'customer') {
      setTimeout(() => {
        const replyMsg = {
          id: `msg-reply-${Date.now()}`,
          facilityId,
          facilityName,
          senderRole: 'owner',
          senderName: hostName,
          text: `Hi! Thanks for messaging ${facilityName}. Our team is live and ready for your court slot booking.`,
          timestamp: 'Just now',
        };
        setChatMessages((prev) => [...prev, replyMsg]);
        playChatNotificationSound();
      }, 1200);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      
      {/* Floating Chat Bubble Button */}
      {!internalIsOpen && (
        <button
          onClick={() => {
            setInternalIsOpen(true);
            setIsMinimized(false);
            playChatNotificationSound();
          }}
          className="relative bg-[#0B1B3D] hover:bg-[#061229] text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group border-2 border-[#76C000]"
          title="Chat with Ground Host"
        >
          <MessageCircle className="w-7 h-7 text-[#76C000]" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#76C000] opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#76C000]" />
          </span>
        </button>
      )}

      {/* FB Messenger Style Chat Box */}
      {internalIsOpen && (
        <div
          className={`w-[340px] sm:w-[380px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300 ${
            isMinimized ? 'h-16' : 'h-[500px]'
          } flex flex-col`}
        >
          {/* Header */}
          <div className="bg-[#0B1B3D] text-white px-4 py-3 flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#76C000] text-[#0B1B3D] flex items-center justify-center font-black text-sm">
                  {hostName.charAt(0)}
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0B1B3D] rounded-full" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-white leading-tight flex items-center gap-1">
                  <span>{facilityName}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#76C000]" />
                </h4>
                <p className="text-[10px] text-slate-300 font-medium">Host: {hostName} • <span className="text-[#76C000] font-bold">Online</span></p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 text-slate-300 hover:text-white rounded-lg hover:bg-white/10"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setInternalIsOpen(false)}
                className="p-1 text-slate-300 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          {!isMinimized && (
            <>
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
                {currentChatMessages.map((msg) => {
                  const isUser = msg.senderRole === (currentUser?.role || 'customer');
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <span className="text-[10px] text-slate-400 mb-1 px-1">{msg.senderName}</span>
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl font-medium leading-relaxed shadow-sm ${
                          isUser
                            ? 'bg-[#0B1B3D] text-white rounded-br-none'
                            : 'bg-white text-slate-900 border border-slate-200 rounded-bl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Type message to ground manager..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-slate-100 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0B1B3D]"
                />
                <button
                  type="submit"
                  className="bg-[#76C000] hover:bg-[#68A800] text-[#0B1B3D] p-2.5 rounded-2xl shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}

    </div>
  );
};
