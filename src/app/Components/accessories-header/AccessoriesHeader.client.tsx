"use client";

import { useState, useEffect } from 'react';
import AccessoriesLogo from './shared/AccessoriesLogo.server';
import AccessoriesNavBar from './desktop/AccessoriesNavBar.server';
import AccessoriesCTAs from './shared/AccessoriesCTAs.server';
import AccessoriesMobileMenu from './mobile/AccessoriesMobileMenu.server';

export default function AccessoriesHeaderClient() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 100);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    // Set initial mobile state
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left Side */}
          <AccessoriesLogo />

          {/* Desktop Navigation - Center (hidden on mobile) */}
          {!isMobile && (
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              <AccessoriesNavBar />
            </div>
          )}

          {/* Desktop CTAs - Right Side (hidden on mobile) */}
          {!isMobile && (
            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              <AccessoriesCTAs />
            </div>
          )}

          {/* Mobile menu button - Only show on mobile */}
          {isMobile && (
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu - Only render when mobile and menu is open */}
      {isMobile && (
        <AccessoriesMobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      )}
    </header>
  );
}
