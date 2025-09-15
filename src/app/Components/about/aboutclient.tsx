"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, Award, Zap, ArrowRight } from "lucide-react";
import { useTestDriveModal } from "../test-ride-form/TestDriveModalStore";

interface AboutContent {
  title: string;
  description: string;
  mainText: string;
  locations: Array<{
    city: string;
    description: string;
  }>;
  stats: {
    cities: number;
    experience: string;
    customers: string;
    satisfaction: string;
  };
}

export default function AboutClient({ content }: { content: AboutContent }) {
  const modal = useTestDriveModal();
  const [isVisible, setIsVisible] = useState(false);
  const [activeLocation, setActiveLocation] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Official Franchise",
      description: "Authorized Ather Energy partner with genuine products"
    }
  ];

  const expertService = {
    icon: <Users className="w-6 h-6" />,
    title: "Expert Service",
    description: "Certified technicians and comprehensive after-sales support"
  };

  useEffect(() => {
    setIsVisible(true);
    const locationInterval = setInterval(() => {
      setActiveLocation((prev) => (prev + 1) % content.locations.length);
    }, 3000);
    
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    
    return () => {
      clearInterval(locationInterval);
      clearInterval(featureInterval);
    };
  }, [content.locations.length, features.length]);

  return (
    <>
      {/* Neural Grotesk Font Loading */}
      <style jsx global>{`
        @font-face {
          font-family: 'Neural Grotesk';
          src: url('/fonts/NeueGroteskBold.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }
        
        @font-face {
          font-family: 'Neural Grotesk';
          src: url('/fonts/NeueGroteskMedium.woff2') format('woff2');
          font-weight: 500;
          font-style: normal;
          font-display: swap;
        }
        
        @font-face {
          font-family: 'Neural Grotesk';
          src: url('/fonts/NeueGroteskRegular.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        * {
          font-family: 'Neural Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
      `}</style>

      <section className="relative bg-white py-8 sm:py-12 lg:py-20">
        {/* Main Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-20 lg:items-start">
            
            {/* Mobile: Title First */}
            <div className="lg:hidden mb-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/5 rounded-full border border-black/10">
                  <Zap className="w-4 h-4 text-black" />
                  <span className="text-sm font-medium text-black">Official Ather Energy Partner</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-black">
                  About Raam Ather
                </h1>
              </div>
            </div>

            {/* Mobile: Image Second */}
            <div className="lg:hidden mb-8">
              <div className="relative">
                <div className="relative h-[250px] sm:h-[300px] rounded-2xl overflow-hidden border border-black/10">
                  <Image
                    src="/assets/Blog4.webp"
                    alt="Ather Electric Scooter - Premium EV Experience"
                    fill
                    className="object-cover"
                    priority
                    draggable={false}
                    style={{ touchAction: 'manipulation' }}
                  />
                </div>
              </div>
            </div>

            {/* Desktop: Enhanced Image Side with Balanced Content */}
            <div className="hidden lg:block lg:order-2">
              <div className="relative space-y-8">
                
                {/* Main Image Container */}
                <div className="relative group">
                  <div className="relative h-[400px] rounded-2xl overflow-hidden border border-black/10 shadow-2xl">
                    <Image
                      src="/assets/Blog4.webp"
                      alt="Ather Electric Scooter - Premium EV Experience"
                      fill
                      className="object-cover"
                      priority
                      draggable={false}
                      style={{ touchAction: 'manipulation' }}
                    />
                    
                    {/* Image Overlay Badge */}
                    <div className="absolute top-6 right-6">
                      <div className="bg-black/90 backdrop-blur-md rounded-xl p-3 text-white">
                        <div className="text-center">
                          <Zap className="w-6 h-6 mx-auto mb-1" />
                          <div className="text-xs font-medium">Premium EV</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Cards Stack */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-black flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Our Outlets
                  </h4>
                  {content.locations.map((location, index) => (
                    <Link
                      key={location.city}
                      href="/StoreLocator"
                      className={`block p-4 rounded-xl border transition-all duration-500 cursor-pointer ${
                        activeLocation === index
                          ? 'bg-black/5 border-black/20 shadow-md transform scale-105'
                          : 'bg-white border-black/10 hover:border-black/20 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-semibold text-black">{location.city}</h5>
                          <p className="text-sm text-black/60 mt-1">Premium Experience</p>
                        </div>
                        <div className="text-right">
                          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Content Side */}
            <div className={`lg:order-1 space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              
              {/* Desktop Header */}
              <div className="hidden lg:block space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full border border-black/10">
                  <Zap className="w-4 h-4 text-black" />
                  <span className="text-sm font-medium text-black">Official Ather Energy Partner</span>
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-black">
                  About Raam Ather
                </h1>
                
                <p className="text-xl text-black/80 leading-relaxed max-w-xl">
                  {content.description}
                </p>
              </div>

              {/* Mobile Description */}
              <div className="lg:hidden">
                <p className="text-lg text-black/80 leading-relaxed">
                  {content.description}
                </p>
              </div>

              {/* Main Description */}
              <div className="prose prose-lg prose-slate max-w-none">
                <p className="text-black/80 leading-relaxed text-lg">
                  {content.mainText}
                </p>
              </div>

              {/* Location Showcase - Mobile Only */}
              <div className="lg:hidden space-y-4">
                <h3 className="text-xl font-semibold text-black flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-black" />
                  Our Presence
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {content.locations.map((location, index) => (
                    <div
                      key={location.city}
                      className={`p-4 rounded-2xl border transition-all duration-500 cursor-pointer ${
                        activeLocation === index
                          ? 'bg-black/5 border-black/20 shadow-sm'
                          : 'bg-white border-black/10 hover:border-black/20 hover:shadow-sm'
                      }`}
                      onMouseEnter={() => setActiveLocation(index)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-3 h-3 rounded-full mt-2 transition-colors ${
                          activeLocation === index ? 'bg-black' : 'bg-black/30'
                        }`}></div>
                        <div>
                          <h4 className="font-semibold text-black text-lg">{location.city}</h4>
                          <p className="text-black/60 text-sm mt-1">{location.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

           

              {/* Features - Desktop Grid */}
              <div className="hidden lg:block space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-700 delay-${index * 100} ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    } hover:bg-black/5 group`}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-black text-lg">{feature.title}</h4>
                      <p className="text-black/60 mt-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
                
                {/* Expert Service - Stacked below */}
                <div
                  className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-700 delay-200 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  } hover:bg-black/5 group`}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    {expertService.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-black text-lg">{expertService.title}</h4>
                    <p className="text-black/60 mt-1">{expertService.description}</p>
                  </div>
                </div>
              </div>

              {/* Features - Mobile Stacked */}
              <div className="lg:hidden space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className={`flex items-start gap-4 p-6 bg-black/5 rounded-xl transition-all duration-700 delay-${index * 100} ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    } hover:bg-black/10 group`}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-black text-lg">{feature.title}</h4>
                      <p className="text-black/60 mt-2 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
                
                {/* Expert Service - Stacked below */}
                <div
                  className={`flex items-start gap-4 p-6 bg-black/5 rounded-xl transition-all duration-700 delay-200 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  } hover:bg-black/10 group`}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    {expertService.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-black text-lg">{expertService.title}</h4>
                    <p className="text-black/60 mt-2 text-sm leading-relaxed">{expertService.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Three Button CTA Section - Outside the grid, spans full width */}
          <div className="mt-12 lg:mt-16">
            <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
              <button
                onClick={() => window.location.href = '/ContactUs'}
                className="group flex-1 px-6 py-4 bg-black text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                Contact Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => window.location.href = '/StoreLocator'}
                className="group flex-1 px-6 py-4 bg-white text-black font-semibold rounded-2xl border border-black/20 hover:border-black/40 hover:bg-black/5 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                Find Our Outlets
              </button>

              <button 
                onClick={() => modal.openManually()}
                className="group flex-1 px-6 py-4 bg-black text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Book Test Ride
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for enhanced animations and responsive design */}
      <style jsx>{`
        .container {
          max-width: 1400px;
        }

        @media (max-width: 768px) {
          .text-4xl {
            font-size: 2.5rem;
          }
          .text-5xl {
            font-size: 3rem;
          }
          .text-6xl {
            font-size: 3.5rem;
          }
        }

        @media (max-width: 640px) {
          section {
            /* Remove min-height constraints on mobile to prevent overlap */
            min-height: auto !important;
            height: auto !important;
            padding-top: 2rem;
            padding-bottom: 2rem;
            /* Ensure smooth scrolling on mobile */
            overflow: visible !important;
            touch-action: auto !important;
          }
          
          html, body {
            overflow-x: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            overscroll-behavior-y: auto;
          }
          
          .text-4xl {
            font-size: 2rem;
          }
          .text-5xl {
            font-size: 2.25rem;
          }
          .text-6xl {
            font-size: 2.5rem;
          }
          
          .grid {
            gap: 2rem;
          }
          
          .space-y-8 > * + * {
            margin-top: 1.5rem;
          }

          /* Mobile buttons stack vertically */
          .flex-col {
            flex-direction: column;
          }
        }

        /* Enhanced hover effects */
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }
        
        .group:hover .group-hover\\:translate-x-1 {
          transform: translateX(0.25rem);
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f8f9fa;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #000000;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #333333;
        }

        /* Improved focus states for accessibility */
        button:focus-visible {
          outline: 2px solid #000000;
          outline-offset: 2px;
        }

        /* Enhanced animation delays */
        .delay-100 {
          animation-delay: 100ms;
        }
        
        .delay-200 {
          animation-delay: 200ms;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }

        /* Mobile slider enhancements */
        @media (max-width: 1024px) {
          .overflow-hidden {
            touch-action: pan-x;
          }
        }

        /* Enhanced button interactions */
        button {
          transform-origin: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        button:active {
          transform: scale(0.98);
        }

        /* Smooth feature transitions */
        .flex.transition-transform {
          will-change: transform;
        }

        /* Typography enhancements */
        h1, h2, h3, h4 {
          letter-spacing: -0.025em;
        }

        .prose p {
          font-weight: 400;
          line-height: 1.7;
        }

        /* Image optimization */
        img {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }
        
        /* Fix mobile touch scroll issues with images */
        @media (max-width: 768px) {
          img {
            touch-action: manipulation !important;
            pointer-events: auto !important;
            -webkit-touch-callout: none !important;
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
          }
          
          /* Ensure image containers don't block scroll */
          .relative {
            touch-action: manipulation !important;
          }
          
          /* Prevent image drag from interfering with scroll */
          [role="img"], img, picture {
            -webkit-user-drag: none !important;
            -khtml-user-drag: none !important;
            -moz-user-drag: none !important;
            -o-user-drag: none !important;
            user-drag: none !important;
            touch-action: manipulation !important;
          }
        }
      `}</style>
    </>
  );
}