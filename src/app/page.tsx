import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Raam Ather | Premium Electric Scooters in Chennai & Hyderabad',
  description: 'Experience the future of mobility with Ather\'s premium electric scooters. Advanced technology, superior performance, and sustainable transportation in Chennai and Hyderabad. Book your test ride today.',
  keywords: [
    'electric scooter',
    'Ather',
    'Chennai',
    'Hyderabad',
    'EV',
    'electric vehicle',
    'sustainable transport',
    'smart scooter',
    'battery scooter',
    'Ather 450S',
    'Ather 450X',
    'Ather Rizta',
    'test ride',
    'dealership'
  ].join(', '),
  authors: [{ name: 'Raam Ather' }],
  creator: 'Raam Ather',
  publisher: 'Raam Ather',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://raamather.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://raamather.com',
    siteName: 'Raam Ather',
    title: 'Raam Ather | Premium Electric Scooters in Chennai & Hyderabad',
    description: 'Experience the future of mobility with Ather\'s premium electric scooters. Advanced technology, superior performance, and sustainable transportation.',
    images: [
      {
        url: '/ather-hero-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Ather Electric Scooters - Premium Smart EVs',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raam Ather | Premium Electric Scooters',
    description: 'Experience the future of mobility with Ather\'s premium electric scooters. Book your test ride today.',
    images: ['/ather-hero-og.jpg'],
    creator: '@raamather',
    site: '@raamather',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'Electric Vehicles',
};
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
    </>
  );
}
