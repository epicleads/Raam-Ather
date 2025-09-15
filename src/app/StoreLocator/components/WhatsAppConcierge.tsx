"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon,
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { Outlet } from '../StoreLocatorClient';

interface WhatsAppConciergeProps {
  outlet: Outlet;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  type?: 'text' | 'quick-reply' | 'location' | 'contact';
}

const WhatsAppConcierge: React.FC<WhatsAppConciergeProps> = ({
  outlet,
  onClose
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = {
    whatsappConcierge: 'WhatsApp Concierge',
    onlineNow: 'Online now',
    responseTime: 'Usually replies within minutes',
    typeMessage: 'Type a message...',
    send: 'Send',
    quickReplies: {
      testRide: '🚲 Book Test Ride',
      directions: '📍 Get Directions',
      hours: '🕒 Store Hours',
      models: '🏍️ Available Models',
      offers: '🎁 Current Offers',
      contact: '📞 Contact Info'
    },
    agentMessages: {
      greeting: `Hi! I'm here to help you with ${outlet.name}. How can I assist you today?`,
      testRide: `I'd be happy to help you book a test ride! We have the following models available: ${outlet.modelsAvailable.join(', ')}. Which one interests you?`,
      directions: `Our showroom is located at: ${outlet.address}. Would you like me to share the location on Google Maps?`,
      hours: `We're open ${outlet.hours}. ${outlet.isOpen ? 'We\'re currently open!' : 'We\'re currently closed, but I can help you plan your visit.'}`,
      models: `We currently have these models available for test rides: ${outlet.modelsAvailable.join(', ')}. Which one would you like to know more about?`,
      offers: `Great timing! Here are our current offers: ${outlet.offers.join(', ')}. Would you like more details about any of these?`,
      contact: `You can reach us at ${outlet.phone} or visit us at ${outlet.address}. Our WhatsApp support is available during business hours.`
    }
  };

  useEffect(() => {
    // Initial greeting
    const initialMessage: Message = {
      id: '1',
      text: t.agentMessages.greeting,
      sender: 'agent',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages([initialMessage]);
  }, [t.agentMessages.greeting]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      let responseText = "Thank you for your message. Our team will get back to you shortly.";

      // Handle quick replies
      if (text === t.quickReplies.testRide) {
        responseText = t.agentMessages.testRide;
      } else if (text === t.quickReplies.directions) {
        responseText = t.agentMessages.directions;
      } else if (text === t.quickReplies.hours) {
        responseText = t.agentMessages.hours;
      } else if (text === t.quickReplies.models) {
        responseText = t.agentMessages.models;
      } else if (text === t.quickReplies.offers) {
        responseText = t.agentMessages.offers;
      } else if (text === t.quickReplies.contact) {
        responseText = t.agentMessages.contact;
      }

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'agent',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const quickReplies = Object.values(t.quickReplies);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white w-full max-w-md h-[80vh] md:h-[600px] md:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00B248] rounded-full flex items-center justify-center">
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">{outlet.name}</h3>
                <div className="flex items-center gap-2 text-sm text-green-200">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>{t.onlineNow}</span>
                </div>
                <p className="text-xs text-green-200">{t.responseTime}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-[#E5DDD5] space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-[#DCF8C6] text-gray-900'
                      : 'bg-white text-gray-900 shadow-sm'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="bg-white p-3 rounded-2xl shadow-sm">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="p-4 bg-white border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-3">Quick replies:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickReplies.map((reply, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSendMessage(reply)}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs text-left transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {reply}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                  placeholder={t.typeMessage}
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#075E54] focus:border-transparent outline-none text-sm"
                />
              </div>
              <motion.button
                onClick={() => handleSendMessage(inputText)}
                className="w-12 h-12 bg-[#075E54] hover:bg-[#064840] text-white rounded-full flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!inputText.trim()}
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WhatsAppConcierge;