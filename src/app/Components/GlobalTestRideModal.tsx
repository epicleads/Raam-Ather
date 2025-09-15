'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import TestRideForm from './test-ride-form/TestRideForm.client';

// Context for managing the global test ride modal state
interface TestRideModalContextType {
  openTestRideModal: () => void;
  closeTestRideModal: () => void;
  isTestRideModalOpen: boolean;
}

const TestRideModalContext = createContext<TestRideModalContextType | undefined>(undefined);

// Hook to use the test ride modal context
export const useTestRideModal = () => {
  const context = useContext(TestRideModalContext);
  if (!context) {
    throw new Error('useTestRideModal must be used within a TestRideModalProvider');
  }
  return context;
};

// Provider component that wraps the app
interface TestRideModalProviderProps {
  children: ReactNode;
}

export const TestRideModalProvider: React.FC<TestRideModalProviderProps> = ({ children }) => {
  const [isTestRideModalOpen, setIsTestRideModalOpen] = useState(false);

  const openTestRideModal = () => setIsTestRideModalOpen(true);
  const closeTestRideModal = () => setIsTestRideModalOpen(false);

  return (
    <TestRideModalContext.Provider value={{
      openTestRideModal,
      closeTestRideModal,
      isTestRideModalOpen
    }}>
      {children}
      
      {/* Global Test Ride Modal */}
      {isTestRideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl">
            {/* Close button */}
            <button
              onClick={closeTestRideModal}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Test Ride Form */}
            <TestRideForm onClose={closeTestRideModal} />
          </div>
        </div>
      )}
    </TestRideModalContext.Provider>
  );
};

// Component to trigger the modal from anywhere
export const TestRideModalTrigger: React.FC<{ 
  children: ReactNode; 
  className?: string;
  variant?: 'button' | 'link';
}> = ({ children, className = '', variant = 'button' }) => {
  const { openTestRideModal } = useTestRideModal();

  if (variant === 'link') {
    return (
      <button
        onClick={openTestRideModal}
        className={`text-left ${className}`}
        type="button"
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={openTestRideModal}
      className={className}
      type="button"
    >
      {children}
    </button>
  );
};
