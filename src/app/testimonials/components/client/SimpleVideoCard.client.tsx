'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Instagram } from 'lucide-react';

interface SimpleVideoCardProps {
  testimonial: {
    id: string;
    name: string;
    city: string;
    model?: string;
    content: string;
    instagramReelUrl?: string;
  };
  videoPath: string;
  thumbnailPath: string;
  index: number;
}

export default function SimpleVideoCard({ testimonial, videoPath, thumbnailPath, index }: SimpleVideoCardProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  return (
    <div className="relative w-full h-[400px] bg-black rounded-xl overflow-hidden">
      <video
        ref={videoRef}
        src={videoPath}
        poster={thumbnailPath}
        className="w-full h-full object-cover"
        loop
        muted
        playsInline
        preload="metadata"
        controls={false}
        onPlay={() => setIsVideoPlaying(true)}
        onPause={() => setIsVideoPlaying(false)}
        onEnded={() => setIsVideoPlaying(false)}
        onClick={handleVideoPlay}
      />
      
      {/* Play Button Overlay */}
      <button
        onClick={handleVideoPlay}
        className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all"
      >
        <div className="bg-white/90 p-4 rounded-full shadow-lg">
          {isVideoPlaying ? (
            <div className="w-8 h-8 bg-purple-600 rounded"></div>
          ) : (
            <Play size={32} className="text-purple-600 ml-1" />
          )}
        </div>
      </button>

      {/* Instagram Button */}
      {testimonial.instagramReelUrl && (
        <a 
          href={testimonial.instagramReelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-all"
        >
          <Instagram size={20} className="text-purple-600" />
        </a>
      )}

      {/* Customer Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
        <h3 className="font-semibold text-sm">{testimonial.name}</h3>
        <p className="text-xs opacity-90">{testimonial.city} • {testimonial.model || 'Ather'}</p>
        <p className="text-xs mt-1 line-clamp-2">&ldquo;{testimonial.content}&rdquo;</p>
      </div>
    </div>
  );
}
