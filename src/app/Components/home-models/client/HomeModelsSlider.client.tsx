'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HomeModelsSliderProps, HomeModel } from '../home-models.types';
import { useTestDriveModal } from '../../test-ride-form/TestDriveModalStore';

export default function HomeModelsSlider({ models, className = '' }: HomeModelsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  
  useEffect(() => {
    const checkMobile = () => {
      // Mobile detection logic removed as it was unused
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simple swipe handlers for models
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    
    // Simple left/right swipe with infinity
    if (diffX > 50) {
      // Swipe left - next (with infinity)
      const nextIndex = currentIndex === models.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(nextIndex);
    } else if (diffX < -50) {
      // Swipe right - previous (with infinity)
      const prevIndex = currentIndex === 0 ? models.length - 1 : currentIndex - 1;
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {models.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>

      {/* Mobile Carousel - ONE CARD AT A TIME */}
      <div className="md:hidden">
        <div className="relative overflow-hidden mb-6">
          <div 
            className="flex"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {models.map((model) => (
              <div
                key={model.id}
                className="w-full flex-shrink-0 px-4"
                style={{ 
                  display: model.id === models[currentIndex]?.id ? 'block' : 'none'
                }}
              >
                <ModelCard model={model} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Visual Dot Indicators */}
        <div className="flex justify-center items-center space-x-2">
          {models.map((_, index) => (
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
    </div>
  );
}

// ModelCard Component with CTA functionality
function ModelCard({ model }: { model: HomeModel }) {
  const modal = useTestDriveModal();

  // Get model page URL based on model ID
  const getModelPageUrl = (modelId: string) => {
    switch (modelId) {
      case 'rizta':
        return '/rizta';
      case '450s':
        return '/ather-450';
      case '450x':
        return '/ather-450';
      case '450-apex':
        return '/ather-450-apex';
      default:
        return `/models/${modelId}`;
    }
  };

  const handlePrimaryCTA = () => {
    modal.openManually();
  };

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg hover:scale-105 transition-all duration-300 flex flex-col h-full">
      {/* New Badge */}
      {model.isNew && (
        <div className="p-4 pb-0">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            All New
          </span>
        </div>
      )}

      {/* Model Image - Fixed consistent size */}
      <div className="relative h-40 bg-gray-50 overflow-hidden flex-shrink-0 pt-12">
        <Image
          src={model.image}
          alt={model.altText}
          fill
          className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          style={{ objectPosition: 'center' }}
        />
      </div>

      {/* Model Details */}
      <div className="p-6 flex flex-col h-full mt-3">
        <header className="mb-4 flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {model.name}
          </h3>
          
          <div className="space-y-2">
            <p className="text-base font-medium text-gray-900">
              Starting price {model.formattedPrice}
            </p>
            <p className="text-xs text-gray-600 flex items-center">
              Or EMI {model.emiFormatted}/month
              <svg className="w-4 h-4 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </p>
          </div>
        </header>

        {/* CTA Buttons with functionality */}
        <div className="space-y-3 mt-auto">
          {/* Primary CTA - Opens Test Ride Modal */}
          <button
            onClick={handlePrimaryCTA}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-colors duration-200"
            aria-label={`${model.primaryCTA.text} for ${model.name}`}
          >
            {model.primaryCTA.text}
          </button>
          
          {/* Secondary CTA - Navigates to Model Page */}
          <Link href={getModelPageUrl(model.id)}>
            <button
              className="w-full text-green-700 py-3 px-4 rounded-lg font-medium border border-green-300 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 transition-colors duration-200"
              aria-label={`${model.secondaryCTA.text} for ${model.name}`}
            >
              {model.secondaryCTA.text}
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
}