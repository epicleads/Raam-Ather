"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  features: string[];
  color: string;
  category: 'maintenance' | 'sales' | 'support';
}

interface ServicesSliderProps {
  services: Service[];
}

const ServicesSlider: React.FC<ServicesSliderProps> = ({ services }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();

  // Calculate slide width based on container width
  const [slideWidth, setSlideWidth] = useState(300);
  const maxIndex = services.length - 1;

  useEffect(() => {
    const updateSlideWidth = () => {
      if (sliderRef.current) {
        const containerWidth = sliderRef.current.parentElement?.offsetWidth || 300;
        // Use full container width minus padding for mobile
        setSlideWidth(containerWidth - 32); // Account for container padding
      }
    };

    updateSlideWidth();
    window.addEventListener('resize', updateSlideWidth);
    
    return () => window.removeEventListener('resize', updateSlideWidth);
  }, []);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }) => {
    setIsDragging(false);
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(velocity) >= 500) {
      // Fast swipe
      if (velocity > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (velocity < 0 && currentIndex < maxIndex) {
        setCurrentIndex(currentIndex + 1);
      }
    } else if (Math.abs(offset) > slideWidth / 3) {
      // Drag threshold
      if (offset > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (offset < 0 && currentIndex < maxIndex) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  useEffect(() => {
    controls.start({
      x: -currentIndex * (slideWidth + 16), // Include gap in calculation
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    });
  }, [currentIndex, controls, slideWidth]);

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  return (
    <div className="relative overflow-hidden">
      {/* Slider Container */}
      <motion.div
        ref={sliderRef}
        className="flex"
        drag="x"
        dragConstraints={{ left: -maxIndex * (slideWidth + 16), right: 0 }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x }}
      >
        {services.map((service) => (
          <motion.div
            key={service.id}
            className="flex-shrink-0 bg-white rounded-2xl shadow-lg overflow-hidden"
            style={{ width: slideWidth, marginRight: 16 }} // Full slide width with gap
            whileTap={{ scale: isDragging ? 1 : 0.98 }}
          >
            {/* Service Image */}
            <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-80`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <service.icon className="w-12 h-12 text-white" />
              </div>
              <div className="absolute top-3 right-3">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg`}>
                  <service.icon className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Service Content */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-2">
                {service.description}
              </p>

              {/* Features List - Show only first 3 on mobile */}
              <div className="space-y-1 mb-4">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-1 h-1 bg-[#00B248] rounded-full" />
                    <span>{feature}</span>
                  </div>
                ))}
                {service.features.length > 3 && (
                  <div className="text-xs text-gray-400">
                    +{service.features.length - 3} more features
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <motion.button
                className="w-full bg-gradient-to-r from-[#2962FF] to-[#1E88E5] text-white py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
                <ArrowRightIcon className="w-3 h-3" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {services.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-[#2962FF] w-6' : 'bg-gray-300'
            }`}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Navigation Arrows - Optional */}
      <div className="absolute top-1/2 -translate-y-1/2 left-2">
        <motion.button
          onClick={() => goToSlide(currentIndex - 1)}
          disabled={currentIndex === 0}
          className={`w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center transition-all ${
            currentIndex === 0 ? 'opacity-50' : 'hover:bg-gray-50'
          }`}
          whileHover={{ scale: currentIndex === 0 ? 1 : 1.1 }}
          whileTap={{ scale: currentIndex === 0 ? 1 : 0.9 }}
        >
          <ArrowRightIcon className="w-4 h-4 text-gray-600 rotate-180" />
        </motion.button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-2">
        <motion.button
          onClick={() => goToSlide(currentIndex + 1)}
          disabled={currentIndex === maxIndex}
          className={`w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center transition-all ${
            currentIndex === maxIndex ? 'opacity-50' : 'hover:bg-gray-50'
          }`}
          whileHover={{ scale: currentIndex === maxIndex ? 1 : 1.1 }}
          whileTap={{ scale: currentIndex === maxIndex ? 1 : 0.9 }}
        >
          <ArrowRightIcon className="w-4 h-4 text-gray-600" />
        </motion.button>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#2962FF] rounded-full"
          initial={{ width: "0%" }}
          animate={{ 
            width: `${((currentIndex + 1) / services.length) * 100}%` 
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

export default ServicesSlider;