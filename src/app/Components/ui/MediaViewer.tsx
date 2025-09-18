'use client';

import { memo, useCallback } from 'react';
import Image from 'next/image';

interface MediaViewerProps {
  src: string;
  alt: string;
  type: 'image' | 'video';
  priority?: boolean;
  className?: string;
  poster?: string;
  isActive?: boolean;
  onVideoEnd?: () => void;
  onVideoError?: (error: string) => void;
  videoRef?: (el: HTMLVideoElement | null) => void;
}

export const MediaViewer = memo(({
  src,
  alt,
  type,
  priority = false,
  className = '',
  poster,
  isActive = false,
  onVideoEnd,
  onVideoError,
  videoRef
}: MediaViewerProps) => {
  const handleVideoError = useCallback((e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    if (onVideoError) {
      onVideoError(e.type);
    }
  }, [onVideoError]);

  const handleVideoEnded = useCallback(() => {
    if (onVideoEnd) {
      onVideoEnd();
    }
  }, [onVideoEnd]);

  if (type === 'video') {
    return (
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={isActive}
        muted
        loop={false}
        playsInline
        preload={priority ? "metadata" : "none"}
        className={`w-full h-full object-cover ${className}`}
        onError={handleVideoError}
        onEnded={handleVideoEnded}
        aria-label={alt}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover transform-gpu ${className}`}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'translate3d(0, 0, 0)'
      }}
      sizes="100vw"
      quality={priority ? 90 : 75}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
    />
  );
});

MediaViewer.displayName = 'MediaViewer';