"use client";
import React from 'react';
import ContactHero from './components/ContactHero';
import FormPage from '../Components/contactform/formserver';
import GetInTouchServer from '../Components/contactform/getintouchserver';
import InteractiveOutletsMap from './components/InteractiveOutletsMap';
import FloatingActionButtons from './components/FloatingActionButtons';
import ContactFAQ from './components/ContactFAQ';

export default function ContactUsClient() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F8F8F8] relative font-neurial">
      <div className="w-full">
        <ContactHero />
      </div>
      <div className="w-full">
        <FormPage />
      </div>
      <div className="w-full">
        <GetInTouchServer />
      </div>
      <div className="w-full">
        <InteractiveOutletsMap />
      </div>
      
      <div className="w-full">
        <ContactFAQ />
      </div>
      <FloatingActionButtons />
    </div>
  );
}