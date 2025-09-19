import type { Metadata } from 'next';
//import FloatingHeader from './Components/Header/FloatingHeader';
import Hero from '../Components/home-hero/Hero';
import AtherFeaturedModels from '../Components/featuredmodels/AtherFeaturedModels';

import HomeCalculator from '../Components/HomeCalculator/server/HomeCalculator';
import AccessoriesSection from '../Components/accessories/server/AccessoriesSection';
import ExtendedWarrantySection from "../Components/HomeExtendedWarranty/server/ExtendedWarrantySection";

import TrustBadges from '../Components/TrustBadges/TrustBadges';
import HomeTestimonials from '../home-testimonials/server/HomeTestimonials';
import Footer from '../Components/footer/footerclient';
import AboutServer from '../Components/about/aboutserver';
import ContactPage from '../Components/contactform/contactserver';
import Awards from '../Components/awards';

export const metadata: Metadata = {
  title: 'Special Offers & Discounts - Ather Electric Scooter | Raam Ather',
  description: 'Exclusive offers and discounts on Ather electric scooters. Best deals on Ather 450X, Rizta with easy financing options at Raam Ather dealership.',
  keywords: [
    'Ather offers',
    'Ather discounts',
    'electric scooter deals',
    'Ather 450X offers',
    'Ather Rizta discounts',
    'Ather financing',
    'electric vehicle deals',
    'Raam Ather offers',
    'Ather EMI offers',
    'special discounts',
    'electric scooter financing',
    'Ather price drop',
    'festive offers',
    'exchange offers',
    'Ather promotions'
  ],
  authors: [{ name: 'Raam Ather' }],
  openGraph: {
    title: 'Special Offers & Discounts - Ather Electric Scooter | Raam Ather',
    description: 'Exclusive offers and discounts on Ather electric scooters. Best deals on Ather 450X, Rizta with easy financing options at Raam Ather dealership.',
    images: [
      {
        url: '/Ather-Assets/offers-og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Ather Electric Scooter Special Offers'
      }
    ],
    url: 'https://raamather.com/offer',
    siteName: 'Raam Ather',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Special Offers & Discounts - Ather Electric Scooter | Raam Ather',
    description: 'Exclusive offers and discounts on Ather electric scooters. Best deals on Ather 450X, Rizta with easy financing options.',
    siteId: '@RaamAther',
    creator: '@RaamAther',
    creatorId: '@RaamAther',
    images: ['/Ather-Assets/offers-twitter-card.webp']
  },
  alternates: {
    canonical: 'https://raamather.com/offer'
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
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon-precomposed.png',
      },
    ],
  },
  manifest: '/manifest.json',
  category: 'technology',
  classification: 'Electric Vehicles, Transportation, Technology'
};

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
