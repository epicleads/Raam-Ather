"use client";
import { useState } from "react";
import { CookieConsentProvider } from "./CookieConsentStore";
import CookieConsentBanner from "./CookieConsentBanner";
import MetaPixel from "./MetaPixel";
import CookiePolicyModal from "./CookiePolicyModal";

export default function CookieConsentManager({ children }: { children: React.ReactNode }) {
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  return (
    <CookieConsentProvider>
      {/* Main content */}
      {children}
      
      {/* Cookie consent banner */}
      <CookieConsentBanner />
      
      {/* Meta Pixel for retargeting */}
      <MetaPixel />
      
      {/* Cookie policy modal */}
      <CookiePolicyModal 
        isOpen={showPolicyModal} 
        onClose={() => setShowPolicyModal(false)} 
      />
      
      {/* Global cookie policy trigger (optional - can be used anywhere in the app) */}
      <div id="cookie-policy-trigger" className="hidden">
        <button onClick={() => setShowPolicyModal(true)}>
          View Cookie Policy
        </button>
      </div>
    </CookieConsentProvider>
  );
}

// Export the cookie policy modal trigger for use in other components
export function useCookiePolicyModal() {
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  
  return {
    showModal: () => setShowPolicyModal(true),
    hideModal: () => setShowPolicyModal(false),
    CookiePolicyModal: () => (
      <CookiePolicyModal 
        isOpen={showPolicyModal} 
        onClose={() => setShowPolicyModal(false)} 
      />
    )
  };
}