"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import PremiumOutletCards from './PremiumOutletCards';
import AnalyticsTrust from './AnalyticsTrust';
import { PopupProvider } from '../../Components/popups/PopupProvider';
import { Outlet } from '../StoreLocatorClient';

interface PremiumExperienceCenterProps {
  outlets: Outlet[];
}

const PremiumExperienceCenter: React.FC<PremiumExperienceCenterProps> = ({ outlets }) => {
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null);
  const [, setShowWhatsAppChat] = useState(false);

  const t = {
    title: 'Premium Experience Centers',
    subtitle: 'Discover Our Locations',
    description: 'Visit our state-of-the-art showrooms, service centers, and test ride facilities',
    useLocation: 'Use My Location'
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Scroll to results section to show all outlets
          const resultsSection = document.getElementById('outlet-results');
          if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth' });
          }
          
          // Optional: Show success message
          alert('Location detected! Showing all available outlets below.');
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Showing all available outlets.');
          
          // Still scroll to results even if location fails
          const resultsSection = document.getElementById('outlet-results');
          if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      );
    } else {
      alert('Geolocation is not supported by this browser. Showing all available outlets.');
      
      // Scroll to results
      const resultsSection = document.getElementById('outlet-results');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };


  return (
    <PopupProvider>
      <div className="min-h-screen">
        {/* Animated Hero Section - Full Width */}
        <motion.section 
          className="relative w-full min-h-screen overflow-hidden"
          animate={{
            background: [
              'linear-gradient(135deg, #2962FF 0%, #00B248 50%, #00BFFF 100%)',
              'linear-gradient(135deg, #00B248 0%, #2962FF 50%, #00BFFF 100%)',
              'linear-gradient(135deg, #00BFFF 0%, #2962FF 50%, #00B248 100%)',
              'linear-gradient(135deg, #2962FF 0%, #00B248 50%, #00BFFF 100%)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Background Image Overlay */}
          <div className="absolute inset-0">
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat opacity-20"
              style={{ backgroundImage: `url('/assets/store-locator-hero.jpg')` }}
            />
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-20 flex items-center min-h-screen">
            <div className="w-full max-w-4xl mx-auto text-center text-white">
              {/* Main Title */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  {t.title}
                  <span className="block bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                    {t.subtitle}
                  </span>
                </h1>
                
                <motion.p
                  className="text-xl sm:text-2xl text-white/90 mb-12 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {t.description}
                </motion.p>
              </motion.div>

              {/* Search Section */}
              <motion.div
                className="max-w-2xl mx-auto mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <div className="flex justify-center">
                  {/* Use My Location Button - Centered and Appropriately Sized */}
                  <motion.button
                    onClick={handleUseMyLocation}
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowPathIcon className="w-5 h-5" />
                    Use My Location
                  </motion.button>
                </div>
              </motion.div>

              {/* Scroll Indicator */}
            
            </div>
          </div>
        </motion.section>

        {/* Premium Outlet Cards */}
        <div id="outlet-results" className="w-full">
          <PremiumOutletCards 
            outlets={outlets}
            selectedOutlet={selectedOutlet}
            setSelectedOutlet={setSelectedOutlet}
            setShowWhatsAppChat={setShowWhatsAppChat}
          />
        </div>

        {/* Analytics & Trust Section */}
        <div className="w-full bg-gray-50">
          <AnalyticsTrust outlets={outlets} />
        </div>
      </div>
    </PopupProvider>
  );
};

export default PremiumExperienceCenter;