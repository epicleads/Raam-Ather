'use client';

import { useState, useEffect } from 'react';
import type { HeroScrollIndicatorProps } from '../home-hero.types';

export function HeroScrollIndicator({ isVisible }: HeroScrollIndicatorProps) {
  const [shouldShow, setShouldShow] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setShouldShow(!scrolled && isVisible);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldShow) return null;

  return (
    <div 
      className="absolute bottom-8 left-8 flex flex-col items-center z-20 transition-opacity duration-500"
      style={{
        opacity: shouldShow ? 1 : 0
      }}
    >
      {/* Scroll Text */}
      <span 
        className="text-black text-sm font-medium mb-4 writing-mode-vertical transform rotate-180"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          letterSpacing: '2px',
          fontSize: '12px',
          fontWeight: '500',
          textShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}
      >
        SCROLL
      </span>

      {/* Animated Line */}
      <div 
        className="w-px bg-gradient-to-b from-transparent via-black to-transparent relative overflow-hidden"
        style={{
          height: '60px',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.8) 80%, transparent 100%)'
        }}
      >
        {/* Moving dot */}
        <div 
          className="absolute w-2 h-2 bg-black rounded-full left-1/2 transform -translate-x-1/2"
          style={{
            animation: isAnimating ? 'scrollDot 2s ease-in-out infinite' : 'none',
            top: '10px',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)'
          }}
        />
      </div>

      {/* Arrow */}
      <div 
        className="mt-4 transform transition-transform duration-300"
        style={{
          animation: isAnimating ? 'bounce 2s ease-in-out infinite' : 'none'
        }}
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="black" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{
            filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.1))'
          }}
        >
          <path d="M7 13l3 3 3-3" />
          <path d="M7 6l3 3 3-3" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes scrollDot {
          0% {
            top: 10px;
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            top: 50px;
            opacity: 0;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
}