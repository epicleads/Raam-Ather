"use client";
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const FEATURES = [
  {
    title: 'SkidControl™',
    type: 'video',
    src: '/Ather-Assets/Rizta/Skid control_desk.mp4',
    alt: 'SkidControl™',
    desc: 'Always stay in control with the SkidControl™ feature. Ride through wet, sandy or bumpy roads easily.',
  },
  {
    title: 'Share Live Location',
    type: 'video',
    src: '/Ather-Assets/Rizta/fall safe_desk.mp4',
    alt: 'Share Live Location',
    desc: 'Let your family know where you are, every step of the way. Even when you’re riding.',
  },
  {
    title: 'Tow & Theft Alerts',
    type: 'video',
    src: '/Ather-Assets/Rizta/Theft_desk.mp4',
    alt: 'Tow & Theft Alerts',
    desc: `When your Ather is parked, you'll be notified of the slightest movement. Lights flash to alert others nearby.`,
  },
  {
    title: 'Ping My Scooter',
    type: 'video',
    src: '/Ather-Assets/Rizta/ping my scooter_desk_1.mp4',
    alt: 'Ping My Scooter',
    desc: 'Find your scooter wherever it’s parked, with flashing light alerts.',
  },
  {
    title: 'Emergency Stop Signal',
    type: 'video',
    src: '/Ather-Assets/Rizta/ESS_desk.mp4',
    alt: 'Emergency Stop Signal',
    desc: 'Tail lights flash when you brake suddenly to alert riders behind you.',
  },
  {
    title: 'Front Disc Brake',
    type: 'image',
    src: '/Ather-Assets/Rizta/Front-Disc-Brake.webp',
    alt: 'Front Disc Brake',
    desc: 'Stop exactly where you want with brakes that react instantly.',
  },
  {
    title: 'FallSafe™',
    type: 'video',
    src: '/Ather-Assets/Rizta/fall safe_desk.mp4',
    alt: 'FallSafe™',
    desc: 'If the scooter falls, motor shuts down automatically so you get up safer.',
  },
 
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

interface FeatureCardProps {
  feature: {
    title: string;
    type: string;
    src: string;
    alt: string;
    desc: string;
    description?: string;
    icon?: string;
    image?: string;
  };
  active: boolean;
  onClick: () => void;
  description: boolean;
}

function FeatureCard({ feature, active, onClick, description }: FeatureCardProps) {
  return (
    <motion.div
      layout
      whileHover={!active ? { y: -4, transition: { duration: 0.2 } } : {}}
      whileTap={{ scale: 0.98 }}
      className={`group relative bg-white border border-gray-100 hover:border-gray-200 overflow-hidden transition-all duration-300 cursor-pointer ${active ? 'border-green-500 shadow-lg' : 'hover:shadow-md hover:shadow-black/5'}`}
      onClick={onClick}
    >
      {/* Media Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {feature.type === 'video' ? (
          <video
            src={feature.src}
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            preload="metadata"
            controls={false}
            disablePictureInPicture
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            style={{ background: '#fff' }}
            onCanPlay={(e) => {
              const video = e.target as HTMLVideoElement;
              video.play().catch(() => {
                // Fallback if autoplay fails
                console.log('Autoplay failed for video:', feature.src);
              });
            }}
          />
        ) : (
          <Image
            src={feature.src}
            alt={feature.alt}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            priority
          />
        )}
        
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-black font-[Inter] leading-tight group-hover:text-green-600 transition-colors">
            {feature.title}
          </h3>
          <div className="ml-2 w-1 h-6 bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        {description && (
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
            {feature.desc}
          </p>
        )}
      </div>

      {/* Active State Indicator */}
      {active && (
        <div className="absolute inset-0 border-2 border-green-500 pointer-events-none" />
      )}
    </motion.div>
  );
}

export default function RiztaSafetyClient() {
  const isMobile = useIsMobile();
  const [activeIdx, setActiveIdx] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Snap to active card on mobile
  useEffect(() => {
    if (isMobile && sliderRef.current) {
      const card = sliderRef.current.children[activeIdx] as HTMLElement;
      if (card) card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeIdx, isMobile]);

  // Mobile: single card slider
  if (isMobile) {
    return (
      <div className="space-y-6">
        {/* Single Card View with Full Width */}
        <div className="w-full px-4">
          <div className="w-full">
            <FeatureCard 
              feature={FEATURES[activeIdx]} 
              active={true} 
              onClick={() => {}}
              description={true}
            />
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2">
          {FEATURES.map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIdx === i 
                  ? 'bg-green-500 w-6' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => setActiveIdx(i)}
              aria-label={`Go to feature ${i + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-between items-center px-4">
          <button
            onClick={() => setActiveIdx((prev) => (prev > 0 ? prev - 1 : FEATURES.length - 1))}
            className="flex items-center justify-center w-12 h-12 bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50"
            aria-label="Previous feature"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="text-center">
            <span className="text-sm text-gray-500 font-medium">
              {activeIdx + 1} of {FEATURES.length}
            </span>
          </div>

          <button
            onClick={() => setActiveIdx((prev) => (prev < FEATURES.length - 1 ? prev + 1 : 0))}
            className="flex items-center justify-center w-12 h-12 bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50"
            aria-label="Next feature"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Desktop: 3 cards in first row, 4 cards in second row
  return (
    <div className="space-y-8">
      {/* First Row - 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.slice(0, 3).map((feature) => (
          <FeatureCard 
            key={feature.title} 
            feature={feature} 
            active={false}
            onClick={() => {}}
            description={true}
          />
        ))}
      </div>

      {/* Second Row - 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.slice(3, 7).map((feature) => (
          <FeatureCard 
            key={feature.title} 
            feature={feature} 
            active={false}
            onClick={() => {}}
            description={true}
          />
        ))}
      </div>
    </div>
  );
}
