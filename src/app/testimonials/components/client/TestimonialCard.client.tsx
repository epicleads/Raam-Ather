'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, Instagram } from 'lucide-react';
import { Testimonial } from '../../data/testimonials.types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export default function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const [imageError, setImageError] = useState(false);
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

  const renderMediaContent = () => {
    // Check for Instagram reel first - show video player with thumbnail
    if (testimonial.instagramReelUrl) {
      // Get thumbnail based on card ID (p1, p2, p3, s1, s2, s3, c1, c2, c3)
      const getThumbnailPath = (id: string) => {
        const cardNumber = id.charAt(1); // Extract number from p1, s1, c1, etc.
        if (id.startsWith('s')) {
          // Service section uses tb4, tb5, tb6
          const serviceNumber = parseInt(cardNumber) + 3;
          return `/Ather-Assets/thumbnails/tb${serviceNumber}.png`;
        }
        if (id.startsWith('c')) {
          // Community section uses tb7, tb8, tb9
          const communityNumber = parseInt(cardNumber) + 6;
          return `/Ather-Assets/thumbnails/tb${communityNumber}.png`;
        }
        return `/Ather-Assets/thumbnails/tb${cardNumber}.png`;
      };

      // Get video path based on card ID
      const getVideoPath = (id: string) => {
        if (id === 'p1') return '/Ather-Assets/thumbnails/CJ1.mp4';
        if (id === 'p2') return '/Ather-Assets/thumbnails/CJ2.mp4';
        if (id === 'p3') return '/Ather-Assets/thumbnails/CJ3.mp4';
        if (id === 's1') return '/Ather-Assets/thumbnails/SE1.mp4';
        if (id === 's2') return '/Ather-Assets/thumbnails/SE2.mp4';
        if (id === 's3') return '/Ather-Assets/thumbnails/SE3.mp4';
        if (id === 'c1') return '/Ather-Assets/thumbnails/CE1.mp4';
        if (id === 'c2') return '/Ather-Assets/thumbnails/CE2.mp4';
        if (id === 'c3') return '/Ather-Assets/thumbnails/CE3.mp4';
        // Add more video mappings as needed
        return null;
      };

      const videoPath = getVideoPath(testimonial.id);

      return (
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[480px] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group overflow-hidden">
          {/* Video Player or Thumbnail */}
          {videoPath ? (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                src={videoPath}
                poster={getThumbnailPath(testimonial.id)}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
                onEnded={() => setIsVideoPlaying(false)}
              />
              
              {/* Play/Pause Button Overlay */}
              <button
                onClick={handleVideoPlay}
                className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div className="bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-full shadow-lg">
                  {isVideoPlaying ? (
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-600 rounded-sm"></div>
                  ) : (
                    <Play size={20} className="sm:w-6 sm:h-6 text-purple-600 ml-1" />
                  )}
                </div>
              </button>
            </div>
          ) : (
            <Image
              src={getThumbnailPath(testimonial.id)}
              alt={`Instagram Reel - ${testimonial.title}`}
              fill
              className="object-cover"
              priority={index < 3}
            />
          )}
          
          {/* Instagram Badge - Top Left */}
          {/* Removed Instagram badge - keeping only one Instagram button for entire grid */}

          {/* Small Instagram Redirect Button - Top Right */}
          <a 
            href={testimonial.instagramReelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-sm hover:bg-white transition-all duration-200 hover:scale-110 cursor-pointer"
            title="View on Instagram"
          >
            <Instagram size={14} className="sm:w-4 sm:h-4 text-purple-600" />
          </a>
        </div>
      );
    }

    // Video content - show thumbnail with play button
    if (testimonial.type === 'video' && testimonial.video) {
      return (
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[480px] bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group">
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center relative">
            {/* Play Button - Centered and Clickable */}
            <a 
              href={testimonial.video}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110 cursor-pointer"
            >
              <Play size={20} className="sm:w-6 sm:h-6 text-blue-600 ml-1" />
            </a>
            
            {/* Video Badge - Top Left */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full shadow-sm">
              <span className="text-xs sm:text-sm font-semibold text-blue-600">Video</span>
            </div>
          </div>
        </div>
      );
    }

    // Photo content - show actual image with play button overlay
    if (testimonial.photo && !imageError) {
      return (
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[480px] rounded-t-xl overflow-hidden group">
          <Image
            src={testimonial.photo}
            alt={testimonial.title || 'Testimonial image'}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            priority={index < 3}
          />
          
          {/* Play Button Overlay - Centered */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-full shadow-lg">
              <Play size={20} className="sm:w-6 sm:h-6 text-gray-700 ml-1" />
            </div>
          </div>
        </div>
      );
    }

    // Fallback gradient background
    return (
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[480px] bg-gradient-to-br from-gray-400 to-gray-600 rounded-t-xl flex items-center justify-center group">
        <div className="text-center text-white">
          <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-full mb-3 mx-auto w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
            <span className="text-xl sm:text-2xl">💬</span>
          </div>
          <p className="text-xs sm:text-sm font-medium">Customer Review</p>
        </div>
      </div>
    );
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer testimonial-card"
      whileHover={{ y: -4, scale: 1.02 }}
    >
      {/* Media Section - Full height with floating text */}
      <div className="media-section group">
        {renderMediaContent()}
        
        {/* Floating Text Overlay - Positioned closer to customer details to reduce gap */}
        <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <h4 className="text-white font-semibold text-sm sm:text-base mb-2 line-clamp-2">
            {testimonial.title}
          </h4>
          <blockquote className="text-white/90 text-xs leading-relaxed line-clamp-2">
            &ldquo;{testimonial.content}&rdquo;
          </blockquote>
        </div>

        {/* Customer Details Floating Directly on Video - REMOVED FOR CLEAN VIDEO REELS */}
        {/* <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              {testimonial.avatar ? (
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={28}
                  height={28}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <p className="text-xs sm:text-sm font-medium text-white">{testimonial.name}</p>
                <p className="text-xs text-white/80">{testimonial.city} • {testimonial.model || 'Ather'}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {testimonial.tags && testimonial.tags.length > 0 && (
              {testimonial.tags.slice(0, 2).map(tag => (
                <span
                  key={tag}
                  className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30"
                >
                  {tag}
                </span>
              ))}
            )}
          </div>
        </div> */}
      </div>
    </motion.article>
  );
}