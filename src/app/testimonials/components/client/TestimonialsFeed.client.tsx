'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filters, Testimonial, ExperienceType } from '../../data/testimonials.types';
import { experienceOptions } from '../../data/testimonials.config';
import TestimonialCard from './TestimonialCard.client';

interface TestimonialsFeedProps {
  purchaseTestimonials: Testimonial[];
  serviceTestimonials: Testimonial[];
  communityTestimonials: Testimonial[];
  filters: Filters;
}

export default function TestimonialsFeed({
  purchaseTestimonials,
  serviceTestimonials,
  communityTestimonials,
  filters
}: TestimonialsFeedProps) {
  const [activeTab, setActiveTab] = useState<ExperienceType>('purchase');

  const allTestimonials = useMemo(() => ({
    purchase: purchaseTestimonials,
    service: serviceTestimonials,
    community: communityTestimonials
  }), [purchaseTestimonials, serviceTestimonials, communityTestimonials]);

  const filteredTestimonials = useMemo(() => {
    const testimonials = allTestimonials[activeTab];
    
    return testimonials.filter(testimonial => {
      if (filters.city && testimonial.city !== filters.city) return false;
      if (filters.model && testimonial.model !== filters.model) return false;
      if (filters.dealer && testimonial.dealer !== filters.dealer) return false;
      return true;
    });
  }, [allTestimonials, activeTab, filters]);

  const getTabTitle = (experience: ExperienceType) => {
    return experienceOptions.find(opt => opt.value === experience)?.label || experience;
  };

  const getTabIcon = (experience: ExperienceType) => {
    switch (experience) {
      case 'purchase':
        return '🛒';
      case 'service':
        return '🔧';
      case 'community':
        return '👥';
      default:
        return '📝';
    }
  };

  return (
    <section id="customer-voices" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4"
        >
          Customer <span className="text-gray-700">Voices</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto px-2"
        >
          Real experiences from real riders across different touchpoints
        </motion.p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row justify-center mb-6 sm:mb-8 lg:mb-12">
        <div className="bg-gray-100 backdrop-blur-sm border border-gray-200 rounded-xl p-1 flex w-full max-w-[400px] sm:max-w-[500px] mx-auto">
          {(['purchase', 'service', 'community'] as ExperienceType[]).map((experience) => (
            <motion.button
              key={experience}
              onClick={() => setActiveTab(experience)}
              className={`relative px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all flex-1 min-h-[32px] sm:min-h-[36px] ${
                activeTab === experience
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-base sm:text-lg">{getTabIcon(experience)}</span>
                <span className="text-[11px] sm:text-xs font-medium">{getTabTitle(experience)}</span>
                <span className="bg-white/80 text-[9px] sm:text-[11px] px-2 py-1 rounded-full text-gray-700 font-medium min-w-[18px] h-5 flex items-center justify-center">
                  {allTestimonials[experience].length}
                </span>
              </span>
              
              {activeTab === experience && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gray-900 rounded-lg -z-10"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <motion.div
        key={`${activeTab}-${JSON.stringify(filters)}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-6 sm:mb-8"
      >
        <p className="text-sm sm:text-base text-gray-600">
          Showing <span className="text-gray-700 font-semibold">{filteredTestimonials.length}</span> {getTabTitle(activeTab).toLowerCase()} reviews
          {Object.keys(filters).length > 0 && (
            <span className="ml-1">matching your filters</span>
          )}
        </p>
      </motion.div>

      {/* Testimonials Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeTab}-${JSON.stringify(filters)}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto justify-items-center"
        >
          {filteredTestimonials.length > 0 ? (
            filteredTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-12 sm:py-16 text-center"
            >
              <div className="text-4xl sm:text-6xl mb-4">🔍</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No reviews found</h3>
              <p className="text-sm sm:text-base text-gray-600 max-w-md px-4">
                Try adjusting your filters to see more reviews in this category.
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Load More Button (if needed) */}
      {filteredTestimonials.length >= 6 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 sm:mt-16"
        >
          <motion.button
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400 px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Reviews
          </motion.button>
        </motion.div>
      )}
    </section>
  );
}