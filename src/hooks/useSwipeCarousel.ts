import { useState, useRef, useCallback, useEffect } from 'react';

export const useSwipeCarousel = (
  items: unknown[],
  onIndexChange: (index: number) => void,
  autoPlayInterval = 5000
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = useCallback((index: number) => {
    const newIndex = Math.max(0, Math.min(index, items.length - 1));
    setCurrentIndex(newIndex);
    onIndexChange(newIndex);
  }, [items.length, onIndexChange]);

  const goToNext = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const goToPrevious = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    
    autoPlayRef.current = setInterval(() => {
      if (isAutoPlaying) {
        goToNext();
      }
    }, autoPlayInterval);
  }, [isAutoPlaying, goToNext, autoPlayInterval]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    stopAutoPlay();
  }, [stopAutoPlay]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    setTranslateX(diffX);
  }, [isDragging, startX]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    
    if (Math.abs(translateX) > 50) {
      if (translateX > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }
    
    setTranslateX(0);
    startAutoPlay();
  }, [translateX, goToPrevious, goToNext, startAutoPlay]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    stopAutoPlay();
  }, [stopAutoPlay]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const currentX = e.clientX;
    const diffX = currentX - startX;
    setTranslateX(diffX);
  }, [isDragging, startX]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    
    if (Math.abs(translateX) > 50) {
      if (translateX > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }
    
    setTranslateX(0);
    startAutoPlay();
  }, [translateX, goToPrevious, goToNext, startAutoPlay]);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);

  return {
    currentIndex,
    goToSlide,
    goToNext,
    goToPrevious,
    isDragging,
    translateX,
    containerRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    startAutoPlay,
    stopAutoPlay
  };
};
