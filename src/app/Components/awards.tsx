'use client';   
import React, { memo, useMemo } from 'react';
import Image from 'next/image';
import { Trophy } from 'lucide-react';
import { AWARDS_DATA, AWARDS_STRUCTURED_DATA, type AwardItem } from '@/data/awards';
import { useAwardsSlider } from '@/hooks/useAwardsSlider';
import styles from '@/styles/awards.module.css';

// Optimized Image Component
const OptimizedAwardImage = memo<{ 
  award: AwardItem; 
  index: number; 
  isMobileSlider?: boolean;
}>(({ award, index, isMobileSlider = false }) => (
  <div className={styles.cardImage}>
    <Image
      src={award.imagePath}
      alt={award.imageAlt}
      fill
      className={styles.optimizedImage}
      sizes={isMobileSlider 
        ? "(max-width: 768px) 100vw" 
        : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      }
      priority={index < 2}
      quality={75}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      loading={index < 2 ? "eager" : "lazy"}
    />
    <div className={styles.imageOverlay} />
  </div>
));

OptimizedAwardImage.displayName = 'OptimizedAwardImage';

const Awards: React.FC = () => {
  const { currentSlide, goToSlide, touchHandlers, keyboardHandlers } = useAwardsSlider({
    itemsLength: AWARDS_DATA.length,
    autoSlideInterval: 4000,
    enableAutoSlide: true
  });

  // Memoized Award Card Component
  const AwardCard = memo<{ award: AwardItem; index: number; isMobileSlider?: boolean }>(
    ({ award, index, isMobileSlider = false }) => {
      const IconComponent = award.icon;
      
      const cardStyle = useMemo(() => ({
        animationDelay: `${index * 150}ms`
      }), [index]);
      
      return (
        <article 
          className={`${styles.card} ${award.shadowColor}`}
          style={cardStyle}
          tabIndex={0}
          role="article"
          aria-labelledby={`award-title-${award.id}`}
          aria-describedby={`award-desc-${award.id}`}
        >
          <OptimizedAwardImage award={award} index={index} isMobileSlider={isMobileSlider} />
          
          {/* Icon overlay on image */}
          <div className="absolute top-4 left-4 z-20">
            <div className={`${styles.iconContainer} bg-gradient-to-br ${award.gradient} ${award.shadowColor}`}>
              <IconComponent 
                className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" 
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Year badge */}
          <div className={styles.yearBadge}>
            {award.year}
          </div>

          {/* Content Container */}
          <div className={styles.cardContent}>
            <h3 id={`award-title-${award.id}`} className={styles.cardTitle}>
              {award.title}
            </h3>
            
            <p id={`award-desc-${award.id}`} className={styles.cardDescription}>
              {award.description}
            </p>

            {/* Bottom accent line */}
            <div className={`${styles.accentLine} bg-gradient-to-r ${award.gradient}`} />
          </div>

          {/* Hover gradient overlay */}
          <div className={styles.hoverOverlay} />
        </article>
      );
    }
  );
  
  AwardCard.displayName = 'AwardCard';

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(AWARDS_STRUCTURED_DATA) }}
      />
      
      <section 
        className={`${styles.section} layout-stable`} 
        aria-labelledby="awards-heading"
        role="region"
      >
        <div className={styles.container}>
          {/* Header */}
          <header className={styles.header}>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className={styles.headerIcon}>
                <Trophy className="w-6 h-6 text-white" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h2 id="awards-heading" className={styles.title}>
                Awards & Achievements
              </h2>
            </div>
            
            <div className={styles.divider} role="presentation" />
            
            <p className={styles.description}>
              Celebrating excellence as an official franchise partner of{' '}
              <span className="font-semibold text-gray-900">Ather Energy</span>, 
              recognized for outstanding performance and innovation in electric vehicle retail.
            </p>
          </header>

          {/* Awards Grid - Desktop */}
          <div 
            className={`${styles.desktopGrid} grid-stable`}
            role="list"
            aria-label="Awards and achievements"
          >
            {AWARDS_DATA.map((award, index) => (
              <div key={award.id} className={styles.fadeInUp} role="listitem">
                <AwardCard award={award} index={index} />
              </div>
            ))}
          </div>

          {/* Awards Slider - Mobile */}
          <div 
            className={styles.mobileSlider}
            role="region"
            aria-label="Awards carousel"
            aria-live="polite"
          >
            <div 
              className={styles.sliderContainer}
              {...touchHandlers}
              {...keyboardHandlers}
              role="img"
              aria-label={`Award ${currentSlide + 1} of ${AWARDS_DATA.length}: ${AWARDS_DATA[currentSlide].title}`}
              tabIndex={0}
            >
              {AWARDS_DATA.map((award, index) => (
                <div
                  key={award.id}
                  className={`
                    ${styles.slideItem}
                    ${index === currentSlide 
                      ? styles.slideActive
                      : index < currentSlide 
                        ? styles.slidePrev
                        : styles.slideNext
                    }
                  `}
                >
                  <div className="w-full h-full">
                    <AwardCard 
                      award={award} 
                      index={index} 
                      isMobileSlider={true} 
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile indicators */}
            <nav className={styles.indicators} aria-label="Slide indicators">
              {AWARDS_DATA.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`
                    ${styles.indicator}
                    ${currentSlide === index 
                      ? styles.indicatorActive
                      : styles.indicatorInactive
                    }
                  `}
                  aria-label={`Go to slide ${index + 1}: ${AWARDS_DATA[index].title}`}
                  aria-current={currentSlide === index ? 'true' : 'false'}
                  type="button"
                />
              ))}
            </nav>
          </div>

          {/* Decorative background elements */}
          <div className={styles.backgroundElements} aria-hidden="true">
            <div className={styles.bgElement1} />
            <div className={styles.bgElement2} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Awards;