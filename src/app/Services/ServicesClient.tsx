"use client";
import React from 'react';
import ServicesHero from './components/ServicesHero';
import ServicesGrid from './components/ServicesGrid';
import GetInTouchClient from '../Components/contactform/getintouch';
import Footer from '../Components/footer/footerclient';

const ServicesClient = () => {
  const contactInfo = {
    phone: "+91 90323 33833",
    email: "marketing@raamather.com",
    hours: "Mon - Sun: 9:00 AM - 8:00 PM"
  };

  return (
    <div className="min-h-screen">
      {/* Section 1: Hero (white) */}
      <div className="bg-white">
        <ServicesHero />
      </div>

      {/* Section 2: Services Grid (gray) */}
      <div className="bg-gray-50">
        <ServicesGrid />
      </div>

      <GetInTouchClient contactInfo={contactInfo} />

      

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default ServicesClient;