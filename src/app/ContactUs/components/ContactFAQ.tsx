"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const ContactFAQ = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqs = [
    {
      question: 'How can I book a test ride for Ather electric scooters?',
      answer: 'You can book a test ride by calling us at +91 9032333833, filling out our contact form above, visiting our website, or directly visiting any of our showrooms in Hyderabad and Chennai. Test rides are completely free and can be scheduled at your convenience. Our team will guide you through the entire experience and help you choose the right model.',
      category: 'test-ride',
      keywords: 'test ride booking schedule free visit showroom'
    },
    {
      question: 'What are the contact details for Raam Ather dealerships?',
      answer: 'Hyderabad Outlets: Jubilee Hills (+91 90323 33833), Banjara Hills (+91 90323 33833). Chennai Outlets: T. Nagar (+91 9240013828), Anna Nagar (+91 09240013814). Email: info@raamother.com. WhatsApp support: +91 9032333833. All outlets are open from 10:00 AM to 8:00 PM, Monday to Sunday.',
      category: 'contact',
      keywords: 'contact details phone number address email whatsapp hours'
    },
    {
      question: 'Do you provide home delivery for electric scooters?',
      answer: 'Yes, we provide doorstep delivery service across Hyderabad and Chennai within 24-48 hours of purchase confirmation. Our trained delivery team ensures safe transportation and complete setup at your location. We also provide a comprehensive handover session to familiarize you with your new Ather scooter.',
      category: 'delivery',
      keywords: 'home delivery doorstep fast quick setup handover'
    },
    {
      question: 'What financing options are available for Ather scooters?',
      answer: 'We offer multiple financing solutions: Bank loans with EMI starting from ₹2,999/month, government subsidy assistance, special schemes for students and professionals, trade-in options for old vehicles, and zero down payment plans. Our finance team will help you choose the best option based on your credit profile and requirements.',
      category: 'finance',
      keywords: 'financing emi loan bank subsidy trade-in zero down payment'
    },
    {
      question: 'What after-sales services and support do you provide?',
      answer: 'We provide comprehensive after-sales support including regular maintenance services, genuine spare parts, software updates, battery health monitoring, 24/7 roadside assistance, warranty claims processing, and technical support. Our certified technicians ensure your Ather scooter remains in perfect condition.',
      category: 'service',
      keywords: 'after sales service maintenance support warranty roadside assistance'
    },
    {
      question: 'What is the warranty coverage for Ather scooters?',
      answer: 'Ather scooters come with a comprehensive warranty: 3 years or 30,000 km for the vehicle, 3 years or 30,000 km for the battery, and extended warranty options available. The warranty covers manufacturing defects, battery performance, and major components. Our service team handles all warranty claims efficiently.',
      category: 'warranty',
      keywords: 'warranty coverage battery vehicle extended claims'
    },
    {
      question: 'Can I trade in my old petrol scooter for an Ather?',
      answer: 'Yes, we accept trade-ins for conventional petrol two-wheelers. Our evaluation team will assess your old vehicle and provide the best possible exchange value. The trade-in amount can be adjusted against your new Ather scooter purchase, making the transition to electric mobility more affordable.',
      category: 'trade-in',
      keywords: 'trade in exchange old scooter petrol conventional evaluation'
    },
    {
      question: 'How long does the purchase process take?',
      answer: 'The complete purchase process typically takes 2-4 hours including documentation, financing (if required), and vehicle delivery. For immediate delivery, if the model is in stock, you can ride home the same day. For specific colors or configurations, delivery may take 3-7 days depending on availability.',
      category: 'purchase',
      keywords: 'purchase process time documentation delivery immediate stock'
    },
    {
      question: 'Do you provide training for new EV users?',
      answer: 'Absolutely! We provide comprehensive orientation for all new Ather owners. This includes riding training, mobile app tutorial, maintenance tips, safety briefing, and feature explanation. Our expert team ensures you are completely comfortable with your new electric scooter before you leave our showroom.',
      category: 'training',
      keywords: 'training orientation new users riding app tutorial safety'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    // First apply category filter
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    // Then apply search filter if search term exists
    const matchesSearch = !searchTerm || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.keywords.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Questions', count: faqs.length },
    { id: 'test-ride', label: 'Test Ride', count: faqs.filter(f => f.category === 'test-ride').length },
    { id: 'contact', label: 'Contact Info', count: faqs.filter(f => f.category === 'contact').length },
    { id: 'finance', label: 'Financing', count: faqs.filter(f => f.category === 'finance').length },
    { id: 'service', label: 'Service', count: faqs.filter(f => f.category === 'service').length },
    { id: 'delivery', label: 'Delivery', count: faqs.filter(f => f.category === 'delivery').length },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setActiveItem(0); // Reset to first item when searching
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveItem(0); // Reset to first item when changing category
    setSearchTerm(''); // Clear search when changing category
  };

  return (
    <section id="faq-section" className="py-12 bg-[#F8F8F8]">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-8">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-[#1B1B1B] mb-4 font-neurial"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Frequently Asked
            <span className="text-[#4A4A4A] block">Questions</span>
          </motion.h2>
          <motion.p 
            className="text-base text-[#666666] max-w-3xl mx-auto leading-relaxed font-neurial"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find quick answers to common questions about Raam Ather services, 
            electric scooters, and customer support.
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div 
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#666666]" />
            <input
              type="text"
              placeholder="Search for answers to your questions..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#4A4A4A] focus:outline-none transition-all text-lg font-neurial"
            />
          </div>
          {searchTerm && (
            <p className="text-sm text-[#666666] mt-2 font-neurial">
              Found {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''} for &quot;{searchTerm}&quot;
            </p>
          )}
        </motion.div>

        {/* FAQ Categories - Optional filter buttons */}
        {!searchTerm && (
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {categories.slice(0, 6).map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border font-neurial ${
                  selectedCategory === category.id
                    ? 'bg-[#4A4A4A] text-white border-[#4A4A4A]'
                    : 'bg-white text-[#666666] hover:text-[#4A4A4A] hover:bg-[#4A4A4A]/5 border-gray-200 hover:border-[#4A4A4A]/30'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </motion.div>
        )}

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl text-[#666666] font-neurial">No questions found matching your search.</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 text-[#4A4A4A] hover:underline font-neurial"
              >
                Clear search to see all questions
              </button>
            </motion.div>
          ) : (
            filteredFAQs.map((faq, index) => (
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
                      : 'bg-white/70 hover:bg-white hover:shadow-md'
                  }`}
                  onClick={() => setActiveItem(activeItem === index ? -1 : index)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg md:text-xl font-semibold text-[#1B1B1B] pr-4 leading-relaxed font-neurial">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: activeItem === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDownIcon className={`w-6 h-6 ${activeItem === index ? 'text-[#4A4A4A]' : 'text-[#666666]'}`} />
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
                    <div className="pt-4 border-t border-gray-200 mt-4">
                      <p className="text-[#666666] leading-relaxed font-neurial">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                </button>
              </motion.div>
            ))
          )}
        </div>

        {/* Still Have Questions Section */}
        <motion.div 
          className="text-center mt-16 p-8 bg-gradient-to-r from-white to-[#F8F8F8] rounded-3xl border border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h4 className="text-2xl font-bold text-[#1B1B1B] mb-4 font-neurial">
            Still Have Questions?
          </h4>
          <p className="text-[#666666] mb-6 max-w-2xl mx-auto font-neurial">
            Can&apos;t find the answer you&apos;re looking for? Our EV experts are here to help. 
            Get in touch for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
  href="https://wa.me/919032333833?text=I have a question that is not covered in the FAQ section."
  target="_blank"
  rel="noopener noreferrer"
  className="bg-[#4A4A4A] hover:bg-[#00B248] text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2 font-neurial"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Chat with Expert
</motion.a>

            <motion.a
  href="tel:+919032333833" // replace with your actual number
  className="border-2 border-[#2962FF] text-[#2962FF] hover:bg-[#2962FF] hover:text-white px-8 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 font-neurial"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Call Now
</motion.a>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactFAQ;