'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { SafetyData, SafetyFeature } from './safety';

interface SafetyClientProps {
  data: SafetyData;
}

// Individual Safety Feature Card Component
function SafetyFeatureCard({ 
  feature, 
  index, 
  isInView 
}: { 
  feature: SafetyFeature; 
  index: number; 
  isInView: boolean;
}) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.25, 0.25, 0, 1]
      }}
      whileHover={{ 
        scale: 1.02,
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-green-500/30 transition-all duration-500 cursor-pointer h-[280px] md:h-[350px]"
    >
      {/* Media Background */}
      <div className="absolute inset-0">
        {feature.type === 'video' ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => {
              setIsVideoLoaded(true);
              setVideoError(false);
            }}
            onError={() => {
              setVideoError(true);
              setIsVideoLoaded(true);
            }}
            onCanPlay={() => {
              setIsVideoLoaded(true);
              setVideoError(false);
            }}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 pointer-events-none"
            aria-label={feature.alt}
          >
            <source src={feature.mediaPath} type={feature.mediaPath.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={feature.mediaPath}
            alt={feature.alt}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105 pointer-events-none"
            priority={feature.priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        )}
        
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        {/* Loading State for Videos */}
        {feature.type === 'video' && !isVideoLoaded && !videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        {/* Error State for Videos */}
        {feature.type === 'video' && videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="text-center p-4">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="text-xs text-gray-400">Video unavailable</p>
            </div>
          </div>
        )}
        
        <div className="space-y-2 transform transition-all duration-500 group-hover:translate-y-[-4px] opacity-0 group-hover:opacity-100">
          <motion.h3 
            className="text-xs md:text-sm font-bold text-white group-hover:text-green-400 transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
          >
            {feature.title}
          </motion.h3>
          
          <motion.div
            className="w-8 h-0.5 bg-green-400 group-hover:w-12 transition-all duration-500"
            initial={{ width: 0 }}
            animate={isInView ? { width: 32 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
          />
          
          <motion.p 
            className="text-xs text-gray-200 leading-tight max-w-xs"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
          >
            {feature.subtitle}
          </motion.p>
        </div>
      </div>

      {/* Hover Border Glow */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-green-500/20 group-hover:shadow-2xl group-hover:shadow-green-500/10 transition-all duration-500" />
      
      {/* Feature Type Indicator */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs text-gray-300 border border-gray-600">
          {feature.type === 'video' ? 'Video' : 'Image'}
        </div>
      </div>
    </motion.div>
  );
}


// Main Safety Client Component
export function SafetyClient({ data }: SafetyClientProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <div ref={sectionRef} className="relative">
      {/* Desktop Grid */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 1, ease: [0.25, 0.25, 0, 1] }}
        className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
      >
        {data.features.map((feature, index) => (
          <SafetyFeatureCard 
            key={feature.id} 
            feature={feature} 
            index={index} 
            isInView={isInView} 
          />
        ))}
      </motion.div>

      {/* Mobile Vertical Layout */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 1, ease: [0.25, 0.25, 0, 1] }}
        className="md:hidden space-y-6 px-4"
      >
        {data.features.map((feature, index) => (
          <SafetyFeatureCard 
            key={feature.id} 
            feature={feature} 
            index={index} 
            isInView={isInView} 
          />
        ))}
      </motion.div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute -top-32 -right-32 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 2, delay: 0.7 }}
          className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>
    </div>
  );
}