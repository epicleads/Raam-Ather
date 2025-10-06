'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { Testimonial } from '../home-testimonials.types';

interface QuoteBubbles3DProps {
  testimonials: Testimonial[];
}

export default function QuoteBubbles3D({ testimonials }: QuoteBubbles3DProps) {
  const easeCurve: [number, number, number, number] = [0.25, 0.4, 0.25, 1];
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: easeCurve,
      },
    }),
  };

  return (
    <div className="relative w-full">
      {/* Animated background gradients */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-green-400/10 rounded-full blur-3xl animate-pulse"
             style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"
             style={{ animationDuration: '5s', animationDelay: '1s' }} />
      </div>

      {/* Cards Grid - Single row on all screens */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardVariants}
            whileHover={{
              y: -10,
              transition: { duration: 0.3 }
            }}
            className="relative group"
          >
            {/* Floating glow on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl opacity-0
                          group-hover:opacity-20 blur transition-opacity duration-500" />

            {/* Card content */}
            <div className="relative bg-white rounded-3xl p-6 md:p-8 shadow-lg
                          group-hover:shadow-2xl transition-all duration-300
                          border border-gray-100 group-hover:border-green-200
                          h-full flex flex-col">

              {/* Quote icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500
                            rounded-full flex items-center justify-center shadow-lg z-10
                            group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                <Quote className="w-6 h-6 text-white" fill="white" />
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-50 to-transparent
                            rounded-tr-3xl rounded-bl-full opacity-50" />

              {/* Star rating at top */}
              {testimonial.rating && (
                <div className="flex gap-1 mb-4 justify-end">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400
                               group-hover:scale-110 transition-transform duration-300"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
              )}

              {/* Review text */}
              <p className="text-gray-700 text-base leading-relaxed mb-6 flex-grow
                         group-hover:text-gray-900 transition-colors duration-300">
                &ldquo;{testimonial.review}&rdquo;
              </p>

              {/* Divider with animation */}
              <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-4
                            group-hover:w-24 transition-all duration-500" />

              {/* Author info */}
              <div>
                <h4 className="font-bold text-gray-900 text-lg group-hover:text-green-600
                             transition-colors duration-300">
                  {testimonial.name}
                </h4>
                {testimonial.role && (
                  <p className="text-sm text-gray-500 mt-1 font-medium">{testimonial.role}</p>
                )}
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400/50 to-transparent
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-400/20 rounded-full"
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
            style={{
              left: `${15 + i * 15}%`,
              bottom: '0%',
            }}
          />
        ))}
      </div>
    </div>
  );
}
