import React from 'react';
import styles from './HeroLoadingSkeleton.module.css';

interface HeroLoadingSkeletonProps {
  showBrandLogo?: boolean;
  showProgressBar?: boolean;
}

export function HeroLoadingSkeleton({ 
  showBrandLogo = true, 
  showProgressBar = true 
}: HeroLoadingSkeletonProps) {
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

      {/* Loading Progress Bar */}
      {showProgressBar && (
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} />
          </div>
          <p className={styles.progressText}>
            Loading premium experience...
          </p>
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
    </section>
  );
}

export default HeroLoadingSkeleton;
