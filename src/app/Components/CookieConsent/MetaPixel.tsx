"use client";
import { useEffect } from "react";
import { useCookieConsent } from "./CookieConsentStore";

// You'll need to replace this with your actual Facebook Pixel ID
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "YOUR_PIXEL_ID_HERE";

// Define proper types for Facebook Pixel
interface FacebookPixelQueue {
  callMethod?: (...args: unknown[]) => void;
  q?: unknown[][];
}

interface FacebookPixelFunction extends FacebookPixelQueue {
  (command: string, eventName: string, parameters?: Record<string, unknown>): void;
}

declare global {
  interface Window {
    _fbq?: FacebookPixelFunction;
  }
}

export default function MetaPixel() {
  const { hasConsentFor } = useCookieConsent();

  useEffect(() => {
    if (!hasConsentFor('marketing')) {
      return;
    }

    // Initialize Facebook Pixel only if user has consented to marketing cookies
    const initPixel = () => {
      if (typeof window !== 'undefined') {
        // Facebook Pixel Code - Standard implementation
        if (!window.fbq) {
          // Create the fbq function compatible with the existing FacebookPixel interface
          const fbq: FacebookPixelFunction = function(...args: unknown[]) {
            if (fbq.callMethod) {
              fbq.callMethod(...args);
            } else {
              (fbq.q = fbq.q || []).push(args);
            }
          };
          
          // Initialize properties to match Facebook's expected structure
          fbq.callMethod = undefined;
          fbq.q = [];
          
          // Set up window properties
          if (!window._fbq) window._fbq = fbq;
          window.fbq = fbq as unknown as typeof window.fbq;
          
          // Load the script
          const script = document.createElement('script');
          script.async = true;
          script.src = 'https://connect.facebook.net/en_US/fbevents.js';
          
          const firstScript = document.getElementsByTagName('script')[0];
          if (firstScript && firstScript.parentNode) {
            firstScript.parentNode.insertBefore(script, firstScript);
          }
        }

        // Initialize the pixel
        if (window.fbq) {
          window.fbq("init", FB_PIXEL_ID);
          
          // Track page view
          window.fbq("track", "PageView");

          // Track website visits for custom audiences
          window.fbq("track", "ViewContent", {
            content_name: "Ather Energy Website Visit",
            content_category: "Electric Vehicles",
            content_type: "website",
            source: "website"
          });

          console.log("Meta Pixel initialized for retargeting");
        }
      }
    };

    initPixel();

    // Cleanup function
    return () => {
      // Remove pixel if consent is revoked
      if (typeof window !== 'undefined' && window.fbq) {
        delete window.fbq;
        delete window._fbq;
      }
    };
  }, [hasConsentFor]);

  // Only render noscript tag if marketing consent is given
  if (!hasConsentFor('marketing')) {
    return null;
  }

  return (
    <>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

// Event tracking functions for Ather-specific actions
export const trackAtherEvents = {
  // Test ride request
  testRideRequest: (model: string, location: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: `Test Ride - ${model}`,
        content_category: 'Lead Generation',
        content_type: 'test_ride',
        custom_model: model,
        custom_location: location,
        value: 1,
        currency: 'INR'
      });

      // Track as custom conversion for retargeting
      (window.fbq as FacebookPixelFunction)('trackCustom', 'TestRideRequest', {
        model: model,
        location: location,
        lead_type: 'test_ride'
      });
    }
  },

  // EMI calculator usage
  calculatorUsage: (vehiclePrice: number, model: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: 'EMI Calculator',
        content_category: 'Tools',
        content_type: 'calculator',
        custom_vehicle_price: vehiclePrice,
        custom_model: model,
        value: vehiclePrice,
        currency: 'INR'
      });

      (window.fbq as FacebookPixelFunction)('trackCustom', 'EMICalculatorUsed', {
        vehicle_price: vehiclePrice,
        model: model,
        engagement_type: 'high_intent'
      });
    }
  },

  // Contact form submission
  contactForm: (inquiry_type: string = 'general') => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Contact', {
        content_name: 'Contact Form',
        content_category: 'Lead Generation',
        content_type: 'contact_form',
        custom_inquiry_type: inquiry_type
      });

      (window.fbq as FacebookPixelFunction)('trackCustom', 'ContactFormSubmit', {
        inquiry_type: inquiry_type,
        lead_type: 'contact'
      });
    }
  },

  // Product page views
  productView: (model: string, category: string = 'Electric Scooter') => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: `Ather ${model}`,
        content_category: category,
        content_type: 'product',
        custom_model: model
      });
    }
  },

  // High-intent actions (like viewing pricing, specs)
  highIntentAction: (action: string, model?: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      (window.fbq as FacebookPixelFunction)('trackCustom', 'HighIntentAction', {
        action: action,
        model: model || 'general',
        engagement_level: 'high'
      });
    }
  },

  // Service booking interest
  serviceInterest: (service_type: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Schedule', {
        content_name: 'Service Booking',
        content_category: 'Service',
        content_type: 'service_booking',
        custom_service_type: service_type
      });
    }
  }
};