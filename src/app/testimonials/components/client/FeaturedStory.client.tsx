'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { featuredStory } from '../../data/testimonials.config';

export default function FeaturedStory() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <section id="featured-story" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
      {/* Hide on very small mobile screens */}
      <div className="block sm:block">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Featured <span className="text-[#00E396]">Story</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Dive deep into transformative journeys with Raam Ather
          </p>
        </div>

        <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-[#00E396]/20 transition-all duration-500 border border-gray-200">
          {/* Background Image/Video */}
          <div className="relative aspect-video md:aspect-[21/9] overflow-hidden">
            {isPlaying ? (
              <video
                src={featuredStory.video}
                className="w-full h-full object-cover"
                autoPlay
                muted
                onEnded={handleVideoEnd}
                controls
              />
            ) : (
              <Image
                src={featuredStory.poster}
                alt={featuredStory.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 via-transparent to-transparent" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-center justify-between">
              <div className="max-w-2xl text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                  {featuredStory.title}
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-[#00E396] font-medium mb-3 sm:mb-4">
                  {featuredStory.subtitle}
                </p>
                <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-xl">
                  {featuredStory.description}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                  <button 
                    onClick={handlePlayClick}
                    className="w-full sm:w-auto bg-[#00E396] hover:bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-[#00E396]/30"
                  >
                    <Play 
                      size={18} 
                      className="group-hover/btn:scale-110 transition-transform" 
                      fill="currentColor"
                    />
                    <span>Watch Full Story</span>
                  </button>
                  
                  <div className="text-gray-300 text-sm">
                    <p>3 min read</p>
                  </div>
                </div>
              </div>

              {/* Large Play Button - Hidden on mobile, shown on large screens */}
              <div className="hidden lg:flex items-center justify-center mt-6 lg:mt-0">
                <div className="relative">
                  <button 
                    onClick={handlePlayClick}
                    className="w-20 h-20 xl:w-24 xl:h-24 bg-[#00E396]/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-[#00E396]/30 group-hover:bg-[#00E396]/30 transition-all duration-300"
                  >
                    <Play 
                      size={28} 
                      className="text-[#00E396] ml-1 group-hover:scale-110 transition-transform" 
                      fill="currentColor"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
