
import type { Metadata } from 'next';
import { Suspense, lazy } from 'react';

// Dynamic imports for code splitting
const RiztaHero = lazy(() => import('./rizta-hero/RiztaHero'));
const RiztaKeyHighlights = lazy(() => import('./rizta-key-highlights/rizta-key-highlights.optimized'));
const RiztaComfort = lazy(() => import('./rizta-comfort/rizta-comfort'));
const RiztaPricing = lazy(() => import('./rizta-pricing/rizta-pricing'));
const RiztaSafety = lazy(() => import('./rizta-saftey-client'));
const RiztaFaq = lazy(() => import('@/app/faq/RiztaFaq'));
const RiztaCTA = lazy(() => import('./riztaCTA.optimized'));
const FooterClient = lazy(() => import('../Components/footer/footerclient'));

// Loading skeletons for better UX
const HeroSkeleton = () => (
  <div className="w-full h-screen bg-gradient-to-br from-gray-900 to-black animate-pulse">
    <div className="flex items-center justify-center h-full">
      <div className="text-center text-white">
        <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4 animate-pulse"></div>
        <div className="h-8 bg-gray-700 rounded w-64 mx-auto mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-700 rounded w-48 mx-auto animate-pulse"></div>
      </div>
    </div>
  </div>
);

const SectionSkeleton = () => (
  <div className="w-full py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-8 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
        ))}
      </div>
    </div>
  </div>
);

const FooterSkeleton = () => (
  <div className="w-full h-96 bg-gray-800 animate-pulse"></div>
);

// SEO metadata
export const metadata: Metadata = {
  title: 'Ather Rizta Z Electric Scooter - Price, Range, Features | Raam Ather',
  description: 'Discover Ather Rizta Z electric scooter with 159km range, 7" touchscreen, and family-friendly design. Starting from ₹1,29,999. Book test ride in Hyderabad & Chennai.',
  keywords: 'Ather Rizta Z, electric scooter, Ather Rizta price, family scooter, electric vehicle Chennai, electric scooter Hyderabad, Ather dealer',
  openGraph: {
    title: 'Ather Rizta Z - Family Electric Scooter | Raam Ather',
    description: 'Experience the perfect blend of family comfort and performance with Ather Rizta Z. 159km range, spacious design, smart features.',
    images: [
      {
        url: '/Ather-Assets/Rizta/rizta-og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Ather Rizta Z Electric Scooter'
      }
    ],
    url: 'https://raamather.com/rizta',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ather Rizta Z - Family Electric Scooter',
    description: 'Spacious, smart, and sustainable. Discover Ather Rizta Z.',
    images: ['/Ather-Assets/Rizta/rizta-twitter-card.webp']
  },
  alternates: {
    canonical: 'https://raamather.com/rizta'
  }
};

// Structured data for SEO
const riztaPageSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Ather Rizta Z",
  "productGroupID": "ather-rizta-series",
  "brand": {
    "@type": "Brand",
    "name": "Ather Energy"
  },
  "category": "Electric Scooter",
  "description": "Family-friendly electric scooter with 159km range, 7-inch touchscreen, and spacious design perfect for daily commuting and family rides.",
  "image": [
    "https://raamather.com/Ather-Assets/Rizta/rizta-main-image.webp",
    "https://raamather.com/Ather-Assets/Rizta/rizta-dashboard.webp",
    "https://raamather.com/Ather-Assets/Rizta/rizta-family-riding.webp"
  ],
  "offers": {
    "@type": "Offer",
    "name": "Ather Rizta Z",
    "price": "129999",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2024-12-31",
    "seller": {
      "@type": "LocalBusiness",
      "name": "Raam Ather",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
      }
    },
    "itemCondition": "https://schema.org/NewCondition"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Range",
      "value": "159 km"
    },
    {
      "@type": "PropertyValue",
      "name": "Charging Time",
      "value": "0-80% in 65 minutes"
    },
    {
      "@type": "PropertyValue",
      "name": "Motor Power",
      "value": "4.3 kW"
    }
  ]
};

export default function RiztaPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(riztaPageSchema) }}
      />

      {/* Critical resource preloads */}
      <link rel="preload" href="/Ather-Assets/Rizta/rizta-hero-main.webp" as="image" />
      <link rel="preload" href="/fonts/NeuralGrotesk-Bold.woff2" as="font" type="font/woff2" crossOrigin="" />

      <main className="min-h-screen bg-gray-50">
        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">Ather Rizta Z Electric Scooter - Complete Guide, Price, Features & Specifications</h1>

        {/* Hero Section */}
        <Suspense fallback={<HeroSkeleton />}>
          <RiztaHero />
        </Suspense>

        {/* Pricing Section */}
        <Suspense fallback={<SectionSkeleton />}>
          <RiztaPricing />
        </Suspense>

        {/* Key Highlights */}
        <Suspense fallback={<SectionSkeleton />}>
          <RiztaKeyHighlights />
        </Suspense>

        {/* Comfort Features */}
        <Suspense fallback={<SectionSkeleton />}>
          <RiztaComfort />
        </Suspense>

        {/* Safety Features */}
        <Suspense fallback={<SectionSkeleton />}>
          <RiztaSafety />
        </Suspense>

        {/* CTA Section */}
        <Suspense fallback={<SectionSkeleton />}>
          <RiztaCTA />
        </Suspense>

        {/* FAQ Section */}
        <Suspense fallback={<SectionSkeleton />}>
          <RiztaFaq />
        </Suspense>

        {/* Footer */}
        <Suspense fallback={<FooterSkeleton />}>
          <FooterClient />
        </Suspense>
      </main>
    </>
  );
}
