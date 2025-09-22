"use client";

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSidebar } from '../contexts/SidebarContext';

// Configurable WhatsApp number
const WHATSAPP_NUMBER = "919032333833";

// WhatsApp SVG Icon
const WhatsAppIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

export default function FloatingWhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isSidebarOpen } = useSidebar();

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi Raam Ather, I want to know more about the scooter!");
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent WhatsApp click when closing
    setIsVisible(false);
    
    // Auto-reappear after 30 seconds
    setTimeout(() => {
      setIsVisible(true);
    }, 30000); // 30 seconds
  };

  // Hide floating WhatsApp button only if manually closed
  if (!isVisible) {
    return null;
  }

  // Show close button on mobile always, on desktop only on hover
  const shouldShowCloseButton = isMobile || isHovered;

  return (
    <div 
      className={`fixed bottom-20 right-2 p-2 transition-all duration-300 ${
        isSidebarOpen ? 'z-10' : 'z-50'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Close button - always visible on mobile, hover on desktop */}
      {shouldShowCloseButton && (
        <button
          onClick={handleCloseClick}
          className="absolute top-0 right-0 w-6 h-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 shadow-lg transition-all duration-200 hover:scale-105 z-10"
          aria-label="Close WhatsApp button"
          title="Close"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      )}
      
      {/* WhatsApp button */}
      <button
        onClick={handleWhatsAppClick}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white text-2xl transition-all duration-300 mt-2 ml-2 ${
          isSidebarOpen 
            ? 'bg-green-300 hover:bg-green-400 opacity-60 hover:opacity-80' 
            : 'bg-green-400 hover:bg-green-500 hover:scale-110'
        }`}
        aria-label="Chat on WhatsApp"
        title={isSidebarOpen ? "WhatsApp available in sidebar" : "Chat with us on WhatsApp"}
      >
        <WhatsAppIcon />
      </button>
    </div>
  );
}