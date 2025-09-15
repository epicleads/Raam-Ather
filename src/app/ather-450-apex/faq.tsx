'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What is the top speed of the Ather 450 Apex?",
    answer: "The Ather 450 Apex can reach a top speed of 90 kmph in Warp+™ mode, making it one of the fastest electric scooters in its category. This impressive speed is achieved through its 6.4 kW peak power motor and advanced battery technology."
  },
  {
    id: 2,
    question: "What is the riding range on a single charge?",
    answer: "The Ather 450 Apex delivers an IDC-certified true range of 150 km on a single charge. This range is achieved under standard riding conditions and may vary based on riding style, terrain, weather conditions, and vehicle load."
  },
  {
    id: 3,
    question: "How long does it take to fully charge the scooter?",
    answer: "The Ather 450 Apex can be fully charged in approximately 6.5 hours using a standard home charger. With fast charging options available at Ather Grid stations, you can achieve 0-80% charge in just 3.3 hours for quick top-ups during your day."
  },
  {
    id: 4,
    question: "Does Ather 450 Apex support fast charging?",
    answer: "Yes, the Ather 450 Apex supports fast charging at Ather Grid stations across India. You can also use the portable charger for home charging or any standard 15A socket. The scooter comes with smart charging features and battery management system for optimal battery health."
  },
  {
    id: 5,
    question: "Where can I book a test ride with Raam Ather?",
    answer: "You can book a test ride at any of our Raam Ather showrooms in Hyderabad and Chennai. Visit our website, call our showrooms directly, or walk in to experience the Ather 450 Apex first-hand. Our team will help you schedule a convenient time for your test ride."
  }
];

interface FAQAccordionProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQAccordion({ item, isOpen, onToggle }: FAQAccordionProps) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <motion.button
        onClick={onToggle}
        className="w-full text-left py-6 px-0 flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20 rounded-lg"
        whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
        transition={{ duration: 0.2 }}
      >
        <h3 
          className="text-lg md:text-xl font-semibold text-gray-900 pr-8 leading-relaxed group-hover:text-orange-600 transition-colors duration-300"
          style={{ fontFamily: 'Neurial Grotesk, -apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          {item.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
          className="flex-shrink-0"
        >
          <svg 
            className="w-6 h-6 text-gray-500 group-hover:text-orange-500 transition-colors duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.4, 0.0, 0.2, 1],
              opacity: { duration: 0.3 }
            }}
            className="overflow-hidden"
          >
            <div className="pb-6">
              <p 
                className="text-base md:text-lg text-gray-600 leading-relaxed"
                style={{ fontFamily: 'Neurial Grotesk, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="bg-white py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
            className="text-center mb-16"
          >
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-6"
              style={{ fontFamily: 'Neurial Grotesk, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Frequently Asked Questions –{' '}
              <span className="text-orange-500">Ather 450 Apex</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="divide-y divide-gray-100">
              {faqData.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: [0.4, 0.0, 0.2, 1] 
                  }}
                  className="px-6 md:px-8"
                >
                  <FAQAccordion
                    item={item}
                    isOpen={openItem === item.id}
                    onToggle={() => handleToggle(item.id)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          
        </div>
      </div>
    </section>
  );
}