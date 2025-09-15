'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import TestRideButton from '../../TestRideButton';

interface VideoSlide {
  id: string;
  src: string;
  poster?: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  mobileSrc?: string;
}

export default function HeroSlider({ slides }: { slides: VideoSlide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [videoEndHandlersRef] = useState<{ current: Map<string, () => void> }>({ current: new Map() });
  const [videoElementsRef] = useState<{ current: Map<string, HTMLVideoElement> }>({ current: new Map() });

  useEffect(() => {
    const checkMobile = () => {
      const newIsMobile = window.innerWidth <= 768;
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile);
        setCurrentSlide(0);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  const filteredSlides = isMobile 
    ? slides.filter(slide => !slide.src.includes('.gif'))
    : slides;

  const getAssetSource = (item: VideoSlide) => {
    if (isMobile && item.mobileSrc) {
      return item.mobileSrc;
    }
    return item.src;
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filteredSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [filteredSlides.length, isAutoPlaying]);

  useEffect(() => {
    const currentVideoElement = videoElementsRef.current.get(filteredSlides[currentSlide]?.id);
    if (currentVideoElement && getMediaType(filteredSlides[currentSlide]?.src) === 'video') {
      const timer = setTimeout(() => {
        if (currentVideoElement.paused) {
          currentVideoElement.play().catch(console.error);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, filteredSlides, videoElementsRef]);

  const handleVideoEnd = useCallback(() => {
    const nextSlide = (currentSlide + 1) % filteredSlides.length;
    setCurrentSlide(nextSlide);
  }, [currentSlide, filteredSlides.length]);

  const handleVideoError = useCallback((slideId: string, error: string) => {
    setError(`Error playing video ${slideId}: ${error}`);
    console.error(`Video error for slide ${slideId}:`, error);
  }, []);

  useEffect(() => {
    const currentVideoElement = videoElementsRef.current.get(filteredSlides[currentSlide]?.id);
    const currentEndHandler = videoEndHandlersRef.current.get(filteredSlides[currentSlide]?.id);
    if (currentVideoElement && currentEndHandler) {
      currentVideoElement.addEventListener('ended', currentEndHandler);
      return () => currentVideoElement.removeEventListener('ended', currentEndHandler);
    }
  }, [currentSlide, filteredSlides, videoElementsRef, videoEndHandlersRef]);

  const registerVideo = useCallback((slideId: string, videoElement: HTMLVideoElement, onEnd: () => void) => {
    videoElementsRef.current.set(slideId, videoElement);
    videoEndHandlersRef.current.set(slideId, onEnd);
  }, [videoEndHandlersRef, videoElementsRef]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredSlides.length) % filteredSlides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredSlides.length);
  };

  if (error) {
    return (
      <div className="relative h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold font-neurial mb-4">Media Playback Error</h2>
          <p className="mb-4 font-neurial">{error}</p>
          <button
            onClick={() => setError(null)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-neurial"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentItem = filteredSlides[currentSlide];
  if (!currentItem) return null;

  const getMediaType = (src: string) => {
    const extension = src.split('.').pop()?.toLowerCase();
    if (['mp4', 'webm', 'ogg'].includes(extension || '')) return 'video';
    if (['gif'].includes(extension || '')) return 'gif';
    return 'image';
  };

  return (
    <div className={`relative h-screen bg-black ${isMobile ? 'hero-container' : ''}`} style={{ maxHeight: '100vh', overflow: 'hidden' }}>
      {/* Media Background */}
      <div className="absolute inset-0">
        {filteredSlides.map((item, index) => {
          const assetSource = getAssetSource(item);
          const mediaType = getMediaType(assetSource);
          const isActive = index === currentSlide;
          const isPrevious = index === (currentSlide - 1 + filteredSlides.length) % filteredSlides.length;
          const isNext = index === (currentSlide + 1) % filteredSlides.length;
          let slideClasses = `absolute inset-0 transition-all ${
            isMobile ? 'duration-800' : 'duration-1000'
          } ease-out transform will-change-transform`;
          if (isActive) {
            slideClasses += " opacity-100 scale-100 z-20";
          } else if (isPrevious && !isMobile) {
            slideClasses += " opacity-0 scale-105 z-10 -translate-x-full";
          } else if (isNext && !isMobile) {
            slideClasses += " opacity-0 scale-105 z-10 translate-x-full";
          } else {
            slideClasses += isMobile 
              ? " opacity-0 scale-[1.02] z-0" 
              : " opacity-0 scale-110 z-0";
          }
          return (
            <div
              key={item.id}
              className={slideClasses}
            >
              {mediaType === 'video' ? (
                <video
                  ref={(el) => {
                    if (el) {
                      registerVideo(item.id, el, handleVideoEnd);
                    }
                  }}
                  src={assetSource}
                  poster={item.poster}
                  autoPlay={isActive}
                  muted
                  loop={false}
                  playsInline
                  className="w-full h-full object-cover"
                  onError={(e) => handleVideoError(item.id, e.type)}
                />
              ) : (
                <Image
                  src={assetSource}
                  alt={item.poster || ''}
                  fill
                  className={`object-cover transform-gpu ${
                    isMobile 
                      ? 'transition-opacity duration-800 ease-out' 
                      : 'transition-transform duration-1000 ease-out'
                  }`}
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  style={{ 
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'translate3d(0, 0, 0)'
                  }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                  quality={index === 0 ? 95 : 80}
                />
              )}
            </div>
          );
        })}
      </div>
      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-30">
        <div className={`absolute text-white ${
          isMobile
            ? 'bottom-20 left-1/2 -translate-x-1/2 text-center px-4 w-full max-w-sm transition-all duration-500 ease-out'
            : 'bottom-16 left-8 lg:left-16 text-left max-w-lg transition-all duration-700 ease-out'
        } transform`}>
          <div className={`transform ${
            isMobile 
              ? 'transition-all duration-500 delay-200' 
              : 'transition-all duration-700 delay-300'
          } ${currentSlide >= 0 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: currentSlide >= 0 ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)'
          }}>
            <h1 className={`font-bold font-neurial mb-4 leading-tight ${
              isMobile 
                ? 'text-2xl md:text-3xl' 
                : 'text-3xl lg:text-5xl xl:text-6xl'
            }`}>
              {currentItem.title}
            </h1>
            <p className={`font-neurial mb-6 leading-relaxed ${
              isMobile 
                ? 'text-base md:text-lg' 
                : 'text-lg lg:text-xl xl:text-2xl'
            } opacity-90`}>
              {currentItem.subtitle}
            </p>
            <div className={`transform ${
              isMobile 
                ? 'transition-all duration-400 delay-300' 
                : 'transition-all duration-500 delay-500'
            }`}>
              {currentItem.ctaText === 'Book Test Ride' ? (
                <TestRideButton
                  variant="primary"
                  size="lg"
                  className={`bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold font-neurial ${
                    isMobile 
                      ? 'px-8 py-3 text-base transition-all duration-200 active:scale-95' 
                      : 'px-10 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25'
                  }`}
                >
                  {currentItem.ctaText}
                </TestRideButton>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className={`absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 p-3 md:p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 z-40 ${
          isMobile 
            ? 'transition-all duration-200 active:scale-95 active:bg-white/20' 
            : 'hover:bg-white/20 hover:scale-110 transition-all duration-300'
        }`}
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className={`absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 p-3 md:p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 z-40 ${
          isMobile 
            ? 'transition-all duration-200 active:scale-95 active:bg-white/20' 
            : 'hover:bg-white/20 hover:scale-110 transition-all duration-300'
        }`}
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40">
        {filteredSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125 shadow-lg'
                : 'bg-white/40 hover:bg-white/60 hover:scale-110'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
