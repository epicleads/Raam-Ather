"use client";

import React from "react";
import { useTestDriveModal } from "../Components/test-ride-form/TestDriveModalStore";

const RiztaCTA = () => {
  const modal = useTestDriveModal();

  const handleBookTestRide = () => {
    modal.openManually();
  };

  return (
    <div className="space-y-12">
      {/* Rizta CTA Banner */}
      <div className="relative bg-black rounded-3xl p-8 md:p-12 text-center text-white overflow-hidden border border-gray-800">
        {/* Futuristic grid background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-500 to-transparent"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        {/* Glowing corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/20 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Ready to Experience <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Ather Rizta</span>?
          </h3>
          <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Book a test ride today and discover the future of electric mobility
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleBookTestRide}
              className="relative group bg-white text-black px-8 py-4 rounded-full font-semibold transition-all duration-500 hover:shadow-2xl hover:shadow-white/25 transform hover:-translate-y-2 border-2 border-transparent hover:border-white/30 backdrop-blur-sm"
            >
              <span className="relative z-10">Book Test Ride</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default RiztaCTA;
