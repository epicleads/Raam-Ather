"use client";

import React from "react";
import { FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";
import { useTestDriveModal } from "../test-ride-form/TestDriveModalStore";
import TestRideFormModal from "../test-ride-form/TestRideFormModal.client";

interface ContactInfo {
  phone: string;
  email: string;
  hours: string;
}

export default function GetInTouchClient({ contactInfo }: { contactInfo: ContactInfo }) {
  const modal = useTestDriveModal();

  return (
    <div className="relative w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 py-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/2 right-1/4 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 backdrop-blur-sm border border-green-500/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300 font-medium text-sm tracking-wide">Stay Connected</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold font-neurial text-white mb-4 leading-tight">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">Touch</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Ready to experience the future of electric mobility? Connect with our team for personalized assistance.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Phone Card */}
          <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-2xl shadow-xl">
                  <FaPhoneAlt className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-bold font-neurial text-lg mb-2">Call Us</h3>
                <p className="text-gray-300 text-sm mb-3">Speak with our experts</p>
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <span className="font-medium">{contactInfo.phone}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-2xl shadow-xl">
                  <FaEnvelope className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-bold font-neurial text-lg mb-2">Email Us</h3>
                <p className="text-gray-300 text-sm mb-3">Get detailed responses</p>
                <a 
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contactInfo.email}&su=Inquiry about Ather Electric Scooters&body=Hi Team,%0A%0AI am interested in learning more about Ather electric scooters and your dealership services.%0A%0APlease provide me with:%0A- Available models and pricing%0A- Test ride booking information%0A- Service and maintenance details%0A- Any current offers or promotions%0A%0AThank you!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <span className="font-medium">{contactInfo.email}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Hours Card */}
          <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-2xl shadow-xl">
                  <FaClock className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-bold font-neurial text-lg mb-2">Visit Hours</h3>
                <p className="text-gray-300 text-sm mb-3">Come see us in person</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white">
                  <span className="font-medium">{contactInfo.hours}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="text-center">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <h3 className="text-2xl font-bold font-neurial text-white mb-3">
              Ready to Experience Ather?
            </h3>
            <p className="text-gray-300 text-base mb-6 max-w-xl mx-auto">
              Join thousands of satisfied customers who have made the switch to sustainable, premium electric mobility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => modal.openManually()}
                className="px-8 py-4 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white rounded-2xl font-bold font-neurial shadow-xl hover:shadow-2xl hover:scale-[1.02] transform transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0 before:transform before:-skew-x-12 before:-translate-x-full before:transition-transform before:duration-1000 hover:before:translate-x-full"
              >
                Book Test Ride
              </button>
              
            </div>
          </div>
        </div>
      </div>
      
      <TestRideFormModal />
    </div>
  );
}