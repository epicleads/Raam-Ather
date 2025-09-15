"use client";
import { useState } from "react";
import { useCookieConsent } from "./CookieConsentStore";
import CookiePolicyModal from "./CookiePolicyModal";

export default function CookieConsentBanner() {
  const { consent, acceptAll, declineAll, hideBanner } = useCookieConsent();
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  if (!consent.showBanner || consent.hasConsented) {
    return null;
  }

  return (
    <>
      {/* Compact Cookie Banner - Bottom Right */}
      <div className="fixed bottom-4 right-4 z-[9999] max-w-xs">
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-3 text-gray-700">
          {/* Compact Header with Close */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
                <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-800 text-xs">Cookies</h3>
            </div>
            <button
              onClick={hideBanner}
              className="text-gray-400 hover:text-gray-600 transition-colors p-0.5"
              aria-label="Close"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Compact Content */}
          <p className="text-xs text-gray-600 mb-3 leading-relaxed">
            We use cookies for better experience and personalized ads.
          </p>

          {/* Compact Actions */}
          <div className="flex gap-2 mb-2">
            <button
              onClick={declineAll}
              className="flex-1 px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-700 rounded text-xs font-medium transition-colors"
            >
              Decline
            </button>
            <button
              onClick={acceptAll}
              className="flex-1 px-2.5 py-1.5 bg-gray-800 hover:bg-gray-900 text-white rounded text-xs font-medium transition-colors"
            >
              Accept
            </button>
          </div>

          {/* Policy Link */}
          <div className="text-center">
            <button
              onClick={() => setShowPolicyModal(true)}
              className="text-xs text-gray-500 hover:text-gray-600 transition-colors underline"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Positioning */}
      <style jsx>{`
        @media (max-width: 768px) {
          .fixed.bottom-4.right-4 {
            left: 1rem;
            right: 1rem;
            bottom: 5rem; /* Above mobile bottom nav */
            max-width: none;
          }
        }
        
        /* Avoid WhatsApp button conflict */
        @media (min-width: 769px) {
          .fixed.bottom-4.right-4 {
            bottom: 1rem;
            right: 1rem;
          }
        }
      `}</style>

      {/* Cookie Policy Modal */}
      <CookiePolicyModal 
        isOpen={showPolicyModal} 
        onClose={() => setShowPolicyModal(false)} 
      />
    </>
  );
}