"use client";
import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import FormContact from '../../Components/contactform/form';

const HeroSlider = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

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
                    onClick={() => setIsContactModalOpen(true)}
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

      {/* Contact Form Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsContactModalOpen(false)}
          >
            <motion.div
              className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-all"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              
              {/* Form Component */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#2962FF] to-[#1E88E5] text-white p-6">
                  <h2 className="text-2xl font-bold mb-2 font-neurial">Get in Touch</h2>
                  <p className="text-blue-100 font-neurial">Ready to experience the EV revolution? Contact us now!</p>
                </div>
                <div className="p-6">
                  <FormContact layout="modal" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeroSlider;