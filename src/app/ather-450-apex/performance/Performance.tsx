'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Performance metrics data
const performanceMetrics = [
  {
    value: '3.3',
    unit: 's',
    label: '0-40 kmph',
    description: 'Lightning acceleration',
    icon: '⚡'
  },
  {
    value: '90',
    unit: ' kmph',
    label: 'Top Speed',
    description: 'Unleash the beast',
    icon: '🏎️'
  },
  {
    value: '150',
    unit: ' km',
    label: 'True Range',
    description: 'IDC certified',
    icon: '🔋'
  },
  {
    value: '6.4',
    unit: ' kW',
    label: 'Peak Power',
    description: 'Warp+™ Mode',
    icon: '💥'
  }
];

// Technology features
const techFeatures = [
  {
    title: 'Warp+™ Mode',
    description: 'Unleash maximum performance with our most aggressive riding mode',
    icon: '🚀'
  },
  {
    title: 'AtherStack Pro',
    description: '5-year complimentary plan with advanced connectivity features',
    icon: '📱'
  },
  {
    title: 'Regenerative Braking',
    description: 'Energy recovery system that extends your range',
    icon: '🔄'
  },
  {
    title: 'Smart Dashboard',
    description: 'TFT display with real-time performance analytics',
    icon: '📊'
  }
];

// Animated counter hook
function useCounter(end: number, duration: number = 2, isInView: boolean) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(end * easeOutCubic);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isInView]);
  
  return count;
}

// Performance metric card component - Apple style
function MetricCard({ metric, index, isInView }: { 
  metric: typeof performanceMetrics[0]; 
  index: number; 
  isInView: boolean;
}) {
  const numericValue = parseFloat(metric.value);
  const animatedValue = useCounter(numericValue, 2, isInView);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      className="group w-full"
    >
      <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100">
        {/* Icon and Label in one row */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          <span className="text-2xl">
            {metric.icon}
          </span>
          <h4 className="text-base font-medium text-black">
            {metric.label}
          </h4>
        </div>
        
        {/* Value */}
        <div className="mb-3">
          <h3 className="text-4xl font-light text-black tracking-tight">
            {animatedValue.toFixed(1)}<span className="text-2xl">{metric.unit}</span>
          </h3>
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-600">
          {metric.description}
        </p>
      </div>
    </motion.div>
  );
}

// Technology feature card component - Apple style
function TechFeatureCard({ feature, index, isInView }: { 
  feature: typeof techFeatures[0]; 
  index: number; 
  isInView: boolean;
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
      className="group w-full"
    >
      <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 h-full border border-gray-100">
        <div className="flex items-start space-x-4 min-h-[100px]">
          <div className="text-3xl flex-shrink-0">
            {feature.icon}
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-black mb-2">
              {feature.title}
            </h4>
            <p className="text-gray-600 leading-relaxed text-sm">
              {feature.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Performance() {
  const sectionRef = useRef(null);
  const metricsRef = useRef(null);
  const techRef = useRef(null);
  const [currentMetricIndex, setCurrentMetricIndex] = useState(0);
  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  
  const sectionInView = useInView(sectionRef, { once: true, margin: '-50px' });
  const metricsInView = useInView(metricsRef, { once: true, margin: '-30px' });
  const techInView = useInView(techRef, { once: true, margin: '-30px' });

  // Auto-advance carousel for mobile
  useEffect(() => {
    const metricsInterval = setInterval(() => {
      setCurrentMetricIndex((prev) => (prev + 1) % performanceMetrics.length);
    }, 3000);

    const techInterval = setInterval(() => {
      setCurrentTechIndex((prev) => (prev + 1) % techFeatures.length);
    }, 3500);

    return () => {
      clearInterval(metricsInterval);
      clearInterval(techInterval);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-16 md:py-20 bg-gray-50 overflow-hidden"
      style={{ fontFamily: 'Neurial Grotesk, -apple-system, BlinkMacSystemFont, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-4 text-black">
            Performance
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
            Experience the peak of electric performance with Warp+™ Mode.
          </p>
        </motion.div>

        {/* Performance Metrics - Always show grid on desktop, carousel on mobile */}
        <div className="mb-16">
          {/* Desktop Grid */}
          <motion.div
            ref={metricsRef}
            initial={{ opacity: 0 }}
            animate={metricsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {performanceMetrics.map((metric, index) => (
              <MetricCard 
                key={metric.label} 
                metric={metric} 
                index={index} 
                isInView={metricsInView} 
              />
            ))}
          </motion.div>

          {/* Mobile Carousel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={metricsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="md:hidden relative bg-red-100 min-h-[240px]"
          >
            <div className="relative h-[240px] overflow-hidden bg-blue-100">
              {performanceMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    className="absolute inset-0 w-full bg-green-200 p-4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{
                      opacity: currentMetricIndex === index ? 1 : 0,
                      x: currentMetricIndex === index ? 0 : (currentMetricIndex > index ? -50 : 50)
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                  <MetricCard 
                    metric={metric} 
                    index={0} 
                    isInView={metricsInView}
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-6">
              {performanceMetrics.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMetricIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    currentMetricIndex === index ? 'bg-black' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Technology Section */}
        <motion.div
          ref={techRef}
          initial={{ opacity: 0, y: 20 }}
          animate={techInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-light mb-4 text-black">
              Technology
            </h3>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed font-light">
              Every Apex comes with AtherStack Pro. Set up on delivery.
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4">
            {techFeatures.map((feature, index) => (
              <TechFeatureCard 
                key={feature.title} 
                feature={feature} 
                index={index} 
                isInView={techInView} 
              />
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden relative h-[140px] overflow-hidden">
            {techFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="absolute inset-0 w-full"
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: currentTechIndex === index ? 1 : 0,
                  x: currentTechIndex === index ? 0 : (currentTechIndex > index ? -50 : 50)
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <TechFeatureCard 
                  feature={feature} 
                  index={0} 
                  isInView={techInView}
                />
              </motion.div>
            ))}
            
            {/* Dots Indicator */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {techFeatures.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTechIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    currentTechIndex === index ? 'bg-black' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}