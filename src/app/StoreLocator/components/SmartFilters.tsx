"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BuildingStorefrontIcon, 
  WrenchScrewdriverIcon, 
  PlayIcon
} from '@heroicons/react/24/outline';

interface SmartFiltersProps {
  activeFilters: string[];
  setActiveFilters: (filters: string[]) => void;
}

const SmartFilters: React.FC<SmartFiltersProps> = ({
  activeFilters,
  setActiveFilters
}) => {
  const t = {
    quickFilters: 'Quick Filters',
    helpText: 'Helps users find exactly what they need quickly',
    clearAll: 'Clear All',
    filters: {
      showroom: 'Showrooms',
      service: 'Service Centers',
      'test-ride': 'Test-Ride Hubs'
    }
  };

  const filterTypes = [
    { id: 'showroom', icon: BuildingStorefrontIcon, color: 'from-blue-500 to-blue-600' },
    { id: 'service', icon: WrenchScrewdriverIcon, color: 'from-green-500 to-green-600' },
    { id: 'test-ride', icon: PlayIcon, color: 'from-purple-500 to-purple-600' },
  ];

  const toggleFilter = (filterId: string) => {
    setActiveFilters(
      activeFilters.includes(filterId)
        ? activeFilters.filter(id => id !== filterId)
        : [...activeFilters, filterId]
    );
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  return (
    <section className="py-8 bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#00B248] rounded-full animate-pulse" />
                {t.quickFilters}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                ✨ {t.helpText}
              </p>
            </div>
            
            {activeFilters.length > 0 && (
              <motion.button
                onClick={clearAllFilters}
                className="text-sm text-[#2962FF] hover:text-[#1E88E5] font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.clearAll}
              </motion.button>
            )}
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-3">
            {/* Location Type Filters */}
            {filterTypes.map((filter) => {
              const isActive = activeFilters.includes(filter.id);
              const Icon = filter.icon;
              
              return (
                <motion.button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-gradient-to-r text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  } ${isActive ? filter.color : ''}`}
                  whileHover={{ scale: isActive ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-4 h-4" />
                  {t.filters[filter.id as keyof typeof t.filters]}
                  
                  {/* Active Indicator */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-lg flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}

          </div>
        </div>

        {/* Active Filters Count */}
        <AnimatePresence>
          {activeFilters.length > 0 && (
            <motion.div
              className="mt-4 flex items-center gap-2 text-sm text-gray-600"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <span className="font-medium">{activeFilters.length}</span>
              <span>
                {activeFilters.length === 1 ? 'filter active' : 'filters active'}
              </span>
              <motion.div
                className="w-2 h-2 bg-[#00B248] rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SmartFilters;