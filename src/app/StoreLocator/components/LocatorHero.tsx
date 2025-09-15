"use client";
import React from 'react';
import { motion } from 'framer-motion';

const LocatorHero = () => {
  return (
    <section className="relative min-h-[400px] bg-gradient-to-r from-[#4A4A4A] via-[#2962FF] to-[#00B248] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 text-center text-white px-4 py-16 max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Find Your Nearest Raam Ather Experience Center
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-white/80 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Discover showrooms, service centers, and test ride locations in Hyderabad & Chennai. Premium service, expert guidance, and the future of electric mobility await you.
        </motion.p>
      </div>
    </section>
  );
};

export default LocatorHero;
