    "use client";

import { useState, useEffect } from "react";
import { useTestDriveModal } from "../../../Components/test-ride-form/TestDriveModalStore";
import type { HeroItem } from "../riztaHero.types";
import Image from "next/image";

interface Props {
  heroItems: HeroItem[];
  autoPlayInterval?: number; // ms
}

export function RiztaHeroSlider({ heroItems, autoPlayInterval = 0 }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const modal = useTestDriveModal();



  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault();
    modal.openManually();
  };

  // Custom timing logic: Slide 1 (5s) -> Slide 2 (6s) -> repeat
  useEffect(() => {
    if (!autoPlayInterval) return;
    
    const slide1Duration = 5000; // 5 seconds for image slide
    const slide2Duration = 6000; // 6 seconds for video slide
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === 0) {
          // After 5 seconds on slide 1, go to slide 2
          setTimeout(() => setCurrentIndex(1), slide1Duration);
          return prev;
        } else {
          // After 6 seconds on slide 2, go back to slide 1
          setTimeout(() => setCurrentIndex(0), slide2Duration);
          return prev;
        }
      });
    }, autoPlayInterval);
    
    return () => clearInterval(timer);
  }, [autoPlayInterval]);

  return (
    <div className="relative w-full h-full">
      {heroItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {item.type === "image" ? (
            <div className="w-full h-full relative">
              
              {/* Desktop Image */}
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover hidden md:block"
                priority={index === 0}
              />
              
              {/* Mobile Image */}
              {item.mobileSrc && (
                <Image
                  src={item.mobileSrc}
                  alt={item.alt}
                  fill
                  className="object-cover rizta-mobile-image block md:hidden"
                  priority={index === 0}
                />
              )}
            </div>
          ) : (
            <video
              src={item.src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          )}

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 z-10"></div>

          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col justify-center items-start text-white px-8 md:px-16 lg:px-24 z-30">
            <h1 className="text-xl md:text-3xl font-bold mb-3">
              {item.title}
            </h1>
            <p className="text-base md:text-lg mb-4">{item.subtitle}</p>
            <div className="flex space-x-3">
              <button
                onClick={handleCTAClick}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition-all duration-300 text-sm font-medium cursor-pointer relative z-40 min-h-[44px] touch-manipulation"
                type="button"
              >
                {item.primaryCTA.label}
              </button>
              {item.secondaryCTA && (
                <button
                  onClick={handleCTAClick}
                  className="bg-white/90 hover:bg-white text-gray-900 px-6 py-3 rounded-lg transition-all duration-300 text-sm font-medium cursor-pointer relative z-40 min-h-[44px] touch-manipulation"
                  type="button"
                >
                  {item.secondaryCTA.label}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {heroItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-emerald-500 scale-110"
                : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
