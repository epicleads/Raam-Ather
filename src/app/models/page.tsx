'use client';

import React, { useState, useEffect } from 'react';
import { X, Phone, MapPin, Zap, Shield, Award, Users } from 'lucide-react';
import Image from 'next/image';

// Mock data for Ather models
const atherModels = [
  {
    id: 1,
    name: "Ather 450X",
    tagline: "Performance Redefined",
    price: "₹1,39,999",
    image: "/images/ather-models/450x.jpg",
    features: ["157 km Range", "90 kmph Top Speed", "3.3s 0-40 kmph"],
    gradient: "from-gray-100 to-gray-200"
  },
  {
    id: 2,
    name: "Ather 450S",
    tagline: "Smart. Swift. Stunning.",
    price: "₹1,29,999",
    image: "/images/ather-models/450s.jpg",
    features: ["115 km Range", "90 kmph Top Speed", "3.9s 0-40 kmph"],
    gradient: "from-gray-100 to-gray-200"
  },
  {
    id: 3,
    name: "Ather Rizta",
    tagline: "Family First",
    price: "₹1,09,999",
    image: "/images/ather-models/rizta.jpg",
    features: ["123 km Range", "80 kmph Top Speed", "Family Storage"],
    gradient: "from-gray-100 to-gray-200"
  },
  {
    id: 4,
    name: "Ather 450 Apex",
    tagline: "The Ultimate Ride",
    price: "₹1,49,999",
    image: "/images/ather-models/apex.jpg",
    features: ["170 km Range", "95 kmph Top Speed", "Premium Features"],
    gradient: "from-gray-100 to-gray-200"
  }
];


// Removed unused FeatureIcon

// Model Card Component
interface ModelCardProps {
  model: typeof atherModels[0];
  index: number;
  onSelectModel: (model: typeof atherModels[0]) => void;
}
const ModelCard = ({ model, index, onSelectModel }: ModelCardProps) => {
  return (
    <div
      className="group relative"
      style={{
        animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`
      }}
    >
      {/* Main Card Container */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2">
        
        {/* Subtle Overlay on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${model.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-3xl`} />
        
        {/* Hero Image Section */}
        <div className="relative h-80 overflow-hidden rounded-t-3xl bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={model.image}
              alt={model.name}
              width={400}
              height={300}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              priority
            />
          </div>
          
          {/* Floating Badge */}
          <div className="absolute top-6 right-6">
            <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-sm font-semibold text-gray-900 shadow-lg">
              Available at Raam Ather
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900 transition-all duration-300">
              {model.name}
            </h3>
            <p className="text-gray-700 font-medium">
              {model.tagline}
            </p>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Starting at</p>
              <p className="text-2xl font-bold text-gray-900">{model.price}</p>
            </div>
            <button
              onClick={() => onSelectModel(model)}
              className="px-8 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Check Availability
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Lead Capture Modal Component
interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: typeof atherModels[0] | null;
}
const LeadModal = ({ isOpen, onClose, selectedModel }: LeadModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    preferredModel: selectedModel?.name || ''
  });

  const [isSubmitting] = useState(false);

  useEffect(() => {
    if (selectedModel) {
      setFormData(prev => ({ ...prev, preferredModel: selectedModel.name }));
    }
  }, [selectedModel]);

 

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        animation: 'modalFadeIn 0.3s ease-out'
      }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl"
        style={{
          animation: 'modalSlideIn 0.4s ease-out'
        }}
      >
        {/* Header */}
        <div className="relative p-8 pb-6">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Get Availability Info
            </h2>
            <p className="text-gray-700">
              Connect with our Raam Ather team to check availability for {selectedModel?.name}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="px-8 pb-8 space-y-6">
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200 text-gray-900"
                placeholder="Enter your full name"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200 text-gray-900"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            {/* City Field */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                City
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200 text-gray-900"
                  placeholder="Your city"
                />
              </div>
            </div>

            {/* Model Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Preferred Model
              </label>
              <select
                value={formData.preferredModel}
                onChange={(e) => setFormData(prev => ({ ...prev, preferredModel: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200 text-gray-900"
              >
                {atherModels.map(model => (
                  <option key={model.id} value={model.name}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            // No onClick, handled by form's onSubmit
            disabled={isSubmitting}
            className="w-full py-3 px-6 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Connecting...</span>
              </div>
            ) : (
              'Get Availability Info'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Page Component
export default function AllModelsPage() {
  const [selectedModel, setSelectedModel] = useState<typeof atherModels[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trustSlideIndex, setTrustSlideIndex] = useState(0);
  const [featureSlideIndex, setFeatureSlideIndex] = useState(0);

  const handleSelectModel = (model: typeof atherModels[0]) => {
    setSelectedModel(model);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedModel(null), 300);
  };

  // Auto-slide functionality
  useEffect(() => {
    const trustInterval = setInterval(() => {
      setTrustSlideIndex((prev) => (prev + 1) % 3);
    }, 3000);

    const featureInterval = setInterval(() => {
      setFeatureSlideIndex((prev) => (prev + 1) % 4);
    }, 4000);

    return () => {
      clearInterval(trustInterval);
      clearInterval(featureInterval);
    };
  }, []);

  const trustIndicators = [
    { icon: Shield, text: "Authorized Dealer" },
    { icon: Award, text: "Premium Service" },
    { icon: Users, text: "Expert Team" }
  ];

  const whyChooseFeatures = [
    {
      title: "Authorized Partner",
      description: "Official Ather dealership with full warranty support"
    },
    {
      title: "Expert Consultation", 
      description: "Professional guidance to find your perfect model"
    },
    {
      title: "Immediate Support",
      description: "Quick availability checks and instant responses"
    },
    {
      title: "Complete Service",
      description: "From purchase to maintenance, we've got you covered"
    }
  ];

  return (
    <>
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          return (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                {/* ...form fields... */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Connecting...</span>
                    </div>
                  ) : (
                    'Get Availability Info'
                  )}
                </button>
              </form>
            </div>
          );
          }
        }
        
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            {/* Floating Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-gray-200 rounded-full opacity-20 animate-pulse" />
            <div className="absolute top-32 right-16 w-16 h-16 bg-gray-300 rounded-full opacity-20 animate-pulse delay-1000" />
            
            <div 
              className="space-y-6"
              style={{ animation: 'fadeInUp 1s ease-out' }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold text-gray-900 mb-4">
                <Zap className="w-4 h-4 mr-2" />
                Authorized Ather Dealership
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Raam Ather
                <br />
                <span className="text-black">
                  Complete Collection
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                As your trusted Ather dealership, we bring you the complete range of premium electric scooters. 
                <span className="font-semibold text-gray-900 block mt-2">
                  Expert guidance, immediate availability checks, and exceptional service – all under one roof.
                </span>
              </p>

              {/* Dealership Trust Indicators - Desktop */}
              <div className="hidden md:flex flex-wrap justify-center gap-8 pt-8">
                {trustIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-white rounded-full px-6 py-3 shadow-md">
                    <indicator.icon className="w-5 h-5 text-gray-700" />
                    <span className="font-medium text-gray-900">{indicator.text}</span>
                  </div>
                ))}
              </div>

              {/* Dealership Trust Indicators - Mobile Slider */}
              <div className="md:hidden pt-8">
                <div className="relative overflow-hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${trustSlideIndex * 100}%)` }}
                  >
                    {trustIndicators.map((indicator, index) => (
                      <div key={index} className="w-full flex-shrink-0 flex justify-center">
                        <div className="flex items-center space-x-3 bg-white rounded-full px-6 py-3 shadow-md">
                          <indicator.icon className="w-5 h-5 text-gray-700" />
                          <span className="font-medium text-gray-900">{indicator.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Dots Indicator */}
                <div className="flex justify-center space-x-2 mt-4">
                  {trustIndicators.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setTrustSlideIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === trustSlideIndex ? 'bg-gray-800' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Models Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                All Ather Models Available
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                From performance-focused rides to family-friendly options, we have every Ather model ready for you. 
                Check availability and get expert recommendations from our team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
              {atherModels.map((model, index) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  index={index}
                  onSelectModel={handleSelectModel}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Why Raam Ather Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Why Choose Raam Ather Dealership?
              </h2>
              <p className="text-xl opacity-90 leading-relaxed">
                We&apos;re not just another dealership. We&apos;re your partners in electric mobility, 
                offering comprehensive support from selection to service.
              </p>
              
              
              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-12">
                {whyChooseFeatures.map((feature, index) => (
                  <div key={index} className="text-center space-y-3">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                    <h3 className="font-bold text-lg">{feature.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Mobile Slider */}
              <div className="md:hidden pt-12">
                <div className="relative overflow-hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${featureSlideIndex * 100}%)` }}
                  >
                    {whyChooseFeatures.map((feature, index) => (
                      <div key={index} className="w-full flex-shrink-0 px-4">
                        <div className="text-center space-y-4 max-w-xs mx-auto">
                          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                            <div className="w-4 h-4 bg-white rounded-full" />
                          </div>
                          <h3 className="font-bold text-xl">{feature.title}</h3>
                          <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Dots Indicator */}
                <div className="flex justify-center space-x-2 mt-6">
                  {whyChooseFeatures.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setFeatureSlideIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                        index === featureSlideIndex ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation Arrows */}
                <div className="flex justify-center space-x-4 mt-4">
                  <button
                    onClick={() => setFeatureSlideIndex((prev) => (prev - 1 + whyChooseFeatures.length) % whyChooseFeatures.length)}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                  >
                    <span className="text-white text-xl">‹</span>
                  </button>
                  <button
                    onClick={() => setFeatureSlideIndex((prev) => (prev + 1) % whyChooseFeatures.length)}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                  >
                    <span className="text-white text-xl">›</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Lead Modal */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedModel={selectedModel}
      />
    </>
  );
}