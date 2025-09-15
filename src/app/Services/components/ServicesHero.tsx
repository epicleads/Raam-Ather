"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  BoltIcon,
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const ServicesHero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Full-width Banner Image */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/assets/services-hero.jpg')` }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-20 flex items-center min-h-screen">
        <div className="w-full max-w-4xl mx-auto text-center text-white">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
             {/* <WrenchScrewdriverIcon className="w-6 h-6" />
              <span className="font-medium">Premium Services</span> */}
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-neurial">
              <span className="block">Expert Care for Your</span>
              <span className="block bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                Electric Journey
              </span>
            </h1>
            
            <motion.p
              className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-neurial"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              From sales to service, charging to customization - we provide comprehensive 
              solutions to keep your Ather electric scooter running perfectly.
            </motion.p>
          </motion.div>

          {/* Service Highlights */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { icon: ShieldCheckIcon, title: 'Authorized Service', desc: 'Official Ather partner' },
              { icon: BoltIcon, title: 'Fast Charging', desc: 'Quick turnaround times' },
              { icon: SparklesIcon, title: 'Premium Care', desc: 'Expert technicians' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              >
                <item.icon className="w-8 h-8 mx-auto mb-4 text-yellow-200" />
                <h3 className="font-semibold mb-2 font-neurial">{item.title}</h3>
                <p className="text-sm text-white/80 font-neurial">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.button
              className="bg-white text-[#4A4A4A] px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-yellow-200 transition-all shadow-2xl font-neurial cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('services-grid');
                if (element) {
                  element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
            >
              Explore Our Services
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;