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
      {/* Content Overlay - Bottom Center CTA Only */}
      <div className="absolute inset-0 z-30" style={{ contain: 'layout style' }}>
        <div className="absolute text-white left-1/2 bottom-8 md:bottom-12 -translate-x-1/2 text-center px-4 w-full transition-all duration-500 ease-out transform" style={{ contain: 'layout style' }}>
          <div className="transform transition-all duration-400 delay-300 md:duration-500 md:delay-500">
            <TestRideButton
              variant="primary"
              size="lg"
              className="bg-[#FF6B35] hover:bg-[#F77F00] text-white rounded-lg font-semibold font-neurial px-8 py-3 text-base transition-all duration-200 active:scale-95 md:px-10 md:py-4 md:text-lg md:duration-300 md:hover:scale-105 md:hover:shadow-lg md:hover:shadow-orange-500/30"
            >
              Book Test Drive
            </TestRideButton>
          </div>
        </div>
      </div>
      {/* Navigation Arrows - Only show if more than 1 slide */}
      {filteredSlides.length > 1 && (
        <>
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
        </>
      )}
      {/* Slide Indicators - Only show if more than 1 slide */}
      {filteredSlides.length > 1 && (
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
      )}

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
