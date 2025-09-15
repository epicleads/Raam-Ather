'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const safetyFeatures = [
  {
    id: 'abs',
    title: 'ABS Braking',
    description: 'Advanced Anti-lock Braking System',
    icon: 'ABS',
    position: { top: '20%', left: '15%' },
    accentColor: '#10B981'
  },
  {
    id: 'traction',
    title: 'Traction Control',
    description: 'Smart grip management system',
    icon: 'TC',
    position: { top: '40%', right: '20%' },
    accentColor: '#10B981'
  },
  {
    id: 'frame',
    title: 'Reinforced Frame',
    description: 'Crash-tested aluminum chassis',
    icon: 'RF',
    position: { bottom: '30%', left: '25%' },
    accentColor: '#10B981'
  },
  {
    id: 'stability',
    title: 'Dynamic Stability',
    description: 'Real-time balance optimization',
    icon: 'DS',
    position: { bottom: '20%', right: '15%' },
    accentColor: '#10B981'
  }
];

function SafetyIcon({ 
  feature, 
  index, 
  isInView, 
  isHighlighted 
}: { 
  feature: typeof safetyFeatures[0]; 
  index: number; 
  isInView: boolean;
  isHighlighted: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ 
        duration: 0.5, 
        delay: 0.3 + index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      whileHover={{ scale: 1.05 }}
      className="absolute cursor-pointer group"
      style={feature.position}
    >
      {/* Subtle glow effect when highlighted */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          scale: isHighlighted ? [1, 1.2, 1] : 1,
          opacity: isHighlighted ? [0, 0.1, 0] : 0,
        }}
        transition={{
          duration: 2,
          repeat: isHighlighted ? Infinity : 0,
          ease: "easeInOut"
        }}
        style={{
          background: `radial-gradient(circle, ${feature.accentColor}20, transparent 70%)`,
          width: '60px',
          height: '60px',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      <div 
        className={`relative w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
          isHighlighted 
            ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg' 
            : 'bg-white border-gray-200 text-black hover:border-gray-300 shadow-sm'
        }`}
      >
        <span className="text-xs font-semibold">{feature.icon}</span>
      </div>
      
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg px-3 py-2 shadow-lg border border-gray-100 min-w-max z-10"
      >
        <p className="text-xs font-semibold text-black mb-1">{feature.title}</p>
        <p className="text-xs text-gray-600">{feature.description}</p>
      </motion.div>
    </motion.div>
  );
}

function ScooterVisual({ highlightedFeature }: { highlightedFeature: string | null }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative"
      >
        {/* Clean Apple-style scooter illustration */}
        <svg
          width="280"
          height="180"
          viewBox="0 0 280 180"
          className="drop-shadow-sm"
        >
          <defs>
            <linearGradient id="scooterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8f9fa" />
              <stop offset="50%" stopColor="#e9ecef" />
              <stop offset="100%" stopColor="#dee2e6" />
            </linearGradient>
          </defs>
          
          {/* Main body */}
          <path
            d="M50 100 Q75 85 140 90 Q190 95 230 100 L225 115 Q190 110 140 105 Q75 100 55 115 Z"
            fill="url(#scooterGradient)"
            stroke="#6c757d"
            strokeWidth="1.5"
          />
          
          {/* Handlebar */}
          <path
            d="M75 90 L80 75 Q85 70 100 75 L110 80"
            fill="none"
            stroke="#6c757d"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Front wheel */}
          <circle
            cx="65"
            cy="130"
            r="20"
            fill="#f8f9fa"
            stroke="#6c757d"
            strokeWidth="2"
          />
          
          {/* Rear wheel */}
          <circle
            cx="205"
            cy="130"
            r="20"
            fill="#f8f9fa"
            stroke="#6c757d"
            strokeWidth="2"
          />
          
          {/* Seat */}
          <ellipse
            cx="140"
            cy="88"
            rx="25"
            ry="6"
            fill="#e9ecef"
            stroke="#6c757d"
            strokeWidth="1"
          />
        </svg>
        
        {/* Subtle frame highlight when selected */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{
            boxShadow: highlightedFeature === 'frame' 
              ? ['0 0 0 rgba(16, 185, 129, 0)', '0 0 20px rgba(16, 185, 129, 0.2)', '0 0 0 rgba(16, 185, 129, 0)']
              : '0 0 0 rgba(16, 185, 129, 0)'
          }}
          transition={{
            duration: 2,
            repeat: highlightedFeature === 'frame' ? Infinity : 0,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
}

export default function Safety() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const visualRef = useRef(null);
  
  const contentInView = useInView(contentRef, { once: true, margin: '-30px' });
  const visualInView = useInView(visualRef, { once: true, margin: '-30px' });
  
  const [highlightedFeature, setHighlightedFeature] = useState<string | null>(null);
  
  useEffect(() => {
    if (!visualInView) return;
    
    const interval = setInterval(() => {
      setHighlightedFeature((prev) => {
        const currentIndex = safetyFeatures.findIndex(f => f.id === prev);
        const nextIndex = (currentIndex + 1) % safetyFeatures.length;
        return safetyFeatures[nextIndex].id;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [visualInView]);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-16 md:py-20 bg-white overflow-hidden"
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
            className="space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight"
            >
              <span className="text-black">Uncompromised</span>
              <br />
              <span className="text-black font-medium">Safety</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-700 leading-relaxed font-light"
            >
              Engineered with cutting-edge safety systems to keep you protected in every ride.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-3"
            >
              {safetyFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                    highlightedFeature === feature.id 
                      ? 'bg-emerald-50 border border-emerald-200' 
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                  onMouseEnter={() => setHighlightedFeature(feature.id)}
                  onMouseLeave={() => setHighlightedFeature(null)}
                >
                  <div 
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      highlightedFeature === feature.id ? 'bg-emerald-500' : 'bg-gray-300'
                    }`}
                  />
                  <span className="text-black font-medium text-base">
                    {feature.title}
                  </span>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
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
            className="relative h-[400px] lg:h-[500px]"
          >
            <ScooterVisual highlightedFeature={highlightedFeature} />
            {safetyFeatures.map((feature, index) => (
              <SafetyIcon
                key={feature.id}
                feature={feature}
                index={index}
                isInView={visualInView}
                isHighlighted={highlightedFeature === feature.id}
              />
            ))}
          </motion.div>
        </div>
      </div>
  </section>
  );
}