"use client";
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTestDriveModal } from '../../Components/test-ride-form/TestDriveModalStore';

const HeroSlider = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const modal = useTestDriveModal();

  const heroContent = {
    image: '/assets/Rizta-most.webp',
    title: 'Raam Ather',
    subtitle: 'Driving the EV Revolution',
    location: 'in Hyderabad & Chennai',
    description: 'Experience premium electric mobility with world-class service',
  };

  return (
    <>
      <section className="relative h-screen overflow-hidden bg-[#1B1B1B]">
        {/* Single Background Image */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          style={{ y }}
        >
          <div 
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${heroContent.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-20">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-white"
              >
                <motion.h1 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-neurial"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  {heroContent.title}
                  <span className="text-[#000000] block">
                    {heroContent.subtitle}
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-base sm:text-lg md:text-xl text-gray-300 mt-3 max-w-xl font-neurial"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                >
                  {heroContent.location}
                </motion.p>

                <motion.p 
                  className="text-base text-gray-400 mt-3 max-w-lg font-neurial"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.9 }}
                >
                  {heroContent.description}
                </motion.p>

                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 mt-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.1 }}
                >
                  <button 
                    onClick={() => modal.openManually()}
                    className="bg-gradient-to-r from-[#2962FF] to-[#00B248] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all transform hover:scale-105 flex items-center justify-center gap-2 w-full sm:w-auto font-neurial"
                  >
                    Know More
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSlider;