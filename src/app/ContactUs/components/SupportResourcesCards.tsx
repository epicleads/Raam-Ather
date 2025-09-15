"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  QuestionMarkCircleIcon, 
  CalculatorIcon, 
  ShieldCheckIcon, 
  CubeIcon,
  BookOpenIcon,
  CreditCardIcon,
  WrenchScrewdriverIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';
import { usePopup } from '../../Components/popups/PopupProvider';

const SupportResourcesCards = () => {
  const { openFormPopup, openCallPopup } = usePopup();
  const resources = [
    {
      icon: <QuestionMarkCircleIcon className="w-8 h-8" />,
      title: 'Frequently Asked Questions',
      description: 'Quick answers to common EV and Ather scooter questions',
      color: 'from-blue-500 to-cyan-500',
      link: '#faq-section',
      badge: 'Popular'
    },
    {
      icon: <CalculatorIcon className="w-8 h-8" />,
      title: 'EMI Calculator',
      description: 'Calculate monthly payments and financing options',
      color: 'from-green-500 to-emerald-500',
      link: '/emi-calculator',
      badge: null
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: 'Warranty Information',
      description: 'Complete warranty coverage and service terms',
      color: 'from-purple-500 to-pink-500',
      link: '/warranty',
      badge: null
    },
    {
      icon: <CubeIcon className="w-8 h-8" />,
      title: 'Accessories & Parts',
      description: 'Genuine accessories, helmets, and spare parts catalog',
      color: 'from-orange-500 to-red-500',
      link: '/accessories',
      badge: 'New'
    },
    {
      icon: <BookOpenIcon className="w-8 h-8" />,
      title: 'EV Knowledge Hub',
      description: 'Learn about electric vehicles and maintenance',
      color: 'from-indigo-500 to-blue-500',
      link: '/blog',
      badge: null
    },
    {
      icon: <CreditCardIcon className="w-8 h-8" />,
      title: 'Finance Options',
      description: 'Bank loans, government subsidies, and payment plans',
      color: 'from-teal-500 to-green-500',
      link: '/financing',
      badge: null
    },
    {
      icon: <WrenchScrewdriverIcon className="w-8 h-8" />,
      title: 'Service Booking',
      description: 'Schedule maintenance, repairs, and software updates',
      color: 'from-yellow-500 to-orange-500',
      link: '/service-booking',
      badge: null
    },
    {
      icon: <ChatBubbleBottomCenterTextIcon className="w-8 h-8" />,
      title: 'Live Chat Support',
      description: '24/7 technical support and customer assistance',
      color: 'from-pink-500 to-purple-500',
      link: '#',
      badge: 'Live'
    }
  ];

  const handleResourceClick = (link: string, title: string) => {
    if (link.startsWith('#')) {
      document.getElementById(link.substring(1))?.scrollIntoView({ behavior: 'smooth' });
    } else if (title === 'Live Chat Support') {
      openFormPopup('contact');
    } else {
      openFormPopup('contact');
    }

    // Analytics tracking
    if (typeof window !== 'undefined' && typeof ((window as unknown as Window & { gtag?: (...args: unknown[]) => void }).gtag) === 'function') {
      (window as unknown as Window & { gtag: (...args: unknown[]) => void }).gtag('event', 'resource_click', {
        resource_name: title,
        event_category: 'Support Resources'
      });
    }
  };

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
            Support & Resources
            <span className="text-[#4A4A4A] block">Everything You Need</span>
          </motion.h2>
          <motion.p 
            className="text-base text-[#666666] max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore our comprehensive resources to make your electric vehicle journey smooth and informed.
          </motion.p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              className="group relative bg-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => handleResourceClick(resource.link, resource.title)}
            >
              {/* Badge */}
              {resource.badge && (
                <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold text-white z-10 ${
                  resource.badge === 'Popular' ? 'bg-[#FF6D00]' :
                  resource.badge === 'New' ? 'bg-[#4A4A4A]' :
                  resource.badge === 'Live' ? 'bg-red-500 animate-pulse' : 'bg-[#2962FF]'
                }`}>
                  {resource.badge}
                </div>
              )}

              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${resource.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${resource.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {resource.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-[#1B1B1B] mb-3 group-hover:text-[#4A4A4A] transition-colors">
                  {resource.title}
                </h3>
                
                {/* Description */}
                <p className="text-[#666666] text-sm leading-relaxed mb-4">
                  {resource.description}
                </p>
                
                {/* Action Indicator */}
                <div className="flex items-center justify-between">
                  <motion.span 
                    className="text-xs font-semibold text-[#4A4A4A] opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                  >
                    Click to Explore
                  </motion.span>
                  
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg className="w-4 h-4 text-[#4A4A4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden">
          <motion.div 
            className="flex gap-6 pb-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4"
            drag="x"
            dragConstraints={{ left: -1000, right: 0 }}
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-64 group relative bg-white rounded-2xl p-4 hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer snap-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => handleResourceClick(resource.link, resource.title)}
              >
                {resource.badge && (
                  <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold text-white z-10 ${
                    resource.badge === 'Popular' ? 'bg-[#FF6D00]' :
                    resource.badge === 'New' ? 'bg-[#4A4A4A]' :
                    resource.badge === 'Live' ? 'bg-red-500 animate-pulse' : 'bg-[#2962FF]'
                  }`}>
                    {resource.badge}
                  </div>
                )}

                <div className={`absolute inset-0 bg-gradient-to-br ${resource.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${resource.color} text-white mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    {resource.icon}
                  </div>
                  
                  <h3 className="text-base font-bold text-[#1B1B1B] mb-2 group-hover:text-[#4A4A4A] transition-colors">
                    {resource.title}
                  </h3>
                  
                  <p className="text-[#666666] text-xs leading-relaxed mb-3">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <motion.span 
                      className="text-xs font-semibold text-[#4A4A4A] opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -10 }}
                      animate={{ x: 0 }}
                    >
                      Tap to Explore
                    </motion.span>
                    
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <svg className="w-3 h-3 text-[#4A4A4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-1">
            {Array.from({ length: Math.ceil(resources.length / 3) }).map((_, index) => (
              <button
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300 transition-all"
              />
            ))}
          </div>
        </div>

        {/* Quick Links Section */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-white to-[#F8F8F8] rounded-3xl p-8 border border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-[#1B1B1B] mb-4">
              Need Immediate Help?
            </h3>
            <p className="text-[#666666] mb-6 max-w-2xl mx-auto">
              Access these quick links for instant assistance with your Ather scooter experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <motion.button
              className="bg-[#4A4A4A] hover:bg-[#00B248] text-white py-4 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              onClick={() => openFormPopup('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <WrenchScrewdriverIcon className="w-5 h-5" />
              Roadside Assistance
            </motion.button>
            
            <motion.button
              className="bg-[#2962FF] hover:bg-[#1E88E5] text-white py-4 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              onClick={() => handleResourceClick('/service-booking', 'Service Booking')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CalculatorIcon className="w-5 h-5" />
              Book Service
            </motion.button>
            
            <motion.button
              className="bg-[#FF6D00] hover:bg-[#F57C00] text-white py-4 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              onClick={() => openCallPopup()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
              Emergency Call
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SupportResourcesCards;