"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  WrenchScrewdriverIcon,
  BoltIcon,
  TruckIcon,
  PlayIcon,
  CreditCardIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  features: string[];
  color: string;
  category: 'maintenance' | 'sales' | 'support';
}

const ServicesGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'maintenance' | 'sales' | 'support'>('all');

  const services: Service[] = [
    {
      id: 1,
      title: 'Expert Maintenance',
      description: 'Comprehensive maintenance services by certified technicians.',
      icon: WrenchScrewdriverIcon,
      image: '/api/placeholder/400/300',
      features: ['Regular servicing', 'Battery health check', 'Software updates', 'Genuine parts replacement'],
      color: 'from-blue-500 to-blue-600',
      category: 'maintenance'
    },
    {
      id: 2,
      title: 'Fast Charging Solutions',
      description: 'Quick and reliable charging services with our state-of-the-art.',
      icon: BoltIcon,
      image: '/api/placeholder/400/300',
      features: ['Rapid charging', '24/7 availability', 'Multiple locations', 'Smart charging management'],
      color: 'from-yellow-500 to-orange-500',
      category: 'support'
    },
    {
      id: 3,
      title: 'Home Delivery',
      description: 'Convenient doorstep delivery and pickup services for your ultimate convenience.',
      icon: TruckIcon,
      image: '/api/placeholder/400/300',
      features: ['Free pickup & drop', 'Scheduled delivery', 'Real-time tracking', 'Contactless service'],
      color: 'from-green-500 to-green-600',
      category: 'support'
    },
    {
      id: 4,
      title: 'Test Ride Experience',
      description: 'Experience the future of mobility with our comprehensive test ride program.',
      icon: PlayIcon,
      image: '/api/placeholder/400/300',
      features: ['Multiple models', 'Extended test rides', 'Expert guidance', 'No commitment'],
      color: 'from-purple-500 to-purple-600',
      category: 'sales'
    },
    {
      id: 5,
      title: 'Flexible Financing',
      description: 'Easy EMI options and financing solutions to make your electric dream affordable.',
      icon: CreditCardIcon,
      image: '/api/placeholder/400/300',
      features: ['Zero down payment', 'Competitive rates', 'Quick approval', 'Flexible tenure'],
      color: 'from-indigo-500 to-indigo-600',
      category: 'sales'
    },
    {
      id: 6,
      title: 'Extended Warranty',
      description: 'Comprehensive warranty coverage for complete peace of mind.',
      icon: ShieldCheckIcon,
      image: '/api/placeholder/400/300',
      features: ['Extended coverage', 'Roadside assistance', 'Battery warranty', '24/7 support'],
      color: 'from-red-500 to-red-600',
      category: 'support'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Services', count: services.length },
    { id: 'maintenance', label: 'Maintenance', count: services.filter(s => s.category === 'maintenance').length },
    { id: 'sales', label: 'Sales & Finance', count: services.filter(s => s.category === 'sales').length },
    { id: 'support', label: 'Support', count: services.filter(s => s.category === 'support').length }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <section id="services-grid" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Premium Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions designed to provide the best electric mobility experience
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as typeof selectedCategory)}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all ${
                selectedCategory === category.id
                  ? 'bg-[#2962FF] text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
              <span className="ml-2 px-2 py-1 bg-black/10 rounded-full text-xs">
                {category.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Mobile Vertical Layout */}
        <div className="block lg:hidden">
          <motion.div className="space-y-6 px-4">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Service Image */}
                <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-80`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <service.icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg`}>
                      <service.icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-[#00B248] rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.a
                    href="tel:+919032333833"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all cursor-pointer text-decoration-none"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Connect with our experts now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  {/* Service Image */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-80`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <service.icon className="w-16 h-16 text-white" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg`}>
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#2962FF] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-[#00B248] rounded-full" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <motion.a
                      href="tel:+919032333833"
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all cursor-pointer text-decoration-none"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Connect with our experts now
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        
      </div>
    </section>
  );
};

export default ServicesGrid;