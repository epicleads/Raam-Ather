"use client";
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PhoneIcon } from '@heroicons/react/24/outline';
import { usePopup } from '../../Components/popups/PopupProvider';

const ContactHero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const { openFormPopup } = usePopup();

  const handleBookTestRide = () => {
    openFormPopup('testdrive');
  };

  return (
    <section className="relative h-screen overflow-hidden bg-[#1B1B1B]">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        style={{ y }}
      >
        <div 
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url('/assets/contact us.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      </motion.div>

      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-white"
            >
              <motion.h1 
                className="text-2xl md:text-3xl font-bold leading-tight font-neurial"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Get in Touch with
                <span className="text-[#4A4A4A] block">
                  Raam Ather
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-base text-gray-300 mt-6 max-w-3xl font-medium font-neurial"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                Hyderabad & Chennai
              </motion.p>

              {/* Quick Stats */}
              <motion.div 
                className="flex flex-wrap gap-8 mt-40 pt-8 border-t border-white/20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
              >
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white font-neurial">20+</div>
                  <div className="text-sm text-white/80 mt-1 font-neurial">Outlets</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white font-neurial">24/7</div>
                  <div className="text-sm text-white/80 mt-1 font-neurial">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white font-neurial">5000+</div>
                  <div className="text-sm text-white/80 mt-1 font-neurial">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white font-neurial">2</div>
                  <div className="text-sm text-white/80 mt-1 font-neurial">Major Cities</div>
                </div>
              </motion.div>

              {/* Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.3 }}
              >
                <motion.button 
                  className="bg-[#4A4A4A] hover:bg-[#00B248] text-white px-6 py-3 rounded-lg font-semibold text-base transition-all transform hover:scale-105 flex items-center gap-2 shadow-xl font-neurial"
                  onClick={handleBookTestRide}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PhoneIcon className="w-5 h-5" />
                  Book Test Ride
                </motion.button>
                
                <motion.a
                  href="tel:+919032333833"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1B1B1B] px-6 py-3 rounded-lg font-semibold text-base transition-all flex items-center gap-2 font-neurial"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PhoneIcon className="w-5 h-5" />
                  Call Dealer
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>


      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 right-8 text-white/60 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-sm mb-2 font-neurial">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default ContactHero;