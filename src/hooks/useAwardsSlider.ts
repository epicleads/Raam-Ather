import { useState, useEffect, useCallback, useMemo } from 'react';

interface UseAwardsSliderProps {
  itemsLength: number;
  autoSlideInterval?: number;
  enableAutoSlide?: boolean;
}

export const useAwardsSlider = ({ 
  itemsLength, 
  autoSlideInterval = 4000, 
  enableAutoSlide = true 
}: UseAwardsSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % itemsLength);
  }, [itemsLength]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + itemsLength) % itemsLength);
  }, [itemsLength]);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < itemsLength) {
      setCurrentSlide(index);
    }
  }, [itemsLength]);

  // Auto-slide effect
  useEffect(() => {
    if (!enableAutoSlide || itemsLength <= 1) return;

    const interval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(interval);
  }, [nextSlide, autoSlideInterval, enableAutoSlide, itemsLength]);

  // Touch handlers with optimized performance
  const touchHandlers = useMemo(() => {
    const minSwipeDistance = 50;
    let touchStart: number | null = null;

    return {
      onTouchStart: (e: React.TouchEvent) => {
        touchStart = e.targetTouches[0].clientX;
      },
      onTouchMove: (e: React.TouchEvent) => {
        // Prevent default to avoid scroll interference
        if (touchStart !== null) {
          e.preventDefault();
        }
      },
      onTouchEnd: (e: React.TouchEvent) => {
        if (!touchStart) return;
        
        const touchEnd = e.changedTouches[0].clientX;
        const distance = touchStart - touchEnd;
        
        if (Math.abs(distance) > minSwipeDistance) {
          if (distance > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
        touchStart = null;
      }
    };
  }, [nextSlide, prevSlide]);

  // Keyboard navigation
  const keyboardHandlers = useMemo(() => ({
    onKeyDown: (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextSlide();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(itemsLength - 1);
          break;
      }
    }
  }), [prevSlide, nextSlide, goToSlide, itemsLength]);

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    touchHandlers,
    keyboardHandlers
  };
};
