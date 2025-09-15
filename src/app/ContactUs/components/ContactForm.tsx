"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface FormData {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  vehicleModel: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    vehicleModel: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const inquiryTypes = [
    'Test Ride Booking',
    'Purchase Inquiry',
    'Service & Maintenance',
    'Financing Options',
    'Charging Solutions',
    'Accessories & Parts',
    'Technical Support',
    'General Information'
  ];

  const vehicleModels = [
    'Ather 450X',
    'Ather 450 Plus',
    'Ather 450S',
    'Rizta Electric',
    'Not Sure - Need Guidance',
    'Other'
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[+]?[0-9]{10,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Inquiry type validation
    if (!formData.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Analytics tracking
      if (typeof window !== 'undefined' && typeof ((window as unknown as Window & { gtag?: (...args: unknown[]) => void }).gtag) === 'function') {
        (window as unknown as Window & { gtag: (...args: unknown[]) => void }).gtag('event', 'form_submit', {
          form_name: 'contact_form',
          inquiry_type: formData.inquiryType,
          event_category: 'Lead Generation'
        });
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: '',
        vehicleModel: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-12 bg-[#F8F8F8]">
        <div className="container mx-auto px-6 lg:px-20">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-3xl p-12 shadow-2xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
              >
                <CheckCircleIcon className="w-20 h-20 text-[#4A4A4A] mx-auto mb-6" />
              </motion.div>
              
              <h3 className="text-3xl font-bold text-[#1B1B1B] mb-4">
                Thank You for Contacting Us!
              </h3>
              
              <p className="text-[#666666] mb-8 leading-relaxed">
                Your inquiry has been successfully submitted. Our EV experts will get back to you within 
                24 hours with detailed information and assistance.
              </p>
              
              <div className="bg-[#4A4A4A]/10 rounded-xl p-6 mb-8">
                <h4 className="font-semibold text-[#4A4A4A] mb-2">What happens next?</h4>
                <ul className="text-sm text-[#666666] space-y-2 text-left">
                  <li>• Our team will review your inquiry details</li>
                  <li>• You&apos;ll receive a confirmation email shortly</li>
                  <li>• An EV consultant will contact you within 24 hours</li>
                  <li>• We&apos;ll schedule your test ride or provide the information you need</li>
                </ul>
              </div>
              
              <motion.button 
                className="bg-[#4A4A4A] hover:bg-[#00B248] text-white px-8 py-3 rounded-xl font-semibold transition-all"
                onClick={() => setIsSubmitted(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Submit Another Inquiry
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-[#F8F8F8]">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-8">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-[#1B1B1B] mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get Personalized
            <span className="text-[#4A4A4A] block">EV Consultation</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-[#666666] max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Share your requirements and let our experts guide you through the perfect 
            electric scooter solution for your needs.
          </motion.p>
        </div>

        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-[#1B1B1B] mb-3">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                    errors.name 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 focus:border-[#4A4A4A]'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <motion.p 
                    className="text-red-500 text-sm mt-2 flex items-center gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <ExclamationCircleIcon className="w-4 h-4" />
                    {errors.name}
                  </motion.p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-[#1B1B1B] mb-3">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 focus:border-[#4A4A4A]'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <motion.p 
                    className="text-red-500 text-sm mt-2 flex items-center gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <ExclamationCircleIcon className="w-4 h-4" />
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-semibold text-[#1B1B1B] mb-3">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                    errors.phone 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 focus:border-[#4A4A4A]'
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <motion.p 
                    className="text-red-500 text-sm mt-2 flex items-center gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <ExclamationCircleIcon className="w-4 h-4" />
                    {errors.phone}
                  </motion.p>
                )}
              </div>

              {/* Inquiry Type */}
              <div>
                <label className="block text-sm font-semibold text-[#1B1B1B] mb-3">
                  Inquiry Type *
                </label>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                    errors.inquiryType 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 focus:border-[#4A4A4A]'
                  }`}
                >
                  <option value="">Select inquiry type</option>
                  {inquiryTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
                {errors.inquiryType && (
                  <motion.p 
                    className="text-red-500 text-sm mt-2 flex items-center gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <ExclamationCircleIcon className="w-4 h-4" />
                    {errors.inquiryType}
                  </motion.p>
                )}
              </div>

              {/* Vehicle Model */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#1B1B1B] mb-3">
                  Interested Vehicle Model (Optional)
                </label>
                <select
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#4A4A4A] focus:outline-none transition-all"
                >
                  <option value="">Select vehicle model</option>
                  {vehicleModels.map((model, index) => (
                    <option key={index} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              {/* Message Field */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#1B1B1B] mb-3">
                  Additional Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#4A4A4A] focus:outline-none transition-all resize-none"
                  placeholder="Tell us more about your requirements, preferred features, budget range, or any specific questions you have..."
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-8">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`px-12 py-4 rounded-xl font-bold text-lg transition-all transform ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#4A4A4A] hover:bg-[#00B248] hover:scale-105 shadow-2xl'
                } text-white flex items-center gap-3 mx-auto`}
                whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <PaperAirplaneIcon className="w-5 h-5" />
                    Submit Inquiry
                  </>
                )}
              </motion.button>
              
              <p className="text-sm text-[#666666] mt-4">
                By submitting this form, you agree to our privacy policy and consent to being contacted by our team.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;