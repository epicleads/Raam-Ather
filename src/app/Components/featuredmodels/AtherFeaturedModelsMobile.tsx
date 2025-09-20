'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTestDriveModal } from '../test-ride-form/TestDriveModalStore';
import { 
  Battery,
  Zap,
  CreditCard,
  Loader,
  Sparkles
} from 'lucide-react';

interface AtherModel {
  id: number;
  name: string;
  price: string;
  batteryCapacity: string;
  range: string;
  colors: string[];
  defaultColor: string;
  features: string[];
  imageUrl: string;
  isNew: boolean;
  description: string;
  url: string;
  topSpeed: string;
  motorPower: string;
}

const atherModels: AtherModel[] = [
  {
    id: 1,
    name: "450S",
    price: "1,19,999",
    batteryCapacity: "3.7 kWh",
    range: "157 km",
    colors: ["#00D2A0", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
    defaultColor: "#00D2A0",
    features: ["Smart Connectivity", "Fast Charging", "Regenerative Braking", "LED Lighting"],
    imageUrl: "/Ather-Assets/Home/images/450stillwhite.png",
    isNew: false,
    description: "Perfect balance of performance and efficiency for daily commuting.",
    url: "/ather-450",
    topSpeed: "80 km/h",
    motorPower: "6.2 kW"
  },
  {
    id: 2,
    name: "450X",
    price: "1,39,999",
    batteryCapacity: "3.7 kWh",
    range: "157 km",
    colors: ["#00D2A0", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
    defaultColor: "#00D2A0",
    features: ["Smart Connectivity", "Fast Charging", "Regenerative Braking", "LED Lighting"],
    imageUrl: "/Ather-Assets/Home/images/450xlr.png",
    isNew: false,
    description: "Advanced features with premium performance for the modern rider.",
    url: "/ather-450",
    topSpeed: "80 km/h",
    motorPower: "6.2 kW"
  },
  {
    id: 3,
    name: "450 Apex",
    price: "1,59,999",
    batteryCapacity: "3.7 kWh",
    range: "157 km",
    colors: ["#00D2A0", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
    defaultColor: "#00D2A0",
    features: ["Smart Connectivity", "Fast Charging", "Regenerative Braking", "LED Lighting"],
    imageUrl: "/Ather-Assets/Home/images/450apex.png",
    isNew: true,
    description: "Ultimate performance with cutting-edge technology and design.",
    url: "/ather-450-apex",
    topSpeed: "80 km/h",
    motorPower: "6.2 kW"
  },
  {
    id: 4,
    name: "Rizta",
    price: "1,09,999",
    batteryCapacity: "2.9 kWh",
    range: "123 km",
    colors: ["#00D2A0", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
    defaultColor: "#00D2A0",
    features: ["Family Focused", "Comfortable Seating", "Storage Space", "Easy Handling"],
    imageUrl: "/Ather-Assets/Home/images/rizta.png",
    isNew: true,
    description: "Family-focused scooter designed for comfort, space and practical everyday commuting.",
    url: "/rizta",
    topSpeed: "70 km/h",
    motorPower: "5.4 kW"
  }
];


const AtherFeaturedModelsMobile: React.FC = () => {
  const modal = useTestDriveModal();
  const [models] = useState<AtherModel[]>(atherModels);
  const [selectedModel, setSelectedModel] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const currentModel = useMemo(() => models[selectedModel], [models, selectedModel]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Touch/Swipe functionality
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setSelectedModel((prev) => (prev + 1) % models.length);
    }
    if (isRightSwipe) {
      setSelectedModel((prev) => (prev - 1 + models.length) % models.length);
    }
  };

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

  if (!mounted) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader className="w-8 h-8 animate-spin text-[#00D2A0]" />
      </div>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00D2A0]/5 via-transparent to-[#00D2A0]/10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00D2A0] to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Raam Ather Collection
          </h2>
          <p className="text-sm text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the future of electric mobility with Ather&apos;s innovative smart scooters
          </p>
        </motion.div>


        {/* Main Content - Mobile */}
        <div className="space-y-8">
          {/* Model Image with Touch/Swipe */}
          <div 
            className="relative aspect-[4/3] max-w-md mx-auto touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <Image
              src={currentModel.imageUrl}
              alt={currentModel.name}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Swipe Indicators Below Image */}
          <div className="flex justify-center items-center">
            <div className="flex gap-2">
              {models.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedModel(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === selectedModel
                      ? 'bg-[#00D2A0] scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Model Details */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-2xl font-bold text-gray-900">{currentModel.name}</h3>
              {currentModel.isNew && (
                <div className="bg-[#00D2A0] text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  NEW
                </div>
              )}
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
              {currentModel.description}
            </p>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice(currentModel.price)}
                <span className="text-sm font-normal text-[#00D2A0] ml-2">ex-showroom</span>
              </div>
            </div>
          </div>

          {/* Specifications Grid - Mobile */}
          <div className="grid grid-cols-3 gap-3 px-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm min-h-[100px] flex flex-col justify-center">
              <Battery className="w-6 h-6 text-[#00D2A0] mx-auto mb-3" />
              <div className="text-xs text-gray-600 mb-3">Battery</div>
              <div className="text-sm font-semibold text-gray-900 leading-tight">{currentModel.batteryCapacity}</div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm min-h-[100px] flex flex-col justify-center">
              <Zap className="w-6 h-6 text-[#00D2A0] mx-auto mb-3" />
              <div className="text-xs text-gray-600 mb-3">Range</div>
              <div className="text-sm font-semibold text-gray-900 leading-tight">{currentModel.range}</div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm min-h-[100px] flex flex-col justify-center">
              <div className="flex items-center justify-center gap-1 mb-3">
                <CreditCard className="w-5 h-5 text-[#00D2A0]" />
                <span className="text-xs text-gray-600">EMI</span>
              </div>
                <div className="text-sm font-semibold text-gray-900 leading-tight">
                  {formatPrice(parseInt(currentModel.price.replace(/,/g, '')) * 0.1)}
                </div>
              <div className="text-xs text-gray-500">per month</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 px-4">
            {/* Test Drive Button */}
            <motion.button
              onClick={() => modal.openManually()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#00D2A0] to-[#00B894] text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Book Test Ride
            </motion.button>
            
            {/* Learn More Button */}
            <Link
              href={currentModel.url}
              className="w-full bg-white border-2 border-[#00D2A0] text-[#00D2A0] py-4 px-6 rounded-xl font-semibold text-lg text-center hover:bg-[#00D2A0] hover:text-white transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AtherFeaturedModelsMobile;
