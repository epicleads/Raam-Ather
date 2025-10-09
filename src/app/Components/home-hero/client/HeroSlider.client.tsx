'use client';

import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import TestRideButton from '../../TestRideButton';
import { MediaViewer } from '../../ui/MediaViewer';


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

const HeroSlider = memo(function HeroSlider({ slides }: { slides: VideoSlide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoEndHandlersRef] = useState<{ current: Map<string, () => void> }>({ current: new Map() });
  const [videoElementsRef] = useState<{ current: Map<string, HTMLVideoElement> }>({ current: new Map() });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        const isMobileView = window.innerWidth < 720; // 720px breakpoint for mobile
        setIsMobile(isMobileView);
        console.log('🔍 Mobile Detection:', {
          screenWidth: window.innerWidth,
          isMobile: isMobileView,
          breakpoint: '720px'
        });
      }
    };
    
    // Check on mount
    checkMobile();
    
    // Add resize listener
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // Memoize filtered slides
  const filteredSlides = useMemo(() => slides, [slides]);

  // Memoize asset source getter to avoid recreation on every render
  const getAssetSource = useCallback((item: VideoSlide) => {
    // Use mobileSrc for mobile devices if available, otherwise fallback to desktop src
    const selectedSrc = isMobile && item.mobileSrc ? item.mobileSrc : item.src;
    console.log('🖼️ Image Selection:', {
      slideId: item.id,
      isMobile,
      mobileSrc: item.mobileSrc,
      desktopSrc: item.src,
      selectedSrc,
      condition: `isMobile=${isMobile} && mobileSrc=${!!item.mobileSrc}`
    });
    return selectedSrc;
  }, [isMobile]);

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

  // Memoize navigation functions
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + filteredSlides.length) % filteredSlides.length);
  }, [filteredSlides.length]);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % filteredSlides.length);
  }, [filteredSlides.length]);

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
    <section
      className="relative h-screen bg-black hero-container max-h-screen overflow-hidden"
      role="banner"
      aria-label="Hero carousel showcasing Ather electric scooters"
      suppressHydrationWarning
    >
      {/* Media Background */}
      <div className="absolute inset-0">
        {filteredSlides.map((item, index) => {
          const assetSource = getAssetSource(item);
          const mediaType = getMediaType(assetSource);
          const isActive = index === currentSlide;
          const isPrevious = index === (currentSlide - 1 + filteredSlides.length) % filteredSlides.length;
          const isNext = index === (currentSlide + 1) % filteredSlides.length;
          let slideClasses = `absolute inset-0 transition-all ${
'duration-1000'
          } ease-out transform will-change-transform`;
          if (isActive) {
            slideClasses += " opacity-100 scale-100 z-20";
          } else if (isPrevious) {
            slideClasses += " opacity-0 scale-105 z-10 -translate-x-full";
          } else if (isNext) {
            slideClasses += " opacity-0 scale-105 z-10 translate-x-full";
          } else {
            slideClasses += " opacity-0 scale-110 z-0";
          }
          return (
            <div
              key={item.id}
              className={slideClasses}
            >
              <MediaViewer
                src={assetSource}
                alt={`${item.title} - ${item.subtitle}`}
                type={mediaType === 'gif' ? 'image' : mediaType}
                priority={index === 0}
                isActive={isActive}
                poster={item.poster}
                className="transition-opacity duration-800 ease-out md:transition-transform md:duration-1000"
                onVideoEnd={handleVideoEnd}
                onVideoError={(error) => handleVideoError(item.id, error)}
                videoRef={mediaType === 'video' ? (el) => {
                  if (el) {
                    registerVideo(item.id, el, handleVideoEnd);
                  }
                } : undefined}
              />
            </div>
          );
        })}
      </div>
      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-30" style={{ contain: 'layout style' }}>
        <div className="absolute text-white bottom-20 left-1/2 -translate-x-1/2 text-center px-4 w-full max-w-sm transition-all duration-500 ease-out md:bottom-16 md:left-8 lg:left-16 md:text-left md:max-w-lg md:duration-700 md:-translate-x-0 md:translate-x-0 transform" style={{ contain: 'layout style' }}>
          <header>
            <div className={`transform transition-all duration-500 delay-200 md:duration-700 md:delay-300 ${currentSlide >= 0 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: currentSlide >= 0 ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)'
            }}>
              <h1 className="font-bold font-neurial mb-4 leading-tight drop-shadow-lg text-2xl md:text-3xl lg:text-5xl xl:text-6xl">
                {currentItem.title}
              </h1>
              <p className="font-neurial mb-6 leading-relaxed drop-shadow-md text-base md:text-lg lg:text-xl xl:text-2xl opacity-90">
                {currentItem.subtitle}
              </p>
            </div>
          </header>
          <div className="transform transition-all duration-400 delay-300 md:duration-500 md:delay-500">
            {currentItem.ctaText === 'Book Test Ride' ? (
              <TestRideButton
                variant="primary"
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold font-neurial px-8 py-3 text-base transition-all duration-200 active:scale-95 md:px-10 md:py-4 md:text-lg md:duration-300 md:hover:scale-105 md:hover:shadow-lg md:hover:shadow-green-500/25"
              >
                {currentItem.ctaText}
              </TestRideButton>
            ) : null}
          </div>
        </div>
      </div>
      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 p-3 md:p-4 bg-white/20 rounded-full border border-white/30 z-40 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 active:scale-95 active:bg-white/20 md:hover:bg-white/20 md:hover:scale-110 md:duration-300"
        aria-label={`Go to previous slide. Currently on slide ${currentSlide + 1} of ${filteredSlides.length}`}
        type="button"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 p-3 md:p-4 bg-white/20 rounded-full border border-white/30 z-40 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 active:scale-95 active:bg-white/20 md:hover:bg-white/20 md:hover:scale-110 md:duration-300"
        aria-label={`Go to next slide. Currently on slide ${currentSlide + 1} of ${filteredSlides.length}`}
        type="button"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {/* Slide Indicators */}
      <div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40"
        role="tablist"
        aria-label="Slide navigation"
      >
        {filteredSlides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            role="tab"
            aria-selected={index === currentSlide}
            aria-controls={`slide-${index}`}
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 ${
              index === currentSlide
                ? 'bg-white scale-125 shadow-lg'
                : 'bg-white/40 hover:bg-white/60 hover:scale-110'
            }`}
          />
        ))}
      </div>

      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a>
    </section>
  );
});

export default HeroSlider;
