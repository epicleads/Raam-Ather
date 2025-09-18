"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/outline';

const TestimonialsCarousel = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  };

  // Initial Icon Component
  const InitialIcon = ({ name, size = 'desktop' }: { name: string; size?: 'desktop' | 'mobile' }) => {
    const initials = getInitials(name);
    const sizeClasses = size === 'desktop' ? 'w-12 h-12 text-lg' : 'w-10 h-10 text-sm';
    
    return (
      <div className={`${sizeClasses} rounded-full bg-gradient-to-br from-[#4A4A4A] to-[#2962FF] flex items-center justify-center text-white font-bold font-neurial border-2 border-[#4A4A4A] shadow-lg`}>
        {initials}
      </div>
    );
  };
  
  const testimonials = [
    {
      name: 'Arjun Reddy',
      location: 'Hyderabad',
      rating: 5,
      text: 'Exceptional service from Raam Ather! The team guided me through every step of my EV journey. My Ather 450X has been perfect for my daily commute.',
      image: '/assets/customer-1.jpg',
      video: '/assets/testimonial-1.mp4'
    },
    {
      name: 'Priya Sharma',
      location: 'Chennai',
      rating: 5,
      text: 'The delivery was super fast and the after-sales service is outstanding. Raam Ather truly cares about their customers. Highly recommended!',
      image: '/assets/customer-2.jpg',
      video: '/assets/testimonial-2.mp4'
    },
    {
      name: 'Karthik Kumar',
      location: 'Hyderabad',
      rating: 5,
      text: 'Switching to electric was the best decision. Raam Ather made the entire process seamless. The community events are a great bonus!',
      image: '/assets/customer-3.jpg',
      video: '/assets/testimonial-3.mp4'
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const getVisibleTestimonials = () => {
    const first = activeTestimonial;
    const second = (activeTestimonial + 1) % testimonials.length;
    const third = (activeTestimonial + 2) % testimonials.length;
    return [testimonials[first], testimonials[second], testimonials[third]];
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-8">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-[#1B1B1B] mb-4 font-neurial"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Customer Feedback
          </motion.h2>
          <motion.p 
            className="text-base text-[#666666] max-w-3xl mx-auto font-neurial"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hear from our satisfied customers
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Desktop Grid - 3 testimonials */}
          <motion.div 
            className="hidden md:grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            key={activeTestimonial}
          >
            {getVisibleTestimonials().map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-[#F8F8F8] to-white p-8 rounded-3xl shadow-2xl flex flex-col h-full">
                <div className="text-center flex flex-col h-full">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-sm md:text-base text-[#1B1B1B] font-medium leading-relaxed mb-6 font-neurial flex-1">
                    &quot;{testimonial.text}&quot;
                  </blockquote>
                  
                  <div className="flex items-center justify-center gap-3 mt-auto">
                    <InitialIcon name={testimonial.name} size="desktop" />
                    <div className="text-left">
                      <div className="font-bold text-base text-[#1B1B1B] font-neurial">{testimonial.name}</div>
                      <div className="text-sm text-[#666666] font-neurial">{testimonial.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Mobile Grid - Stacked Vertically */}
          <div className="md:hidden space-y-6 px-4">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-gradient-to-br from-[#F8F8F8] to-white p-6 rounded-3xl shadow-2xl">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    <blockquote className="text-sm text-[#1B1B1B] font-medium leading-relaxed mb-6 font-neurial">
                      &quot;{testimonial.text}&quot;
                    </blockquote>

                    <div className="flex items-center justify-center gap-3">
                      <InitialIcon name={testimonial.name} size="mobile" />
                      <div className="text-left">
                        <div className="font-bold text-sm text-[#1B1B1B] font-neurial">{testimonial.name}</div>
                        <div className="text-xs text-[#666666] font-neurial">{testimonial.location}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Navigation Dots */}
          <div className="hidden md:flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeTestimonial === index ? 'bg-[#4A4A4A] w-8' : 'bg-gray-300'
                }`}
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;