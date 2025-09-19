import { useState, useEffect, useCallback } from 'react';

export interface UseHeroLoadingOptions {
  minLoadingTime?: number;
  showProgressBar?: boolean;
  enablePreload?: boolean;
}

export interface UseHeroLoadingReturn {
  isLoading: boolean;
  progress: number;
  loadingMessage: string;
  setLoadingComplete: () => void;
  setProgress: (progress: number) => void;
  setLoadingMessage: (message: string) => void;
}

const LOADING_MESSAGES = [
  "Initializing premium experience...",
  "Loading Ather electric scooters...",
  "Preparing your journey...",
  "Almost ready...",
];

export function useHeroLoading({
  minLoadingTime = 1500,
  showProgressBar = true,
  enablePreload = true
}: UseHeroLoadingOptions = {}): UseHeroLoadingReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgressState] = useState(0);
  const [loadingMessage, setLoadingMessageState] = useState(LOADING_MESSAGES[0]);
  const [startTime] = useState(Date.now());

  // Auto-progress simulation
  useEffect(() => {
    if (!showProgressBar || !isLoading) return;

    const progressInterval = setInterval(() => {
      setProgressState(prev => {
        if (prev >= 95) return prev;
        
        // Faster progress initially, slower as it approaches completion
        const increment = prev < 30 ? 8 : prev < 60 ? 4 : prev < 90 ? 2 : 0.5;
        return Math.min(prev + increment, 95);
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [showProgressBar, isLoading]);

  // Auto-update loading messages
  useEffect(() => {
    if (!isLoading) return;

    const messageInterval = setInterval(() => {
      setLoadingMessageState(prev => {
        const currentIndex = LOADING_MESSAGES.indexOf(prev);
        const nextIndex = (currentIndex + 1) % LOADING_MESSAGES.length;
        return LOADING_MESSAGES[nextIndex];
      });
    }, 1200);

    return () => clearInterval(messageInterval);
  }, [isLoading]);

  // Preload critical resources
  useEffect(() => {
    if (!enablePreload) return;

    const preloadResources = async () => {
      try {
        // Preload critical fonts
        if ('fonts' in document) {
          await document.fonts.ready;
        }

        // Preload critical images/videos if needed
        const criticalAssets: string[] = [
          // Add your critical asset URLs here
        ];

        await Promise.allSettled(
          criticalAssets.map(url => {
            if (url.includes('.mp4') || url.includes('.webm')) {
              // Preload video metadata
              const video = document.createElement('video');
              video.preload = 'metadata';
              video.src = url;
              return new Promise(resolve => {
                video.addEventListener('loadedmetadata', resolve);
                video.addEventListener('error', resolve);
              });
            } else {
              // Preload image
              const img = new Image();
              img.src = url;
              return img.decode().catch(() => {}); // Ignore errors
            }
          })
        );
      } catch (error) {
        console.warn('Hero preload failed:', error);
      }
    };

    preloadResources();
  }, [enablePreload]);

  const setLoadingComplete = useCallback(() => {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

    // Ensure minimum loading time for smooth UX
    setTimeout(() => {
      setProgressState(100);
      setTimeout(() => {
        setIsLoading(false);
      }, 200); // Small delay for progress completion animation
    }, remainingTime);
  }, [minLoadingTime, startTime]);

  const setProgress = useCallback((newProgress: number) => {
    setProgressState(Math.max(0, Math.min(100, newProgress)));
  }, []);

  const setLoadingMessage = useCallback((message: string) => {
    setLoadingMessageState(message);
  }, []);

  return {
    isLoading,
    progress,
    loadingMessage,
    setLoadingComplete,
    setProgress,
    setLoadingMessage
  };
}
