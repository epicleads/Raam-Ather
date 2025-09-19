"use client";

import React, { useEffect } from 'react';
import { useHeroLoading } from '@/hooks/useHeroLoading';
import styles from './HeroLoadingSkeleton.module.css';

interface HeroLoadingEnhancedProps {
  showBrandLogo?: boolean;
  showProgressBar?: boolean;
  onLoadingComplete?: () => void;
  minLoadingTime?: number;
}

export function HeroLoadingEnhanced({ 
  showBrandLogo = true, 
  showProgressBar = true,
  onLoadingComplete,
  minLoadingTime = 1500
}: HeroLoadingEnhancedProps) {
  const { 
    isLoading, 
    progress, 
    loadingMessage, 
    setLoadingComplete 
  } = useHeroLoading({
    minLoadingTime,
    showProgressBar,
    enablePreload: true
  });

  // Auto-complete loading after a delay (simulating content ready)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete();
    }, minLoadingTime * 0.8); // Complete at 80% of minimum time

    return () => clearTimeout(timer);
  }, [setLoadingComplete, minLoadingTime]);

  // Notify parent when loading is complete
  useEffect(() => {
    if (!isLoading && onLoadingComplete) {
      onLoadingComplete();
    }
  }, [isLoading, onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <section 
      className={styles.heroSkeleton}
      aria-label="Loading hero content"
      role="banner"
    >
      {/* Background Gradient */}
      <div className={styles.backgroundGradient} />
      
      {/* Animated Background Pattern */}
      <div className={styles.backgroundPattern}>
        <div className={styles.patternCircle1} />
        <div className={styles.patternCircle2} />
        <div className={styles.patternCircle3} />
      </div>

      {/* Main Content Container */}
      <div className={styles.contentContainer}>
        {/* Brand Logo Skeleton */}
        {showBrandLogo && (
          <div className={styles.logoContainer}>
            <div className={styles.logoSkeleton} />
          </div>
        )}

        {/* Hero Text Skeleton */}
        <div className={styles.textContainer}>
          <div className={styles.titleSkeleton}>
            <div className={styles.titleLine1} />
            <div className={styles.titleLine2} />
          </div>
          
          <div className={styles.subtitleSkeleton}>
            <div className={styles.subtitleLine1} />
            <div className={styles.subtitleLine2} />
          </div>

          {/* CTA Button Skeleton */}
          <div className={styles.ctaContainer}>
            <div className={styles.ctaSkeleton} />
          </div>
        </div>

        {/* Hero Image/Video Placeholder */}
        <div className={styles.mediaContainer}>
          <div className={styles.mediaSkeleton}>
            <div className={styles.mediaIcon}>
              <svg 
                className={styles.videoIcon} 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M2 3a1 1 0 00-1 1v12a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1H2zM8 7l6 4-6 4V7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      {showProgressBar && (
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ 
                width: `${progress}%`,
                transition: 'width 0.3s ease-out'
              }}
            />
          </div>
          <p className={styles.progressText} aria-live="polite">
            {loadingMessage}
          </p>
          <div className={styles.progressPercentage}>
            {Math.round(progress)}%
          </div>
        </div>
      )}

      {/* Navigation Dots Skeleton */}
      <div className={styles.navDotsContainer}>
        {[...Array(3)].map((_, index) => (
          <div 
            key={index} 
            className={`${styles.navDot} ${index === 0 ? styles.navDotActive : ''}`}
          />
        ))}
      </div>

      {/* Scroll Indicator Skeleton */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollIcon} />
        <span className={styles.scrollText}>Scroll</span>
      </div>

      {/* Performance monitoring */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined' && 'performance' in window) {
              performance.mark('hero-loading-start');
            }
          `
        }}
      />
    </section>
  );
}

export default HeroLoadingEnhanced;
