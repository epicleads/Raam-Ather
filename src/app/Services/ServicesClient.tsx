"use client";
import React, { Suspense } from 'react';
import ServicesHero from './components/ServicesHero';
import ServicesGrid from './components/ServicesGrid';
import GetInTouchClient from '../Components/contactform/getintouch';
import Footer from '../Components/footer/footerclient';

// Loading components
const HeroLoading = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-white text-center">
      <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
      <p>Loading Services...</p>
    </div>
  </div>
);

const GridLoading = () => (
  <div className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6 mb-4 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ServicesClient = () => {
  const contactInfo = {
    phone: "+91 90323 33833",
    email: "marketing@raamather.com",
    hours: "Mon - Sun: 9:00 AM - 8:00 PM"
  };

  return (
    <div className="min-h-screen">
      {/* Section 1: Hero */}
      <Suspense fallback={<HeroLoading />}>
        <ServicesHero />
      </Suspense>

      {/* Section 2: Services Grid */}
      <Suspense fallback={<GridLoading />}>
        <div className="bg-gray-50 pt-8 md:pt-0">
          <ServicesGrid />
        </div>
      </Suspense>

      {/* Section 3: Contact */}
      <Suspense fallback={<div className="h-96 bg-gray-900"></div>}>
        <GetInTouchClient contactInfo={contactInfo} />
      </Suspense>

      {/* Footer Section */}
      <Suspense fallback={<div className="h-64 bg-gray-800"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default ServicesClient;