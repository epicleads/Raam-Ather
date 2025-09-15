'use client';

import React, { useState } from "react";
import PersistentModal from "../PersistentModal";
import { submitTestRideLead } from "@/lib/leadSubmission";

const MODEL_OPTIONS = [
  'Rizta',
  '450S', 
  '450X',
  '450 Apex'
];

const LOCATION_OPTIONS = [
  'Hyderabad',
  'Chennai'
];

interface TestRideFormProps {
  timerDelay?: number;
  onClose?: () => void;
}

interface FormValues {
  name: string;
  location: string;
  mobileNumber: string;
  modelInterested: string;
}

interface FormErrors {
  name?: string;
  location?: string;
  mobileNumber?: string;
  modelInterested?: string;
  submit?: string;
  general?: string;
}

export default function TestRideForm({ timerDelay = 10, onClose }: TestRideFormProps) {
  const [show, setShow] = useState(false);
  const [values, setValues] = useState<FormValues>({ 
    name: "", 
    location: "", 
    mobileNumber: "",
    modelInterested: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setSubmitted] = useState(false);

  // Timer to open modal
  React.useEffect(() => {
    if (timerDelay > 0) {
      const timer = setTimeout(() => {
        setShow(true);
      }, timerDelay * 1000);
      return () => clearTimeout(timer);
    }
  }, [timerDelay]);

  function validate(values: FormValues): FormErrors {
    const e: FormErrors = {};
    
    // Name validation - must be at least 2 characters and only letters/spaces
    if (!values.name.trim()) {
      e.name = "Name required";
    } else if (values.name.trim().length < 2) {
      e.name = "Name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(values.name.trim())) {
      e.name = "Name can only contain letters and spaces";
    }
    
    // Location validation - must be selected from dropdown
    if (!values.location) {
      e.location = "Location required";
    }
    
    // Mobile number validation - BULLETPROOF
    if (!values.mobileNumber.trim()) {
      e.mobileNumber = "Mobile number required";
    } else if (values.mobileNumber.length !== 10) {
      e.mobileNumber = "Mobile number must be exactly 10 digits";
    } else if (!/^[0-9]+$/.test(values.mobileNumber)) {
      e.mobileNumber = "Mobile number can only contain digits";
    } else if (!['6', '7', '8', '9'].includes(values.mobileNumber.charAt(0))) {
      e.mobileNumber = "Mobile number must start with 6, 7, 8, or 9";
    } else if (values.mobileNumber === '0000000000' || 
               values.mobileNumber === '1111111111' || 
               values.mobileNumber === '2222222222' || 
               values.mobileNumber === '3333333333' || 
               values.mobileNumber === '4444444444' || 
               values.mobileNumber === '5555555555' || 
               values.mobileNumber === '6666666666' || 
               values.mobileNumber === '7777777777' || 
               values.mobileNumber === '8888888888' || 
               values.mobileNumber === '9999999999') {
      e.mobileNumber = "Invalid mobile number pattern";
    }
    
    // Model validation
    if (!values.modelInterested) {
      e.modelInterested = "Model required";
    }
    
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('🚀 TestRideForm: Form submission started');
    console.log('📋 Form values:', values);
    
    const newErrors = validate(values);
    console.log('✅ Validation check results:', newErrors);
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      console.log('❌ Form has validation errors, submission blocked:', newErrors);
      return;
    }

    console.log('✅ Form validation passed, proceeding with API submission');
    console.log('🎯 Will route to CRM based on location:', {
      location: values.location,
      expectedEndpoint: values.location.toLowerCase() === 'chennai' ? 'Chennai CRM' : 'Hyderabad CRM'
    });

    try {
      console.log('📡 Calling submitTestRideLead API...');
      const result = await submitTestRideLead({
        name: values.name,
        mobileNumber: values.mobileNumber,
        location: values.location,
        modelInterested: values.modelInterested
      });
      
      console.log('📨 API Response received:', result);
      
      if (result.success) {
        console.log('🎉 Form submitted successfully to CRM!');
        setSubmitted(true);
      } else {
        console.error('❌ API returned success: false');
        console.error('💬 API error message:', result.message);
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('💥 Form submission failed with error:', error);
      console.error('🔍 Error details:', {
        name: (error as Error)?.name,
        message: (error as Error)?.message,
        stack: (error as Error)?.stack
      });
      setErrors({ submit: "Submission failed, please try again. Check console for details." });
    }
  }

  const handleClose = () => {
    setShow(false);
    setSubmitted(false);
    setValues({ name: "", location: "", mobileNumber: "", modelInterested: "" });
    setErrors({});
    onClose?.();
  };

  const handleReset = () => {
    setSubmitted(false);
    setValues({ name: "", location: "", mobileNumber: "", modelInterested: "" });
    setErrors({});
  };

  const handleInputChange = (field: string, value: string) => {
    console.log(`📝 TestRideForm field '${field}' changed to:`, value);
    setValues((prev: FormValues) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      console.log(`🧹 Clearing error for field '${field}'`);
      setErrors((prev: FormErrors) => ({ ...prev, [field]: "" }));
    }
  };

  const handleMobileNumberChange = (value: string) => {
    console.log('📱 TestRideForm mobile number input changed:', value);
    // BULLETPROOF: Only allow digits, no fake characters
    const digitsOnly = value.replace(/\D/g, '');
    console.log('🔢 Digits only:', digitsOnly);
    
    // Limit to exactly 10 digits
    if (digitsOnly.length <= 10) {
      console.log('✅ Mobile number length acceptable, updating state');
      setValues((prev: FormValues) => ({ ...prev, mobileNumber: digitsOnly }));
      
      // Clear error when user starts typing valid input
      if (errors.mobileNumber) {
        console.log('🧹 Clearing mobile number error');
        setErrors((prev: FormErrors) => ({ ...prev, mobileNumber: "" }));
      }
      
      // Real-time validation feedback
      if (digitsOnly.length === 10) {
        console.log('✅ Mobile number is 10 digits, running validation');
        const validation = validate({ ...values, mobileNumber: digitsOnly });
        if (validation.mobileNumber) {
          console.log('⚠️ Mobile number validation error:', validation.mobileNumber);
          setErrors((prev: FormErrors) => ({ ...prev, mobileNumber: validation.mobileNumber }));
        } else {
          console.log('✅ Mobile number is valid');
        }
      }
    } else {
      console.log('❌ Mobile number too long, ignoring input');
    }
  };

  // Helper function to check if submit button should be disabled
  const getSubmitButtonState = () => {
    const validationErrors = validate(values);
    const hasValidationErrors = Object.keys(validationErrors).length > 0;
    const hasRequiredFields = values.name.trim() && values.location && values.mobileNumber.length === 10 && values.modelInterested;
    const hasSubmitErrors = !!errors.submit;
    const isDisabled = !hasRequiredFields || hasValidationErrors || hasSubmitErrors;
    
    console.log('🔍 TestRideForm submit button state:', {
      hasRequiredFields,
      hasValidationErrors,
      hasSubmitErrors,
      isDisabled,
      values
    });
    
    return isDisabled;
  };

  return (
    <PersistentModal 
      isOpen={show} 
      onClose={handleClose} 
      autoCloseMs={0} 
      disableAutoCloseWhileInteracting={true}
    >
      <div className="relative w-full max-w-sm md:max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close form"
          >
          ✕
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-[#00E396] to-[#00D4AA] px-6 py-4">
            <h2 className="text-xl font-bold text-white text-center">
              Book Your Test Ride
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Book your test ride and experience the future of mobility. We&apos;ll get back to you within 24 hours.
            </p>
          </div>

          {/* Form Content */}
          <div className="p-6">
          {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                  value={values.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00E396] focus:border-[#00E396] transition-all text-black ${
                    errors.name ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter your full name"
                  />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Mobile Number Field */}
                <div>
                  <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    id="mobileNumber"
                  value={values.mobileNumber}
                    onChange={(e) => handleMobileNumberChange(e.target.value)}
                    maxLength={10}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00E396] focus:border-[#00E396] transition-all text-black ${
                    errors.mobileNumber ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter 10-digit mobile number"
                  />
                {errors.mobileNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
                  )}
                </div>

                {/* Location Field */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <select
                    id="location"
                  value={values.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00E396] focus:border-[#00E396] transition-all text-black ${
                    errors.location ? 'border-red-500' : ''
                    }`}
                  >
                    <option value="" disabled>Select your location</option>
                    {LOCATION_OPTIONS.map((location) => (
                      <option key={location} value={location} className="text-black">
                        {location}
                      </option>
                    ))}
                  </select>
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                  )}
                </div>

                {/* Model Selection */}
                <div>
                  <label htmlFor="modelInterested" className="block text-sm font-medium text-gray-700 mb-2">
                    Model Interested *
                  </label>
                  <select
                    id="modelInterested"
                  value={values.modelInterested}
                    onChange={(e) => handleInputChange('modelInterested', e.target.value)}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00E396] focus:border-[#00E396] transition-all text-black ${
                    errors.modelInterested ? 'border-red-500' : ''
                    }`}
                  >
                    <option value="" disabled>Select a model</option>
                    {MODEL_OPTIONS.map((model) => (
                      <option key={model} value={model} className="text-black">
                        {model}
                      </option>
                    ))}
                  </select>
                {errors.modelInterested && (
                  <p className="text-red-500 text-sm mt-1">{errors.modelInterested}</p>
                  )}
                </div>

              {/* Submit Error Message */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <p className="text-red-600 text-sm font-medium">{errors.submit}</p>
                </div>
              )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={getSubmitButtonState()}
                  onClick={(e) => {
                    console.log('🖱️ TestRideForm submit button clicked');
                    const validationErrors = validate(values);
                    const hasValidationErrors = Object.keys(validationErrors).length > 0;
                    const hasRequiredFields = values.name.trim() && values.location && values.mobileNumber.length === 10 && values.modelInterested;
                    const isValid = hasRequiredFields && !hasValidationErrors;
                    
                    console.log('📊 Form valid status:', isValid);
                    if (!isValid) {
                      console.log('⚠️ Form is not valid, preventing submission');
                      e.preventDefault();
                    }
                  }}
                  className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors duration-200 ${(() => {
                    const validationErrors = validate(values);
                    const hasValidationErrors = Object.keys(validationErrors).length > 0;
                    const hasRequiredFields = values.name.trim() && values.location && values.mobileNumber.length === 10 && values.modelInterested;
                    const isDisabled = !hasRequiredFields || hasValidationErrors || !!errors.submit;
                    
                    return isDisabled
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#00E396] hover:bg-[#00D4AA] transform hover:scale-105 active:scale-95';
                  })()} text-white`}
                >
                  {(() => {
                    const validationErrors = validate(values);
                    const hasValidationErrors = Object.keys(validationErrors).length > 0;
                    const hasRequiredFields = values.name.trim() && values.location && values.mobileNumber.length === 10 && values.modelInterested;
                    
                    if (!hasRequiredFields) return 'Fill All Required Fields';
                    if (hasValidationErrors) return 'Fix Errors First';
                    return 'Book Test Ride';
                  })()}
                </button>
              </form>
            ) : (
              /* Success Message */
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                ✓
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Thank you for booking your test ride!
                </h3>
                <p className="text-gray-600 mb-6">
                  We will contact you soon to confirm your appointment.
                </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleReset}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  Book Another
                </button>
                <button
                  onClick={handleClose}
                  className="bg-[#00E396] hover:bg-[#00D4AA] text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  Close
                </button>
              </div>
              </div>
            )}
          </div>
      </div>
    </PersistentModal>
  );
}