'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Filters, Testimonial, ExperienceType } from '../../data/testimonials.types';
import { experienceOptions } from '../../data/testimonials.config';
import TestimonialCardMobile from './TestimonialCardMobile.client';
import SimpleVideoCard from './SimpleVideoCard.client';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialsFeedMobileProps {
  purchaseTestimonials: Testimonial[];
  serviceTestimonials: Testimonial[];
  communityTestimonials: Testimonial[];
  filters: Filters;
}

export default function TestimonialsFeedMobile({
  purchaseTestimonials,
  serviceTestimonials,
  communityTestimonials,
  filters
}: TestimonialsFeedMobileProps) {
  const [activeTab, setActiveTab] = useState<ExperienceType>('purchase');
  const [carouselIndexes, setCarouselIndexes] = useState({
    purchase: 0,
    service: 0,
    community: 0
  });

  const carouselRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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

  const getTabShortTitle = (experience: ExperienceType) => {
    switch (experience) {
      case 'purchase':
        return 'Purchase';
      case 'service':
        return 'Service';
      case 'community':
        return 'Community';
      default:
        return getTabTitle(experience);
    }
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

  const nextSlide = (experience: ExperienceType) => {
    const testimonials = allTestimonials[experience];
    setCarouselIndexes(prev => ({
      ...prev,
      [experience]: Math.min(prev[experience] + 1, testimonials.length - 1)
    }));
  };

  const prevSlide = (experience: ExperienceType) => {
    setCarouselIndexes(prev => ({
      ...prev,
      [experience]: Math.max(prev[experience] - 1, 0)
    }));
  };

  const goToSlide = (experience: ExperienceType, index: number) => {
    setCarouselIndexes(prev => ({
      ...prev,
      [experience]: index
    }));
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide(activeTab);
    } else if (isRightSwipe) {
      prevSlide(activeTab);
    }

    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section id="customer-voices" className="px-4 py-8 bg-white w-full overflow-x-hidden">
      {/* Section Header - Mobile Optimized */}
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900 mb-3"
        >
          Customer <span className="text-gray-700">Voices</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-base text-gray-700 max-w-md mx-auto"
        >
          Real experiences from real riders across different touchpoints
        </motion.p>
      </div>

      {/* Tab Navigation - Mobile Optimized */}
      <div className="flex justify-center mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-1 flex shadow-sm w-full max-w-sm">
          {(['purchase', 'service', 'community'] as ExperienceType[]).map((experience) => (
            <motion.button
              key={experience}
              onClick={() => setActiveTab(experience)}
              className={`relative overflow-hidden px-3 py-2 rounded-lg text-sm font-medium transition-all min-h-[44px] flex-1 min-w-0 ${
                activeTab === experience
                  ? 'text-white'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2 justify-center min-w-0 relative z-10">
                <span className="shrink-0">{getTabIcon(experience)}</span>
                <span className="truncate max-w-[90px]">{getTabShortTitle(experience)}</span>
                <span className="hidden sm:inline-flex bg-white/80 text-xs px-2 py-1 rounded-full text-gray-700 shrink-0">
                  {allTestimonials[experience].length}
                </span>
              </span>
              
              {activeTab === experience && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gray-900 rounded-lg pointer-events-none"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Results Count - Mobile Optimized */}
      <motion.div
        key={`${activeTab}-${JSON.stringify(filters)}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-6"
      >
        <p className="text-sm text-gray-600">
          Showing <span className="text-gray-700 font-semibold">{filteredTestimonials.length}</span> {getTabTitle(activeTab).toLowerCase()} reviews
          {Object.keys(filters).length > 0 && (
            <span className="ml-1">matching your filters</span>
          )}
        </p>
      </motion.div>

      {/* Testimonials Carousel - Mobile Optimized with Touch Support */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeTab}-${JSON.stringify(filters)}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {filteredTestimonials.length > 0 ? (
            <div className="relative">
              {/* Carousel Container with Touch Support */}
              <div 
                ref={carouselRef}
                className="overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateX(-${carouselIndexes[activeTab] * 100}%)`
                  }}
                >
                  {filteredTestimonials.map((testimonial, index) => {
                    
                    // Get video paths for simple video card
                    const getVideoPath = (id: string) => {
                      if (id === 'p1') return '/Ather-Assets/thumbnails/CJ1.mp4';
                      if (id === 'p2') return '/Ather-Assets/thumbnails/CJ2.mp4';
                      if (id === 'p3') return '/Ather-Assets/thumbnails/CJ3.mp4';
                      if (id === 's1') return '/Ather-Assets/thumbnails/SE1.mp4';
                      if (id === 's2') return '/Ather-Assets/thumbnails/SE2.mp4';
                      if (id === 's3') return '/Ather-Assets/thumbnails/SE3.mp4';
                      if (id === 'c1') return '/Ather-Assets/thumbnails/CE1.mp4';
                      if (id === 'c2') return '/Ather-Assets/thumbnails/CE2.mp4';
                      if (id === 'c3') return '/Ather-Assets/thumbnails/CE3.mp4';
                      return null;
                    };

                    const getThumbnailPath = (id: string) => {
                      const cardNumber = id.charAt(1);
                      if (id.startsWith('s')) {
                        const serviceNumber = parseInt(cardNumber) + 3;
                        return `/Ather-Assets/thumbnails/tb${serviceNumber}.png`;
                      }
                      if (id.startsWith('c')) {
                        const communityNumber = parseInt(cardNumber) + 6;
                        return `/Ather-Assets/thumbnails/tb${communityNumber}.png`;
                      }
                      return `/Ather-Assets/thumbnails/tb${cardNumber}.png`;
                    };

                    const videoPath = getVideoPath(testimonial.id);
                    const thumbnailPath = getThumbnailPath(testimonial.id);

                    return (
                      <div 
                        key={testimonial.id} 
                        className="w-full flex-shrink-0 px-2"
                      >
                        {videoPath ? (
                          <SimpleVideoCard
                            testimonial={testimonial}
                            videoPath={videoPath}
                            thumbnailPath={thumbnailPath}
                            index={index}
                          />
                        ) : (
                          <TestimonialCardMobile
                            testimonial={testimonial}
                            index={index}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Arrows */}
              {filteredTestimonials.length > 1 && (
                <>
                  {/* Previous Button */}
                  <button
                    onClick={() => prevSlide(activeTab)}
                    disabled={carouselIndexes[activeTab] === 0}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px]"
                  >
                    <ChevronLeft size={20} className="text-gray-700" />
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={() => nextSlide(activeTab)}
                    disabled={carouselIndexes[activeTab] === filteredTestimonials.length - 1}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px]"
                  >
                    <ChevronRight size={20} className="text-gray-700" />
                  </button>
                </>
              )}

              {/* Pagination Dots */}
              {filteredTestimonials.length > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                  {filteredTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(activeTab, index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === carouselIndexes[activeTab]
                          ? 'bg-[#00E396] w-6'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Swipe Instructions */}
              <div className="text-center mt-4">
                <p className="text-xs text-gray-500">
                  💡 Swipe left/right to navigate • Tap dots to jump to slide
                </p>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews found</h3>
              <p className="text-sm text-gray-600 max-w-sm">
                Try adjusting your filters to see more reviews in this category.
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Load More Button - Mobile Optimized */}
      {filteredTestimonials.length >= 6 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <motion.button
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-lg font-medium transition-all min-h-[44px]"
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
