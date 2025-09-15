"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import FormContact from '../contactform/form';

interface FormPopupProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'contact' | 'testdrive';
}

const FormPopup = ({ isOpen, onClose, type }: FormPopupProps) => {
  const getTitle = () => {
    return type === 'testdrive' ? 'Book a Test Ride' : 'Contact Us';
  };

  const getDescription = () => {
    return type === 'testdrive' 
      ? 'Book your free test ride and experience the future of electric mobility'
      : 'Get in touch with us for any queries or support';
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
            className="bg-white rounded-2xl w-full max-w-md sm:max-w-lg p-0 sm:p-0"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#1B1B1B]">{getTitle()}</h2>
                  <p className="text-xs text-[#666666] mt-1">{getDescription()}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <FormContact />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormPopup;