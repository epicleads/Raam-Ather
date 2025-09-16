'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filters, Testimonial, ExperienceType } from '../../data/testimonials.types';
import { experienceOptions } from '../../data/testimonials.config';
import TestimonialCard from './TestimonialCard.client';
import '../../testimonials.css';

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
      <div className="testimonials-header">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="testimonials-title"
        >
          Customer <span className="text-gray-700">Voices</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="testimonials-subtitle"
        >
          Real experiences from real riders across different touchpoints
        </motion.p>
      </div>

      {/* Tab Navigation */}
      <div className="testimonials-tab-nav">
        {(['purchase', 'service', 'community'] as ExperienceType[]).map((experience) => (
          <motion.button
            key={experience}
            onClick={() => setActiveTab(experience)}
            className={`testimonials-tab-button ${
              activeTab === experience ? 'active' : ''
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center gap-2">
              <span className="text-lg">{getTabIcon(experience)}</span>
              <span className="font-medium">{getTabTitle(experience)}</span>
              <span className="bg-white/80 text-xs px-2 py-1 rounded-full text-gray-700 font-medium min-w-[18px] h-5 flex items-center justify-center">
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
          className="testimonials-grid"
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