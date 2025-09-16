'use client';

import React, { useState, useEffect } from 'react';

interface Highlight {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  variant?: string;
}

interface CommonFeature {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}

interface RiztaKeyHighlightsClientProps {
  riztaHighlights: Highlight[];
  riztaSHighlights: Highlight[];
  commonFeatures: CommonFeature[];
}

export function RiztaKeyHighlightsClient({ 
  riztaHighlights, 
  riztaSHighlights
}: RiztaKeyHighlightsClientProps) {
  const [activeTab, setActiveTab] = useState<'rizta-z' | 'rizta-s'>('rizta-z');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const currentHighlights = activeTab === 'rizta-z' ? riztaHighlights : riztaSHighlights;

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-cycle slides every 3 seconds on mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => 
        (prevIndex + 1) % currentHighlights.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile, currentHighlights.length]);

  // Reset slide index when switching tabs
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [activeTab]);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Apple-style Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-4 md:mb-6 tracking-tight">
            Key Highlights
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            Experience the future of electric mobility with precision-engineered performance
          </p>
        </div>

        {/* Apple-style Tab Switcher */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className="inline-flex bg-gray-100 rounded-full p-2">
            <button
              onClick={() => setActiveTab('rizta-z')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'rizta-z'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Rizta Z
            </button>
            <button
              onClick={() => setActiveTab('rizta-s')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'rizta-s'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Rizta S
            </button>
          </div>
        </div>

        {/* Mobile Slider / Desktop Grid */}
        {isMobile ? (
          // Mobile Slider View
          <div className="relative mb-20">
            <div className="overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
              >
                {currentHighlights.map((highlight) => (
                  <div
                    key={highlight.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                      <div className="text-center space-y-4">
                        {/* Icon */}
                        <div className="flex justify-center mb-4">
                          {highlight.icon}
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {highlight.title}
                        </h3>
                        
                        {/* Subtitle */}
                        <div className="text-2xl font-light text-gray-900 mb-3">
                          {highlight.subtitle}
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed font-light text-base">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mobile Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {currentHighlights.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlideIndex 
                      ? 'bg-gray-900 w-8' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          // Desktop Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {currentHighlights.map((highlight, index) => (
              <div
                key={highlight.id}
                className={`group relative bg-white rounded-3xl p-8 transition-all duration-500 hover:scale-105 cursor-pointer border border-gray-100 hover:border-gray-200 ${
                  hoveredCard === highlight.id ? 'shadow-2xl' : 'shadow-sm hover:shadow-xl'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
                onMouseEnter={() => setHoveredCard(highlight.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/30 group-hover:to-purple-50/30 rounded-3xl transition-all duration-500" />
                
                <div className="relative text-center space-y-6">
                  {/* Icon */}
                  <div className="text-5xl mb-6 transform transition-transform duration-300 group-hover:scale-110">
                    {highlight.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {highlight.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <div className="text-3xl font-light text-gray-900 mb-4">
                    {highlight.subtitle}
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed font-light text-lg">
                    {highlight.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        
      </div>
    </div>
  );
}