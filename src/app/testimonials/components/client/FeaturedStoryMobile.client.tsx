'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { featuredStory } from '../../data/testimonials.config';

export default function FeaturedStoryMobile() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <section className="px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Featured <span className="text-[#00E396]">Story</span>
        </h2>
        <p className="text-base text-gray-600 max-w-md mx-auto">
          Dive deep into transformative journeys with Raam Ather
        </p>
      </div>

      <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-[#00E396]/20 transition-all duration-500 border border-gray-200">
        {/* Background Image/Video */}
        <div className="relative aspect-video overflow-hidden">
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
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 via-transparent to-transparent" />
        </div>

        {/* Content Overlay - Stacked Vertical Layout for Mobile */}
        <div className="absolute inset-0 flex items-center p-4">
          <div className="w-full">
            <div className="max-w-full">
              <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                {featuredStory.title}
              </h3>
              <p className="text-base text-[#00E396] font-medium mb-3">
                {featuredStory.subtitle}
              </p>
              <p className="text-sm text-gray-200 mb-6 leading-relaxed max-w-full">
                {featuredStory.description}
              </p>
              
              {/* Mobile-Optimized Button Layout */}
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handlePlayClick}
                  className="w-full bg-[#00E396] hover:bg-white text-black px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-[#00E396]/30 min-h-[44px]"
                >
                  <Play 
                    size={20} 
                    className="group-hover:scale-110 transition-transform" 
                    fill="currentColor"
                  />
                  <span>Watch Full Story</span>
                </button>
                
                <div className="text-center">
                  <div className="text-gray-300 text-sm">
                    <p>3 min read</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
