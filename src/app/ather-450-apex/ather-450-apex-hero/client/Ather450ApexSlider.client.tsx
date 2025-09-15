"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTestDriveModal } from "../../../Components/test-ride-form/TestDriveModalStore";
import type { HeroItem } from "../ather450ApexHero.types";

interface Ather450ApexSliderProps {
  heroItems: HeroItem[];
  autoPlayInterval?: number;
}

export function Ather450ApexSlider({ heroItems, autoPlayInterval = 5000 }: Ather450ApexSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState<string | null>(null);
  const testDriveModal = useTestDriveModal();

  const handleCTAClick = () => {
    testDriveModal.openManually();
  };
  
  // Auto-play functionality
  useEffect(() => {
    if (autoPlayInterval <= 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroItems.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlayInterval, heroItems.length]);

  const currentItem = heroItems[currentIndex];

  const goToSlide = (index: number) => {
    console.log('Going to slide:', index);
    setCurrentIndex(index);
    setImageError(null);
  };

  // Debug logging
  useEffect(() => {
    console.log('Current index:', currentIndex);
    console.log('Current item:', currentItem);
    console.log('Hero items length:', heroItems.length);
  }, [currentIndex, currentItem, heroItems.length]);

  return (
    <div className="relative w-full h-full">
      {/* Hero Content */}
      <div className="relative w-full h-full">
        {/* Debug Info */}
        

        {currentItem.type === 'video' ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            src={currentItem.src}
          />
        ) : (
          <>
            {imageError ? (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🖼️</div>
                  <h3 className="text-2xl font-bold mb-2">Image Failed to Load</h3>
                  <p className="text-gray-300 mb-4">{imageError}</p>
                  <div className="bg-black bg-opacity-50 p-3 rounded text-sm">
                    <p><strong>Current Image:</strong></p>
                    <p className="text-orange-400">{currentItem.src}</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Image
                  src={currentItem.src}
                  alt={currentItem.alt || ""}
                  fill
                  className="object-cover"
                  priority
                  onError={() => setImageError(currentItem.src)}
                  onLoad={() => console.log('Image loaded successfully:', currentItem.src)}
                  style={{
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 1
                  }}
                />
                {/* Debug info */}
                <div className="absolute top-4 left-4 bg-black/80 text-white p-2 rounded z-50 text-sm">
                  <p>Index: {currentIndex}/{heroItems.length - 1}</p>
                  <p>Title: {currentItem.title}</p>
                  <p>Auto: {autoPlayInterval}ms</p>
                  <p>Loaded: {imageError ? 'ERROR' : 'OK'}</p>
                </div>
              </>
            )}
          </>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />

        {/* Content - Desktop: Left Bottom, Mobile: Center Bottom */}
        <div className="absolute inset-0 flex items-end justify-start md:justify-start justify-center z-20">
          <div className="text-center md:text-left text-white max-w-4xl ml-0 md:ml-8 lg:ml-16 px-6 pb-16 md:pb-20 w-full md:w-auto">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-4 leading-tight text-center md:text-left">
              {currentItem.title}
            </h1>
            <p className="text-base md:text-lg lg:text-xl mb-4 md:mb-6 leading-relaxed text-center md:text-left">
              {currentItem.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start items-center md:items-start">
              <button
                onClick={handleCTAClick}
                className="px-4 py-2 md:px-5 md:py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer text-sm md:text-base inline-block"
              >
                {currentItem.primaryCTA.label}
              </button>
              {currentItem.secondaryCTA && (
                <button
                  onClick={handleCTAClick}
                  className="px-4 py-2 md:px-5 md:py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 cursor-pointer text-sm md:text-base inline-block"
                >
                  {currentItem.secondaryCTA.label}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-50">
        {heroItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-colors border-2 ${
              index === currentIndex 
                ? 'bg-orange-500 border-orange-500' 
                : 'bg-transparent border-white hover:bg-white hover:bg-opacity-30'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => goToSlide((currentIndex - 1 + heroItems.length) % heroItems.length)}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-orange-500 transition-colors"
      >
        ‹
      </button>
      <button
        onClick={() => goToSlide((currentIndex + 1) % heroItems.length)}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-orange-500 transition-colors"
      >
        ›
      </button>
    </div>
  );
}