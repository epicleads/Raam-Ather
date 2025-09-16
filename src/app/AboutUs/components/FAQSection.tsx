"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const FAQSection = () => {
  const [activeItem, setActiveItem] = useState(0);
  
  const faqs = [
    {
      question: 'What makes Raam Ather different from other dealers?',
      answer: 'We offer premium dealership experience with fast delivery (24-48 hours), dedicated service centers, 24/7 support, and regular community events. Our team is trained to provide world-class customer service.'
    },
    {
      question: 'Do you provide home delivery service?',
      answer: 'Yes, we offer convenient home delivery service across Hyderabad and Chennai within 24-48 hours of booking confirmation. Our team ensures safe and secure delivery of your Ather scooter.'
    },
    {
      question: 'What after-sales services do you provide?',
      answer: 'We provide comprehensive after-sales support including regular maintenance, genuine spare parts, software updates, battery health checks, and 24/7 customer support through our dedicated service centers.'
    },
    {
      question: 'Can I trade-in my old vehicle?',
      answer: 'Yes, we accept trade-ins for conventional two-wheelers. Our team will evaluate your vehicle and offer the best possible exchange value towards your new Ather scooter purchase.'
    },
    {
      question: 'Do you organize community events?',
      answer: 'Absolutely! We regularly organize EV awareness programs, group rides, charging station tours, and community meetups to build a strong network of EV enthusiasts and promote sustainable mobility.'
    }
  ];

  return (
    <section className="pt-12 pb-0 bg-[#F8F8F8]">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-8">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-[#1B1B1B] mb-4 font-neurial"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            className="text-base text-[#666666] max-w-3xl mx-auto font-neurial"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Everything you need to know about Raam Ather
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                  activeItem === index 
                    ? 'bg-white shadow-lg border-l-4 border-[#4A4A4A]' 
                    : 'bg-white/50 hover:bg-white hover:shadow-md'
                }`}
                onClick={() => setActiveItem(activeItem === index ? -1 : index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg md:text-xl font-semibold text-[#1B1B1B] pr-4 font-neurial">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: activeItem === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRightIcon className={`w-6 h-6 ${activeItem === index ? 'text-[#4A4A4A]' : 'text-[#666666]'} transform rotate-90`} />
                  </motion.div>
                </div>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: activeItem === index ? 'auto' : 0,
                    opacity: activeItem === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-[#666666] mt-4 leading-relaxed font-neurial">
                    {faq.answer}
                  </p>
                </motion.div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;