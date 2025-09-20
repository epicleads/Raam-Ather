"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useTestDriveModal } from "../../../Components/test-ride-form/TestDriveModalStore";
import type { HeroItem } from "../riztaHero.types";
import Image from "next/image";

interface Props {
  heroItems: HeroItem[];
  autoPlayInterval?: number;
}

// Custom hook for hero slider logic
const useRiztaHeroSlider = (heroItems: HeroItem[], autoPlayInterval: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(true); // Start as loaded to prevent infinite loading

  // Preload next slide for better performance
  const preloadNextSlide = useCallback((index: number) => {
    const nextIndex = (index + 1) % heroItems.length;
    const nextItem = heroItems[nextIndex];

    if (nextItem && nextItem.type === 'image') {
      const img = new window.Image();
      img.src = nextItem.src;
    }
  }, [heroItems]);

  useEffect(() => {
    if (!autoPlayInterval || !isPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % heroItems.length;
        preloadNextSlide(nextIndex);
        return nextIndex;
      });
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlayInterval, isPlaying, heroItems.length, preloadNextSlide]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
    preloadNextSlide(index);

    // Resume autoplay after 10 seconds
    setTimeout(() => setIsPlaying(true), 10000);
  }, [preloadNextSlide]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return {
    currentIndex,
    isPlaying,
    isLoaded,
    goToSlide,
    setIsPlaying,
    handleLoad
  };
};

// Memoized slide component for better performance
const HeroSlide = memo(({
  item,
  isActive,
  onLoad
}: {
  item: HeroItem;
  isActive: boolean;
  onLoad: () => void;
}) => {
  const videoRef = useCallback((video: HTMLVideoElement | null) => {
    if (video && item.type === "video") {
      if (isActive) {
        // Load and play video only when slide is active
        video.load();
        video.play().catch(() => {
          // Fallback: try again after a short delay
          setTimeout(() => video.play().catch(() => {}), 100);
        });
      } else {
        video.pause();
      }
    }
  }, [isActive, item.type]);

  const handleVideoLoad = useCallback(() => {
    onLoad();
  }, [onLoad]);

  const handleImageLoad = useCallback(() => {
    onLoad();
  }, [onLoad]);

  if (item.type === "video") {
    return (
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        playsInline
        onCanPlay={handleVideoLoad}
        aria-label={item.alt}
        preload={isActive ? "auto" : "none"}
        controls={false}
      >
        <source src={item.src} type="video/mp4" />
        <p>Your browser does not support the video tag. {item.alt}</p>
      </video>
    );
  }

  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      priority={isActive}
      quality={isActive ? 90 : 75}
      sizes="100vw"
      className="object-cover"
      onLoad={handleImageLoad}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
    />
  );
});

HeroSlide.displayName = 'HeroSlide';

export const RiztaHeroSlider = memo(({ heroItems, autoPlayInterval = 0 }: Props) => {
  const modal = useTestDriveModal();
  const {
    currentIndex,
    isPlaying,
    goToSlide,
    setIsPlaying,
    handleLoad
  } = useRiztaHeroSlider(heroItems, autoPlayInterval);

  // Memoized current item for better performance
  const currentItem = useMemo(() => heroItems[currentIndex], [heroItems, currentIndex]);

  const handleCTAClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'hero_cta_click', {
        slide_index: currentIndex,
        slide_title: currentItem.title
      });
    }

    modal.openManually();
  }, [modal, currentIndex, currentItem.title]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, [setIsPlaying]);

  const handleKeyNavigation = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      const prevIndex = currentIndex === 0 ? heroItems.length - 1 : currentIndex - 1;
      goToSlide(prevIndex);
    } else if (e.key === 'ArrowRight') {
      const nextIndex = (currentIndex + 1) % heroItems.length;
      goToSlide(nextIndex);
    } else if (e.key === ' ') {
      e.preventDefault();
      handlePlayPause();
    }
  }, [currentIndex, heroItems.length, goToSlide, handlePlayPause]);

  return (
    <div
      className="relative w-full h-full hero-slider"
      role="region"
      aria-label="Ather Rizta hero carousel"
      onKeyDown={handleKeyNavigation}
      tabIndex={0}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full overflow-hidden">
        {heroItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            aria-hidden={index !== currentIndex}
          >
            <HeroSlide
              item={item}
              isActive={index === currentIndex}
              onLoad={handleLoad}
            />
          </div>
        ))}

        {/* Gradient Overlay for Better Text Readability */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20"
          aria-hidden={true}
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center z-30">
        <div className="text-left text-white px-8 md:px-16 max-w-2xl">
          <header>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
              {currentItem.title}
            </h2>
            <p className="text-lg md:text-xl mb-8 font-light">
              {currentItem.subtitle}
            </p>
          </header>

          <div className="hero-cta">
            <button
              onClick={handleCTAClick}
              className="hero-cta-button"
              aria-label={`${currentItem.primaryCTA?.label} for ${currentItem.title}`}
              type="button"
            >
              {currentItem.primaryCTA?.label || "Book Test Ride"}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-40"
        role="tablist"
        aria-label="Slide navigation"
      >
        {heroItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to slide ${index + 1}`}
            tabIndex={index === currentIndex ? 0 : -1}
          />
        ))}
      </div>

      {/* Play/Pause Control */}
      <button
        onClick={handlePlayPause}
        className="absolute top-6 right-6 p-3 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors z-40"
        aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        type="button"
      >
        {isPlaying ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Removed loading indicator to prevent blocking */}

      {/* Optimized CSS */}
      <style jsx>{`
        .hero-slider {
          will-change: transform;
        }

        .hero-cta-button {
          background: linear-gradient(135deg, #10b981, #059669);
          color: #ffffff;
          padding: 16px 32px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1.1rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          will-change: transform;
        }

        .hero-cta-button:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          background: linear-gradient(135deg, #059669, #047857);
        }

        .hero-cta-button:active {
          transform: translateY(-1px) scale(1.02);
        }

        .hero-cta-button:focus-visible {
          outline: 3px solid rgba(16, 185, 129, 0.5);
          outline-offset: 2px;
        }

        @media (max-width: 768px) {
          .hero-cta-button {
            padding: 14px 28px;
            font-size: 1rem;
          }
        }

        /* Prefers reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .hero-slider * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
});

RiztaHeroSlider.displayName = 'RiztaHeroSlider';