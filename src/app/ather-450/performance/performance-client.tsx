'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface PerformanceCard {
  title: string;
  description: string;
  image?: string;
  isEngineMotor?: boolean;
}

interface PerformanceData {
  class1Cards: PerformanceCard[];
  class2Cards: Array<{
    title: string;
    description: string;
  }>;
  seoContent: {
    structuredData: Record<string, unknown>;
    locationInfo: {
      hyderabad: string;
      chennai: string;
    };
  };
}

interface PerformanceClientProps {
  data: PerformanceData;
}

export function PerformanceClient({ data }: PerformanceClientProps) {
  const titleRef = useRef(null);
  const class1Ref = useRef(null);
  const class2Ref = useRef(null);
  
  const titleInView = useInView(titleRef, { once: true });
  const class1InView = useInView(class1Ref, { once: true });
  const class2InView = useInView(class2Ref, { once: true });


  return (
    <div className="space-y-16 md:space-y-24">
      {/* Section Title */}
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 50 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold font-manrope tracking-tight">
          Peak performance, brought to you by -
        </h2>
      </motion.div>

      {/* Class 1 - Two-grid with text overlay */}
      <motion.div
        ref={class1Ref}
        initial={{ opacity: 0 }}
        animate={class1InView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8">
          {data.class1Cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={class1InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
              className="relative bg-zinc-900 rounded-2xl overflow-hidden min-h-[400px] flex flex-col justify-end group hover:bg-zinc-800 transition-colors duration-300"
            >
              {/* Background Image */}
              {card.image && (
                <div className="absolute inset-0 z-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
              )}
              
              {/* Content Overlay */}
              <div className="relative z-10 p-8 lg:p-12">
                <div className="space-y-4">
                  {card.isEngineMotor ? (
                    <EngineMotorTransition />
                  ) : (
                    <h3 className="text-xs font-manrope font-medium text-zinc-200 uppercase tracking-widest">
                      {card.title}
                    </h3>
                  )}
                  <p className="text-sm text-zinc-100 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Vertical Layout */}
        <div className="md:hidden space-y-6 px-4">
          {data.class1Cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={class1InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
              className="relative bg-zinc-900 rounded-2xl overflow-hidden h-80 flex flex-col justify-end group hover:bg-zinc-800 transition-colors duration-300"
            >
              {/* Background Image */}
              {card.image && (
                <div className="absolute inset-0 z-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
              )}
              
              {/* Content Overlay */}
              <div className="relative z-10 p-6">
                <div className="space-y-3">
                  {card.isEngineMotor ? (
                    <EngineMotorTransition />
                  ) : (
                    <h3 className="text-xs font-manrope font-medium text-zinc-200 uppercase tracking-widest">
                      {card.title}
                    </h3>
                  )}
                  <p className="text-sm text-zinc-100 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Class 2 - Four-grid technical highlights */}
      <motion.div
        ref={class2Ref}
        initial={{ opacity: 0 }}
        animate={class2InView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative"
      >
        {/* Desktop 4-column Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {data.class2Cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={class2InView ? { opacity: 1, scale: 1 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: 0.6 + index * 0.1,
                ease: "easeOut"
              }}
              className="bg-black border border-zinc-800 rounded-xl p-6 min-h-[200px] flex flex-col justify-between group hover:border-green-400 hover:shadow-lg hover:shadow-green-400/10 transition-all duration-300"
            >
              <h3 className="text-sm font-manrope font-semibold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">
                {card.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile Vertical Layout */}
        <div className="md:hidden space-y-4 px-4">
          {data.class2Cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={class2InView ? { opacity: 1, scale: 1 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: 0.6 + index * 0.1,
                ease: "easeOut"
              }}
              className="bg-black border border-zinc-800 rounded-xl p-6 min-h-[160px] flex flex-col justify-between group hover:border-green-400 hover:shadow-lg hover:shadow-green-400/10 transition-all duration-300"
            >
              <h3 className="text-sm font-manrope font-semibold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">
                {card.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function EngineMotorTransition() {
  const [showMotor, setShowMotor] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMotor(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: showMotor ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0"
      >
        <h3 className="text-xs font-manrope font-medium text-zinc-400 uppercase tracking-widest">
          Engine
        </h3>
        {showMotor && (
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute top-1/2 left-0 w-full h-px bg-green-400 transform -translate-y-1/2"
          />
        )}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: showMotor ? 1 : 0, x: showMotor ? 0 : -20 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="absolute inset-0"
      >
        <h3 className="text-xs font-manrope font-medium text-green-400 uppercase tracking-widest">
          Motor
        </h3>
      </motion.div>
    </div>
  );
}