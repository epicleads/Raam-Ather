'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const Comfort1Client = () => {
  const [selectedModel, setSelectedModel] = useState('450');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const content = {
    '450': {
      title: 'Touchscreen Dashboard',
      description: '17.7 cm (7") TFT dashboard. Touch, tap, scroll your way around an intuitive UI.',
      image: '/Ather-Assets/450/comfort/comfort1.webp',
    },
    '450X': {
      title: 'DeepView™ Display',
      description: 'Industry-first 18-segment EBN display. Clearly visible under sunlight and low light.',
      image: '/Ather-Assets/450/comfort/comfort2.webp',
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-black py-0 mb-0 overflow-hidden font-neurial"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight tracking-tight font-neurial">
            Ride quick and Ride easy
          </h2>
        </motion.div>

        {/* Main Content Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative w-4/5 mx-auto h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              key={selectedModel}
              src={content[selectedModel as keyof typeof content].image}
              alt={content[selectedModel as keyof typeof content].title}
              fill
              className="object-cover transition-opacity duration-500"
              sizes="(max-width: 1024px) 100vw, 800px"
              priority={selectedModel === '450'}
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

          {/* Desktop: Text Overlay - Top Center */}
          <div className="hidden lg:block absolute top-8 left-1/2 transform -translate-x-1/2 text-center max-w-md">
            <motion.div
              key={selectedModel}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-white text-xl lg:text-2xl font-bold mb-2 leading-tight font-neurial">
                {content[selectedModel as keyof typeof content].title}
              </h3>
              <p className="text-gray-300 text-xs lg:text-sm leading-relaxed font-light tracking-wide font-neurial">
                {content[selectedModel as keyof typeof content].description}
              </p>
            </motion.div>

            {/* Desktop Toggle - Right below text with reduced gap */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 flex justify-center"
            >
              <ToggleSwitch
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
              />
            </motion.div>
          </div>

          {/* Mobile: Text Only - Moved Higher */}
          <div className="lg:hidden absolute top-4 left-0 right-0 p-6">
            <motion.div
              key={selectedModel}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h3 className="text-white text-lg font-bold mb-2 leading-tight font-neurial">
                {content[selectedModel as keyof typeof content].title}
              </h3>
              <p className="text-gray-300 text-xs leading-relaxed font-light tracking-wide font-neurial">
                {content[selectedModel as keyof typeof content].description}
              </p>
            </motion.div>
          </div>

          {/* Mobile: Toggle Only - Moved Lower */}
          <div className="lg:hidden absolute bottom-0 left-0 right-0 p-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <ToggleSwitch
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
              />
            </motion.div>
          </div>

          {/* Corner Accent */}
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-green-400/50" />
        </motion.div>

      </div>
    </section>
  );
};

// Toggle Switch Component
const ToggleSwitch = ({ 
  selectedModel, 
  setSelectedModel 
}: { 
  selectedModel: string; 
  setSelectedModel: (model: string) => void; 
}) => {
  return (
    <div className="relative bg-gray-800/60 backdrop-blur-sm rounded-full p-1 border border-gray-700/50">
      <div className="flex relative z-10">
        <button
          onClick={() => setSelectedModel('450')}
          className={`relative px-6 py-2 text-xs lg:text-sm font-semibold rounded-full transition-all duration-300 font-neurial ${
            selectedModel === '450'
              ? 'text-black'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          450
        </button>
        <button
          onClick={() => setSelectedModel('450X')}
          className={`relative px-6 py-2 text-xs lg:text-sm font-semibold rounded-full transition-all duration-300 font-neurial ${
            selectedModel === '450X'
              ? 'text-black'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          450X
        </button>
      </div>
      
      {/* Animated Background */}
      <motion.div
        className="absolute top-1 bottom-1 bg-green-400 rounded-full"
        initial={false}
        animate={{
          left: selectedModel === '450' ? '4px' : '50%',
          right: selectedModel === '450' ? '50%' : '4px'
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30 
        }}
      />
    </div>
  );
};

export default Comfort1Client;
