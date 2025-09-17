'use client';

import { useEffect, useState, useRef, ReactNode } from 'react';

interface HeroParallaxProps {
  children: ReactNode;
}

export function HeroParallax({ children }: HeroParallaxProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      if (parallaxRef.current) {
        const rect = parallaxRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, -rect.top / window.innerHeight);
        setScrollY(scrollProgress);
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [isMounted]);

  // Reduce parallax effects on mobile for better performance
  const parallaxIntensity = 0.5; // Fixed value instead of mobile detection
  const parallaxTransform = isMounted 
    ? `translate3d(0, ${scrollY * 50 * parallaxIntensity}px, 0) scale(${1 + scrollY * 0.1 * parallaxIntensity})` 
    : 'none';

  return (
    <div 
      ref={parallaxRef}
      className="absolute inset-0 will-change-transform"
      style={{
        transform: parallaxTransform,
        transformOrigin: 'center center'
      }}
    >
      {children}
    </div>
  );
}