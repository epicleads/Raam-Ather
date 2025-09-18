"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ClockIcon, StarIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const LocalAdvantageCards = () => {
  const advantages = [
    {
      icon: <ClockIcon className="w-8 h-8" />,
      title: 'Fast Delivery',
      description: 'Quick delivery within 24-48 hours across Hyderabad & Chennai',
      stat: '24-48 hrs',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <StarIcon className="w-8 h-8" />,
      title: 'Priority Service',
      description: 'Dedicated service centers with trained technicians',
      stat: '99% Uptime',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <PhoneIcon className="w-8 h-8" />,
      title: 'Dedicated Support',
      description: '24/7 customer support for all your queries',
      stat: '24/7 Support',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <MapPinIcon className="w-8 h-8" />,
      title: 'Community Events',
      description: 'Regular meetups and EV awareness programs',
      stat: '50+ Events',
      color: 'from-orange-500 to-red-500'
    },
  ];

  return (
    <section className="py-12 bg-[#F8F8F8]">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-8">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-[#1B1B1B] mb-4 font-neurial"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Raam Ather Local Advantage
          </motion.h2>
          <motion.p 
            className="text-base text-[#666666] max-w-3xl mx-auto font-neurial"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Why choose us as your trusted EV partner
          </motion.p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              style={{ maxWidth: '100%', minWidth: '0' }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${advantage.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className={`inline-flex p-3 md:p-4 rounded-xl bg-gradient-to-br ${advantage.color} text-white group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    {advantage.icon}
                  </div>
                  <h3 className="text-lg md:text-sm font-bold text-[#1B1B1B] group-hover:text-[#4A4A4A] transition-colors font-neurial">
                    {advantage.title}
                  </h3>
                </div>

                <p className="text-sm md:text-xs text-[#666666] mb-4 leading-relaxed font-neurial md:min-h-[2.5rem] md:flex md:items-center">
                  {advantage.description}
                </p>

                <div className="text-center">
                  <span className="text-lg md:text-sm font-bold text-[#4A4A4A] font-neurial">{advantage.stat}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocalAdvantageCards;