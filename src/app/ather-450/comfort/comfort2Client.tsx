'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const Comfort2Client = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const features = [
    {
      id: 'park-assist',
      title: 'Park Assist™',
      description: 'Ride in reverse at the press of a button. While the taillights alert others nearby.',
      image: '/Ather-Assets/450/comfort/comfort3.webp',
    },
    {
      id: 'auto-hold',
      title: 'AutoHold™',
      description: 'Halt and hold steady on any slope automatically, without brakes.',
      image: '/Ather-Assets/450/comfort/comfort4.webp',
    },
    {
      id: 'alexa-skills',
      title: 'Alexa Skills',
      description: 'Just ask Alexa to know your Ather\'s charging status, location and more.',
      image: '/Ather-Assets/450/comfort/comfort5.webp',
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-black py-12 lg:py-16 overflow-hidden font-neurial"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Desktop Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="hidden lg:grid lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <ComfortCard key={feature.id} feature={feature} variants={cardVariants} />
          ))}
        </motion.div>

        {/* Mobile Vertical Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="lg:hidden space-y-6 px-4"
        >
          {features.map((feature) => (
            <ComfortCard key={feature.id} feature={feature} variants={cardVariants} />
          ))}
        </motion.div>

      </div>
    </section>
  );
};


// Comfort Card Component
import type { Variants } from 'framer-motion';

interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface ComfortCardProps {
  feature: Feature;
  variants?: Variants;
}

const ComfortCard = ({ feature, variants }: ComfortCardProps) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="relative group h-80 lg:h-96 rounded-xl overflow-hidden shadow-2xl bg-gray-900"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={feature.image}
          alt={feature.title}
          className="w-full h-full object-cover pointer-events-none"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Text Overlay - Bottom Left */}
      <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h3 className="text-white text-base lg:text-lg font-bold mb-2 leading-tight font-neurial">
            {feature.title}
          </h3>
          <p className="text-gray-300 text-xs lg:text-sm leading-relaxed font-light tracking-wide font-neurial">
            {feature.description}
          </p>
        </motion.div>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-green-400/50 group-hover:border-green-400 transition-colors duration-300" />

      {/* Feature Icon/Badge */}
      <div className="absolute top-4 left-4 w-2 h-2 bg-green-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

export default Comfort2Client;
