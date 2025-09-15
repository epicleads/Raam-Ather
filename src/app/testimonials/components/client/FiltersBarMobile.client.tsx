'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Filter, X } from 'lucide-react';
import { DealerInfo } from '../../data/testimonials.types';

export default function FiltersBarMobile({ 
  experiences, 
  dealers, 
  selectedExperience, 
  setSelectedExperience, 
  selectedDealer, 
  setSelectedDealer 
}: {
  experiences: { value: string; label: string }[];
  dealers: DealerInfo[];
  selectedExperience: string;
  setSelectedExperience: (experience: string) => void;
  selectedDealer: string;
  setSelectedDealer: (dealer: string) => void;
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Scroll-based hide/show logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past initial 100px
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const clearFilters = () => {
    setSelectedExperience('');
    setSelectedDealer('');
  };

  const hasActiveFilters = selectedExperience || selectedDealer;

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  return (
    <>
      {/* Main Filter Bar - Mobile Optimized */}
      <AnimatePresence>
        {isVisible && (
          <motion.section
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.3
            }}
            className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm filters-bar"
          >
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Filter Reviews</h2>
                
                {/* Filter Toggle Button */}
                <button
                  onClick={toggleFilterPanel}
                  className="flex items-center gap-2 bg-[#00E396] text-black px-4 py-2 rounded-lg font-medium transition-all hover:bg-[#00E396]/90 min-h-[44px]"
                >
                  <Filter size={18} />
                  <span>Filters</span>
                  {hasActiveFilters && (
                    <span className="w-2 h-2 bg-black rounded-full"></span>
                  )}
                </button>
              </div>

              {/* Active Filters Display */}
              {hasActiveFilters && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedExperience && (
                    <span className="px-3 py-1 bg-[#00E396]/20 text-[#00E396] text-sm rounded-full border border-[#00E396]/30">
                      {selectedExperience}
                    </span>
                  )}
                  {selectedDealer && (
                    <span className="px-3 py-1 bg-[#00E396]/20 text-[#00E396] text-sm rounded-full border border-[#00E396]/30">
                      {selectedDealer}
                    </span>
                  )}
                  <button
                    onClick={clearFilters}
                    className="text-[#00E396] hover:text-white text-sm font-medium px-3 py-1 border border-[#00E396] rounded-full hover:bg-[#00E396] transition-all"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Filter Panel - Slide Down from Top */}
      <AnimatePresence>
        {isFilterPanelOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg"
          >
            <div className="p-4">
              {/* Panel Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filter Options</h3>
                <button
                  onClick={toggleFilterPanel}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Filter Controls */}
              <div className="space-y-4">
                {/* Experience Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Type
                  </label>
                  <select
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00E396] focus:border-transparent shadow-sm text-base min-h-[44px]"
                  >
                    <option value="">All Experiences</option>
                    {experiences.map(experience => (
                      <option key={experience.value} value={experience.value}>{experience.label}</option>
                    ))}
                  </select>
                </div>

                {/* Dealer Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dealer Location
                  </label>
                  <select
                    value={selectedDealer}
                    onChange={(e) => setSelectedDealer(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00E396] focus:border-transparent shadow-sm text-base min-h-[44px]"
                  >
                    <option value="">All Dealers</option>
                    {dealers.map(dealer => (
                      <option key={dealer.id} value={dealer.id}>{dealer.name}</option>
                    ))}
                  </select>
                </div>

                {/* Apply Filters Button */}
                <button
                  onClick={toggleFilterPanel}
                  className="w-full bg-[#00E396] text-black px-6 py-3 rounded-lg font-semibold transition-all hover:bg-[#00E396]/90 min-h-[44px]"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Filter Indicator - Shows when filter bar is hidden */}
      <AnimatePresence>
        {!isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-4 right-4 z-50 floating-filter-btn"
          >
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-[#00E396] text-black p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 min-h-[44px] min-w-[44px]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Show filters"
            >
              <ChevronUp size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
