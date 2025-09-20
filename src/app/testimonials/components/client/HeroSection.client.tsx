'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    // Hide text after 4 seconds (reduced from 5 seconds)
    const textTimer = setTimeout(() => {
      setShowText(false);
    }, 4000);

    return () => clearTimeout(textTimer);
  }, []);

  return (
    <section
      aria-label="Testimonials Hero"
      className="relative h-screen min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        {/* Mobile: Use image, Desktop: Use video */}
        <div className="block md:hidden">
          <Image
            src="/Ather-Assets/450/The-2025-Ather-450-m-new.webp"
            alt="2025 Ather 450"
            className="absolute inset-0 w-full h-full object-cover opacity-55"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="hidden md:block">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-55"
            poster="/Ather-Assets/Home/The-2025-ather-450-launch.webp"
          >
            <source src="/Ather-Assets/thumbnails/Ather 450X Test Ride.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-gray-50/70" />
      </div>

      {/* Content Overlay - Text that shows for 4 seconds */}
      <div className={`relative z-10 flex flex-col items-center justify-end h-full px-4 sm:px-6 text-center pb-16 sm:pb-20 transition-opacity duration-1000 ${showText ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Real Riders
            <span className="block text-[#4ade80] mt-1">Real Trust</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed px-2">
            Discover authentic experiences from Raam Ather customers across Hyderabad and Chennai
          </p>
        </div>
      </div>

    </section>
  );
}
