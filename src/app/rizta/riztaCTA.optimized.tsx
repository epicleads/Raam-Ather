"use client";

import React, { memo, useCallback } from "react";
import { useTestDriveModal } from "../Components/test-ride-form/TestDriveModalStore";

// Analytics helper
const trackCTAClick = (action: string, variant: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: 'CTA',
      event_label: variant,
      page_location: window.location.href
    });
  }
};

const RiztaCTA = memo(() => {
  const modal = useTestDriveModal();

  const handleBookTestRide = useCallback(() => {
    trackCTAClick('test_drive_booking_initiated', 'rizta-z');
    modal.openManually();
  }, [modal]);

  const handlePriceInquiry = useCallback(() => {
    trackCTAClick('price_inquiry_initiated', 'rizta-z');
    // Scroll to pricing section
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  return (
    <section
      className="cta-section bg-black py-12 md:py-16"
      role="region"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="cta-container relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 md:p-12 text-center text-white overflow-hidden border border-gray-800">

          {/* Optimized background effects */}
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-500 to-transparent"></div>
            <div
              className="absolute inset-0 cta-grid-pattern"
              style={{
                backgroundImage: `linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}
            ></div>
          </div>

          {/* Glowing accents */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl" aria-hidden="true"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/20 to-transparent rounded-full blur-3xl" aria-hidden="true"></div>

          <div className="relative z-10">
            <header className="cta-header mb-8">
              <h2 id="cta-heading" className="cta-title text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                Ready to Experience{" "}
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Ather Rizta Z
                </span>
                ?
              </h2>
              <p className="cta-description text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Book a test ride today and discover the future of electric mobility designed for families
              </p>
            </header>

            <div className="cta-actions flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBookTestRide}
                className="cta-primary-button"
                aria-describedby="test-ride-description"
                type="button"
              >
                <span className="relative z-10">Book Test Ride</span>
                <div className="button-shine absolute inset-0 bg-gradient-to-r from-gray-100 to-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>

              <button
                onClick={handlePriceInquiry}
                className="cta-secondary-button"
                aria-describedby="price-inquiry-description"
                type="button"
              >
                <span className="relative z-10">View Pricing</span>
              </button>
            </div>

            {/* Screen reader descriptions */}
            <div className="sr-only">
              <p id="test-ride-description">
                Opens booking form to schedule your Ather Rizta Z test ride experience
              </p>
              <p id="price-inquiry-description">
                Scrolls to pricing section to view Ather Rizta Z price details
              </p>
            </div>

            {/* Trust indicators */}
            <div className="cta-trust-indicators mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <div className="trust-item flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free Test Ride</span>
              </div>
              <div className="trust-item flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>8-Year Warranty</span>
              </div>
              <div className="trust-item flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Easy EMI Options</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optimized CSS for performance */}
      <style jsx>{`
        .cta-container {
          position: relative;
          will-change: transform;
        }

        .cta-primary-button {
          position: relative;
          background: white;
          color: black;
          padding: 16px 32px;
          border-radius: 9999px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          will-change: transform;
          box-shadow: 0 10px 25px rgba(255, 255, 255, 0.1);
          overflow: hidden;
        }

        .cta-primary-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(255, 255, 255, 0.2);
        }

        .cta-primary-button:active {
          transform: translateY(-1px);
        }

        .cta-primary-button:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 2px;
        }

        .cta-secondary-button {
          position: relative;
          background: transparent;
          color: white;
          padding: 16px 32px;
          border-radius: 9999px;
          font-weight: 600;
          border: 2px solid rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.2s ease;
          will-change: transform;
        }

        .cta-secondary-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.6);
          transform: translateY(-2px);
        }

        .cta-secondary-button:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 2px;
        }

        .button-shine {
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .cta-primary-button:hover .button-shine {
          transform: translateX(100%);
        }

        .trust-item {
          opacity: 0.8;
          transition: opacity 0.2s ease;
        }

        .trust-item:hover {
          opacity: 1;
        }

        .cta-grid-pattern {
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(20px, 20px); }
        }

        @media (max-width: 640px) {
          .cta-title {
            font-size: 1.875rem;
          }

          .cta-description {
            font-size: 1rem;
          }

          .cta-primary-button,
          .cta-secondary-button {
            padding: 14px 24px;
            font-size: 0.9rem;
          }

          .cta-trust-indicators {
            gap: 16px;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </section>
  );
});

RiztaCTA.displayName = 'RiztaCTA';

export default RiztaCTA;