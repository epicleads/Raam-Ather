"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  ArrowPathIcon 
} from '@heroicons/react/24/outline';
import PremiumOutletCards from './PremiumOutletCards';
import AnalyticsTrust from './AnalyticsTrust';
import { PopupProvider } from '../../Components/popups/PopupProvider';
import { Outlet } from '../StoreLocatorClient';

interface PremiumExperienceCenterProps {
  outlets: Outlet[];
}

const PremiumExperienceCenter: React.FC<PremiumExperienceCenterProps> = ({ outlets }) => {
  const [searchPincode, setSearchPincode] = useState('');
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null);
  const [, setShowWhatsAppChat] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [filteredOutlets, setFilteredOutlets] = useState(outlets);

  const t = {
    title: 'Premium Experience Centers',
    subtitle: 'Discover Our Locations',
    description: 'Visit our state-of-the-art showrooms, service centers, and test ride facilities',
    searchPlaceholder: 'Enter pincode or area',
    useLocation: 'Use My Location'
  };

  const handleSearch = () => {
    if (!searchPincode.trim()) {
      setShowSearchInput(true);
      return;
    }

    const filtered = outlets.filter(outlet => {
      const searchTerm = searchPincode.toLowerCase().trim();
      return (
        outlet.pincode.includes(searchTerm) ||
        outlet.address.toLowerCase().includes(searchTerm) ||
        outlet.city.toLowerCase().includes(searchTerm) ||
        outlet.name.toLowerCase().includes(searchTerm)
      );
    });

    setFilteredOutlets(filtered);
    
    // Scroll to results section
    const resultsSection = document.getElementById('outlet-results');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Calculate distance to each outlet and sort by nearest
          const outletsWithDistance = outlets.map(outlet => {
            const distance = calculateDistance(
              latitude, longitude,
              outlet.coordinates.lat, outlet.coordinates.lng
            );
            return { ...outlet, distance };
          }).sort((a, b) => a.distance - b.distance);

          setFilteredOutlets(outletsWithDistance);
          
          // Scroll to results
          const resultsSection = document.getElementById('outlet-results');
          if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth' });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enter your pincode or area instead.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
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
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
                  {!showSearchInput ? (
                    <>
                      {/* Mobile Layout - Stacked */}
                      <div className="flex flex-col space-y-4 sm:hidden">
                        {/* Enter Pincode Button */}
                        <motion.button
                          onClick={() => setShowSearchInput(true)}
                          className="w-full bg-[#2962FF] hover:bg-[#1e4cbf] text-white px-6 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <MagnifyingGlassIcon className="w-5 h-5" />
                          Enter Pincode or Location
                        </motion.button>

                        {/* OR Divider - Mobile */}
                        <div className="flex items-center justify-center py-2">
                          <div className="flex-1 border-t border-gray-300"></div>
                          <span className="px-4 text-gray-600 font-medium text-sm uppercase tracking-wider">OR</span>
                          <div className="flex-1 border-t border-gray-300"></div>
                        </div>

                        {/* Use My Location Button */}
                        <motion.button
                          onClick={handleUseMyLocation}
                          className="w-full bg-[#00B248] hover:bg-[#00A041] text-white px-6 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ArrowPathIcon className="w-5 h-5" />
                          Use My Location
                        </motion.button>
                      </div>

                      {/* Desktop Layout - Same Row */}
                      <div className="hidden sm:flex items-center gap-6">
                        {/* Enter Pincode Button */}
                        <motion.button
                          onClick={() => setShowSearchInput(true)}
                          className="flex-1 bg-[#2962FF] hover:bg-[#1e4cbf] text-white px-6 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <MagnifyingGlassIcon className="w-5 h-5" />
                          Pincode or Area
                        </motion.button>

                        {/* OR Text - Desktop */}
                        <div className="flex items-center justify-center px-4">
                          <span className="text-gray-600 font-medium text-sm uppercase tracking-wider whitespace-nowrap">OR</span>
                        </div>

                        {/* Use My Location Button */}
                        <motion.button
                          onClick={handleUseMyLocation}
                          className="flex-1 bg-[#00B248] hover:bg-[#00A041] text-white px-6 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ArrowPathIcon className="w-5 h-5" />
                          Use My Location
                        </motion.button>
                      </div>
                    </>
                  ) : (
                    /* Search Input Mode */
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          placeholder="Enter pincode, area, or city name..."
                          value={searchPincode}
                          onChange={(e) => setSearchPincode(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                          className="w-full pl-4 pr-4 py-4 text-lg text-black border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2962FF] focus:border-transparent outline-none transition-all"
                          autoFocus
                        />
                      </div>
                      <div className="flex gap-3">
                        <motion.button
                          onClick={handleSearch}
                          className="bg-[#2962FF] hover:bg-[#1e4cbf] text-white px-6 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <MagnifyingGlassIcon className="w-5 h-5" />
                          Search
                        </motion.button>
                        <motion.button
                          onClick={() => {
                            setShowSearchInput(false);
                            setSearchPincode('');
                            setFilteredOutlets(outlets);
                          }}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Scroll Indicator */}
            
            </div>
          </div>
        </motion.section>

        {/* Premium Outlet Cards */}
        <div id="outlet-results" className="w-full">
          <PremiumOutletCards 
            outlets={filteredOutlets}
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