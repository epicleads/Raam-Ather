import React from 'react';
import RiztaSafetyClient from './rizta-saftey-client';

export const metadata = {
  title: 'Safety for All | Ather Rizta',
  description: 'Explore all the advanced safety features of the Ather Rizta. OEM-grade, future-ready, and designed for every rider.',
};

export default function RiztaSafety() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-black mb-6 font-[Inter] tracking-tight">
              Safety for All
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Advanced safety features designed to protect you and your family on every ride
            </p>
          </div>
          <RiztaSafetyClient />
        </div>
      </div>
    </section>
  );
}
