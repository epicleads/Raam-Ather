"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  description: string;
  stats: string;
  highlight: string;
  imagePath: string;
  imageAlt: string;
  gradient: string;
  shadowColor: string;
}

const RaamAtherTimeline: React.FC = () => {
  const [activeYear, setActiveYear] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const milestones: TimelineItem[] = [
    {
      id: 1,
      year: '2022',
      title: 'Ather Partnership',
      description: 'Became official Ather Energy franchise partner, marking the beginning of our electric mobility journey in South India.',
      stats: 'Partnership Established',
      highlight: 'Official Franchise Partner',
      imagePath: "/Ather-Assets/thumbnails/3.jpeg",
      imageAlt: "Ather Partnership Launch",
      gradient: "from-blue-500 via-indigo-600 to-purple-700",
      shadowColor: "shadow-blue-500/30"
    },
    {
      id: 2,
      year: '2023',
      title: 'Rapid Expansion',
      description: 'Launched multiple Experience Centers across Hyderabad including Somajiguda, Nagole, and RC Puram, establishing strong market presence.',
      stats: '3 Experience Centers',
      highlight: 'Market Entry Success',
      imagePath: "/Ather-Assets/thumbnails/2.jpeg",
      imageAlt: "Experience Centers Launch",
      gradient: "from-emerald-500 via-teal-600 to-cyan-700",
      shadowColor: "shadow-emerald-500/30"
    },
    {
      id: 3,
      year: '2024',
      title: 'Market Leadership',
      description: 'Achieved 40-45% market share in Hyderabad with 3,163 unit sales. Expanded to Kompally and established competitive advantage.',
      stats: '3,163 Units Sold',
      highlight: '43% Market Share',
      imagePath: "/Ather-Assets/thumbnails/3.jpeg",
      imageAlt: "Market Leadership Achievement",
      gradient: "from-amber-500 via-orange-600 to-red-700",
      shadowColor: "shadow-amber-500/30"
    },
    {
      id: 4,
      year: '2025',
      title: 'Ather 2.0 Revolution',
      description: 'Implementing revamped business model with optimized operations. Projected 45% market share with strategic expansion to Malakpet and Vanasthalipuram.',
      stats: '45% Projected Share',
      highlight: 'Ather 2.0 Model',
      imagePath: "/Ather-Assets/thumbnails/1.jpeg",
      imageAlt: "Future Vision 2025",
      gradient: "from-violet-500 via-purple-600 to-indigo-700",
      shadowColor: "shadow-violet-500/30"
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

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setActiveYear((prev: number) => (prev + 1) % milestones.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isMobile, milestones.length]);

  const TimelineCard: React.FC<{ milestone: TimelineItem; index: number; isActive: boolean }> = ({ 
    milestone, 
    index, 
    isActive 
  }) => {
    return (
      <div 
        className={`
          group relative bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden h-full
          border border-white/20 transition-all duration-700 ease-out cursor-pointer
          ${isActive 
            ? 'scale-105 shadow-2xl bg-white/90' 
            : 'hover:scale-102 hover:shadow-xl hover:bg-white/85'
          }
          ${milestone.shadowColor} 
        `}
        onClick={() => !isMobile && setActiveYear(index)}
        style={{
          animationDelay: `${index * 200}ms`
        }}
      >
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Image Container with Apple-style blur */}
        <div className="relative w-full h-52 overflow-hidden">
          <Image
            src={milestone.imagePath}
            alt={milestone.imageAlt}
            fill
            className="object-cover transition-all duration-1000 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={index < 2}
            quality={95}
          />
          
          {/* Premium gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent`} />
          <div className={`absolute inset-0 bg-gradient-to-br ${milestone.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
          
          {/* Floating year badge - Apple style */}
          <div className="absolute top-6 right-6 z-20">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-2xl" />
              <div className="relative px-4 py-2 text-white font-semibold text-lg tracking-wider">
                {milestone.year}
              </div>
            </div>
          </div>

          {/* Bottom stats overlay */}
          <div className="absolute bottom-4 left-6 right-6 z-20">
            <div className="relative">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-xl rounded-xl" />
              <div className="relative px-4 py-2">
                <div className="text-white/90 text-sm font-medium">{milestone.stats}</div>
                <div className="text-white text-xs opacity-80">{milestone.highlight}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section - Apple minimalism */}
        <div className="relative p-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight">
              {milestone.title}
            </h3>
            
            <p className="text-gray-600 leading-relaxed text-base">
              {milestone.description}
            </p>

            {/* Premium accent line */}
            <div className="pt-4">
              <div className={`h-1 bg-gradient-to-r ${milestone.gradient} rounded-full transform ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'} transition-transform duration-700 origin-left`} />
            </div>
          </div>
        </div>

        {/* Apple-style shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        </div>
      </div>
    );
  };

  const handleSlideChange = (index: number): void => {
    setActiveYear(index);
  };

  return (
    <section className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 md:py-20 relative overflow-hidden">
      {/* Apple-style background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Apple style */}
        <div className="text-center mb-20">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight leading-tight">
              Raam Ather
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 tracking-wide">
              Journey of Excellence
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Leading the electric mobility revolution as an official 
              <span className="font-semibold text-gray-800"> Ather Energy franchise partner</span>, 
              transforming transportation across South India.
            </p>
          </div>
        </div>

        {/* Timeline Grid - Desktop */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="animate-fade-in-up">
              <TimelineCard 
                milestone={milestone} 
                index={index} 
                isActive={activeYear === index}
              />
            </div>
          ))}
        </div>

        {/* Timeline Navigation - Desktop */}
        <div className="hidden md:flex justify-center space-x-4 mb-8">
          {milestones.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveYear(index)}
              className={`
                w-4 h-4 rounded-full transition-all duration-300 
                ${activeYear === index 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 w-12 shadow-lg' 
                  : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                }
              `}
              aria-label={`Go to ${milestones[index].year}`}
            />
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden px-4">
          <div className="relative max-w-sm mx-auto">
            <div className="overflow-hidden rounded-3xl">
              <TimelineCard 
                milestone={milestones[activeYear]} 
                index={activeYear} 
                isActive={true}
              />
            </div>

            {/* Navigation arrows - positioned outside card */}
            <button
              onClick={() => setActiveYear(activeYear > 0 ? activeYear - 1 : milestones.length - 1)}
              className="absolute -left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-xl shadow-lg rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:scale-110 transition-all duration-300 z-10"
              type="button"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            
            <button
              onClick={() => setActiveYear(activeYear < milestones.length - 1 ? activeYear + 1 : 0)}
              className="absolute -right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-xl shadow-lg rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:scale-110 transition-all duration-300 z-10"
              type="button"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </button>
          </div>

          {/* Mobile indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {milestones.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${activeYear === index 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 w-8 shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400'
                  }
                `}
                aria-label={`Go to slide ${index + 1}`}
                type="button"
              />
            ))}
          </div>
        </div>

        {/* Stats Summary - Apple style */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">3+</div>
              <div className="text-gray-600 text-sm md:text-base">Experience Centers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">45%</div>
              <div className="text-gray-600 text-sm md:text-base">Market Share</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">3K+</div>
              <div className="text-gray-600 text-sm md:text-base">Units Sold</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">2</div>
              <div className="text-gray-600 text-sm md:text-base">Cities</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default RaamAtherTimeline;