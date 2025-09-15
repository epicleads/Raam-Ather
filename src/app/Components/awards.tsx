'use client';   
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Award, Trophy, Star, Medal } from 'lucide-react';

interface AwardItem {
  id: number;
  title: string;
  description: string;
  year: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  gradient: string;
  shadowColor: string;
  imagePath: string;
  imageAlt: string;
}

const Awards: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const awards: AwardItem[] = [
    {
      id: 1,
      title: "Excellence in Partnership",
      description: "Recognized as the top-performing official franchise partner for outstanding business development and customer satisfaction.",
      year: "2024",
      icon: Trophy,
      gradient: "from-amber-400 via-yellow-500 to-orange-600",
      shadowColor: "shadow-amber-500/30",
      imagePath: "/Ather-Assets/thumbnails/smgrid4.jpg",
      imageAlt: "Excellence in Partnership Award"
    },
    {
      id: 2,
      title: "Innovation Leadership",
      description: "Awarded for pioneering innovative solutions and driving technological advancement in the energy sector.",
      year: "2023",
      icon: Star,
      gradient: "from-blue-400 via-purple-500 to-indigo-600",
      shadowColor: "shadow-purple-500/30",
      imagePath: "/Ather-Assets/thumbnails/smgrid5.jpg",
      imageAlt: "Innovation Leadership Award"
    },
    {
      id: 3,
      title: "Sustainability Champion",
      description: "Honored for exceptional commitment to environmental sustainability and promoting clean energy solutions.",
      year: "2023",
      icon: Award,
      gradient: "from-emerald-400 via-green-500 to-teal-600",
      shadowColor: "shadow-green-500/30",
      imagePath: "/Ather-Assets/thumbnails/smgrid5.jpg",
      imageAlt: "Sustainability Champion Award"
    },
    {
      id: 4,
      title: "Customer Excellence",
      description: "Celebrated for delivering exceptional customer service and maintaining the highest standards of client satisfaction.",
      year: "2022",
      icon: Medal,
      gradient: "from-rose-400 via-pink-500 to-red-600",
      shadowColor: "shadow-rose-500/30",
      imagePath: "/Ather-Assets/thumbnails/smgrid4.jpg",
      imageAlt: "Customer Excellence Medal"
    }
  ];

  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
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
      setCurrentSlide((prev) => (prev + 1) % awards.length);
    }
    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + awards.length) % awards.length);
    }
  };


  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentSlide((prev: number) => (prev + 1) % awards.length);
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [isMobile, awards.length]);

  const AwardCard: React.FC<{ award: AwardItem; index: number; isMobileSlider?: boolean }> = ({ award, index, isMobileSlider = false }) => {
    const IconComponent = award.icon;
    
    return (
      <div 
        className={`
          group relative bg-white rounded-3xl overflow-hidden h-full
          border border-gray-100/80 backdrop-blur-sm
          transition-all duration-700 ease-out
          hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]
          ${award.shadowColor} hover:shadow-xl
          before:absolute before:inset-0 before:rounded-3xl 
          before:bg-gradient-to-br before:from-white/50 before:to-transparent 
          before:opacity-0 before:transition-opacity before:duration-500 before:z-10
          hover:before:opacity-100
        `}
        style={{
          animationDelay: `${index * 150}ms`
        }}
      >
        {/* Image Container */}
        <div className="relative w-full h-48 sm:h-56 md:h-48 overflow-hidden bg-gray-100">
          {isMobileSlider ? (
            // Use regular img for mobile slider
            <Image
              src={award.imagePath}
              alt={award.imageAlt}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            // Use Next.js Image for desktop
            <Image
              src={award.imagePath}
              alt={award.imageAlt}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              priority={index < 2}
              quality={90}
            />
          )}
          
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Icon overlay on image */}
          <div className="absolute top-4 left-4 z-20">
            <div 
              className={`
                w-12 h-12 rounded-xl bg-gradient-to-br ${award.gradient}
                flex items-center justify-center
                shadow-lg ${award.shadowColor}
                transition-all duration-500 group-hover:scale-110 group-hover:rotate-3
                backdrop-blur-sm bg-opacity-90
              `}
            >
              <IconComponent 
                className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" 
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Year badge */}
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded-full shadow-lg z-20">
            {award.year}
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-6 flex flex-col h-[calc(100%-12rem)]">
          <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-gray-800 transition-colors duration-300">
            {award.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed flex-1 text-sm group-hover:text-gray-700 transition-colors duration-300">
            {award.description}
          </p>

          {/* Bottom accent line */}
          <div className={`mt-4 h-1 bg-gradient-to-r ${award.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
        </div>

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-white/5 to-gray-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
      </div>
    );
  };

  const handleSlideChange = (index: number): void => {
    setCurrentSlide(index);
  };

  return (
    <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Trophy className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Awards & Achievements
            </h2>
          </div>
          
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-600 mx-auto mb-6 rounded-full" />
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Celebrating excellence as an official franchise partner of{' '}
            <span className="font-semibold text-gray-900">AtherEnergy</span>, 
            recognized for outstanding performance and innovation.
          </p>
        </div>

        {/* Awards Grid - Desktop */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((award, index) => (
            <div key={award.id} className="animate-fade-in-up">
              <AwardCard award={award} index={index} />
            </div>
          ))}
        </div>

        {/* Awards Slider - Mobile */}
        <div className="md:hidden relative awards-slider-container">
          <div 
            className="relative w-full h-[450px] rounded-3xl overflow-hidden touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {awards.map((award, index) => (
              <div
                key={award.id}
                className={`
                  absolute inset-0 w-full h-full px-2 transition-all duration-500 ease-in-out
                  ${index === currentSlide 
                    ? 'opacity-100 transform translate-x-0 z-10' 
                    : index < currentSlide 
                      ? 'opacity-0 transform -translate-x-full z-0'
                      : 'opacity-0 transform translate-x-full z-0'
                  }
                `}
              >
                <div className="w-full h-full">
                  <AwardCard 
                    award={award} 
                    index={index} 
                    isMobileSlider={true} 
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile indicators */}
          <div className="flex justify-center mt-3 gap-3">
            {awards.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${currentSlide === index 
                    ? 'bg-gradient-to-r from-amber-400 to-orange-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                  }
                `}
                aria-label={`Go to slide ${index + 1}`}
                type="button"
              />
            ))}
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 w-32 h-32 bg-gradient-to-br from-amber-100/30 to-orange-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        /* Mobile slider fixes */
        @media (max-width: 768px) {
          .awards-slider-container {
            min-height: 450px;
          }
        }
      `}</style>
    </section>
  );
};

export default Awards;