'use client';

import { useMobileDetection } from '@/hooks/useHeaderSwap';
import type { HeroHeadingProps } from '../home-hero.types';

interface ExtendedHeroHeadingProps extends HeroHeadingProps {
  slideIndex?: number;
}

export function HeroHeading({ title, subtitle, slideIndex }: ExtendedHeroHeadingProps) {
  const isMobile = useMobileDetection(450);
  
  // Center align for 3rd slide (index 2), left align for others
  const isCenterAligned = slideIndex === 2;
  
  return (
    <div 
      className={`${
        isCenterAligned 
          ? 'text-center mx-auto' 
          : isMobile 
            ? 'text-left w-full' 
            : 'text-left'
      } max-w-2xl`}
    >
      <h1 
        className={`mb-4 leading-tight ${isMobile ? 'text-left text-white' : ''}`}
        style={{
          fontSize: isMobile ? 'clamp(1.75rem, 5vw, 2.5rem)' : 'clamp(2rem, 5vw, 3rem)',
          fontWeight: '700',
          color: '#ffffff',
          letterSpacing: '-0.02em',
          lineHeight: '1.1',
          textShadow: '0 2px 20px rgba(0,0,0,0.3)',
          ...(isMobile && {
            marginBottom: '1.5rem',
            textAlign: 'left',
            paddingLeft: '0',
            width: '100%'
          })
        }}
      >
        {title}
      </h1>
      <p 
        className={`mb-8 ${isMobile ? 'text-left text-white' : ''}`}
        style={{
          fontSize: isMobile ? 'clamp(0.875rem, 2vw, 1.125rem)' : 'clamp(0.875rem, 2vw, 1.125rem)',
          fontWeight: '400',
          color: 'rgba(255, 255, 255, 0.9)',
          lineHeight: '1.5',
          letterSpacing: '0.01em',
          ...(isMobile && {
            marginBottom: '2.5rem',
            textAlign: 'left',
            paddingLeft: '0',
            width: '100%'
          })
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}