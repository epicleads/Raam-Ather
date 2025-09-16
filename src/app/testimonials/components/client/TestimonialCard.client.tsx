'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, Instagram, Pause } from 'lucide-react';
import { Testimonial } from '../../data/testimonials.types';
import '../../testimonials.css';

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
      const thumbnailPath = getThumbnailPath(testimonial.id);

      // If there's an error loading thumbnails, show fallback immediately
      if (imageError) {
        return (
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[480px] bg-gradient-to-br from-green-400 to-blue-500 rounded-t-xl flex items-center justify-center group">
            <div className="text-center text-white px-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-full mb-3 mx-auto w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                <span className="text-xl sm:text-2xl">📹</span>
              </div>
              <h3 className="text-sm sm:text-base font-semibold mb-1">{testimonial.name}</h3>
              <p className="text-xs sm:text-sm opacity-90 mb-2">{testimonial.city} • {testimonial.model}</p>
              <p className="text-xs sm:text-sm font-medium">Instagram Reel</p>
            </div>

            <div className="customer-info-overlay">
              <div className="customer-name">{testimonial.name}</div>
              <div className="customer-details">{testimonial.city} • {testimonial.model || 'Ather'}</div>
              <div className="customer-review">&ldquo;{testimonial.content}&rdquo;</div>
            </div>

            <a
              href={testimonial.instagramReelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-icon"
              title="View on Instagram"
            >
              <Instagram size={16} className="text-purple-600" />
            </a>
          </div>
        );
      }

      return (
        <div className="testimonial-video-container">
          {videoPath ? (
            <>
              <video
                ref={videoRef}
                src={videoPath}
                poster={thumbnailPath}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
                onEnded={() => setIsVideoPlaying(false)}
                onError={() => {
                  console.warn(`Video failed to load: ${videoPath}`);
                  // Fallback to thumbnail image if video fails
                }}
              />

              {/* Play/Pause Button Overlay */}
              {!isVideoPlaying && (
                <button
                  onClick={handleVideoPlay}
                  className="play-button-overlay"
                >
                  <Play size={24} className="text-purple-600 ml-1" />
                </button>
              )}

              {/* Pause Button Overlay when playing */}
              {isVideoPlaying && (
                <button
                  onClick={handleVideoPlay}
                  className="play-button-overlay opacity-0 hover:opacity-100 transition-opacity duration-300"
                >
                  <Pause size={24} className="text-purple-600" />
                </button>
              )}
            </>
          ) : (
            <Image
              src={thumbnailPath}
              alt={`Instagram Reel - ${testimonial.title}`}
              fill
              className="object-cover"
              priority={index < 3}
              onError={() => {
                console.warn(`Thumbnail failed to load: ${thumbnailPath}`);
                setImageError(true);
              }}
            />
          )}

          {/* Instagram Icon - Top Right */}
          <a
            href={testimonial.instagramReelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-icon"
            title="View on Instagram"
          >
            <Instagram size={16} className="text-purple-600" />
          </a>

          {/* Customer Info Overlay */}
          <div className="customer-info-overlay">
            <div className="customer-name">{testimonial.name}</div>
            <div className="customer-details">{testimonial.city} • {testimonial.model || 'Ather'}</div>
            <div className="customer-review">&ldquo;{testimonial.content}&rdquo;</div>
          </div>
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

            {/* Customer Info Overlay */}
            <div className="customer-info-overlay">
              <div className="customer-name">{testimonial.name}</div>
              <div className="customer-details">{testimonial.city} • {testimonial.model || 'Ather'}</div>
              <div className="customer-review">&ldquo;{testimonial.content}&rdquo;</div>
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

          {/* Customer Info Overlay */}
          <div className="customer-info-overlay">
            <div className="customer-name">{testimonial.name}</div>
            <div className="customer-details">{testimonial.city} • {testimonial.model || 'Ather'}</div>
            <div className="customer-review">&ldquo;{testimonial.content}&rdquo;</div>
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
      className="testimonial-reel-card group cursor-pointer"
      whileHover={{ y: -4, scale: 1.02 }}
    >
      {renderMediaContent()}
    </motion.article>
  );
}