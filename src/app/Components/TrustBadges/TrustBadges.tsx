"use client";

import { Shield, Wrench, Truck, CheckCircle } from "lucide-react";

const trustBadges = [
  {
    id: "authorized-dealer",
    icon: CheckCircle,
    label: "Authorized Ather Dealer",
    description: "Official Ather dealership",
    ariaLabel: "Authorized Ather Dealer - Official dealership status"
  },
  {
    id: "certified-service",
    icon: Wrench,
    label: "Certified Service Support",
    description: "Expert maintenance & repair",
    ariaLabel: "Certified Service Support - Expert maintenance and repair services"
  },
  {
    id: "secure-booking",
    icon: Shield,
    label: "100% Secure Booking",
    description: "Safe & encrypted transactions",
    ariaLabel: "100% Secure Booking - Safe and encrypted transaction process"
  },
  {
    id: "hassle-free-delivery",
    icon: Truck,
    label: "Hassle-free Delivery",
    description: "Convenient doorstep delivery",
    ariaLabel: "Hassle-free Delivery - Convenient doorstep delivery service"
  }
];

export default function TrustBadges() {
  return (
    <section 
      className="w-full bg-gray-50 py-12 px-4"
      aria-label="Trust and credibility badges"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Why Choose Us
          </h2>
          <p className="text-gray-600 text-lg">
            Trusted by thousands of customers across India
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {trustBadges.map((badge) => {
            const IconComponent = badge.icon;
            
            return (
              <div
                key={badge.id}
                className="flex flex-col items-center p-2.5 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                aria-label={badge.ariaLabel}
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <IconComponent 
                    className="w-5 h-5 text-green-600" 
                    aria-hidden="true"
                  />
                </div>
                
                <h3 className="font-medium text-gray-900 text-xs text-center mb-1">
                  {badge.label}
                </h3>
                
                <p className="text-gray-500 text-xs text-center leading-tight">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
