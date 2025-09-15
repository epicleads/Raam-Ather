'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { ExperienceType, Dealer } from '../../data/testimonials.types';

export default function FiltersBar({ 
  experiences, 
  dealers, 
  selectedExperience, 
  setSelectedExperience, 
  selectedDealer, 
  setSelectedDealer 
}: {
  experiences: ExperienceType[];
  dealers: Dealer[];
  selectedExperience: string;
  setSelectedExperience: (experience: string) => void;
  selectedDealer: string;
  setSelectedDealer: (dealer: string) => void;
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  return (
    <>
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Filter Reviews</h2>
                
                <div className="flex flex-wrap gap-2 sm:gap-3 items-center flex-1 lg:justify-center">
                  {/* Experience Filter */}
                  <select
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00E396] focus:border-transparent shadow-sm text-sm"
                  >
                    <option value="">All Experiences</option>
                    {experiences.map(experience => (
                      <option key={experience} value={experience}>{experience}</option>
                    ))}
                  </select>

                  {/* Dealer Filter */}
                  <select
                    value={selectedDealer}
                    onChange={(e) => setSelectedDealer(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00E396] focus:border-transparent shadow-sm text-sm"
                  >
                    <option value="">All Dealers</option>
                    {dealers.map(dealer => (
                      <option key={dealer} value={dealer}>{dealer}</option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <motion.button
                    onClick={clearFilters}
                    className="text-[#00E396] hover:text-white text-sm font-medium px-3 sm:px-4 py-2 border border-[#00E396] rounded-lg hover:bg-[#00E396] hover:text-black transition-all shadow-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear All
                  </motion.button>
                )}
              </div>
            </div>
          </motion.section>
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
              className="bg-[#00E396] text-black p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
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