"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StarIcon, CheckBadgeIcon, ShieldCheckIcon, TrophyIcon } from '@heroicons/react/24/outline';

const TrustCertification = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const certifications = [
    {
      icon: <CheckBadgeIcon className="w-8 h-8" />,
      title: 'Authorized Ather Dealer',
      description: 'Official partnership with Ather Energy',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: 'ISO Certified Service',
      description: 'International quality standards',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <TrophyIcon className="w-8 h-8" />,
      title: 'Best Dealer Award 2023',
      description: 'Excellence in customer service',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const quickTestimonials = [
    {
      name: 'Ravi Kumar',
      rating: 5,
      text: 'Excellent service and support. Highly recommend Raam Ather for EV purchase.',
      location: 'Hyderabad'
    },
    {
      name: 'Priya Nair',
      rating: 5,
      text: 'Professional team, quick delivery, and amazing after-sales support!',
      location: 'Chennai'
    },
    {
      name: 'Arjun Patel',
      rating: 5,
      text: 'Best EV dealership experience. The team guided me through everything.',
      location: 'Hyderabad'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % quickTestimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [quickTestimonials.length]);

  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-8">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-[#1B1B1B] mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Trusted by Thousands
            <span className="text-[#4A4A4A] block">Certified Excellence</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-[#1B1B1B] mb-8">
              Our Certifications & Achievements
            </h3>
            
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-6 bg-[#F8F8F8] rounded-2xl hover:bg-white hover:shadow-lg transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${cert.color} text-white`}>
                    {cert.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1B1B1B] mb-1">{cert.title}</h4>
                    <p className="text-[#666666] text-sm">{cert.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#4A4A4A]">5000+</div>
                <div className="text-sm text-[#666666]">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#4A4A4A]">4.9</div>
                <div className="text-sm text-[#666666]">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#4A4A4A]">99%</div>
                <div className="text-sm text-[#666666]">Satisfaction Rate</div>
              </div>
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-[#1B1B1B] mb-8">
              What Our Customers Say
            </h3>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-[#4A4A4A]/10 to-[#2962FF]/10 rounded-3xl p-8 border border-[#4A4A4A]/20 min-h-[300px] flex flex-col justify-center">
                {quickTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className={`${index === currentTestimonial ? 'block' : 'hidden'}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: index === currentTestimonial ? 1 : 0, x: index === currentTestimonial ? 0 : 50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <blockquote className="text-lg text-[#1B1B1B] font-medium leading-relaxed mb-6 text-center">
                      &quot;{testimonial.text}&quot;
                    </blockquote>
                    
                    <div className="text-center">
                      <div className="font-bold text-[#1B1B1B]">{testimonial.name}</div>
                      <div className="text-[#666666] text-sm">{testimonial.location}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-6 space-x-2">
                {quickTestimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentTestimonial ? 'bg-[#4A4A4A] w-8' : 'bg-gray-300'
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 p-6 bg-[#F8F8F8] rounded-2xl">
              <h4 className="font-bold text-[#1B1B1B] mb-4 text-center">Why Choose Raam Ather?</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <CheckBadgeIcon className="w-5 h-5 text-[#4A4A4A]" />
                  <span>Authorized dealer with genuine products</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckBadgeIcon className="w-5 h-5 text-[#4A4A4A]" />
                  <span>24/7 customer support and roadside assistance</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckBadgeIcon className="w-5 h-5 text-[#4A4A4A]" />
                  <span>Transparent pricing with no hidden charges</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckBadgeIcon className="w-5 h-5 text-[#4A4A4A]" />
                  <span>Expert technical team and certified mechanics</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustCertification;