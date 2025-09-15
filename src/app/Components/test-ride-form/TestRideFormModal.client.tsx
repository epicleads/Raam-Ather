'use client';

import React, { useState, useEffect } from "react";
import { useTestDriveModal } from './TestDriveModalStore';
import { submitTestRideLead } from '@/lib/leadSubmission';
import { trackAtherEvents } from '../CookieConsent/MetaPixel';

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

export default function TestRideFormModal() {
  const modal = useTestDriveModal();
  const [values, setValues] = useState<FormValues>({ 
    name: "", 
    location: "", 
    mobileNumber: "",
    modelInterested: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setSubmitted] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (modal.state.open) {
      console.log('Modal opened, resetting form');
      setValues({ name: "", location: "", mobileNumber: "", modelInterested: "" });
      setErrors({});
      setSubmitted(false);
    }
  }, [modal.state.open]);

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

  // Check if form is valid for submission
  const isFormValid = () => {
    const hasRequiredFields = values.name.trim() && 
                             values.location && 
                             values.mobileNumber.length === 10 && 
                             values.modelInterested;
    
    // Only check for submit errors, not field validation errors
    const hasSubmitErrors = !!errors.submit;
    
    // Run validation to check if there would be any blocking errors
    const validationErrors = validate(values);
    const hasValidationErrors = Object.keys(validationErrors).length > 0;
    
    const isValid = hasRequiredFields && !hasValidationErrors && !hasSubmitErrors;
    
    // Debug logging
    console.log('🔍 Form validation check:', {
      values,
      hasRequiredFields,
      validationErrors,
      hasValidationErrors,
      hasSubmitErrors,
      isValid
    });
    
    return isValid;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('🚀 TestRideFormModal: Form submission started');
    console.log('📋 Form values:', values);
    console.log('📍 Selected location:', values.location);
    console.log('🏍️ Selected model:', values.modelInterested);
    console.log('📱 Mobile number:', values.mobileNumber);
    
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
        console.log('💾 Setting form as submitted and showing success message');
        setSubmitted(true);
        
        // Track successful test ride request for retargeting
        console.log('📊 Tracking test ride event for retargeting');
        trackAtherEvents.testRideRequest(
          values.modelInterested,
          values.location
        );
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
    modal.requestClose("user");
  };

  const handleReset = () => {
    setSubmitted(false);
    setValues({ name: "", location: "", mobileNumber: "", modelInterested: "" });
    setErrors({});
  };

  const handleInputChange = (field: string, value: string) => {
    console.log(`📝 Field '${field}' changed to:`, value);
    setValues((prev: FormValues) => ({ ...prev, [field]: value }));
    
    // Clear error for this field immediately
    if (errors[field as keyof FormErrors]) {
      console.log(`🧹 Clearing error for field '${field}'`);
      setErrors((prev: FormErrors) => ({ ...prev, [field]: "" }));
    }
    
    // Validate field in real-time
    const tempValues = { ...values, [field]: value };
    const tempErrors = validate(tempValues);
    if (tempErrors[field as keyof FormErrors]) {
      console.log(`⚠️ Validation error for field '${field}':`, tempErrors[field as keyof FormErrors]);
      setErrors((prev: FormErrors) => ({ ...prev, [field]: tempErrors[field as keyof FormErrors] }));
    }
  };

  const handleMobileNumberChange = (value: string) => {
    console.log('📱 Mobile number input changed:', value);
    const digitsOnly = value.replace(/\D/g, '');
    console.log('🔢 Digits only:', digitsOnly);
    
    if (digitsOnly.length <= 10) {
      console.log('✅ Mobile number length acceptable, updating state');
      setValues((prev: FormValues) => ({ ...prev, mobileNumber: digitsOnly }));
      
      // Clear error immediately
      if (errors.mobileNumber) {
        console.log('🧹 Clearing mobile number error');
        setErrors((prev: FormErrors) => ({ ...prev, mobileNumber: "" }));
      }
      
      // Validate in real-time
      const tempValues = { ...values, mobileNumber: digitsOnly };
      const tempErrors = validate(tempValues);
      if (tempErrors.mobileNumber) {
        console.log('⚠️ Mobile number validation error:', tempErrors.mobileNumber);
        setErrors((prev: FormErrors) => ({ ...prev, mobileNumber: tempErrors.mobileNumber }));
      } else if (digitsOnly.length === 10) {
        console.log('✅ Mobile number is valid (10 digits)');
      }
    } else {
      console.log('❌ Mobile number too long, ignoring input');
    }
  };

  if (!modal.state.open) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm"
      style={{ position: "fixed", inset: 0, zIndex: 9999, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div 
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "384px",
          padding: "1rem"
        }}
        className="!max-w-[384px]"
      >
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ width: "100%", maxWidth: "100%" }}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-10 p-2 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close form"
        >
          ✕
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#4ade80] to-[#22c55e] px-6 py-4" style={{ width: "100%", boxSizing: "border-box" }}>
          <h2 className="text-xl font-bold text-white text-center">
            Book Your Test Ride
          </h2>
          <p className="text-sm text-white/90 text-center mt-1">
            Book your test ride and experience the future of mobility
          </p>
        </div>

        {/* Form Content */}
        <div className="p-6" style={{ width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={values.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ade80] focus:border-[#4ade80] transition-all text-black ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
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
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ade80] focus:border-[#4ade80] transition-all text-black ${
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
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ade80] focus:border-[#4ade80] transition-all text-black ${
                    errors.mobileNumber ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter your 10-digit mobile number"
                  maxLength={10}
                />
                {errors.mobileNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
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
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ade80] focus:border-[#4ade80] transition-all text-black ${
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
                disabled={!isFormValid()}
                onClick={(e) => {
                  console.log('🖱️ Submit button clicked');
                  console.log('📊 Form valid status:', isFormValid());
                  if (!isFormValid()) {
                    console.log('⚠️ Form is not valid, button should be disabled');
                    e.preventDefault();
                  }
                }}
                className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 ${
                  !isFormValid()
                    ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                    : 'bg-[#4ade80] hover:bg-[#22c55e] text-white transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg'
                }`}
              >
                {!isFormValid() ? 'Fill All Required Fields' : 'Book Test Ride'}
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
                  className="bg-[#4ade80] hover:bg-[#22c55e] text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}