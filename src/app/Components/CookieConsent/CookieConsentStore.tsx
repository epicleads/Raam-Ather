"use client";
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

type CookieConsentType = 'essential' | 'analytics' | 'marketing' | 'all';

interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  hasConsented: boolean;
  showBanner: boolean;
  consentDate?: Date;
}

interface CookieConsentContextType {
  consent: CookieConsent;
  updateConsent: (consent: Partial<CookieConsent>) => void;
  acceptAll: () => void;
  declineAll: () => void;
  acceptEssential: () => void;
  showBanner: () => void;
  hideBanner: () => void;
  hasConsentFor: (type: CookieConsentType) => boolean;
}

// Facebook Pixel types
interface FacebookPixel {
  (command: string, eventName: string, parameters?: Record<string, unknown>): void;
  q?: unknown[];
}

declare global {
  interface Window {
    fbq?: FacebookPixel;
  }
}

const CookieConsentContext = createContext<CookieConsentContextType | null>(null);

const COOKIE_CONSENT_KEY = 'raam_ather_cookie_consent';

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent>({
    essential: true, // Always true - required for site functionality
    analytics: false,
    marketing: false,
    hasConsented: false,
    showBanner: false,
    consentDate: undefined
  });

  // Load consent from localStorage on mount
  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        setConsent({
          ...parsed,
          consentDate: parsed.consentDate ? new Date(parsed.consentDate) : undefined
        });
        console.log('Loaded cookie consent:', parsed);
      } catch (error) {
        console.error('Error loading cookie consent:', error);
        // Show banner if there's an error loading consent
        setTimeout(() => {
          setConsent(prev => ({ ...prev, showBanner: true }));
        }, 10000); // Show after 10 seconds
      }
    } else {
      // No saved consent, show banner after 10 seconds
      console.log('No cookie consent found, will show banner in 10 seconds');
      setTimeout(() => {
        setConsent(prev => ({ ...prev, showBanner: true }));
      }, 10000);
    }
  }, []);

  // Save consent to localStorage whenever it changes
  useEffect(() => {
    if (consent.hasConsented) {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
      console.log('Saved cookie consent:', consent);
    }
  }, [consent]);

  const updateConsent = (newConsent: Partial<CookieConsent>) => {
    setConsent(prev => ({
      ...prev,
      ...newConsent,
      hasConsented: true,
      consentDate: new Date(),
      showBanner: false
    }));
  };

  const acceptAll = () => {
    console.log('User accepted all cookies');
    updateConsent({
      essential: true,
      analytics: true,
      marketing: true
    });
    
    // Initialize tracking scripts
    initializeTracking(true, true);
  };

  const declineAll = () => {
    console.log('User declined all non-essential cookies');
    updateConsent({
      essential: true,
      analytics: false,
      marketing: false
    });
  };

  const acceptEssential = () => {
    console.log('User accepted only essential cookies');
    updateConsent({
      essential: true,
      analytics: false,
      marketing: false
    });
  };

  const showBanner = () => {
    setConsent(prev => ({ ...prev, showBanner: true }));
  };

  const hideBanner = () => {
    setConsent(prev => ({ ...prev, showBanner: false }));
  };

  const hasConsentFor = (type: CookieConsentType): boolean => {
    if (!consent.hasConsented) return false;
    
    switch (type) {
      case 'essential':
        return consent.essential;
      case 'analytics':
        return consent.analytics;
      case 'marketing':
        return consent.marketing;
      case 'all':
        return consent.essential && consent.analytics && consent.marketing;
      default:
        return false;
    }
  };

  // Initialize tracking scripts based on consent
  const initializeTracking = useCallback((analytics: boolean, marketing: boolean) => {
    if (marketing && typeof window !== 'undefined') {
      // Initialize Facebook Pixel for retargeting
      initializeFacebookPixel();
    }
    
    if (analytics && typeof window !== 'undefined') {
      // Initialize Google Analytics or other analytics
      console.log('Analytics tracking initialized');
    }
  }, []);

  const initializeFacebookPixel = () => {
    // Facebook Pixel initialization code
    console.log('Initializing Facebook Pixel for retargeting');
    
    if (typeof window !== 'undefined') {
      window.fbq = window.fbq || function(...args: unknown[]) {
        (window.fbq!.q = window.fbq!.q || []).push(args);
      };
      
      // Track page view for retargeting
      window.fbq('track', 'PageView');
      
      // Track website visit for custom audiences
      window.fbq('track', 'ViewContent', {
        content_name: 'Ather Energy - Electric Scooters',
        content_category: 'Electric Vehicles',
        content_type: 'website_visit'
      });
    }
  };

  // Initialize tracking if user has already consented
  useEffect(() => {
    if (consent.hasConsented && consent.marketing) {
      initializeTracking(consent.analytics, consent.marketing);
    }
  }, [consent.hasConsented, consent.analytics, consent.marketing, initializeTracking]);

  const contextValue: CookieConsentContextType = {
    consent,
    updateConsent,
    acceptAll,
    declineAll,
    acceptEssential,
    showBanner,
    hideBanner,
    hasConsentFor
  };

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider');
  }
  return context;
}

// Utility functions for tracking events
export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  const consent = JSON.parse(localStorage.getItem(COOKIE_CONSENT_KEY) || '{}');
  
  if (consent.marketing && typeof window !== 'undefined') {
    if (window.fbq) {
      window.fbq('track', eventName, parameters);
    }
  }
};

// Predefined events for Ather business
export const trackTestRideRequest = (model: string, location: string) => {
  trackEvent('Lead', {
    content_name: `Test Ride Request - ${model}`,
    content_category: 'Lead Generation',
    value: 1,
    currency: 'INR',
    custom_location: location
  });
};

export const trackCalculatorUsage = () => {
  trackEvent('ViewContent', {
    content_name: 'EMI Calculator',
    content_category: 'Tools',
    content_type: 'calculator'
  });
};

export const trackContactForm = () => {
  trackEvent('Contact', {
    content_name: 'Contact Form',
    content_category: 'Lead Generation'
  });
};