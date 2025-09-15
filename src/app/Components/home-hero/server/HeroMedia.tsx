'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import { useMobileDetection } from '@/hooks/useHeaderSwap';
import type { HeroMediaProps } from '../home-hero.types';

interface ExtendedHeroMediaProps extends HeroMediaProps {
  onVideoLoad?: (duration: number, videoId: string) => void;
  onVideoRegister?: (videoElement: HTMLVideoElement) => void;
}

export const HeroMedia = forwardRef<HTMLVideoElement, ExtendedHeroMediaProps>(
  ({ item, isActive, priority = false, onVideoLoad, onVideoRegister }, ref) => {
    const isMobile = useMobileDetection(450);
    
    // Hide the 3rd slide (GIF) on mobile - only show 3 slides for mobile
    if (isMobile && item.id === "3") {
      return null;
    }
    
    // Check if it's a GIF to apply different styling
    const isGif = item.src.toLowerCase().endsWith('.gif');
    
    // Determine which image source to use
    const imageSrc = isMobile && item.mobileSrc ? item.mobileSrc : item.src;
    
    const commonStyles = {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: isGif ? 'contain' as const : 'cover' as const,
      transition: 'opacity 1s ease-in-out',
      opacity: isActive ? 1 : 0,
    };

    if (item.type === 'video') {
      // For mobile, show mobile image instead of video if available
      if (isMobile && item.mobileSrc) {
        return (
          <Image
            src={item.mobileSrc}
            alt={item.alt || ''}
            fill
            style={commonStyles}
            priority={priority}
            quality={95}
            sizes="100vw"
            className="hero-mobile-image"
          />
        );
      }
      
      return (
        <video
          ref={(videoElement) => {
            // Handle both forwardRef and onVideoRegister
            if (typeof ref === 'function') {
              ref(videoElement);
            } else if (ref) {
              ref.current = videoElement;
            }
            
            // Register video element for external management
            if (videoElement && onVideoRegister) {
              onVideoRegister(videoElement);
            }
          }}
          id={`video-${item.id}`}
          className="absolute inset-0 w-full h-full object-cover"
          style={commonStyles}
          muted
          playsInline
          autoPlay
          preload="auto"
          poster={item.fallbackSrc}
          onLoadedMetadata={(e) => {
            const video = e.currentTarget;
            onVideoLoad?.(video.duration, item.id);
          }}
        >
          <source src={item.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }

    // For GIFs, use different styling to prevent cropping
    if (isGif) {
      return (
        <Image
          src={imageSrc}
          alt={item.alt || ''}
          width={1920}
          height={1080}
          className={`absolute inset-0 w-full h-full ${isMobile ? 'hero-mobile-image' : ''}`}
        />
      );
    }

    return (
      <Image
        src={imageSrc}
        alt={item.alt || ''}
        fill
        style={commonStyles}
        priority={priority}
        quality={95}
        sizes="100vw"
        className={isMobile ? 'hero-mobile-image' : ''}
      />
    );
  }
);

HeroMedia.displayName = 'HeroMedia';