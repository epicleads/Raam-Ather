'use client';

import { useState } from 'react';
import Image from 'next/image';
import { HomeTestimonialsData, Testimonial } from '../home-testimonials.types';

export default function HomeTestimonialsSlider({ data }: { data: HomeTestimonialsData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);

  // Simple swipe handlers for testimonials
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    
    // Simple left/right swipe with infinity
    if (diffX > 50) {
      // Swipe left - next (with infinity)
      const nextIndex = currentIndex === data.testimonials.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(nextIndex);
    } else if (diffX < -50) {
      // Swipe right - previous (with infinity)
      const prevIndex = currentIndex === 0 ? data.testimonials.length - 1 : currentIndex - 1;
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <div className="relative">
      {/* Desktop View - Multiple cards */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {data.testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial}
              isActive={index === currentIndex}
            />
          ))}
        </div>
      </div>

      {/* Mobile View - Simple Carousel - WITH Simple Swipe ONLY */}
      <div className="md:hidden">
        <div className="relative overflow-hidden mb-6">
          <div 
            className="flex"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {data.testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="w-full flex-shrink-0 px-4"
                style={{ 
                  display: index === currentIndex ? 'block' : 'none'
                }}
              >
                <TestimonialCard 
                  testimonial={testimonial} 
                  isActive={true}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Visual Dot Indicators */}
        <div className="flex justify-center items-center space-x-2 mb-6 sm:mb-8">
          {data.testimonials.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-green-600 w-6' 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center items-center mt-6 sm:mt-8">
        <a
          href={data.ctaPrimary.href}
          className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-green-500/25"
        >
          {data.ctaPrimary.text}
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

function TestimonialCard({ testimonial, isActive }: TestimonialCardProps) {
  return (
    <article 
      className={`bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 ${
        isActive ? 'shadow-xl shadow-green-500/10 border-green-200' : 'shadow-lg hover:shadow-xl'
      } backdrop-blur-sm bg-white/90`}
    >
      {/* Video Testimonial */}
      {testimonial.type === 'video' && testimonial.video && (
        <div className="aspect-video bg-gray-900">
          <video
            className="w-full h-full object-cover"
            controls
            poster={testimonial.image}
          >
            <source src={testimonial.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Card Content */}
      <div className="p-6">
        {/* Rating Stars */}
        {testimonial.rating && (
          <div className="flex items-center mb-4">
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < testimonial.rating! ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {testimonial.rating}/5
            </span>
          </div>
        )}

        {/* Review Text */}
        <p className="text-gray-600 text-sm mb-2">
          &ldquo;{testimonial.review}&rdquo;
        </p>

        {/* Author Info */}
        <footer className="flex items-center">
          {/* Always show a default avatar or user icon */}
          <div className="relative w-12 h-12 mr-4 flex-shrink-0">
            {testimonial.image ? (
              <Image
                src={testimonial.image}
                alt={`${testimonial.name}'s profile picture`}
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>

          <div>
            <cite className="font-semibold text-gray-900 not-italic">
              {testimonial.name}
            </cite>
            {testimonial.role && (
              <p className="text-sm text-gray-600">
                {testimonial.role}
              </p>
            )}
          </div>
        </footer>
      </div>
    </article>
  );
}