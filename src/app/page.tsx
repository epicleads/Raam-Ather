//import FloatingHeader from './Components/Header/FloatingHeader';
import Hero from './Components/home-hero/Hero';
import AtherFeaturedModels from './Components/featuredmodels/AtherFeaturedModels';

import HomeCalculator from './Components/HomeCalculator/server/HomeCalculator';
import AccessoriesSection from './Components/accessories/server/AccessoriesSection';
import ExtendedWarrantySection from "./Components/HomeExtendedWarranty/server/ExtendedWarrantySection";

import TrustBadges from './Components/TrustBadges/TrustBadges';
import HomeTestimonials from './home-testimonials/server/HomeTestimonials';
import Footer from './Components/footer/footerclient';
import AboutServer from './Components/about/aboutserver';
import ContactPage from './Components/contactform/contactserver';
import Awards from './Components/awards';
export default function Page() {
  return (
    
    <main className="overflow-x-hidden w-full max-w-full">
      {/* <FloatingHeader /> */}
      <Hero />
      
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
  );
}
