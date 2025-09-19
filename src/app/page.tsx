import { Metadata } from 'next';
//import FloatingHeader from './Components/Header/FloatingHeader';
import AtherFeaturedModels from './Components/featuredmodels/AtherFeaturedModels';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://raamather.com',
  },
};

import HomeCalculator from './Components/HomeCalculator/server/HomeCalculator';
import AccessoriesSection from './Components/accessories/server/AccessoriesSection';
import ExtendedWarrantySection from "./Components/HomeExtendedWarranty/server/ExtendedWarrantySection";

import TrustBadges from './Components/TrustBadges/TrustBadges';
import HomeTestimonials from './home-testimonials/server/HomeTestimonials';
import Footer from './Components/footer/footerclient';
import AboutServer from './Components/about/aboutserver';
import ContactPage from './Components/contactform/contactserver';
import HeroClient from './Components/home-hero/HeroClient';
import dynamic from 'next/dynamic';

const Awards = dynamic(() => import('./Components/awards'), {
  loading: () => (
    <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-12 h-12 rounded-2xl bg-gray-200 animate-pulse mx-auto mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-96 mx-auto animate-pulse mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-80 mx-auto animate-pulse"></div>
        </div>
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-96 bg-gray-200 rounded-3xl animate-pulse" />
          ))}
        </div>
        <div className="md:hidden">
          <div className="h-[450px] bg-gray-200 rounded-3xl animate-pulse" />
        </div>
      </div>
    </section>
  )
});

export default function Page() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined' && window.location.hash === '#main-content') {
              history.replaceState(null, null, window.location.pathname + window.location.search);
            }
          `,
        }}
      />
      <main id="main-content" className="overflow-x-hidden w-full max-w-full">
      {/* <FloatingHeader /> */}
      <HeroClient />
      
      {/* Featured Models Section */}
      <AtherFeaturedModels />
      
      <AboutServer />
      {/* Home Models Section */}
      <Awards />
      
      {/* Calculator Section */}
      <HomeCalculator />
      <AccessoriesSection />
      {/* Extended Warranty Section */}
      <ExtendedWarrantySection/>
      {/* Accessories Section */}
      {/* Trust Badges Section */}
      <TrustBadges />
      {/* Testimonials Section */}
      <HomeTestimonials />
      
      <ContactPage />
      {/* Footer Section */}
      <Footer />
      </main>
    </>
  );
}
