'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Simplified icons
const Icons = {
  seat: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7V5a2 2 0 012-2h14a2 2 0 012 2v2M3 7l1 8a2 2 0 002 2h12a2 2 0 002-2l1-8M3 7h18" />
    </svg>
  ),
  footboard: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  ),
  suspension: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  silent: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  )
};

const comfortFeatures = [
  {
    id: 'seating',
    title: 'Ergonomic Seating',
    description: 'Premium cushioning with optimal angle for posture support.',
    icon: Icons.seat,
    animation: 'glow'
  },
  {
    id: 'footboard',
    title: 'Spacious Footboard',
    description: 'Wide flat floor for bags, groceries, or relaxed stance.',
    icon: Icons.footboard,
    animation: 'expand'
  },
  {
    id: 'suspension',
    title: 'Superior Suspension',
    description: 'Glide through potholes and bumps effortlessly.',
    icon: Icons.suspension,
    animation: 'bounce'
  },
  {
    id: 'silent',
    title: 'Silent Smooth Ride',
    description: 'No vibrations, no noise. Pure electric calmness.',
    icon: Icons.silent,
    animation: 'waves'
  }
];

// Apple-style Feature Card Component
function ComfortFeatureCard({ 
  feature, 
  index, 
  isInView,
  isHighlighted,
  onHover 
}: { 
  feature: typeof comfortFeatures[0]; 
  index: number; 
  isInView: boolean;
  isHighlighted: boolean;
  onHover: (id: string | null) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      whileHover={{ y: -2 }}
      onMouseEnter={() => onHover(feature.id)}
      onMouseLeave={() => onHover(null)}
      className="group cursor-pointer"
    >
      <div className={`bg-white rounded-xl p-6 border transition-all duration-300 hover:shadow-lg ${
        isHighlighted 
          ? 'border-emerald-200 shadow-md bg-emerald-50' 
          : 'border-gray-100 hover:border-gray-200'
      }`}>
        <div className="flex items-start space-x-4">
          <div className={`flex-shrink-0 p-2 rounded-lg transition-all duration-300 ${
            isHighlighted 
              ? 'bg-emerald-500 text-white' 
              : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
          }`}>
            {feature.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
              isHighlighted ? 'text-black' : 'text-black group-hover:text-gray-900'
            }`}>
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {feature.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Clean Apple-style Scooter Visualization
function ComfortVisualization({ highlightedFeature }: { highlightedFeature: string | null }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100"
      >
        <svg
          width="280"
          height="200"
          viewBox="0 0 280 200"
          className="mx-auto"
        >
          <defs>
            <linearGradient id="scooterBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8f9fa" />
              <stop offset="50%" stopColor="#e9ecef" />
              <stop offset="100%" stopColor="#dee2e6" />
            </linearGradient>
            <linearGradient id="greenAccent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          
          {/* Main chassis */}
          <motion.path
            d="M50 120 Q80 105 140 110 Q200 115 240 120 L235 135 Q200 130 140 125 Q80 120 55 135 Z"
            fill="url(#scooterBody)"
            stroke="#9aa0a6"
            strokeWidth="1.5"
            animate={highlightedFeature === 'frame' ? {
              stroke: ['#9aa0a6', '#10B981', '#9aa0a6']
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Handlebar */}
          <path
            d="M75 110 L80 95 Q85 90 100 95 L105 100"
            fill="none"
            stroke="#6c757d"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Seat - highlights when seating is active */}
          <motion.ellipse
            cx="140"
            cy="108"
            rx="28"
            ry="8"
            fill={highlightedFeature === 'seating' ? '#10B981' : '#e9ecef'}
            stroke={highlightedFeature === 'seating' ? '#059669' : '#adb5bd'}
            strokeWidth="1.5"
            animate={highlightedFeature === 'seating' ? {
              fill: ['#10B981', '#34d399', '#10B981'],
              ry: [8, 10, 8]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Footboard - expands when footboard is active */}
          <motion.rect
            x="110"
            y="145"
            width={highlightedFeature === 'footboard' ? "70" : "50"}
            height="8"
            rx="4"
            fill={highlightedFeature === 'footboard' ? '#3b82f6' : '#e9ecef'}
            stroke={highlightedFeature === 'footboard' ? '#2563eb' : '#adb5bd'}
            strokeWidth="1"
            animate={highlightedFeature === 'footboard' ? {
              width: [50, 70, 50],
              fill: ['#3b82f6', '#60a5fa', '#3b82f6']
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Front wheel */}
          <circle
            cx="70"
            cy="155"
            r="18"
            fill="white"
            stroke="#9aa0a6"
            strokeWidth="2"
          />
          <circle
            cx="70"
            cy="155"
            r="10"
            fill="#f8f9fa"
            stroke="#dee2e6"
            strokeWidth="1"
          />
          
          {/* Rear wheel */}
          <circle
            cx="210"
            cy="155"
            r="18"
            fill="white"
            stroke="#9aa0a6"
            strokeWidth="2"
          />
          <circle
            cx="210"
            cy="155"
            r="10"
            fill="#f8f9fa"
            stroke="#dee2e6"
            strokeWidth="1"
          />
          
          {/* Suspension lines - animate when suspension is active */}
          {highlightedFeature === 'suspension' && (
            <g>
              <motion.line
                x1="70"
                y1="137"
                x2="70"
                y2="150"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeLinecap="round"
                animate={{ y1: [137, 140, 137], y2: [150, 147, 150] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.line
                x1="210"
                y1="137"
                x2="210"
                y2="150"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeLinecap="round"
                animate={{ y1: [137, 140, 137], y2: [150, 147, 150] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              />
            </g>
          )}
          
          {/* Green accent line */}
          <path
            d="M80 118 Q110 116 200 118"
            fill="none"
            stroke="url(#greenAccent)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
        
        {/* Sound waves for silent mode */}
        {highlightedFeature === 'silent' && (
          <div className="absolute -right-6 top-1/2 transform -translate-y-1/2">
            {[1, 2, 3].map((wave) => (
              <motion.div
                key={wave}
                className="absolute w-4 h-4 border border-emerald-400 rounded-full"
                style={{ right: wave * 12 }}
                animate={{
                  scale: [0, 1.5],
                  opacity: [0.6, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: wave * 0.2,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function Comfort() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const visualRef = useRef(null);
  
  const contentInView = useInView(contentRef, { once: true, margin: '-30px' });
  const visualInView = useInView(visualRef, { once: true, margin: '-30px' });
  
  const [highlightedFeature, setHighlightedFeature] = useState<string | null>(null);
  
  useEffect(() => {
    if (!visualInView) return;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      setHighlightedFeature(comfortFeatures[currentIndex].id);
      currentIndex = (currentIndex + 1) % comfortFeatures.length;
    }, 3000);
    
    return () => clearInterval(interval);
  }, [visualInView]);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-16 md:py-20 bg-gray-50 overflow-hidden"
      style={{ fontFamily: 'Neurial Grotesk, -apple-system, BlinkMacSystemFont, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Content Section */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: -30 }}
            animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-black">
                Comfort that
                <br />
                <span className="font-medium">Moves with You</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
                Because every ride should feel effortless — whether it&apos;s a quick city sprint or a long weekend glide.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {comfortFeatures.map((feature, index) => (
                <ComfortFeatureCard
                  key={feature.id}
                  feature={feature}
                  index={index}
                  isInView={contentInView}
                  isHighlighted={highlightedFeature === feature.id}
                  onHover={setHighlightedFeature}
                />
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4"
            >
              
            </motion.div>
          </motion.div>
          
          {/* Visual Section */}
          <motion.div
            ref={visualRef}
            initial={{ opacity: 0, x: 30 }}
            animate={visualInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative h-[400px] lg:h-[500px] flex items-center justify-center"
          >
            <ComfortVisualization highlightedFeature={highlightedFeature} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}