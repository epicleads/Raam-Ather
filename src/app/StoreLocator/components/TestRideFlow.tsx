"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  PlayIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { Outlet } from '../StoreLocatorClient';

interface TestRideFlowProps {
  outlet: Outlet;
  onClose: () => void;
}

const TestRideFlow: React.FC<TestRideFlowProps> = ({
  outlet,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    model: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    experience: '',
    licenseNumber: ''
  });

  const t = {
    bookTestRide: 'Book Your Test Ride',
    steps: {
      1: 'Select Model & Time',
      2: 'Personal Details',
      3: 'Confirmation'
    },
    selectModel: 'Select Model',
    selectDate: 'Select Date',
    selectTime: 'Select Time',
    personalDetails: 'Personal Details',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    email: 'Email Address',
    drivingExperience: 'Driving Experience',
    licenseNumber: 'License Number (Optional)',
    experienceOptions: {
      beginner: 'Beginner (0-1 years)',
      intermediate: 'Intermediate (1-5 years)',
      experienced: 'Experienced (5+ years)'
    },
    next: 'Next',
    back: 'Back',
    confirm: 'Confirm Booking',
    booking: 'Booking...',
    success: 'Booking Confirmed!',
    confirmationMessage: 'Your test ride has been scheduled successfully. We\'ll send you a confirmation message shortly.',
    availableSlots: 'Available Slots',
    today: 'Today',
    tomorrow: 'Tomorrow',
    thisWeekend: 'This Weekend',
    whatsappConfirmation: 'WhatsApp Confirmation',
    emailConfirmation: 'Email Confirmation'
  };

  const timeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ];

  const dates = [
    { label: t.today, value: 'today', available: 6 },
    { label: t.tomorrow, value: 'tomorrow', available: 8 },
    { label: t.thisWeekend, value: 'weekend', available: 12 }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirm = () => {
    // Simulate booking
    setTimeout(() => {
      setCurrentStep(4); // Success step
    }, 2000);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.model && formData.date && formData.time;
      case 2:
        return formData.name && formData.phone && formData.email && formData.experience;
      default:
        return true;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 bg-gradient-to-r from-[#00B248] to-[#2962FF] text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <PlayIcon className="w-6 h-6" />
              <h2 className="text-xl font-bold">{t.bookTestRide}</h2>
            </div>

            <div className="flex items-center gap-2 text-sm opacity-90">
              <MapPinIcon className="w-4 h-4" />
              <span>{outlet.name}</span>
            </div>

            {/* Progress Steps */}
            {currentStep < 4 && (
              <div className="flex items-center justify-between mt-6">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= currentStep ? 'bg-white text-[#00B248]' : 'bg-white/20 text-white/60'
                    }`}>
                      {step < currentStep ? <CheckCircleIcon className="w-5 h-5" /> : step}
                    </div>
                    {step < 3 && (
                      <div className={`w-16 h-1 mx-2 ${
                        step < currentStep ? 'bg-white' : 'bg-white/20'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            )}

            {currentStep < 4 && (
              <div className="text-center mt-2">
                <span className="text-sm opacity-90">{t.steps[currentStep as keyof typeof t.steps]}</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <AnimatePresence mode="wait">
              {/* Step 1: Model & Time Selection */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Model Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {t.selectModel}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {outlet.modelsAvailable.map((model) => (
                        <button
                          key={model}
                          onClick={() => setFormData({ ...formData, model })}
                          className={`p-4 border-2 rounded-xl text-left transition-all ${
                            formData.model === model
                              ? 'border-[#00B248] bg-[#00B248]/5'
                              : 'border-gray-200 hover:border-[#00B248]/50'
                          }`}
                        >
                          <div className="font-medium text-gray-900">{model}</div>
                          <div className="text-sm text-gray-500">Available for test ride</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {t.selectDate}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {dates.map((date) => (
                        <button
                          key={date.value}
                          onClick={() => setFormData({ ...formData, date: date.value })}
                          className={`p-4 border-2 rounded-xl text-center transition-all ${
                            formData.date === date.value
                              ? 'border-[#2962FF] bg-[#2962FF]/5'
                              : 'border-gray-200 hover:border-[#2962FF]/50'
                          }`}
                        >
                          <div className="font-medium text-gray-900">{date.label}</div>
                          <div className="text-sm text-gray-500">{date.available} slots</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  {formData.date && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        {t.selectTime}
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setFormData({ ...formData, time })}
                            className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                              formData.time === time
                                ? 'border-[#00B248] bg-[#00B248] text-white'
                                : 'border-gray-200 hover:border-[#00B248]/50'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 2: Personal Details */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.fullName}
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00B248] focus:border-transparent outline-none"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.phoneNumber}
                      </label>
                      <div className="relative">
                        <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00B248] focus:border-transparent outline-none"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.email}
                    </label>
                    <div className="relative">
                      <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00B248] focus:border-transparent outline-none"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.drivingExperience}
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00B248] focus:border-transparent outline-none"
                    >
                      <option value="">Select experience level</option>
                      <option value="beginner">{t.experienceOptions.beginner}</option>
                      <option value="intermediate">{t.experienceOptions.intermediate}</option>
                      <option value="experienced">{t.experienceOptions.experienced}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.licenseNumber}
                    </label>
                    <input
                      type="text"
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00B248] focus:border-transparent outline-none"
                      placeholder="DL1234567890123 (Optional)"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Booking Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Model:</span>
                        <span className="font-medium">{formData.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">{formData.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">{formData.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">{outlet.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{formData.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h4 className="font-medium text-blue-900 mb-2">What to expect:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• 30-minute guided test ride</li>
                      <li>• Safety briefing and helmet provided</li>
                      <li>• Product demonstration and Q&A</li>
                      <li>• Financing options discussion</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircleIcon className="w-4 h-4 text-[#00B248]" />
                      <span>{t.whatsappConfirmation}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircleIcon className="w-4 h-4 text-[#00B248]" />
                      <span>{t.emailConfirmation}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Success */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    className="w-20 h-20 bg-[#00B248] rounded-full flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  >
                    <CheckCircleIcon className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.success}</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    {t.confirmationMessage}
                  </p>
                  <motion.button
                    onClick={onClose}
                    className="bg-[#00B248] hover:bg-[#00A041] text-white px-8 py-3 rounded-xl font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Done
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Actions */}
          {currentStep < 4 && (
            <div className="border-t border-gray-200 p-6">
              <div className="flex justify-between">
                {currentStep > 1 ? (
                  <motion.button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
                    whileHover={{ x: -2 }}
                  >
                    <ArrowLeftIcon className="w-4 h-4" />
                    {t.back}
                  </motion.button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <motion.button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold ${
                      canProceed()
                        ? 'bg-[#2962FF] hover:bg-[#1E88E5] text-white'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={canProceed() ? { x: 2 } : {}}
                  >
                    {t.next}
                    <ArrowRightIcon className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleConfirm}
                    disabled={!canProceed()}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold ${
                      canProceed()
                        ? 'bg-[#00B248] hover:bg-[#00A041] text-white'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={canProceed() ? { scale: 1.02 } : {}}
                    whileTap={canProceed() ? { scale: 0.98 } : {}}
                  >
                    <PlayIcon className="w-4 h-4" />
                    {t.confirm}
                  </motion.button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TestRideFlow;