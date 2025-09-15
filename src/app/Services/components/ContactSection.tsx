"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  XMarkIcon,
  ChatBubbleBottomCenterTextIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import FormContact from '../../Components/contactform/form';

const ContactSection = () => {
  const [showContactForm, setShowContactForm] = useState(false);

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'Call Us',
      details: ['+91 98765 43210', '+91 98765 43211'],
      description: 'Available 24/7 for emergency support'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email Us',
      details: ['services@raamather.com', 'support@raamather.com'],
      description: 'We respond within 2 hours'
    },
    {
      icon: MapPinIcon,
      title: 'Visit Us',
      details: ['Jubilee Hills, Hyderabad', 'T. Nagar, Chennai'],
      description: 'Multiple service centers'
    },
    {
      icon: ClockIcon,
      title: 'Service Hours',
      details: ['Mon-Sat: 9:00 AM - 8:00 PM', 'Sunday: 10:00 AM - 6:00 PM'],
      description: 'Extended hours for your convenience'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to experience premium electric mobility? Our experts are here to help you every step of the way.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-all duration-300 hover:shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#2962FF] to-[#1E88E5] rounded-xl flex items-center justify-center mr-4">
                      <contact.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{contact.title}</h3>
                  </div>
                  
                  <div className="space-y-1 mb-3">
                    {contact.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-700 font-medium">{detail}</p>
                    ))}
                  </div>
                  
                  <p className="text-sm text-gray-500">{contact.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Contact Form Button */}
            <motion.div
              className="bg-gradient-to-r from-[#4A4A4A] to-[#2962FF] rounded-2xl p-8 text-white text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <SparklesIcon className="w-12 h-12 mx-auto mb-4 text-yellow-200" />
              <h3 className="text-xl font-bold mb-3">Need Immediate Assistance?</h3>
              <p className="text-lg mb-6 opacity-90">
                Fill out our contact form and we&apos;ll get back to you within minutes
              </p>
              <motion.button
                onClick={() => setShowContactForm(true)}
                className="bg-white text-[#2962FF] px-8 py-3 rounded-xl font-semibold hover:bg-yellow-200 transition-all flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
                Contact Form
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Beautiful Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#00B248]/20 to-[#2962FF]/20">
              {/* Placeholder for beautiful service image */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A4A4A]/80 via-[#2962FF]/60 to-[#00B248]/80" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-8">
                <motion.div
                  className="mb-8"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <SparklesIcon className="w-12 h-12 text-yellow-200" />
                  </div>
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-4">Premium Service Experience</h3>
                <p className="text-lg opacity-90 max-w-sm">
                  State-of-the-art facilities with expert technicians dedicated to your satisfaction
                </p>
                
                {/* Floating Elements */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white/30 rounded-full"
                    style={{
                      left: `${15 + (i % 3) * 25}%`,
                      top: `${20 + Math.floor(i / 3) * 30}%`,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3 + (i * 0.5),
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-8 right-8 w-16 h-16 border-2 border-white/30 rounded-full" />
              <div className="absolute bottom-8 left-8 w-12 h-12 border-2 border-white/30 rounded-full" />
              <div className="absolute top-1/2 left-8 w-8 h-8 border-2 border-white/30 rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Contact Form Modal */}
        <AnimatePresence>
          {showContactForm && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactForm(false)}
            >
              <motion.div
                className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900">Contact Us</h3>
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  <FormContact />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ContactSection;