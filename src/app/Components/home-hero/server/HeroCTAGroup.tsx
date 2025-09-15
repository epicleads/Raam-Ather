'use client';

import Link from 'next/link';
import { useMobileDetection } from '@/hooks/useHeaderSwap';
import type { HeroCTAGroupProps } from '../home-hero.types';

interface ExtendedHeroCTAGroupProps extends HeroCTAGroupProps {
  slideIndex?: number;
}

export function HeroCTAGroup({ primaryCTA, secondaryCTA, slideIndex }: ExtendedHeroCTAGroupProps) {
  const isMobile = useMobileDetection(450);
  
  // Center align for 3rd slide (index 2), left align for others
  const isCenterAligned = slideIndex === 2;
  
  const primaryButtonStyles = {
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    padding: isMobile ? '10px 20px' : '10px 24px',
    borderRadius: '25px',
    fontSize: isMobile ? '13px' : '13px',
    fontWeight: '600',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.3s ease',
    border: '2px solid transparent',
    letterSpacing: '0.5px',
    minWidth: isMobile ? '100px' : '100px',
    textAlign: 'center' as const,
    boxShadow: '0 2px 10px rgba(0,0,0,0.15)'
  };

  const secondaryButtonStyles = {
    backgroundColor: 'transparent',
    color: '#ffffff',
    padding: isMobile ? '10px 20px' : '10px 24px',
    borderRadius: '25px',
    fontSize: isMobile ? '13px' : '13px',
    fontWeight: '600',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.3s ease',
    border: '2px solid rgba(255,255,255,0.8)',
    letterSpacing: '0.5px',
    minWidth: isMobile ? '100px' : '100px',
    textAlign: 'center' as const,
    backdropFilter: 'blur(10px)'
  };

  return (
    <div 
      className={`${
        isMobile 
          ? 'flex flex-row gap-3 w-full items-start flex-wrap' 
          : 'flex flex-col sm:flex-row gap-4 items-start'
      } ${isCenterAligned ? 'justify-center' : ''}`}
    >
      <Link
        href={primaryCTA.href}
        style={{
          ...primaryButtonStyles,
          ...(isMobile && {
            alignSelf: 'flex-start',
            width: 'auto',
            flexShrink: 0
          })
        }}
        className="hover:scale-105 hover:shadow-lg transition-all duration-300"
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f5f5f5';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {primaryCTA.label}
      </Link>
      
      {secondaryCTA && (
        <Link
          href={secondaryCTA.href}
          style={{
            ...secondaryButtonStyles,
            ...(isMobile && {
              alignSelf: 'flex-start',
              width: 'auto',
              flexShrink: 0
            })
          }}
          className="hover:bg-white hover:text-black transition-all duration-300"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)';
            e.currentTarget.style.color = '#1a1a1a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#ffffff';
          }}
        >
          {secondaryCTA.label}
        </Link>
      )}
    </div>
  );
}