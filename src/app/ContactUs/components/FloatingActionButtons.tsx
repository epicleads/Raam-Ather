"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneIcon, ChatBubbleLeftRightIcon, CalendarDaysIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePopup } from '../../Components/popups/PopupProvider';

const FloatingActionButtons = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { openCallPopup, openFormPopup } = usePopup();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const actions = [
    {
      icon: PhoneIcon,
      label: 'Call Now',
      color: 'bg-[#4A4A4A] hover:bg-[#00B248]',
      action: () => openCallPopup(),
      description: 'Speak with our EV experts'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      label: 'Email Us',
      color: 'bg-[#25D366] hover:bg-[#20BA5A]',
      action: () => openFormPopup('contact'),
      description: 'Quick email support'
    },
    {
      icon: CalendarDaysIcon,
      label: 'Book Test Ride',
      color: 'bg-[#2962FF] hover:bg-[#1E88E5]',
      action: () => openFormPopup('testdrive'),
      description: 'Schedule your test ride'
    }
  ];


  const handleMainButtonClick = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">

          {/* Action Buttons */}
          <AnimatePresence>
            {isExpanded && (
              <div className="flex flex-col items-end space-y-3">
                {actions.map((action, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 100, scale: 0 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 100, scale: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 group"
                  >
                    {/* Label */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 + 0.1 }}
                      className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap"
                    >
                      <div className="font-semibold text-[#1B1B1B] text-sm font-neurial">{action.label}</div>
                      <div className="text-xs text-[#666666] font-neurial">{action.description}</div>
                    </motion.div>

                    {/* Button */}
                    <motion.button
                      onClick={action.action}
                      className={`${action.color} text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <action.icon className="w-6 h-6" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Main Toggle Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={handleMainButtonClick}
            className={`w-16 h-16 rounded-full shadow-2xl transition-all flex items-center justify-center ${
              isExpanded 
                ? 'bg-red-500 hover:bg-red-600 rotate-45' 
                : 'bg-[#4A4A4A] hover:bg-[#00B248]'
            } text-white`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XMarkIcon className="w-8 h-8" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <ChatBubbleLeftRightIcon className="w-8 h-8" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FloatingActionButtons;