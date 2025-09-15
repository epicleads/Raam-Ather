'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HomeTestimonialsFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  role: string;
  review: string;
  rating: number;
}

interface FormErrors {
  name?: string;
  role?: string;
  review?: string;
  rating?: string;
}

export default function HomeTestimonialsFormModal({ isOpen, onClose }: HomeTestimonialsFormModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    role: '',
    review: '',
    rating: 0
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleClose = React.useCallback(() => {
    if (showSuccess) {
      setShowSuccess(false);
      setFormData({ name: '', role: '', review: '', rating: 0 });
      setErrors({});
    }
    onClose();
  }, [showSuccess, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.review.trim()) {
      newErrors.review = 'Review is required';
    } else if (formData.review.trim().length < 10) {
      newErrors.review = 'Review must be at least 10 characters long';
    }
    
    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setShowSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleStarClick = (rating: number) => {
    handleInputChange('rating', rating);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
        />
        
        {/* Modal Container */}
        <div className="flex min-h-full items-center justify-center p-4">
          <motion.div
            className="relative w-full max-w-md mx-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Mobile: Bottom Sheet Style */}
            <div className="md:hidden">
              <motion.div
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              >
                <div className="p-6">
                  {/* Handle */}
                  <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
                  <ModalContent
                    formData={formData}
                    errors={errors}
                    showSuccess={showSuccess}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                    onInputChange={handleInputChange}
                    onStarClick={handleStarClick}
                  />
                </div>
              </motion.div>
            </div>

            {/* Desktop: Centered Modal */}
            <div className="hidden md:block">
              <div className="bg-white rounded-2xl shadow-2xl">
                <div className="p-6">
                  <ModalContent
                    formData={formData}
                    errors={errors}
                    showSuccess={showSuccess}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                    onInputChange={handleInputChange}
                    onStarClick={handleStarClick}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

interface ModalContentProps {
  formData: FormData;
  errors: FormErrors;
  showSuccess: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (field: keyof FormData, value: string | number) => void;
  onStarClick: (rating: number) => void;
}

function ModalContent({
  formData,
  errors,
  showSuccess,
  onClose,
  onSubmit,
  onInputChange,
  onStarClick
}: ModalContentProps) {
  if (showSuccess) {
    return (
      <motion.div
        className="text-center py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-6">
          ✅ Thank you for filling the review. We will check it soon!
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Close
        </button>
      </motion.div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Submit Your Review</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors placeholder:text-gray-400 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Role Field */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
            Role (Optional)
          </label>
          <input
            id="role"
            type="text"
            value={formData.role}
            onChange={(e) => onInputChange('role', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors placeholder:text-gray-400 text-gray-900"
            placeholder="e.g., Software Engineer, Mumbai"
          />
        </div>

        {/* Rating Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating *
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => onStarClick(star)}
                className={`w-8 h-8 transition-colors ${
                  star <= formData.rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
                }`}
              >
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {formData.rating > 0 ? `${formData.rating}/5` : 'Select rating'}
            </span>
          </div>
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
          )}
        </div>

        {/* Review Field */}
        <div>
          <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
            Review *
          </label>
          <textarea
            id="review"
            rows={4}
            value={formData.review}
            onChange={(e) => onInputChange('review', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors resize-none placeholder:text-gray-400 text-gray-900 ${
              errors.review ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Share your experience with Ather..."
          />
          <div className="flex justify-between items-center mt-1">
            {errors.review ? (
              <p className="text-sm text-red-600">{errors.review}</p>
            ) : (
              <p className="text-sm text-gray-500">Minimum 10 characters</p>
            )}
            <p className="text-sm text-gray-500">{formData.review.length}/500</p>
          </div>
        </div>

        {/* Cancel Button */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}