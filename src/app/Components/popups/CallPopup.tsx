"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, PhoneIcon } from '@heroicons/react/24/outline';

interface CallPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const CallPopup = ({ isOpen, onClose }: CallPopupProps) => {
  const outlets = [
    {
      location: 'Hyderabad - Jubilee Hills',
      phone: '+91 9876543210',
      address: 'Road No. 36, Jubilee Hills, Hyderabad - 500033',
      hours: '10:00 AM - 8:00 PM'
    },
    {
      location: 'Hyderabad - Banjara Hills',
      phone: '+91 9876543211',
      address: 'Road No. 12, Banjara Hills, Hyderabad - 500034',
      hours: '10:00 AM - 8:00 PM'
    },
    {
      location: 'Chennai - T. Nagar',
      phone: '+91 9876543212',
      address: 'Pondy Bazaar, T. Nagar, Chennai - 600017',
      hours: '10:00 AM - 8:00 PM'
    },
    {
      location: 'Chennai - Anna Nagar',
      phone: '+91 9876543213',
      address: '2nd Avenue, Anna Nagar, Chennai - 600040',
      hours: '10:00 AM - 8:00 PM'
    }
  ];

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#1B1B1B]">Call Our Outlets</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <p className="text-[#666666] mt-2">Choose an outlet to call directly</p>
            </div>

            <div className="p-6">
              <div className="grid gap-4">
                {outlets.map((outlet, index) => (
                  <motion.div
                    key={index}
                    className="border border-gray-200 rounded-xl p-4 hover:border-[#2962FF] hover:bg-blue-50 transition-all cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleCall(outlet.phone)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#1B1B1B] mb-2">{outlet.location}</h3>
                        <p className="text-sm text-[#666666] mb-1">{outlet.address}</p>
                        <p className="text-sm text-[#666666]">Hours: {outlet.hours}</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="bg-[#2962FF] p-3 rounded-full">
                          <PhoneIcon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-[#2962FF]">{outlet.phone}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <h4 className="font-semibold text-[#1B1B1B] mb-2">Need Immediate Assistance?</h4>
                <p className="text-sm text-[#666666] mb-3">
                  For urgent queries or after-hours support, you can also reach us via WhatsApp.
                </p>
                <button
                  onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Chat on WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CallPopup;