'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTestDriveModal } from '../test-ride-form/TestDriveModalStore';
import { ATHER_MODELS, type AtherModel } from './constants/atherModels';
import {
  Battery,
  Zap,
  CreditCard,
  Loader,
  Sparkles
} from 'lucide-react';


const AtherFeaturedModelsDesktop: React.FC = () => {
  const modal = useTestDriveModal();
  const [models] = useState<AtherModel[]>(ATHER_MODELS);
  const [selectedModel, setSelectedModel] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [, setPreloadedImages] = useState<Set<string>>(new Set());
  const [isHovered] = useState(false);
  const [isTransitioning] = useState(false);
  const [, setHoveredModelIndex] = useState<number | null>(null);
  
  // Performance refs
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);
  
  
  // Optimized 3D and interaction states
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [carRotation, setCarRotation] = useState({ x: 0, y: 0 });
  const [floatingOffset, setFloatingOffset] = useState(0);
  
  // Memoized current model for performance
  const currentModel = useMemo(() => models[selectedModel], [models, selectedModel]);

  // Preload all images on mount
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = models.map((model) => {
        return new Promise<string>((resolve, reject) => {
          const img = new window.Image();
          img.onload = () => resolve(model.imageUrl);
          img.onerror = reject;
          img.src = model.imageUrl;
        });
      });

      try {
        const loadedImages = await Promise.all(imagePromises);
        setPreloadedImages(new Set(loadedImages));
      } catch (error) {
        console.warn('Some images failed to preload:', error);
      }
    };

    preloadImages();
  }, [models]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isHovered && !isTransitioning) {
      autoPlayRef.current = setInterval(() => {
        setSelectedModel((prev) => (prev + 1) % models.length);
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isHovered, isTransitioning, models.length]);

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Floating animation
  useEffect(() => {
    const animate = () => {
      setFloatingOffset(prev => prev + 0.5);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const formatPrice = (price: string | number) => {
    if (typeof price === 'string') {
      return `₹${price}`;
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setMousePosition({ x: touch.clientX, y: touch.clientY });
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const deltaX = touch.clientX - mousePosition.x;
    const deltaY = touch.clientY - mousePosition.y;
    
    setCarRotation(prev => ({
      x: Math.max(-30, Math.min(30, prev.x + deltaY * 0.1)),
      y: Math.max(-30, Math.min(30, prev.y - deltaX * 0.1))
    }));
    
    setMousePosition({ x: touch.clientX, y: touch.clientY });
  }, [mousePosition]);

  const onTouchEnd = useCallback(() => {
    setCarRotation({ x: 0, y: 0 });
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-8 h-8 animate-spin text-[#00D2A0]" />
      </div>
    );
  }

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00D2A0]/5 via-transparent to-[#00D2A0]/10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00D2A0] to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-6 md:mb-8 mt-4 md:mt-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
            Raam Ather Collection
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the future of electric mobility with Ather&apos;s innovative smart scooters
          </p>
        </motion.div>

        {/* Model Thumbnails - Desktop Only */}
        <div className="mb-4 md:mb-6">
          <div className="hidden md:flex justify-center items-center overflow-x-auto pb-4">
            <div className="flex gap-6">
              {models.map((model, index) => (
                <motion.div
                  key={model.id}
                  className="relative"
                  onMouseEnter={() => setHoveredModelIndex(index)}
                  onMouseLeave={() => setHoveredModelIndex(null)}
                >
                  <motion.button
                    onClick={() => {
                      setSelectedModel(index);
                      setIsAutoPlaying(false);
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex-shrink-0 group transition-all duration-500 flex flex-col items-center p-2 will-change-transform ${
                      index === selectedModel
                        ? 'scale-110 drop-shadow-xl'
                        : 'opacity-60 hover:opacity-100 hover:drop-shadow-lg'
                    }`}
                  >
                    <div className="relative w-28 h-20 overflow-hidden">
                      <Image
                        src={model.imageUrl}
                        alt={model.name}
                        fill
                        className="object-contain p-2"
                        sizes="112px"
                      />
                    </div>
                    
                    <div className="mt-3 text-center">
                      <div className="text-sm font-medium text-gray-900">{model.name}</div>
                      {model.isNew && (
                        <div className="text-xs text-[#00D2A0] font-semibold mt-1">NEW</div>
                      )}
                    </div>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Desktop Only */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center mt-8 mb-12">
          
          {/* 3D Model Image */}
          <div className="relative perspective-1000">
            <div 
              className="relative aspect-[4/3] preserve-3d"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              style={{
                transform: `perspective(1000px) rotateX(${carRotation.x * 0.3}deg) rotateY(${carRotation.y * 0.3}deg)`
              }}
            >
              {/* 3D Scooter Container with Floating Animation */}
              <motion.div
                className="relative w-full h-full"
                animate={{
                  y: Math.sin(floatingOffset * 0.01) * 10,
                  rotateY: carRotation.y * 0.1,
                  rotateX: carRotation.x * 0.1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  mass: 0.8
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <Image
                  src={currentModel.imageUrl}
                  alt={currentModel.name}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>
          </div>

          {/* Model Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">
                {currentModel.name}
              </h3>
              {currentModel.isNew && (
                <div className="bg-[#00D2A0] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  NEW
                </div>
              )}
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              {currentModel.description}
            </p>
            
            <div className="text-center lg:text-left">
              <div className="text-3xl lg:text-4xl font-bold text-gray-900">
                {formatPrice(currentModel.price)}
                <span className="text-sm font-normal text-[#00D2A0] ml-2">ex-showroom</span>
              </div>
            </div>

            {/* Specifications - Desktop */}
            <div className="hidden md:grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-gray-50/80 to-white/60 backdrop-blur-xl border border-white/30 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Battery className="w-6 h-6 text-[#00D2A0]" />
                  <div className="text-sm text-gray-600">Battery</div>
                </div>
                <div className="font-semibold text-gray-900 text-lg">{currentModel.batteryCapacity}</div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50/80 to-white/60 backdrop-blur-xl border border-white/30 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-6 h-6 text-[#00D2A0]" />
                  <div className="text-sm text-gray-600">Range</div>
                </div>
                <div className="font-semibold text-gray-900 text-lg">{currentModel.range}</div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50/80 to-white/60 backdrop-blur-xl border border-white/30 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-6 h-6 text-[#00D2A0]" />
                  <div className="text-sm text-gray-600">EMI Starting</div>
                </div>
                <div className="font-semibold text-gray-900 text-lg">
                  {formatPrice(parseInt(currentModel.price.replace(/,/g, '')) * 0.1)} per month
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Test Drive Button */}
              <motion.button
                onClick={() => modal.openManually()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gradient-to-r from-[#00D2A0] to-[#00B894] text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Book Test Ride
              </motion.button>
              
              {/* Learn More Button */}
              <Link
                href={currentModel.url}
                className="flex-1 bg-white border-2 border-[#00D2A0] text-[#00D2A0] py-4 px-8 rounded-xl font-semibold text-lg text-center hover:bg-[#00D2A0] hover:text-white transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AtherFeaturedModelsDesktop;