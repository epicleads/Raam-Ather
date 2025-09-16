'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, Instagram } from 'lucide-react';
import { Testimonial } from '../../data/testimonials.types';

interface TestimonialCardMobileProps {
  testimonial: Testimonial;
  index: number;
}

export default function TestimonialCardMobile({ testimonial, index }: TestimonialCardMobileProps) {
  const [imageError, setImageError] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoPlay = () => {
    if (videoRef.current) {
      try {
        if (isVideoPlaying) {
          videoRef.current.pause();
          setIsVideoPlaying(false);
        } else {
          videoRef.current.play();
          setIsVideoPlaying(true);
        }
      } catch (error) {
        console.log('Video play error:', error);
      }
    }
  };

  // Simple mobile video play handler
  const playVideo = () => {
    if (videoRef.current && !isVideoPlaying) {
      videoRef.current.play().then(() => {
        setIsVideoPlaying(true);
      }).catch((error) => {
        console.log('Video play failed:', error);
        // Try alternative approach
        videoRef.current!.muted = true;
        videoRef.current!.play().then(() => {
          setIsVideoPlaying(true);
        });
      });
    }
  };

  // Simple mobile video pause handler
  const pauseVideo = () => {
    if (videoRef.current && isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  // Show controls briefly on mobile to indicate interactivity
  useEffect(() => {
    if (videoRef.current) {
      const timer = setTimeout(() => {
        // Instructions will be shown in the UI
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Hide controls after a delay when not playing
  useEffect(() => {
    if (!isVideoPlaying) {
      const timer = setTimeout(() => {
        // setShowVideoControls(false); // This state was removed
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isVideoPlaying]); // Removed showVideoControls from dependency array

  // Show mobile instruction overlay briefly
  useEffect(() => {
    const timer = setTimeout(() => {
      // Instructions will be shown in the UI
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // DEBUG: Log video element when component mounts
  useEffect(() => {
    if (videoRef.current) {
      console.log(`🔍 Video element mounted for ${testimonial.id}:`, {
        videoElement: videoRef.current,
        videoSrc: videoRef.current.src,
        videoPoster: videoRef.current.poster,
        elementWidth: videoRef.current.offsetWidth,
        elementHeight: videoRef.current.offsetHeight,
        elementVisible: videoRef.current.offsetParent !== null,
        parentElement: videoRef.current.parentElement,
        parentWidth: videoRef.current.parentElement?.offsetWidth,
        parentHeight: videoRef.current.parentElement?.offsetHeight
      });
    }
  }, [testimonial.id]);

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
      
      // DEBUG: Log video and thumbnail paths
      console.log(`🎥 DEBUG - Video paths for ${testimonial.id}:`, {
        videoPath,
        thumbnailPath,
        hasVideoPath: !!videoPath,
        hasThumbnailPath: !!thumbnailPath
      });

      // If there's an error loading thumbnails, show fallback immediately
      if (imageError) {
        return (
          <div className="relative w-full h-[300px] bg-gradient-to-br from-green-400 to-blue-500 rounded-t-xl flex items-center justify-center group">
            <div className="text-center text-white px-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-full mb-3 mx-auto w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                <span className="text-xl sm:text-2xl">📹</span>
              </div>
              <h3 className="text-sm sm:text-base font-semibold mb-1">{testimonial.name}</h3>
              <p className="text-xs sm:text-sm opacity-90 mb-2">{testimonial.city} • {testimonial.model}</p>
              <p className="text-xs sm:text-sm font-medium">Instagram Reel</p>
              <p className="text-xs opacity-80 mt-2 line-clamp-2">&ldquo;{testimonial.content}&rdquo;</p>
            </div>

            <a
              href={testimonial.instagramReelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 right-3 z-30 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white transition-all duration-200 hover:scale-110 cursor-pointer"
              title="View on Instagram"
            >
              <Instagram size={16} className="text-purple-600" />
            </a>
          </div>
        );
      }

      return (
        <div className="relative w-full h-[300px] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group overflow-hidden">
          {/* Video Player or Thumbnail */}
          {videoPath ? (
            (() => {
              // DEBUG: Log when video is being rendered
              console.log(`🎬 DEBUG - Rendering video for ${testimonial.id}:`, {
                videoPath,
                thumbnailPath,
                testimonialType: testimonial.type,
                hasInstagramReel: !!testimonial.instagramReelUrl
              });
              return (
                <div 
                  className="relative w-full h-full flex items-center justify-center overflow-hidden"
                  style={{
                    minHeight: '300px',
                    backgroundColor: 'rgba(255,0,0,0.3)', // DEBUG: More visible red background
                    border: '2px solid red' // DEBUG: Red border to see container
                  }}
                >
                  <video
                    ref={videoRef}
                    src={videoPath}
                    poster={getThumbnailPath(testimonial.id)}
                    className="absolute inset-0 w-full h-full object-cover cursor-pointer object-center z-10"
                    style={{
                      zIndex: 10,
                      visibility: 'visible',
                      opacity: 1,
                      display: 'block'
                    }}
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    controls={false}
                    webkit-playsinline="true"
                    onPlay={() => {
                      console.log(`🎬 Video playing for ${testimonial.id}!`);
                      setIsVideoPlaying(true);
                    }}
                    onPause={() => {
                      console.log(`⏸️ Video paused for ${testimonial.id}!`);
                      setIsVideoPlaying(false);
                    }}
                    onEnded={() => {
                      console.log(`🏁 Video ended for ${testimonial.id}!`);
                      setIsVideoPlaying(false);
                    }}
                    onLoadedData={() => {
                      console.log(`✅ Video loaded for ${testimonial.id}!`, {
                        videoElement: videoRef.current,
                        videoSrc: videoRef.current?.src,
                        videoPoster: videoRef.current?.poster,
                        videoWidth: videoRef.current?.videoWidth,
                        videoHeight: videoRef.current?.videoHeight,
                        elementWidth: videoRef.current?.offsetWidth,
                        elementHeight: videoRef.current?.offsetHeight,
                        elementVisible: videoRef.current?.offsetParent !== null,
                        elementDisplay: window.getComputedStyle(videoRef.current!).display,
                        elementVisibility: window.getComputedStyle(videoRef.current!).visibility
                      });
                    }}
                    onError={(e) => {
                      console.error(`❌ Video error for ${testimonial.id}:`, {
                        error: e,
                        videoSrc: videoPath,
                        videoElement: videoRef.current
                      });
                    }}
                    onLoadStart={() => {
                      console.log(`🔄 Video load started for ${testimonial.id}`);
                    }}
                    onCanPlay={() => {
                      console.log(`🎯 Video can play for ${testimonial.id}`);
                    }}
                    onClick={handleVideoPlay}
                    onTouchStart={() => {
                      console.log(`👆 Touch start detected for ${testimonial.id}`);
                      playVideo();
                    }}
                    onTouchEnd={() => {
                      console.log(`👆 Touch end detected for ${testimonial.id}`);
                      pauseVideo();
                    }}
                  />
              
                  {/* Play/Pause Button Overlay - ALWAYS VISIBLE ON MOBILE */}
                  <button
                    onClick={handleVideoPlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/10 z-20 hover:bg-black/20 transition-all duration-200"
                    aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                    style={{
                      zIndex: 20,
                      pointerEvents: 'auto'
                    }}
                  >
                <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110 border-2 border-white/50">
                  {isVideoPlaying ? (
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-purple-600 rounded-sm"></div>
                  ) : (
                    <Play size={28} className="text-purple-600 ml-1" />
                  )}
                </div>
              </button>

              {/* Mobile Video Status Indicator */}
              <div className="absolute top-3 left-3 z-20 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                {isVideoPlaying ? 'Playing' : 'Tap to Play'}
              </div>

              {/* Instagram Redirect Button - Top Right */}
              <a 
                href={testimonial.instagramReelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 z-30 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white transition-all duration-200 hover:scale-110 cursor-pointer"
                title="View on Instagram"
              >
                <Instagram size={16} className="text-purple-600" />
              </a>
            </div>
              );
            })()
          ) : (
            <Image
              src={thumbnailPath}
              alt={`Instagram Reel - ${testimonial.title}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw"
              className="object-cover"
              priority={index < 3}
              onError={() => {
                console.warn(`Mobile thumbnail failed to load: ${thumbnailPath}`);
                setImageError(true);
              }}
            />
          )}
          
          {/* Small Instagram Redirect Button - Top Right */}
          <a 
            href={testimonial.instagramReelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 z-30 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white transition-all duration-200 hover:scale-110 cursor-pointer"
            title="View on Instagram"
          >
            <Instagram size={16} className="text-purple-600" />
          </a>
        </div>
      );
    }

    // Video content - show thumbnail with play button
    if (testimonial.type === 'video' && testimonial.video) {
      return (
        <div className="relative w-full h-[300px] bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group">
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center relative">
            {/* Play Button - Centered and Clickable */}
            <a 
              href={testimonial.video}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110 cursor-pointer"
            >
              <Play size={24} className="text-blue-600 ml-1" />
            </a>
            
            {/* Video Badge - Top Left */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
              <span className="text-sm font-semibold text-blue-600">Video</span>
            </div>
          </div>
        </div>
      );
    }

    // Photo content - show actual image with play button overlay
    if (testimonial.photo && !imageError) {
      return (
        <div className="relative w-full h-[300px] rounded-t-xl overflow-hidden group">
          <Image
            src={testimonial.photo}
            alt={testimonial.title || 'Testimonial image'}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw"
            className="object-cover"
            onError={() => setImageError(true)}
            priority={index < 3}
          />
          
          {/* Play Button Overlay - Centered */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg">
              <Play size={24} className="text-gray-700 ml-1" />
            </div>
          </div>
        </div>
      );
    }

    // Fallback gradient background
    return (
      <div className="relative w-full h-[300px] bg-gradient-to-br from-gray-400 to-gray-600 rounded-t-xl flex items-center justify-center group">
        <div className="text-center text-white">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full mb-3 mx-auto w-16 h-16 flex items-center justify-center">
            <span className="text-2xl">💬</span>
          </div>
          <p className="text-sm font-medium">Customer Review</p>
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
      whileHover={{ y: -2, scale: 1.01 }}
    >
      {/* Media Section - Full height with floating text */}
      <div className="media-section group">
        {renderMediaContent()}
        
        {/* Floating Text Overlay - REMOVED FOR MOBILE VIDEO ACCESSIBILITY */}
        {/* <div className="absolute bottom-20 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <h4 className="text-white font-semibold text-xs mb-1 line-clamp-2">
            {testimonial.title}
          </h4>
          <blockquote className="text-white/80 text-xs leading-relaxed line-clamp-2">
            &ldquo;{testimonial.content}&rdquo;
          </blockquote>
        </div> */}

        {/* Customer Details Floating Directly on Video - REMOVED FOR MOBILE VIDEO ACCESSIBILITY */}
        {/* <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {testimonial.avatar ? (
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <p className="text-xs font-medium text-white/90">{testimonial.name}</p>
                <p className="text-xs text-white/70">{testimonial.city} • {testimonial.model || 'Ather'}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {testimonial.tags && testimonial.tags.length > 0 && (
              {testimonial.tags.slice(0, 2).map(tag => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 bg-white/15 backdrop-blur-sm text-white/80 text-xs rounded-full border border-white/20"
                >
                  {tag}
                </span>
              ))}
            )}
          </div>
        </div> */}
      </div>

      {/* Customer Details Section - REMOVED FOR CLEAN VIDEO REELS */}
      {/* <div className="p-4 bg-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {testimonial.avatar ? (
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={32}
                height={32}
                sizes="32px"
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h4 className="text-sm font-semibold text-gray-900">{testimonial.name}</h4>
              <p className="text-xs text-gray-600">{testimonial.city} • {testimonial.model || 'Ather'}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {testimonial.tags && testimonial.tags.length > 0 && (
            {testimonial.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200"
              >
                {tag}
              </span>
            ))}
          )}
        </div>
      </div> */}
    </motion.article>
  );
}
