"use client";
import React from 'react';
import HeroSlider from './components/HeroSlider';
import InteractiveTimeline from './components/InteractiveTimeline';
import LocalAdvantageCards from './components/LocalAdvantageCards';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import RaamFamilyCTA from './components/RaamFamilyCTA';
import FAQSection from './components/FAQSection';

export default function AboutUsClient() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Section 1: Hero (white) */}
      <section className="bg-white w-full">
        <HeroSlider />
      </section>
    
      {/* Section 2: Timeline (gray) */}
      <section className="bg-gray-50 w-full">
        <InteractiveTimeline />
      </section>
      
      {/* Section 3: Local Advantages (white) */}
      <section className="bg-white w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LocalAdvantageCards />
        </div>
      </section>
      
    
      {/* Section 5: Interactive Map (white) */}
      {/* <section className="bg-white w-full">
        <InteractiveMap />
      </section> */}
      
      {/* Section 6: Raam Family CTA (gray) */}
      <section className="bg-gray-50 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RaamFamilyCTA />
        </div>
      </section>
      <section className="bg-gray-50 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TestimonialsCarousel />
        </div>
      </section>

      {/* Section 7: FAQ (white) */}
      <section className="bg-white w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQSection />
        </div>
      </section>
    </div>
  );
}