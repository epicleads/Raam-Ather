"use client";

import React, { useState, useRef } from "react";
import { submitContactLead } from "@/lib/leadSubmission";

interface FormContactProps {
  layout?: 'default' | 'compact' | 'modal';
}

export default function FormContact({ layout = 'default' }: FormContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    location: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string>("");
  const formRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Special handling for phone number
    if (name === 'phone') {
      // Remove any non-digit characters
      const digitsOnly = value.replace(/\D/g, '');
      // Limit to 10 digits
      const limitedDigits = digitsOnly.slice(0, 10);
      setFormData({ ...formData, [name]: limitedDigits });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField("");
  };

  const validatePhone = (phone: string) => {
    // Remove any non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    // Check if it starts with 6,7,8,9 and is exactly 10 digits
    return /^[6-9]\d{9}$/.test(cleanPhone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!validatePhone(formData.phone)) {
      setError(
        "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9."
      );
      return;
    }

    setLoading(true);

    try {
      const result = await submitContactLead({
        name: formData.name,
        phone: formData.phone,
        service: formData.service,
        location: formData.location,
        message: formData.message
      });
      
      if (result.success) {
        setSuccess(true);
        setFormData({ name: "", phone: "", service: "", location: "", message: "" });
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputBaseClasses = `
    w-full px-4 py-4 rounded-2xl text-base font-medium
    bg-white/70 backdrop-blur-sm border border-gray-200/60
    focus:outline-none focus:border-green-400/80 focus:bg-white/90
    transition-all duration-300 ease-out
    placeholder-gray-400 text-gray-800
    hover:bg-white/80 hover:border-gray-300/80
    shadow-sm hover:shadow-md focus:shadow-lg
    transform hover:scale-[1.02] focus:scale-[1.02]
  `;

  const labelBaseClasses = `
    block text-sm font-semibold text-gray-800 mb-3 
    tracking-wide uppercase opacity-80
  `;

  return (
    <div 
      ref={formRef}
      className="relative w-full h-full"
    >
      {/* Background Glow Effect */}
      <div className={`absolute inset-0 opacity-30 pointer-events-none ${focusedField ? 'opacity-60' : 'opacity-30'} transition-opacity duration-500`}>
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-blue-400/15 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10">
        {success ? (
          <div className="text-center py-16 space-y-6">
            {/* Success Animation */}
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
              <div className="relative bg-gradient-to-r from-green-400 to-green-600 rounded-full p-4 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-4xl font-bold font-neurial text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700">
                Request Submitted Successfully!
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 max-w-lg mx-auto">
                <p className="text-green-800 text-lg leading-relaxed font-medium mb-4">
                  ✅ Your request has been authenticated and submitted successfully.
                </p>
                <p className="text-green-700 text-base leading-relaxed">
                  Our expert team will review your request and get back to you within 24 hours with personalized assistance for your electric journey.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-600/10 backdrop-blur-sm border border-green-300 rounded-full">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-semibold text-base">Request Processing</span>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={`${layout === 'modal' ? 'space-y-4' : 'space-y-6'}`}>

            {/* Name */}
            <div className={`${layout === 'modal' ? 'space-y-2' : 'space-y-3'}`}>
              <label className={labelBaseClasses}>
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                required
                placeholder="Enter your full name"
                className={`${inputBaseClasses} ${focusedField === 'name' ? 'border-green-400/80 bg-white/90 shadow-lg' : ''}`}
              />
            </div>

            {/* Phone */}
            <div className={`${layout === 'modal' ? 'space-y-2' : 'space-y-3'}`}>
              <label className={labelBaseClasses}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => handleFocus('phone')}
                onBlur={handleBlur}
                required
                maxLength={10}
                placeholder="Enter 10-digit mobile number"
                pattern="[6-9][0-9]{9}"
                title="Phone number must start with 6, 7, 8, or 9 and be 10 digits"
                className={`${inputBaseClasses} ${focusedField === 'phone' ? 'border-green-400/80 bg-white/90 shadow-lg' : ''}`}
              />
              {formData.phone && !validatePhone(formData.phone) && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9
                </p>
              )}
            </div>

            {/* Service */}
            <div className={`${layout === 'modal' ? 'space-y-2' : 'space-y-3'}`}>
              <label className={labelBaseClasses}>
                Service Required
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                onFocus={() => handleFocus('service')}
                onBlur={handleBlur}
                required
                className={`${inputBaseClasses} cursor-pointer ${focusedField === 'service' ? 'border-green-400/80 bg-white/90 shadow-lg' : ''}`}
              >
                <option value="" disabled>
                  Select what you need
                </option>
                <option value="test-drive">Book a Test Drive</option>
                <option value="service">Book a Service</option>
                <option value="accessories">Looking for Accessories</option>
                <option value="callback">Request Call Back</option>
              </select>
            </div>

            {/* Location */}
            <div className={`${layout === 'modal' ? 'space-y-2' : 'space-y-3'}`}>
              <label className={labelBaseClasses}>
                Location
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                onFocus={() => handleFocus('location')}
                onBlur={handleBlur}
                required
                className={`${inputBaseClasses} cursor-pointer ${focusedField === 'location' ? 'border-green-400/80 bg-white/90 shadow-lg' : ''}`}
              >
                <option value="" disabled>
                  Select your location
                </option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>


            {/* Error Message */}
            {error && (
              <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/60 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-700 font-medium text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-5 px-8 rounded-2xl text-lg font-bold font-neurial
                bg-gradient-to-r from-green-500 via-green-600 to-green-700
                text-white shadow-xl
                hover:shadow-2xl hover:scale-[1.02] focus:scale-[1.02]
                transform transition-all duration-300 ease-out
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                relative overflow-hidden
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0
                before:transform before:-skew-x-12 before:-translate-x-full before:transition-transform before:duration-1000
                hover:before:translate-x-full
                focus:outline-none focus:ring-4 focus:ring-green-500/30
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>Submitting...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Submit Request
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
            </button>

            {/* Privacy Note */}
            <div className="text-center pt-4">
              <p className="text-xs text-gray-500 leading-relaxed">
                By submitting this form, you agree to our privacy policy. Your information is secure and will only be used to provide you with the best Ather experience.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}